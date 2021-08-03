## Quick Start

To install the application first copy .env.example into .env. Then follow the steps bellow:

``` bash
# Install Dependencies
composer install

# Install UI dependencies
yarn install

# Create sail alias
alias sail='./vendor/bin/sail'

# Start sail
sail up -d

# Generate key
sail artisan key:generate

# Run Migrations
sail artisan migrate

# Install Passport
sail artisan passport:install
```
