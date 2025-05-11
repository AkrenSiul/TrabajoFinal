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

        if (!$data || !isset($data['usuario'], $data['contrasenya'])) {
            return $this->failValidationErrors('Faltan datos');
        }

        $usuarioModel = new UsuarioModel();
        $user = $usuarioModel->getUserByUsuario($data['usuario']);

        if (!$user) {
            return $this->failNotFound('Usuario no encontrado');
        }

        if (!password_verify($data['contrasenya'], $user['contrasenya'])) {
            return $this->failUnauthorized('Contraseña incorrecta');
        }


        // FUNCIONA
        /*
        $this->session->set('usuario', [
            'id' => $user['id'],
            'usuario' => $user['usuario'],
            'rol' => $user['rol']
        ]);
        return $this->respond($this->session->get('usuario'));
        */

        // Obtener los datos de todo lo que contiene.
        $data = [
            'id' => $user['id'],
            'usuario' => $user['usuario'],
            'rol' => $user['rol']
        ];
        return $this->respond(['usuario' => $data]);
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
                'email' => $data['email'] | '',
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

    // El usuario que usamos
    public function usuario()
    {
        $user = $this->session->get('usuario');
        /*
        if (!$user) {
            return $this->failUnauthorized('No hay sesión, pruebe a iniciarla.');
        }*/
        return $this->respond(['usuario' => $user]);
    }

    // Lista de usuarios
    public function getUsuarios() {
        $usuarios = $this->model->findAll();

        $usuarios = array_map(function($u) {
            unset($u['contrasenya']);
            return $u;
        }, $usuarios);

        return $this->respond($usuarios);
    }

    public function deleteUsuario($id) {
        if($this->model->find($id)) {
            $this->model->delete($id);
            return $this->respond('Usuario eliminado');
        }
        return $this->failNotFound('Usuario no encontrado. Fallo al eliminar');
    }
    public function updateUsuario($id) {
        $data = $this->request->getJSON(true);
        if($this->model->find($id)) {
            if (!empty($data['contrasenya'])) {
                $data['contrasenya'] = password_hash($data['contrasenya'], PASSWORD_DEFAULT);
            } else {
                unset($data['contrasenya']);
            }
        $this->model->update($id, $data);
        return $this->respond('Usuario modificado');
    }
        return $this->failNotFound('Usuario no encontrado. Fallo al modificar');
    }


   /* CAMBIAR ROL FUNCIONAL
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
   */


}