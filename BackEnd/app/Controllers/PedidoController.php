<?php

namespace App\Controllers;

use App\Models\PedidoModel;
use CodeIgniter\RESTful\ResourceController;

class PedidoController extends ResourceController
{
    protected $model;

    public function __construct() {
        $this->model = new PedidoModel();
    }

    public function getPedidos() {
        return $this->model->findAll();
    }



}