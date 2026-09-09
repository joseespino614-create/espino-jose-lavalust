<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Edit Product</title>

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

        /* MAIN */

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

        .topbar p {
            color: #999;
            margin-top: 8px;
            font-size: 15px;
        }

        /* BACK BUTTON */

        .back-button {
            background: transparent;
            color: #ffffff;
            border: 1px solid #33333d;
            text-decoration: none;
            padding: 13px 20px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            transition: 0.3s;
        }

        .back-button:hover {
            border-color: #2589ff;
            color: #2589ff;
            transform: translateY(-2px);
        }

        /* FORM CARD */

        .card {
            background: #15151d;
            border: 1px solid #292933;
            max-width: 800px;
            padding: 35px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .form-group {
            margin-bottom: 22px;
        }

        label {
            display: block;
            color: #777;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 9px;
        }

        input,
        textarea {
            width: 100%;
            padding: 13px 15px;
            background: #0d0d12;
            color: #f5f5f5;
            border: 1px solid #33333d;
            border-radius: 8px;
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
            transition: 0.3s;
        }

        input:focus,
        textarea:focus {
            outline: none;
            border-color: #2589ff;
            box-shadow: 0 0 0 2px rgba(37, 137, 255, 0.08);
        }

        textarea {
            min-height: 130px;
            resize: vertical;
        }

        /* BUTTONS */

        .buttons {
            display: flex;
            gap: 10px;
            margin-top: 30px;
            padding-top: 25px;
            border-top: 1px solid #292933;
        }

        button,
        .cancel {
            padding: 13px 22px;
            border-radius: 8px;
            border: none;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            font-size: 14px;
            transition: 0.3s;
        }

        button {
            background: #ffffff;
            color: #0d0d12;
        }

        button:hover {
            background: #2589ff;
            color: #ffffff;
            transform: translateY(-2px);
        }

        .cancel {
            border: 1px solid #33333d;
            color: white;
            background: transparent;
        }

        .cancel:hover {
            border-color: #2589ff;
            color: #2589ff;
        }

        /* TABLET */

        @media (max-width: 768px) {

            .main {
                padding: 30px 20px;
            }

            .topbar h1 {
                font-size: 34px;
            }

            .card {
                padding: 25px;
            }
        }

        /* MOBILE */

        @media (max-width: 600px) {

            .topbar {
                flex-direction: column;
                align-items: flex-start;
                gap: 18px;
            }

            .back-button {
                width: 100%;
                text-align: center;
            }

            .buttons {
                flex-direction: column;
            }

            button,
            .cancel {
                width: 100%;
                text-align: center;
            }
        }
    </style>

</head>

<body>

    <!-- MAIN -->

    <main class="main">

        <div class="topbar">

            <div>

                <h1>
                    Edit Product
                </h1>

                <p>
                    Update the information of this product.
                </p>

            </div>

            <a
                href="<?= site_url('products'); ?>"
                class="back-button">
                ← Back
            </a>

        </div>


        <div class="card">

            <form
                action="<?= site_url('products/update/' . $product['id']); ?>"
                method="POST"
            >

                <div class="form-group">

                    <label for="product_name">
                        Product Name
                    </label>

                    <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        value="<?= htmlspecialchars($product['product_name']); ?>"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                    ><?= htmlspecialchars($product['description']); ?></textarea>

                </div>


                <div class="form-group">

                    <label for="price">
                        Price
                    </label>

                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        value="<?= htmlspecialchars($product['price']); ?>"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="quantity">
                        Quantity
                    </label>

                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        value="<?= htmlspecialchars($product['quantity']); ?>"
                        required
                    >

                </div>


                <div class="buttons">

                    <button type="submit">
                        Update Product
                    </button>

                    <a
                        href="<?= site_url('products'); ?>"
                        class="cancel">
                        Cancel
                    </a>

                </div>

            </form>

        </div>

    </main>

</body>

</html>