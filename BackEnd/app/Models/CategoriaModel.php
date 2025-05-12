<?php

namespace App\Models;
use CodeIgniter\Model;

class CategoriaModel extends Model
{
    protected $table      = 'categorias';
    protected $primaryKey = 'id';

    protected $allowedFields = ['nombre', 'descripcion'];
    protected $useTimestamps = false;

    protected $validationRules = [
        'nombre' => 'required|min_length[3]',
    ];
}