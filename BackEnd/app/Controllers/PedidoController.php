<?php

namespace App\Controllers;

use App\Models\DetallePedidoModel;
use App\Models\PedidoModel;
use App\Models\ProductoModel;
use CodeIgniter\RESTful\ResourceController;

class PedidoController extends ResourceController
{
    protected $model;
    public function __construct() {
        $this->model = new PedidoModel();
    }
    public function getPedidos()
    {
        $usuarioId = $this->request->getGet('usuario_id');
        $detallePedidoModel = new DetallePedidoModel();
        $productoModel = new ProductoModel();

        $productos = $productoModel->findAll();
        $mapProductos = [];
        foreach ($productos as $producto) {
            $mapProductos[$producto['id']] = $producto;
        }
        if ($usuarioId) {
            $pedidos = $this->model->where('usuario_id', $usuarioId)->findAll();
        } else {
            $pedidos = $this->model->findAll();
        }

        if (empty($pedidos)) {
            return $this->failNotFound('No hay pedidos' . ($usuarioId ? ' para este usuario' : ''));
        }

        foreach ($pedidos as &$pedido) {
            $detalles = $detallePedidoModel->where('pedido_id', $pedido['id'])->findAll();

            foreach ($detalles as &$detalle) {
                $producto = $mapProductos[$detalle['producto_id']] ?? null;
                $detalle['producto'] = $producto ? $producto['nombre'] : 'Producto no disponible';
            }

            $pedido['detalles'] = $detalles;
        }

        return $this->respond($pedidos);
    }

    public function getPedido($usuario_id)
    {
        $pedido = $this->model->where('usuario_id', $usuario_id)->first();

        if ($pedido) {
            return $this->respond($pedido);
        }

        return $this->failNotFound('Pedido abierto no encontrado');
    }
    public function getPedidosConDetallesPorUsuario()
    {
        $usuarioId = $this->request->getGet('usuario_id');

        if (!$usuarioId) {
            return $this->failValidationErrors('Se requiere el parámetro "usuario_id"');
        }

        $pedidos = $this->model->where('usuario_id', $usuarioId)->findAll();

        if (empty($pedidos)) {
            return $this->failNotFound('No hay pedidos para este usuario');
        }

        $detallePedidoModel = new DetallePedidoModel();
        $productoModel = new ProductoModel();

        $productos = $productoModel->findAll();
        $mapProductos = [];
        foreach ($productos as $producto) {
            $mapProductos[$producto['id']] = $producto;
        }

        foreach ($pedidos as &$pedido) {
            $detalles = $detallePedidoModel->where('pedido_id', $pedido['id'])->findAll();

            foreach ($detalles as &$detalle) {
                $producto = $mapProductos[$detalle['producto_id']] ?? null;
                $detalle['producto'] = $producto ? $producto['nombre'] : 'Producto no disponible';
            }

            $pedido['detalles'] = $detalles;
        }

        return $this->respond($pedidos);
    }

    public function createPedido()
    {
        helper(['form']);

        $validationRules = [
            'usuario_id'    => 'required|integer',
            'fecha_pedido'  => 'required|valid_date[Y-m-d]',
            'estado'        => 'required|in_list[pendiente,enviado,cancelado,entregado]',
            'total'         => 'required|numeric'
        ];

        $dataPost = $this->request->getJSON(true);

        if (! $this->validateData($dataPost, $validationRules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->validator->getValidated();

        if ($this->model->insert($data)) {
            $id = $this->model->insertID();

            $pedido = $this->model->find($id);

            return $this->respondCreated([
                'pedido' => $pedido,
                'mensaje' => 'Pedido creado correctamente'
            ]);
        }

        return $this->failServerError('No se pudo crear el pedido.');
    }
    public function updatePedido($id)
    {
        helper(['form']);

        $validationRules = [
            'usuario_id'    => 'required|integer',
            'fecha_pedido'  => 'required|valid_date[Y-m-d]',
            'estado'        => 'required|in_list[pedido,enviado,cancelado,entregado]',
            'total'         => 'required|numeric'
        ];
        $dataPost = [
            'usuario_id'    => $this->request->getPost('usuario_id'),
            'fecha_pedido'  => $this->request->getPost('fecha_pedido'),
            'estado'        => $this->request->getPost('estado'),
            'total'         => $this->request->getPost('total')
        ];
        $dataPost = $this->request->getJSON(true);
        if (! $this->validateData($dataPost, $validationRules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->validator->getValidated();

        if ($this->model->update($id, $data)) {
            return $this->respond([
                'pedido' => $data,
                'mensaje' => 'Pedido actualizado correctamente'
            ]);
        }
        return $this->failServerError('No se pudo actualizar el pedido.');
    }

    public function deletePedido($id)
    {
        $pedido = $this->model->find($id);

        if ($pedido) {
            $this->model->delete($id);
            return $this->respond('Pedido eliminado correctamente');
        }

        return $this->failNotFound('Pedido no encontrado. No se pudo eliminar');
    }



}