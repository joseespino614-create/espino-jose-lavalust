<?php
defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');
/**
 * ------------------------------------------------------------------
 * LavaLust - an opensource lightweight PHP MVC Framework
 * ------------------------------------------------------------------
 *
 * MIT License
 *
 * Copyright (c) 2020 Ronald M. Marasigan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package LavaLust
 * @author Ronald M. Marasigan <ronald.marasigan@yahoo.com>
 * @since Version 1
 * @link https://github.com/ronmarasigan/LavaLust
 * @license https://opensource.org/licenses/MIT MIT License
 */

/*
| -------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------
| Here is where you can register web routes for your application.
|
|
*/
/** @var object $router **/

$router->get('/', 'StudentController::index');

$router->get('/student', 'StudentController::index');

$router->get('/student/profile', 'StudentController::profile')
       ->middleware('student');
$router->get('/users', 'UsersController::index');

$router->get('/login', 'AuthController::login');

$router->post('/login/authenticate', 'AuthController::authenticate');

$router->get('/logout', 'AuthController::logout');

$router->get('/products', 'ProductController::index')
       ->middleware('auth');

$router->get('/products/create', 'ProductController::create')
       ->middleware('auth');

$router->post('/products/store', 'ProductController::store')
       ->middleware('auth');

$router->get('/products/edit/{id}', 'ProductController::edit')
       ->middleware('auth');

$router->post('/products/update/{id}', 'ProductController::update')
       ->middleware('auth');

$router->get('/products/delete/{id}', 'ProductController::delete')
       ->middleware('auth');


// Lab 6 API Routes
$router->get('/api', 'ApiController::login');
$router->post('/api/logout', 'ApiController::logout');
$router->get('/api/me', 'ApiController::me');

// Products API CRUD
$router->get('/api/products', 'ApiController::get_products');
$router->get('/api/products/{id}', 'ApiController::get_product');
$router->post('/api/products', 'ApiController::create_product');
$router->put('/api/products/{id}', 'ApiController::update_product');
$router->patch('/api/products/{id}', 'ApiController::update_product');
$router->delete('/api/products/{id}', 'ApiController::delete_product');

// Fallback POST routes for environments where PUT/DELETE are blocked
$router->post('/api/products/update/{id}', 'ApiController::update_product');
$router->post('/api/products/delete/{id}', 'ApiController::delete_product');


       // Migration Routes
$router->get('create-migration/{migration_class}', 'MigrationController::create_migration');
$router->get('migrate', 'MigrationController::migrate');
$router->get('rollback', 'MigrationController::rollback');
$router->get('rollback-all', 'MigrationController::rollback_all');
$router->get('refresh', 'MigrationController::refresh');
$router->get('status', 'MigrationController::status');
