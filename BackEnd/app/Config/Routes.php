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



        // OPTIONS para producto
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


        // Rutas de Categorías

        $routes->options('categorias', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->options('categorias/(:segment)', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->get('categorias', 'CategoriaController::getCategorias');
        $routes->post('categorias', 'CategoriaController::crearCategoria');
        $routes->put('categorias/(:segment)', 'CategoriaController::updateCategoria/$1');
        $routes->delete('categorias/(:segment)', 'CategoriaController::deleteCategoria/$1');


        // $routes->get('categorias/(:segment)', 'CategoriaController::getCategoria/$1');

        // Rutas Solicitud Empleo
        $routes->options('solicitudes-empleo', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });
        $routes->options('solicitudes-empleo/(:segment)/cv', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->get('solicitudes-empleo', 'SolicitudEmpleoController::getSolicitudEmpleos');
        $routes->get('solicitudes-empleo/(:segment)', 'SolicitudEmpleoController::getSolicitudEmpleo/$1');
        $routes->post('solicitudes-empleo', 'SolicitudEmpleoController::createSolicitudEmpleo');
        $routes->delete('solicitudes-empleo/(:segment)', 'SolicitudEmpleoController::deleteSolicitud/$1');
        $routes->get('solicitudes-empleo/(:segment)/cv', 'SolicitudEmpleoController::descargarCV/$1');


        // Rutas de Consulta

        $routes->options('consultas-contacto', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->options('consultas-contacto/(:segment)', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->get('consultas-contacto', 'ConsultaContactoController::getConsultas');
        $routes->get('consultas-contacto/(:segment)', 'ConsultaContactoController::getConsulta/$1');
        $routes->post('consultas-contacto', 'ConsultaContactoController::createConsulta');
        $routes->delete('consultas-contacto/(:segment)', 'ConsultaContactoController::deleteConsulta/$1');

        // Rutas de Pedidos

        $routes->options('pedidos', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->options('pedidos/(:segment)', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });
        $routes->get('pedidos/', 'PedidoController::getPedidos/');
        $routes->get('pedidos/detalles-usuario', 'PedidoController::getPedidosConDetallesPorUsuario');
        $routes->get('pedidos/(:segment)', 'PedidoController::getPedido/$1');
        $routes->post('pedidos', 'PedidoController::createPedido');
        $routes->put('pedidos/(:segment)', 'PedidoController::updatePedido/$1');
        $routes->delete('pedidos/(:segment)', 'PedidoController::deletePedido/$1');

        // Rutas de Detalle pedidos

        $routes->options('detalle-pedidos', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->options('detalle-pedidos/(:segment)', static function () {
            $origin = $_SERVER['SERVER_ADDR'] ?? 'http://localhost:4200';
            return response()
                ->setStatusCode(204)
                ->setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, DELETE')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type')
                ->setHeader('Access-Control-Allow-Origin', "'$origin'");
        });

        $routes->get('detalle-pedidos/(:segment)', 'DetallePedidoController::getDetalles/$1');
        $routes->get('detalle-pedidos/(:segment)', 'DetallePedidoController::getDetallePedido/$1');
        $routes->post('detalle-pedidos', 'DetallePedidoController::createDetalle');
        $routes->delete('detalle-pedidos/(:segment)', 'DetallePedidoController::deleteDetalle/$1');

    });



});