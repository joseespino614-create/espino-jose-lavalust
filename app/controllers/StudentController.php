<?php

defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

class StudentController extends Controller
{
    public function index()
    {
        $_SESSION['student_access'] = true;

        $student = [
            'name' => 'Jose Fernando Espino',
            'course' => 'BS Information Technology',
            'student_id' => '00062',
            'year' => '3rd Year',
            'section' => 'F2',
            'email' => 'joseespino@gmail.com',
            'contact' => '09307004823'
        ];

        $this->call->view('student/index', ['student' => $student]);
    }

    public function profile()
    {
        $student = [
            'name' => 'Jose Fernando Espino',
            'course' => 'BS Information Technology',
            'student_id' => '00062',
            'year' => '3rd Year',
            'section' => 'F2',
            'email' => 'joseespino@gmail.com',
            'contact' => '09307004823'
        ];

        $this->call->view('student/profile', ['student' => $student]);
    }
}