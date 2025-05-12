<?php

namespace App\Controllers;

use App\Models\CategoriaModel;
use CodeIgniter\RESTful\ResourceController;

class CategoriaController extends ResourceController
{
    protected $model;

    public function __construct() {
        $this->model = new CategoriaModel();
    }
    public function getCategorias()
    {
        $categoriaModel = new CategoriaModel();
        $categorias = $categoriaModel->findAll();

        return $this->respond($categorias);
    }
    public function getCategoria($id) {
        $categoriaModel = new CategoriaModel();
        $categoria = $categoriaModel->find($id);

        if ($categoria) {
            return $this->respond($categoria);
        } else {
            return $this->failNotFound('Categoría no encontrada');
        }
    }

    public function crearCategoria() {
        $categoriaModel = new CategoriaModel();
        $data = $this->request->getJSON(true);

        if ($categoriaModel->insert($data)) {
            $data['id'] = $categoriaModel->getInsertID();
            return $this->respondCreated($data);
        }

        return $this->failValidationErrors($categoriaModel->errors());
    }

    public function updateCategoria($id) {
        $categoriaModel = new CategoriaModel();
        $data = $this->request->getJSON(true);

        if ($categoriaModel->update($id, $data)) {
            return $this->respond('Categoría actualizada');
        }

        return $this->failValidationErrors($categoriaModel->errors());
    }
    public function deleteCategoria($id) {
        $categoriaModel = new CategoriaModel();

        if ($categoriaModel->find($id)) {
            $categoriaModel->delete($id);
            return $this->respond('Categoría eliminada');
        }

        return $this->failNotFound('Categoría no encontrada. Fallo al eliminar');
    }

}