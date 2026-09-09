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

        /* MAIN CONTENT */

        .main {
            width: 100%;
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

        /* TOP RIGHT BUTTONS */

        .topbar-buttons {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .back-button,
        .add-button {
            text-decoration: none;
            padding: 13px 20px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            transition: 0.3s;
        }

        .back-button {
            background: transparent;
            color: #ffffff;
            border: 1px solid #33333d;
        }

        .back-button:hover {
            border-color: #2589ff;
            color: #2589ff;
            transform: translateY(-2px);
        }

        .add-button {
            background: #ffffff;
            color: #0d0d12;
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

            .main {
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

            .topbar-buttons {
                width: 100%;
                flex-direction: column-reverse;
            }

            .back-button,
            .add-button {
                width: 100%;
                text-align: center;
            }

            .card {
                padding: 18px;
            }
        }
    </style>

</head>

<body>

    <!-- MAIN CONTENT -->

    <main class="main">

        <div class="topbar">

            <div>
                <h1>
                    Products
                </h1>
            </div>

            <div class="topbar-buttons">

                <a href="<?= site_url('student'); ?>" class="back-button">
                    ← Back
                </a>

                <a href="<?= site_url('products/create'); ?>" class="add-button">
                    + Add Product
                </a>

            </div>

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

</body>

</html>