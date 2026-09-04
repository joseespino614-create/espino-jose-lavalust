<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Home</title>

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

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 22px 8%;
            border-bottom: 1px solid #252530;
        }

        .logo {
            font-size: 20px;
            font-weight: bold;
        }

        nav a {
            color: #aaa;
            text-decoration: none;
            margin-left: 25px;
            font-size: 14px;
            transition: 0.3s;
        }

        nav a:hover {
            color: #2589ff;
        }

        .hero {
            width: 84%;
            max-width: 1100px;
            margin: 80px auto;
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 50px;
            align-items: center;
        }

        .tag {
            display: inline-block;
            background: #151922;
            color: #ffffff;
            border: 1px solid #303947;
            padding: 8px 14px;
            border-radius: 50px;
            font-size: 13px;
            margin-bottom: 20px;
        }

        h1 {
            font-size: clamp(45px, 7vw, 78px);
            line-height: 0.95;
            letter-spacing: -4px;
        }

        h1 span {
            color: #2589ff;
        }

        .description {
            color: #999;
            font-size: 17px;
            line-height: 1.7;
            margin-top: 25px;
            max-width: 600px;
        }

        .buttons {
            margin-top: 35px;
        }

        .btn {
            display: inline-block;
            padding: 13px 22px;
            margin-right: 10px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            transition: 0.3s;
        }

        .primary {
            background: #ffffff;
            color: #0d0d12;
        }

        .primary:hover {
            background: #2589ff;
            color: #ffffff;
            transform: translateY(-3px);
        }

        .secondary {
            border: 1px solid #33333d;
            color: white;
        }

        .secondary:hover {
            border-color: #2589ff;
            color: #2589ff;
        }

        .card {
            background: #15151d;
            border: 1px solid #292933;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .status {
            color: #2589ff;
            font-size: 12px;
        }

        .info {
            margin-bottom: 20px;
        }

        .label {
            color: #777;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .value {
            margin-top: 5px;
            font-size: 16px;
        }

        .contact {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #292933;
        }

        .contact-number {
            margin-top: 10px;
            color: #ffffff;
            font-size: 15px;
        }

        footer {
            text-align: center;
            color: #555;
            padding: 30px;
            font-size: 12px;
        }

        @media (max-width: 800px) {

            .hero {
                grid-template-columns: 1fr;
                margin-top: 50px;
            }

            nav {
                padding: 20px;
            }

            nav div:last-child {
                display: none;
            }
        }
    </style>
</head>

<body>
<?php if (isset($_SESSION['middleware_message'])): ?>
    <div style="
        width: 84%;
        max-width: 1100px;
        margin: 25px auto 0;
        padding: 15px 20px;
        background: #2a1515;
        border: 1px solid #8b3030;
        border-radius: 8px;
        color: #ff7b7b;
        font-size: 14px;
    ">
        <?= $_SESSION['middleware_message']; ?>
    </div>
    <?php unset($_SESSION['middleware_message']); ?>
<?php endif; ?>
<nav>
    <div class="logo">
        JOWSEEWHY
    </div>
    <div>
        <a href="<?= site_url('student') ?>">Home</a>
        <a href="<?= site_url('student/profile') ?>">Profile</a>
    </div>
</nav>
<section class="hero">
    <div>
        <div class="tag">
            CY
        </div>
        <h1>
            ILOVE<br>
            <span>JOWSEEWHY</span>
        </h1>
        <p class="description">
            A quick look at my student information and contact details.
        </p>
        <div class="buttons">
            <a class="btn primary" href="<?= site_url('student/profile') ?>">
                View My Profile →
            </a>
            <a class="btn secondary" href="<?= site_url('student/profile') ?>">
                Student Details
            </a>
            <a class="btn secondary" href="<?= site_url('users') ?>">
                Users List
            </a>

        </div>

    </div>


    <div class="card">

        <div class="card-header">

            <strong>
                Basic Info
            </strong>

            <span class="status">
                ● Student
            </span>

        </div>


        <div class="info">

            <div class="label">
                Name
            </div>

            <div class="value">
                Jose Fernando Espino
            </div>

        </div>


        <div class="info">

            <div class="label">
                Student ID
            </div>

            <div class="value">
                00062
            </div>

        </div>


        <div class="info">

            <div class="label">
                Course
            </div>

            <div class="value">
                BS Information Technology
            </div>

        </div>


        <div class="info">

            <div class="label">
                Year Level
            </div>

            <div class="value">
                3rd Year
            </div>

        </div>


        <div class="info">

            <div class="label">
                Section
            </div>

            <div class="value">
                F2
            </div>

        </div>


        <div class="info">

            <div class="label">
                Email
            </div>

            <div class="value">
                joseespino@gmail.com
            </div>

        </div>


        <div class="contact">

            <div class="label">
                Contact Number
            </div>

            <div class="contact-number">
                09307004823
            </div>

        </div>

    </div>

</section>


<footer>
    © 2026 — Built with LavaLust ✦
</footer>

</body>
</html>