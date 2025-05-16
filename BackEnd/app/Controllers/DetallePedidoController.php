<?php

namespace App\Controllers;

use App\Models\DetallePedidoModel;
use App\Models\ProductoModel;
use CodeIgniter\RESTful\ResourceController;

class DetallePedidoController extends ResourceController
{
    protected $model;
    protected $productoModel;

    public function __construct() {
        $this->model = new DetallePedidoModel();
        $this->productoModel = new ProductoModel();
    }

    public function getDetalles($pedidoId)
    {

        if ($pedidoId) {
            $detalles = $this->model->where('pedido_id', $pedidoId)->findAll();

            if (empty($detalles)) {
                return $this->failNotFound('No hay detalles para este pedido');
            }
            $productos = $this->productoModel->findAll();
            $mapProductos = [];

            foreach ($productos as $producto) {
                $mapProductos[$producto['id']] = $producto;
            }

            foreach ($detalles as &$detalle) {
                $producto = $mapProductos[$detalle['producto_id']] ?? null;
                $detalle['producto'] = $producto ? $producto['nombre'] : 'Producto no disponible';
            }

            return $this->respond($detalles);
        }

        return $this->failValidationErrors('Se requiere el parámetro "pedido_id"');
    }


    public function createDetalle()
    {
        helper(['form']);

        $validationRules = [
            'pedido_id'      => 'required|integer',
            'producto_id'    => 'required|integer',
            'cantidad'       => 'required|integer',
            'precio_unidad'  => 'required|numeric'
        ];

        $dataPost = [
            'pedido_id'     => $this->request->getPost('pedido_id'),
            'producto_id'   => $this->request->getPost('producto_id'),
            'cantidad'      => $this->request->getPost('cantidad'),
            'precio_unidad' => $this->request->getPost('precio_unidad'),
        ];
        $dataPost = $this->request->getJSON(true);
        if (! $this->validateData($dataPost, $validationRules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }
        $data = $this->validator->getValidated();

        $productoModel = new ProductoModel();
        $producto = $productoModel->find($data['producto_id']);

        if (!$producto) {
            return $this->failNotFound('Producto no encontrado');
        }
        $nuevoStock = (int)$producto['stock'] - (int)$data['cantidad'];
        $productoModel->update($data['producto_id'], ['stock' => $nuevoStock]);

        if ($this->model->insert($data)) {
            return $this->respondCreated([
                'detalle' => $data,
                'mensaje' => 'Detalle de pedido creado correctamente'
            ]);
        }

        return $this->failServerError('No se pudo crear el detalle de pedido.');
    }

    public function deleteDetalle($id)
    {
        $detalle = $this->model->find($id);

        if ($detalle) {
            $this->model->delete($id);
            return $this->respond('Detalle de pedido eliminado');
        }

        return $this->failNotFound('Detalle de pedido no encontrado. Fallo al eliminar');
    }
}