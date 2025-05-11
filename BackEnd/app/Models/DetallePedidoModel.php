<?php

namespace App\Models;

use CodeIgniter\Model;

class DetallePedidoModel extends Model
{
    protected $table      = 'detalle_pedidos';
    protected $primaryKey = 'id';

    protected $allowedFields = ['pedido_id', 'producto_id', 'cantidad', 'precio_unidad'];
}