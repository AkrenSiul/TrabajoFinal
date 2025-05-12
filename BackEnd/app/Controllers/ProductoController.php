<?php

namespace App\Controllers;

use App\Models\CategoriaModel;
use App\Models\ProductoModel;
use CodeIgniter\RESTful\ResourceController;

class ProductoController extends ResourceController
{
    protected $model;
    protected $categoriaModel;

    public function __construct() {
        $this->model = new ProductoModel();
        $this->categoriaModel = new CategoriaModel();
    }
    public function getProducts()
    {
        $categoriaId = $this->request->getGet('categoria_id');
        if ($categoriaId) {
            return $this->getByCategorias($categoriaId);
        } else {
            $productos = $this->model->findAll();
            $categorias = $this->categoriaModel->findAll();

            $mapCategorias = [];
            foreach ($categorias as $categoria) {
                $mapCategorias[$categoria['id']] = $categoria;
            }
            foreach ($productos as &$producto) {
                $categoria = $mapCategorias[$producto['categoria_id']] ?? null;
                $producto['categoria'] = $categoria ? $categoria['nombre'] : 'Sin categoría';
                $nombreImagen = $producto['imagen_url'];
                $rutaImagen = FCPATH . 'img/' . $nombreImagen;

                if (empty($nombreImagen) || !file_exists($rutaImagen)) {
                    $producto['imagen_url'] = base_url('img/default2.png');
                } else {
                    $producto['imagen_url'] = base_url('img/' . $nombreImagen);
                }
            }
            if (count($productos) === 0) {
                return $this->response->setJSON([]);
                }
            return $this->response->setJSON($productos);
        }
    }

    public function getProduct($id) {
        $producto = $this->model->find($id);
        if($producto) {
            $categorias = $this->categoriaModel->findAll();
            $mapCategorias = [];
            foreach ($categorias as $categoria) {
                $mapCategorias[$categoria['id']] = $categoria;
            }
            $categoria = $mapCategorias[$producto['categoria_id']] ?? null;
            $producto['categoria'] = $categoria ? $categoria['nombre'] : 'Sin categoría';
            $nombreImagen = $producto['imagen_url'];
            $rutaImagen = FCPATH . 'img/' . $nombreImagen;

            if (empty($nombreImagen) || !file_exists($rutaImagen)) {
                $producto['imagen_url'] = base_url('img/default2.png');
            } else {
                $producto['imagen_url'] = base_url('img/' . $nombreImagen);
            }
            return $this->respond($producto);
        } else {
            return $this->failNotFound('Producto no encontrado');
        }
    }

    public function createProducto()
    {
        helper(['form']);

        $validationRules = [
            'nombre'      => 'required|max_length[255]|min_length[3]',
            'descripcion' => 'required|max_length[1000]|min_length[10]',
            'precio'      => 'required|numeric',
            'stock'       => 'required|integer',
            'categoria_id'  => 'required|integer',
            'imagen_url'  => 'if_exist|is_image[imagen_url]',
        ];

        $dataPost = [
            'nombre'      => $this->request->getPost('nombre'),
            'descripcion' => $this->request->getPost('descripcion'),
            'precio'      => $this->request->getPost('precio'),
            'stock'       => $this->request->getPost('stock'),
            'categoria_id'  => $this->request->getPost('categoria_id'),
        ];

        if (! $this->validateData($dataPost, $validationRules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->validator->getValidated();


        $imagen = $this->request->getFile('imagen_url');
        if ($imagen && $imagen->isValid() && !$imagen->hasMoved()) {
            $nombreImg = $imagen->getName();
            $uploadPath = FCPATH . 'img/';
            $rutaCompleta = $uploadPath . $nombreImg;

            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            if (!file_exists($rutaCompleta)) {
                $imagen->move($uploadPath, $nombreImg);
            }
            $data['imagen_url'] = $nombreImg;
        }
        if ($this->model->insert($data)) {
            return $this->respondCreated([
                'producto' => $data,
                'mensaje' => 'Producto creado correctamente'
            ]);
        }

        return $this->failServerError('No se pudo crear el producto.');
    }

    public function updateProducto($id)
    {
        helper(['form']);

        $validationRules = [
            'nombre'      => 'required|max_length[255]|min_length[3]',
            'descripcion' => 'required|max_length[1000]|min_length[10]',
            'precio'      => 'required|numeric',
            'stock'       => 'required|integer',
            'categoria_id'  => 'required|integer',
            'imagen_url'  => 'if_exist|is_image[imagen_url]',
        ];

        $dataPost = [
            'nombre'      => $this->request->getPost('nombre'),
            'descripcion' => $this->request->getPost('descripcion'),
            'precio'      => $this->request->getPost('precio'),
            'stock'       => $this->request->getPost('stock'),
            'categoria_id'  => $this->request->getPost('categoria_id'),
        ];

        if (! $this->validateData($dataPost, $validationRules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = $this->validator->getValidated();


        $imagen = $this->request->getFile('imagen_url');
        if ($imagen && $imagen->isValid() && !$imagen->hasMoved()) {
            $nombreImg = $imagen->getName();
            $uploadPath = FCPATH . 'img/';
            $rutaCompleta = $uploadPath . $nombreImg;

            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            if (!file_exists($rutaCompleta)) {
                $imagen->move($uploadPath, $nombreImg);
            }
            $data['imagen_url'] = $nombreImg;
        }

        if ($this->model->update($id, $data)) {
            return $this->respond([
                'recibido' => $data,
                'imagen' => $data['imagen_url'] ?? 'No enviada',
                'message' => 'Producto actualizado correctamente'
            ]);
        }

        return $this->failServerError('No se pudo actualizar el producto.');
    }


    public function deleteProducto($id) {
        $producto = $this->model->find($id);

        if ($producto) {
            $imagen = $producto['imagen_url'];
            $this->model->delete($id);
            $productosConImagen = $this->model->where('imagen_url', $imagen)->findAll();
            if (count($productosConImagen) === 0) {
                $rutaImagen = FCPATH . 'img/' . $imagen;

                if (file_exists($rutaImagen)) {
                    unlink($rutaImagen);
                }
            }

            return $this->respond('Producto eliminado');
        }

        return $this->failNotFound('Producto no encontrado. Fallo al eliminar');
    }

    public function getCategorias() {
        $categoriaModel = new CategoriaModel();
        $categorias = $categoriaModel->findAll();
        return $this->respond($categorias);
    }

    public function getByCategorias($categoriaId)
    {
        $productos = $this->model->where('categoria_id', $categoriaId)->findAll();
        $categoria = $this->categoriaModel->find($categoriaId);

        if (empty($productos)) {
            return $this->failNotFound('No hay productos para esta categoría');
        }

        foreach ($productos as &$producto) {
            $producto['categoria'] = $categoria ? $categoria['nombre'] : 'Sin categoría';
            $nombreImagen = $producto['imagen_url'];
            $rutaImagen = FCPATH . 'img/' . $nombreImagen;

            $producto['imagen_url'] = (!empty($nombreImagen) && file_exists($rutaImagen))
                ? base_url('img/' . $nombreImagen)
                : base_url('img/default2.png');
        }

        return $this->respond($productos);
    }
}