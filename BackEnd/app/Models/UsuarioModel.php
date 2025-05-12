<?php
namespace App\Models;

use CodeIgniter\Model;
class UsuarioModel extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id';

    protected $allowedFields = ['usuario', 'email', 'contrasenya', 'rol'];

    public function getUserByUsuario($usuario)
    {
        return $this->where('usuario', $usuario)->first();
    }
}