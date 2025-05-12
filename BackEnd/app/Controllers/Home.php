<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {

        echo env('CI_ENVIRONMENT');

        echo env('prueba.ambiente');
        return view('welcome_message');
    }
}
