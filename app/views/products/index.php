<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Product Management</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #0d0d12;
            color: #f5f5f5;
            min-height: 100vh;
        }

        .layout {
            display: flex;
            min-height: 100vh;
        }

        /* SIDEBAR */

        .sidebar {
            width: 240px;
            background: #111118;
            border-right: 1px solid #252530;
            color: white;
            padding: 25px 15px;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;

            display: flex;
            flex-direction: column;
        }

        .logo {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 35px;
        }

        .menu-title {
            font-size: 11px;
            color: #666;
            margin: 25px 10px 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .sidebar a {
            display: block;
            color: #999;
            text-decoration: none;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 5px;
            font-size: 14px;
            transition: 0.3s;
        }

        .sidebar a:hover,
        .sidebar a.active {
            background: #151922;
            color: #2589ff;
            border: 1px solid #303947;
        }

        /* SIDEBAR BOTTOM */

        .sidebar-bottom {
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid #292933;
        }

        .student-home {
            color: #ffffff !important;
        }

        .student-home:hover {
            color: #2589ff !important;
        }

        /* MAIN CONTENT */

        .main {
            margin-left: 240px;
            width: calc(100% - 240px);
            padding: 50px;
        }

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .topbar h1 {
            font-size: 42px;
            letter-spacing: -1px;
        }

        .add-button {
            background: #ffffff;
            color: #0d0d12;
            text-decoration: none;
            padding: 13px 20px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            transition: 0.3s;
        }

        .add-button:hover {
            background: #2589ff;
            color: #ffffff;
            transform: translateY(-2px);
        }

        /* CARD */

        .card {
            background: #15151d;
            border: 1px solid #292933;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .card-header {
            margin-bottom: 25px;
        }

        .card-header h2 {
            font-size: 20px;
        }

        .card-header p {
            color: #999;
            margin-top: 7px;
            font-size: 14px;
        }

        /* TABLE */

        .table-wrapper {
            overflow-x: auto;
            border: 1px solid #292933;
            border-radius: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 850px;
        }

        th,
        td {
            padding: 15px;
            border-bottom: 1px solid #292933;
            text-align: left;
        }

        th {
            background: #111118;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #777;
        }

        td {
            color: #ddd;
            font-size: 14px;
        }

        tbody tr:last-child td {
            border-bottom: none;
        }

        tbody tr {
            transition: 0.2s;
        }

        tbody tr:hover {
            background: #191922;
        }

        /* ACTION BUTTONS */

        .actions {
            display: flex;
            gap: 8px;
        }

        .edit,
        .delete {
            padding: 7px 12px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 12px;
            font-weight: bold;
            transition: 0.3s;
        }

        .edit {
            background: #151922;
            color: #2589ff;
            border: 1px solid #303947;
        }

        .delete {
            background: #211518;
            color: #ff6b6b;
            border: 1px solid #4a2727;
        }

        .edit:hover {
            background: #2589ff;
            color: #ffffff;
            border-color: #2589ff;
        }

        .delete:hover {
            background: #8b3030;
            color: #ffffff;
            border-color: #8b3030;
        }

        /* MOBILE */

        @media (max-width: 768px) {

            .sidebar {
                width: 200px;
            }

            .main {
                margin-left: 200px;
                width: calc(100% - 200px);
                padding: 30px 20px;
            }

            .topbar {
                flex-direction: column;
                align-items: flex-start;
                gap: 18px;
            }

            .topbar h1 {
                font-size: 34px;
            }

            .card {
                padding: 20px;
            }
        }

        @media (max-width: 600px) {

            .layout {
                display: block;
            }

            .sidebar {
                position: relative;
                width: 100%;
                height: auto;
                border-right: none;
                border-bottom: 1px solid #252530;
            }

            .main {
                margin-left: 0;
                width: 100%;
                padding: 30px 20px;
            }

            .add-button {
                width: 100%;
                text-align: center;
            }

            .card {
                padding: 18px;
            }

            .sidebar-bottom {
                margin-top: 20px;
            }
        }
    </style>

</head>

<body>

    <div class="layout">

        <!-- SIDEBAR -->

        <aside class="sidebar">

            <div class="logo">
                Product System
            </div>

            <div class="menu-title">
                Main
            </div>

            <a href="<?= site_url('products'); ?>" class="active">
                📦 Products
            </a>

            <a href="<?= site_url('products/create'); ?>">
                ➕ Add Product
            </a>

            <div class="menu-title">
                System
            </div>

            <a href="#">
                👤 Users
            </a>

            <a href="#">
                ⚙️ Settings
            </a>


            <!-- BOTTOM NAVIGATION -->

            <div class="sidebar-bottom">

                <a href="<?= site_url('student'); ?>" class="student-home">
                    🏠 Student Home
                </a>

                <a href="#">
                    🚪 Logout
                </a>

            </div>

        </aside>


        <!-- MAIN CONTENT -->

        <main class="main">

            <div class="topbar">

                <div>
                    <h1>
                        Products
                    </h1>
                </div>

                <a href="<?= site_url('products/create'); ?>" class="add-button">
                    + Add Product
                </a>

            </div>


            <div class="card">

                <div class="card-header">

                    <h2>
                        Product Management
                    </h2>

                    <p>
                        Manage your products, inventory, prices and quantities.
                    </p>

                </div>


                <div class="table-wrapper">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            <?php foreach ($products as $product): ?>

                                <tr>

                                    <td>
                                        <?= htmlspecialchars($product['id']) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars($product['product_name']) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars($product['description']) ?>
                                    </td>

                                    <td>
                                        ₱<?= htmlspecialchars($product['price']) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars($product['quantity']) ?>
                                    </td>

                                    <td>
                                        <?= htmlspecialchars($product['created_at']) ?>
                                    </td>

                                    <td>

                                        <div class="actions">

                                            <a href="<?= site_url('products/edit/' . $product['id']); ?>" class="edit">
                                                Edit
                                            </a>

                                            <a href="<?= site_url('products/delete/' . $product['id']); ?>"
                                                class="delete"
                                                onclick="return confirm('Are you sure you want to delete this product?');">
                                                Delete
                                            </a>

                                        </div>

                                    </td>

                                </tr>

                            <?php endforeach; ?>

                        </tbody>

                    </table>

                </div>

            </div>

        </main>

    </div>

</body>

</html>