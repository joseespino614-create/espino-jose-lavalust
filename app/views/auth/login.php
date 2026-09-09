<?php

defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Product Management</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #0d0d12;
            color: #f5f5f5;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .login-container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }

        .login-card {
            background: #15151d;
            border: 1px solid #292933;
            border-radius: 12px;
            padding: 35px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .login-title {
            text-align: center;
            margin-bottom: 8px;
            font-size: 28px;
        }

        .login-subtitle {
            text-align: center;
            color: #9999a5;
            font-size: 14px;
            margin-bottom: 30px;
        }

        .message {
            background: #21191a;
            border: 1px solid #593234;
            color: #ff8f8f;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 18px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #d6d6dc;
        }

        input {
            width: 100%;
            padding: 12px 14px;
            background: #0d0d12;
            border: 1px solid #292933;
            border-radius: 8px;
            color: #f5f5f5;
            font-size: 14px;
            outline: none;
        }

        input:focus {
            border-color: #2589ff;
        }

        input::placeholder {
            color: #666672;
        }

        .login-btn {
            width: 100%;
            padding: 12px;
            background: #2589ff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 8px;
        }

        .login-btn:hover {
            background: #1675e8;
        }

        .credentials {
            margin-top: 25px;
            padding: 14px;
            background: #0d0d12;
            border: 1px solid #292933;
            border-radius: 8px;
            font-size: 13px;
            color: #9999a5;
        }

        .credentials strong {
            color: #f5f5f5;
        }

        .credentials-title {
            color: #2589ff;
            font-weight: bold;
            margin-bottom: 8px;
        }

</style>
</head>

<body>

    <div class="login-container">


    <div class="login-card">

            <h1 class="login-title">Product Management</h1>

            <p class="login-subtitle">

            Login to access the product system
            </p>

            <?php if (isset($error)): ?>
                <div class="message">
                    <?= $error; ?>
                </div>
            <?php endif; ?>

            <?php if (isset($_SESSION['auth_message'])): ?>
                <div class="message">
                    <?= $_SESSION['auth_message']; ?>
                </div>

                <?php unset($_SESSION['auth_message']); ?>
            <?php endif; ?>

            <form action="<?= site_url('login/authenticate'); ?>" method="POST">

                <div class="form-group">
                    <label for="username">Username</label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter username"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="password">Password</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                    >
                </div>

                <button type="submit" class="login-btn">
                    Login
                </button>

            </form>

            <div class="credentials">
                <div class="credentials-title">
                    Laboratory Credentials
                </div>

                <div>
                    Username: <strong>admin</strong>
                </div>

                <div>
                    Password: <strong>admin123</strong>
                </div>
            </div>

        </div>

    </div>

</body>
</html>