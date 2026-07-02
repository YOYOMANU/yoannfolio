#!/bin/bash
set -e
set -x

echo ">> Génération de nginx.conf"
export PORT="${PORT:-8080}"
envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

cd /var/www/html

# ---- Fix permissions du volume monté par Railway ----
# Le volume écrase les permissions fixées dans le Dockerfile au build,
# il faut donc les réappliquer au runtime, une fois le volume attaché.
echo ">> Fix permissions storage"
mkdir -p storage/app/public storage/framework/{sessions,views,cache} storage/logs
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo ">> config:cache"
php artisan config:cache

echo ">> route:cache"
php artisan route:cache

echo ">> view:cache"
php artisan view:cache

# ---- Démarrage immédiat du serveur ----
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

wait "$NGINX_PID"