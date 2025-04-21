<?php

use App\Controllers\UsuarioController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


/* cors */
$routes->group('', ['filter' => 'cors'], static function (RouteCollection $routes): void {

    // Ruta de prueba
    $routes->group('api', function($routes) {
    $routes->get('test', function () {
        return response()->setJSON(['status' => 'ok', 'message' => 'CORS funcionando 🚀']);
    });
    /* USUARIOS */
    $routes->post('login', 'UsuarioController::login');
    $routes->post('registro', 'UsuarioController::registro');
    $routes->get('logout', 'UsuarioController::logout');
    $routes->get('usuario', 'UsuarioController::usuario');
    $routes->put('usuario/rol/(:num)', 'UsuarioController::cambiarRol/$1');
    });

    // Recurso RESTful (controlador Product)
    $routes->resource('product');

    // OPTIONS para colección
    $routes->options('product', static function () {
        return response()
            ->setStatusCode(204)
            ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
            ->setHeader('Access-Control-Allow-Origin', '*'); // Usa origen concreto si es necesario
    });

    // OPTIONS para recursos individuales
    $routes->options('product/(:any)', static function () {
        return response()
            ->setStatusCode(204)
            ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
            ->setHeader('Access-Control-Allow-Origin', '*');
    });
});