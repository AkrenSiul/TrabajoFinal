<?php

namespace App\Controllers;

use App\Models\ConsultaContactoModel;
use CodeIgniter\RESTful\ResourceController;

class ConsultaContactoController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new ConsultaContactoModel();
    }

    public function getConsultas()
    {
        $consultas = $this->model->findAll();
        return $this->respond($consultas);
    }

    public function getConsulta($id = null)
    {
        $consulta = $this->model->find($id);
        if (!$consulta) {
            return $this->failNotFound('Consulta no encontrada');
        }
        return $this->respond($consulta);
    }

    public function createConsulta()
    {
        helper(['form']);

        $reglas = [
            'nombre'      => 'required',
            'email'       => 'required|valid_email',
            'telefono'    => 'permit_empty',
            'consulta'    => 'required',
        ];

        if (!$this->validate($reglas)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = [
            'nombre'      => $this->request->getPost('nombre') ?? $this->request->getJSON(true)['nombre'],
            'email'       => $this->request->getPost('email') ?? $this->request->getJSON(true)['email'],
            'telefono'    => $this->request->getPost('telefono') ?? $this->request->getJSON(true)['telefono'] ?? '',
            'consulta'    => $this->request->getPost('consulta') ?? $this->request->getJSON(true)['consulta'],
            'fecha_envio' => date('Y-m-d H:i:s'),
        ];

        $this->model->insert($data);

        return $this->respondCreated([
            'mensaje' => 'Consulta enviada correctamente',
            'datos'   => $data
        ]);
    }

    public function deleteConsulta($id = null)
    {
        $consulta = $this->model->find($id);

        if (!$consulta) {
            return $this->failNotFound('Consulta no encontrada');
        }

        $this->model->delete($id);

        return $this->respondDeleted(['mensaje' => 'Consulta eliminada correctamente']);
    }
}