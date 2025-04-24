<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $origin = $request->getHeaderLine('Origin');
        $allowedOrigins = [
            'http://localhost:4200',
            'http://127.0.0.1:4200'
        ];

        // Verificar si el origen es permitido
        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: http://localhost:4200");
        }

        // Métodos permitidos
        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");

        // Cabeceras permitidas
        header("Access-Control-Allow-Headers: Content-Type");

        // Indicar si las credenciales están permitidas
        header("Access-Control-Allow-Credentials: true");

        // Si es una petición OPTIONS (preflight), respondemos aquí
        if ($request->getMethod() === 'options') {
            header('HTTP/1.1 200 OK');
            exit;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        return $response;
    }
}
