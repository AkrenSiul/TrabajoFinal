<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class CorsController extends ResourceController
{
    public function options()
    {
        return $this->response->setStatusCode(200);
    }
}