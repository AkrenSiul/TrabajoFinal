<?php

namespace App\Models;

use CodeIgniter\Model;

class ConsultaContactoModel extends Model
{
    protected $table      = 'consultas_contacto';
    protected $primaryKey = 'id';

    protected $allowedFields = ['nombre', 'email', 'telefono', 'consulta', 'fecha_envio'];

}