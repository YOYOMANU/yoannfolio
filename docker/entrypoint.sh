#!/bin/bash
set -e
set -x

echo ">> Génération de nginx.conf"
export PORT="${PORT:-8080}"
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

cd /var/www/html

echo ">> config:cache"
php artisan config:cache

echo ">> route:cache"
php artisan route:cache

echo ">> view:cache"
php artisan view:cache

# ---- Démarrage immédiat du serveur ----
# nginx et php-fpm démarrent AVANT migrate/seed, pour que Railway
# détecte le port ouvert tout de suite et ne tue pas le conteneur
# en pensant qu'il n'a jamais démarré.
echo ">> Démarrage php-fpm"
php-fpm -D

echo ">> Démarrage nginx (arrière-plan)"
nginx -g "daemon off;" &
NGINX_PID=$!

# ---- Migrate + seed en tâche de fond, après coup ----
(
    echo ">> migrate"
    php artisan migrate --force

    echo ">> storage:link"
    rm -f public/storage
    php artisan storage:link

    SEED_LOCK="storage/app/public/.seeded"
    if [ ! -f "$SEED_LOCK" ]; then
        echo ">> Seeding (première exécution)"
        if php artisan db:seed --force; then
            touch "$SEED_LOCK"
        else
            echo ">> ATTENTION : le seeding a échoué (voir logs ci-dessus)"
        fi
    else
        echo ">> Seeders déjà exécutés, on skip"
    fi
) &

# Le conteneur reste vivant tant que nginx tourne
wait "$NGINX_PID"