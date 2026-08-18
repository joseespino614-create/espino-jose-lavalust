<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profile</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f4f6f8;
            color: #1f2937;
        }

        .navbar {
            background: #1f2937;
            padding: 18px 8%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            color: white;
            font-size: 20px;
            font-weight: bold;
        }

        .nav-links a {
            color: #d1d5db;
            text-decoration: none;
            margin-left: 25px;
            font-size: 14px;
        }

        .nav-links a:hover {
            color: white;
        }

        .container {
            max-width: 900px;
            margin: 60px auto;
            padding: 20px;
        }

        .profile {
            background: white;
            padding: 45px;
            border-radius: 14px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .profile-header {
            text-align: center;
            padding-bottom: 25px;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 30px;
        }

        .avatar {
            width: 85px;
            height: 85px;
            margin: 0 auto 18px;
            background: #1f2937;
            color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: bold;
        }

        .profile-header h1 {
            font-size: 28px;
            margin-bottom: 8px;
        }

        .profile-header p {
            color: #6b7280;
            font-size: 14px;
        }

        .profile-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }

        .info-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 18px;
        }

        .info-box.full {
            grid-column: 1 / -1;
        }

        .label {
            display: block;
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 7px;
        }

        .value {
            color: #111827;
            font-size: 15px;
            font-weight: bold;
        }

        .back-button {
            display: block;
            width: fit-content;
            margin: 30px auto 0;
            padding: 12px 22px;
            background: #1f2937;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
        }

        .back-button:hover {
            background: #374151;
        }

        footer {
            text-align: center;
            color: #9ca3af;
            font-size: 13px;
            margin-top: 40px;
        }

        @media (max-width: 600px) {
            .profile-info {
                grid-template-columns: 1fr;
            }

            .info-box.full {
                grid-column: auto;
            }

            .profile {
                padding: 25px;
            }

            .navbar {
                padding: 18px 5%;
            }
        }
    </style>
</head>

<body>

    <nav class="navbar">

        <div class="logo">
            Student Portal
        </div>

        <div class="nav-links">
            <a href="<?= site_url('student'); ?>">Home</a>
            <a href="<?= site_url('student/profile'); ?>">Profile</a>
        </div>

    </nav>

    <main class="container">

        <section class="profile">

            <div class="profile-header">

                <div class="avatar">
                    <?= strtoupper(substr($student['name'], 0, 1)); ?>
                </div>

                <h1><?= $student['name']; ?></h1>

                <p><?= $student['course']; ?></p>

            </div>

            <div class="profile-info">

                <div class="info-box">
                    <span class="label">Student ID</span>
                    <span class="value">
                        <?= $student['student_id']; ?>
                    </span>
                </div>

                <div class="info-box">
                    <span class="label">Year Level</span>
                    <span class="value">
                        <?= $student['year']; ?>
                    </span>
                </div>

                <div class="info-box">
                    <span class="label">Section</span>
                    <span class="value">
                        <?= $student['section']; ?>
                    </span>
                </div>

                <div class="info-box">
                    <span class="label">Course</span>
                    <span class="value">
                        <?= $student['course']; ?>
                    </span>
                </div>

                <div class="info-box">
                    <span class="label">Email</span>
                    <span class="value">
                        <?= $student['email']; ?>
                    </span>
                </div>

                <div class="info-box">
                    <span class="label">Contact Number</span>
                    <span class="value">
                        <?= $student['contact']; ?>
                    </span>
                </div>

            </div>

            <a class="back-button" href="<?= site_url('student'); ?>">
                ← Back to Student Home
            </a>

        </section>

        <footer>
            Student Information System
        </footer>

    </main>

</body>
</html>