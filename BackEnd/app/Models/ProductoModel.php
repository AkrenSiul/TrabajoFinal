<?php
namespace App\Models;

use CodeIgniter\Model;
class ProductoModel extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'id';

    protected $allowedFields = ['nombre', 'descripcion', 'precio', 'stock', 'categoria_id', 'imagen_url'];

    public function getByCategoria($categoriaId)
    {
        return $this->where('categoria_id', $categoriaId)->findAll();
    }

    public function getProductosPorCategoriaConNombre($categoriaId)
    {
        return $this->select('productos.*, categorias.nombre as categoria_nombre')
            ->join('categorias', 'categorias.id = productos.categoria_id')
            ->where('productos.categoria_id', $categoriaId)
            ->findAll();
    }
}