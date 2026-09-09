<?php
defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

/**
 * Controller: CRUDController
 * 
 * Automatically generated via CLI.
 */
class CRUDController extends Controller {
    public function __construct()
    {
        parent::__construct();
    }
    public function Cruders()
    {
        $this->call->view('Crud');
        $this->request->is_post();
    }
}