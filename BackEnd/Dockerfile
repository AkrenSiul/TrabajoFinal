FROM php:8.2-apache

# Instala extensiones necesarias
RUN apt-get update && apt-get install -y \
    libicu-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli intl

# Habilita mod_rewrite de Apache
RUN a2enmod rewrite

# Cambia el DocumentRoot para que apunte a la carpeta /public de CodeIgniter
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Modifica el VirtualHost
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Copia el código del proyecto al contenedor
COPY . /var/www/html

# Establece permisos adecuados
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

RUN printf "upload_max_filesize=20M\npost_max_size=25M\nmax_file_uploads=20\n" > /usr/local/etc/php/conf.d/uploads.ini

EXPOSE 80
