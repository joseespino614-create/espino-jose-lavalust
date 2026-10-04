<?php
defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

class ApiController extends Controller
{
    private $api;

    public function __construct()
{
    parent::__construct();

    // Initialize API library first so LavaLust can handle CORS.
    $this->api = $this->call->library('api');

    $this->call->database();
    $this->call->model('ProductModel');
}
    /*
    |--------------------------------------------------------------------------
    | AUTHENTICATION: LOGIN
    |--------------------------------------------------------------------------
    */
    public function login()
    {
        $this->api->require_method('POST');

        $data = $this->api->body();

        $username = trim($data['username'] ?? '');
        $password = trim($data['password'] ?? '');

        if (empty($username) || empty($password)) {
            $this->api->respond_error('Username and password are required.', 400);
        }

        $user = $this->db
            ->table('auth_users')
            ->where('username', $username)
            ->get();

        if (!$user) {
            $this->api->respond_error('Invalid username or password.', 401);
        }

        $user_id       = is_array($user) ? $user['id'] : $user->id;
        $user_username = is_array($user) ? $user['username'] : $user->username;
        $user_password = is_array($user) ? $user['password'] : $user->password;

        if (!password_verify($password, $user_password)) {
            $this->api->respond_error('Invalid username or password.', 401);
        }

        $payload = [
            'sub'      => (string) $user_id,
            'user_id'  => (int) $user_id,
            'username' => $user_username,
            'type'     => 'access'
        ];

        $token = $this->api->encode_jwt($payload);

        $this->api->respond([
            'success' => true,
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => [
                'id'       => (int) $user_id,
                'username' => $user_username
            ]
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | AUTHENTICATION: LOGOUT
    |--------------------------------------------------------------------------
    */
    public function logout()
    {
        $this->api->respond([
            'success' => true,
            'message' => 'Logged out successfully.'
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | AUTHENTICATION: ME
    |--------------------------------------------------------------------------
    */
    public function me()
    {
        $payload = $this->api->require_jwt();

        $this->api->respond([
            'success' => true,
            'user'    => [
                'id'       => (int) ($payload['user_id'] ?? $payload['sub'] ?? 0),
                'username' => $payload['username'] ?? 'User'
            ]
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT CRUD: READ ALL (GET /api/products)
    |--------------------------------------------------------------------------
    */
    public function get_products()
    {
        $this->api->require_jwt();

        $products = $this->db
            ->table('products')
            ->order_by('id', 'DESC')
            ->get_all();

        $this->api->respond([
            'success' => true,
            'count'   => count($products),
            'data'    => $products
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT CRUD: READ SINGLE (GET /api/products/{id})
    |--------------------------------------------------------------------------
    */
    public function get_product($id)
    {
        $this->api->require_jwt();

        $product = $this->ProductModel->find($id);

        if (!$product) {
            $this->api->respond_error('Product not found.', 404);
        }

        $this->api->respond([
            'success' => true,
            'data'    => $product
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT CRUD: CREATE (POST /api/products)
    |--------------------------------------------------------------------------
    */
    public function create_product()
    {
        $this->api->require_jwt();
        $this->api->require_method('POST');

        $data = $this->api->body();

        $product_name = trim($data['product_name'] ?? '');
        $description  = trim($data['description'] ?? '');
        $price        = $data['price'] ?? null;
        $quantity     = $data['quantity'] ?? null;

        if (empty($product_name)) {
            $this->api->respond_error('Product name is required.', 400);
        }

        if ($price === null || !is_numeric($price) || $price < 0) {
            $this->api->respond_error('Price must be a valid positive number.', 400);
        }

        if ($quantity === null || !is_numeric($quantity) || $quantity < 0) {
            $this->api->respond_error('Quantity must be a valid positive integer.', 400);
        }

        $insert_data = [
            'product_name' => $product_name,
            'description'  => $description,
            'price'        => number_format((float)$price, 2, '.', ''),
            'quantity'     => (int) $quantity
        ];

        $inserted = $this->ProductModel->insert($insert_data);

        if (!$inserted) {
            $this->api->respond_error('Failed to create product.', 500);
        }

        $new_id = $this->db->last_id();
        $created_product = $this->ProductModel->find($new_id);

        $this->api->respond([
            'success' => true,
            'message' => 'Product created successfully.',
            'data'    => $created_product
        ], 201);
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT CRUD: UPDATE (PUT/PATCH /api/products/{id})
    |--------------------------------------------------------------------------
    */
    public function update_product($id)
    {
        $this->api->require_jwt();

        $existing = $this->ProductModel->find($id);

        if (!$existing) {
            $this->api->respond_error('Product not found.', 404);
        }

        $data = $this->api->body();

        $product_name = isset($data['product_name']) ? trim($data['product_name']) : (is_array($existing) ? $existing['product_name'] : $existing->product_name);
        $description  = isset($data['description']) ? trim($data['description']) : (is_array($existing) ? $existing['description'] : $existing->description);
        $price        = isset($data['price']) ? $data['price'] : (is_array($existing) ? $existing['price'] : $existing->price);
        $quantity     = isset($data['quantity']) ? $data['quantity'] : (is_array($existing) ? $existing['quantity'] : $existing->quantity);

        if (empty($product_name)) {
            $this->api->respond_error('Product name cannot be empty.', 400);
        }

        if (!is_numeric($price) || $price < 0) {
            $this->api->respond_error('Price must be a valid positive number.', 400);
        }

        if (!is_numeric($quantity) || $quantity < 0) {
            $this->api->respond_error('Quantity must be a valid positive integer.', 400);
        }

        $update_data = [
            'product_name' => $product_name,
            'description'  => $description,
            'price'        => number_format((float)$price, 2, '.', ''),
            'quantity'     => (int) $quantity
        ];

        $this->ProductModel->update($id, $update_data);

        $updated_product = $this->ProductModel->find($id);

        $this->api->respond([
            'success' => true,
            'message' => 'Product updated successfully.',
            'data'    => $updated_product
        ], 200);
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT CRUD: DELETE (DELETE /api/products/{id})
    |--------------------------------------------------------------------------
    */
    public function delete_product($id)
    {
        $this->api->require_jwt();

        $existing = $this->ProductModel->find($id);

        if (!$existing) {
            $this->api->respond_error('Product not found.', 404);
        }

        $deleted = $this->ProductModel->delete($id);

        if (!$deleted) {
            $this->api->respond_error('Failed to delete product.', 500);
        }

        $this->api->respond([
            'success' => true,
            'message' => 'Product deleted successfully.'
        ], 200);
    }
}