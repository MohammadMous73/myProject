const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js([
    'resources/js/jquery-3.6.0.min.js',
    'resources/js/bootstrap.js',
    'resources/js/bootstrap.bundle.js',
    'resources/js/bootstrap.esm.js'
], 'public/js/app.js')
mix.styles([
    'resources/css/bootstrap.rtl.css',
    'resources/css/bootstrap-grid.css',
    'resources/css/bootstrap-reboot.css',
    'resources/css/bootstrap-reboot.rtl.css' ,
    'resources/css/bootstrap-utilities.css',
    'resources/css/bootstrap-utilities.rtl.css',
    'resources/css/style.css'
], 'public/css/app.css')

