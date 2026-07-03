# ---- Stage 1 : builder (PHP + Node ensemble, requis par le plugin Wayfinder) ----
FROM php:8.4-cli-alpine AS builder
ARG VITE_APP_NAME=Laravel
RUN apk add --no-cache \
        nodejs \
        npm \
        git \
        unzip \
        libpng-dev \
        libzip-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        icu-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl gd intl bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Dépendances PHP
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Dépendances Node
COPY package*.json ./
RUN npm ci

# Reste du code source
COPY . .

RUN composer dump-autoload --optimize --no-dev

# .env minimal pour que `artisan` puisse booter pendant le build
# (le plugin Wayfinder appelle `php artisan wayfinder:generate` via Vite)
RUN printf "APP_NAME=%s\nAPP_ENV=local\n...\nVITE_APP_NAME=%s\n" "$VITE_APP_NAME" "$VITE_APP_NAME" > .env \
    && php artisan key:generate --forc

RUN npm run build

# Nettoyage : rien de tout ça ne doit atterrir dans l'image finale
RUN rm -f .env && rm -rf node_modules

# ---- Stage 2 : image finale (php-fpm + nginx) ----
FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
        nginx \
        bash \
        gettext \
        libpng-dev \
        libzip-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        icu-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl gd intl bcmath

WORKDIR /var/www/html
COPY --from=builder /app /var/www/html

COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN mkdir -p storage/framework/{sessions,views,cache} \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080
CMD ["/entrypoint.sh"]