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
            margin: 70px auto;
            padding: 20px;
        }

        .message {
            background: #fff7ed;
            border: 1px solid #fed7aa;
            color: #9a3412;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            text-align: center;
        }

        .welcome {
            background: white;
            padding: 45px;
            border-radius: 14px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .welcome h1 {
            font-size: 32px;
            margin-bottom: 12px;
        }

        .welcome p {
            color: #6b7280;
            margin-bottom: 30px;
        }

        .student-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 25px;
            text-align: left;
            margin-top: 25px;
        }

        .student-card p {
            margin: 12px 0;
            color: #374151;
        }

        .student-card strong {
            color: #111827;
        }

        .button {
            display: inline-block;
            background: #1f2937;
            color: white;
            text-decoration: none;
            padding: 12px 22px;
            border-radius: 8px;
            font-size: 14px;
        }

        .button:hover {
            background: #374151;
        }

        footer {
            text-align: center;
            color: #9ca3af;
            font-size: 13px;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">Student Portal</div>
        <div class="nav-links">
            <a href="<?= site_url('student'); ?>">Home</a>
            <a href="<?= site_url('student/profile'); ?>">Profile</a>
        </div>
    </nav>
    <main class="container">
        <?php if (isset($_SESSION['middleware_message'])): ?>
            <div class="message">
                <?= $_SESSION['middleware_message']; ?>
            </div>
            <?php unset($_SESSION['middleware_message']); ?>
        <?php endif; ?>
        <section class="welcome">
            <h1>Welcome, <?= $student['name']; ?>!</h1>
            <p>
                Welcome to your student information page.
            </p>
            <div class="student-card">
                <p><strong>Student ID:</strong> <?= $student['student_id']; ?></p>
                <p><strong>Course:</strong> <?= $student['course']; ?></p>
                <p><strong>Year:</strong> <?= $student['year']; ?></p>
                <p><strong>Section:</strong> <?= $student['section']; ?></p>
                <p><strong>Email:</strong> <?= $student['email']; ?></p>
                <p><strong>Contact Number:</strong> <?= $student['contact']; ?></p>
            </div>
            <br>
            <a class="button" href="<?= site_url('student/profile'); ?>">
                View Student Profile
            </a>
        </section>
        <footer>
            Student Information System
        </footer>
    </main>
</body>
</html>