FROM php:8.3-apache

WORKDIR /var/www/html

# Install PHP MySQL PDO driver
RUN docker-php-ext-install pdo pdo_mysql

# Copy project files
COPY . /var/www/html/

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Fix permissions for runtime directory
RUN chown -R www-data:www-data /var/www/html/runtime

EXPOSE 10000

CMD ["sh", "-c", "\
  sed -i 's/Listen 80/Listen 10000/' /etc/apache2/ports.conf && \
  sed -i 's/:80>/:10000>/g' /etc/apache2/sites-available/000-default.conf && \
  apache2-foreground"]