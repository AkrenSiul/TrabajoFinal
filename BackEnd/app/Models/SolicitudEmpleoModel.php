<?php

namespace App\Models;

use CodeIgniter\Model;

class SolicitudEmpleoModel extends Model
{
    protected $table      = 'solicitudes_empleo';
    protected $primaryKey = 'id';

    protected $allowedFields = ['nombre', 'email', 'mensaje', 'cv_archivo', 'fecha_envio'];
}