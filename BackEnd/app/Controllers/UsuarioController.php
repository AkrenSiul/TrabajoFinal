<?php

namespace App\Controllers;

use App\Models\UsuarioModel;
use CodeIgniter\RESTful\ResourceController;

class UsuarioController extends ResourceController
{
    protected $session;
    protected $model;

    public function __construct() {
        $this->session = session();
        $this->model = new UsuarioModel();
    }
    public function login()
    {
        $data = $this->request->getJSON(true);
        $user = $this->model->getUserByUsuario($data['usuario']);

        if(!$user || !password_verify($data['contrasenya'], $user['contrasenya'])) {
            return $this->failUnauthorized('Credenciales incorrectas');
        }

        $this->session->set('usuario', [
            'id' => $user['id'],
            'usuario' => $user['usuario'],
            'rol' => $user['rol']
        ]);

        return $this->respond(['mensaje' => 'Bienvenido ', 'usuario' => $this->session->get('usuario')]);
    }

    public function registro()
    {
        $data = $this->request->getJSON(true);
        if(!$data['usuario'] || !$data['contrasenya']) {
            return $this->failValidationErrors('Faltan datos por rellenar');
        }
        if($this->model->getUserByUsuario($data['usuario'])) {
            return $this->failResourceExists('El usuario ya existe');
        }
        $this->model->save(
            [
                'usuario' => $data['usuario'],
                'contrasenya' => password_hash($data['contrasenya'], PASSWORD_DEFAULT),
                'rol' => 'usuario',
            ]
        );
        return $this->respondCreated(['mensaje' => 'Usuario registrado']);
    }

    public function logout()
    {
        $this->session->destroy();
        return $this->respond(['mensaje' => 'Sesión cerrada. Nos vemos']);
    }

    public function usuario()
    {
        $user = $this->session->get('usuario');
        if (!$user) {
            return $this->failUnauthorized('No hay sesión, pruebe a iniciarla.');
        }
        return $this->respond(['usuario' => $user]);
    }
    public function cambiarRol($id)
    {
        $usuarioSesion = $this->session->get('usuario');

        if (!$usuarioSesion || $usuarioSesion['rol'] !== 'superadmin')
        {
            return $this->failForbidden('Cambio no autorizado. Hable con el administrador de sistemas.');
        }

        $data = $this->request->getJSON(true);
        if (!in_array($data['rol'], ['superadmin', 'admin', 'usuario'])) {
            return $this->failValidationErrors('Rol no válido');
        }
        $this->model->update($id, ['rol' => $data['rol']]);
        return $this->respond(['mensaje' => 'Rol actualizado correctamente']);
    }
}