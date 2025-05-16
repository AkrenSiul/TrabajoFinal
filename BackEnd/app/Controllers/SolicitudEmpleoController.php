<?php

namespace App\Controllers;

use App\Models\SolicitudEmpleoModel;
use CodeIgniter\RESTful\ResourceController;

class SolicitudEmpleoController extends ResourceController
{
    protected $model;

    public function __construct() {
        $this->model = new SolicitudEmpleoModel();
    }

    public function getSolicitudEmpleos()
    {
        $solicitudes = $this->model->findAll();

        foreach ($solicitudes as &$solicitud) {
            if (!empty($solicitud['cv_archivo'])) {
                $solicitud['cv_url'] = base_url('api/solicitudes-empleo/' . $solicitud['id'] . '/cv');
            } else {
                $solicitud['cv_url'] = null;
            }
        }
        return $this->respond($solicitudes);
    }

    public function getSolicitudEmpleo($id = null) {
        $solicitud = $this->model->find($id);
        if (!$solicitud) {
            return $this->failNotFound('Solicitud no encontrada');
        }

        return $this->respond($solicitud);
    }

    public function createSolicitudEmpleo()
    {
        helper(['form']);

        $solicitudEmpleo = [
            'nombre'      => 'required',
            'email'       => 'required|valid_email',
            'mensaje'     => 'permit_empty',
            'cv_archivo'  => 'uploaded[cv_archivo]|ext_in[cv_archivo,pdf,doc,docx]|max_size[cv_archivo,2048]'
        ];

        if (! $this->validate($solicitudEmpleo)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $archivoCV = $this->request->getFile('cv_archivo');
        $nombreArchivo = $archivoCV->getRandomName();

        $cvPath = FCPATH . 'cv/';
        if (!is_dir($cvPath)) {
            mkdir($cvPath, 0755, true);
        }

        $archivoCV->move($cvPath, $nombreArchivo);

        $data = [
            'nombre'       => $this->request->getPost('nombre'),
            'email'        => $this->request->getPost('email'),
            'mensaje'      => $this->request->getPost('mensaje'),
            'cv_archivo'   => $nombreArchivo,
            'fecha_envio'  => date('Y-m-d H:i:s')
        ];

        $this->model->insert($data);

        return $this->respondCreated([
            'mensaje' => 'Solicitud enviada correctamente',
            'datos'   => $data
        ]);
    }
    public function deleteSolicitud($id = null)
    {
        $solicitud = $this->model->find($id);

        if (!$solicitud) {
            return $this->failNotFound('Solicitud no encontrada');
        }
        $ruta = FCPATH . 'cv/' . $solicitud['cv_archivo'];
        if (file_exists($ruta)) {
            unlink($ruta);
        }
        $this->model->delete($id);

        return $this->respondDeleted(['mensaje' => 'Solicitud y CV eliminados correctamente']);
    }
    public function descargarCV($id)
    {
        $solicitud = $this->model->find($id);
        if (!$solicitud || empty($solicitud['cv_archivo'])) {
            return $this->failNotFound('CV no encontrado');
        }

        $ruta = FCPATH . 'cv/' . $solicitud['cv_archivo'];
        if (!file_exists($ruta)) {
            return $this->failNotFound('El archivo no existe en el servidor');
        }

        return $this->response->download($ruta, null);
    }

}