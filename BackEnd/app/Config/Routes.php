<?php

use App\Controllers\UsuarioController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Cors
$routes->group('', ['filter' => 'cors'], static function (RouteCollection $routes): void {

    // Ruta de prueba
    $routes->group('api', function($routes) {
    $routes->get('test', function () {
        return response()->setJSON(['status' => 'ok', 'message' => 'CORS funcionando 🚀']);
    });
    // Controlador CORS para permitir la entrada desde Localhost:4200 desde todos los puntos
        $routes->options('(:any)', 'CorsController::options');


    /* USUARIOS */
        // Definir la ruta OPTIONS para login
        $routes->options('login', static function() {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->post('login', 'UsuarioController::login');
        $routes->get('login', 'UsuarioController::login');

        $routes->options('registro', static function() {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });
        // Rutas de Usuarios
        $routes->post('registro', 'UsuarioController::registro');
        $routes->get('logout', 'UsuarioController::logout');
        $routes->get('usuario', 'UsuarioController::usuario');

        $routes->options('usuarios', static function() {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });
        $routes->get('usuarios', 'UsuarioController::getUsuarios');
        $routes->put('usuario/rol/(:segment)', 'UsuarioController::cambiarRol');

        $routes->options('usuario/delete/(:segment)', static function() {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });
        $routes->delete('usuario/delete/(:segment)', 'UsuarioController::deleteUsuario/$1');

        $routes->patch('usuario/update/(:segment)', 'UsuarioController::updateUsuario/$1');



        // OPTIONS para colección
        $routes->options('producto', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        // Rutas de Productos

        $routes->get('producto', 'ProductoController::getProducts');
        $routes->post('producto/crearProducto', 'ProductoController::createProducto');
        $routes->delete('producto/deleteProducto/(:segment)', 'ProductoController::deleteProducto/$1');
        $routes->post('producto/update/(:segment)', 'ProductoController::updateProducto/$1');
        $routes->get('producto/categoria', 'ProductoController::getCategorias');
        $routes->get('producto/categoria/(:segment)', 'ProductoController::getByCategorias/$1');
        $routes->get('producto/(:segment)', 'ProductoController::getProduct/$1');
    });


    // Rutas de Categorías


});