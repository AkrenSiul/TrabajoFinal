<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Eliminar cabeceras porque Docker crea sus propias
        header_remove('Access-Control-Allow-Origin');
        header_remove('Access-Control-Allow-Methods');
        header_remove('Access-Control-Allow-Headers');
        header_remove('Access-Control-Allow-Credentials');

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';


        $allowedOrigins = [
            'http://localhost:4200',
        ];

        if (in_array($origin, $allowedOrigins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        } else {
            header('Access-Control-Allow-Origin: *');
        }



        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");


        header("Access-Control-Allow-Headers: Content-Type");


        if ($request->getMethod() === 'OPTIONS') {
            http_response_code(200);
            exit;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        $allowedOrigins = [
            'http://localhost:4200',
        ];

        if (in_array($origin, $allowedOrigins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        // header('Access-Control-Allow-Credentials: true');

        if ($request->getMethod() === 'OPTIONS') {
            return service('response')->setStatusCode(200);
        }
    }
}
