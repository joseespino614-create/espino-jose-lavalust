<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users List</title>
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
        padding: 40px 8%;
    }

    .container {
        max-width: 1100px;
        margin: 0 auto;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    h1 {
        font-size: 36px;
        letter-spacing: -1px;
    }

    .subtitle {
        color: #777;
        font-size: 14px;
        margin-top: 8px;
    }

    .home-btn {
        display: inline-block;
        padding: 12px 20px;
        border: 1px solid #33333d;
        border-radius: 8px;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: bold;
        transition: 0.3s;
    }

    .home-btn:hover {
        border-color: #2589ff;
        color: #2589ff;
        transform: translateY(-2px);
    }

    .table-card {
        background: #15151d;
        border: 1px solid #292933;
        border-radius: 16px;
        padding: 20px;
        overflow-x: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        color: #2589ff;
        background: #101017;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #292933;
    }

    td {
        padding: 15px;
        border-bottom: 1px solid #292933;
        color: #ddd;
        font-size: 14px;
    }

    tbody tr {
        transition: 0.2s;
    }

    tbody tr:hover {
        background: #1b1b25;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    .id {
        color: #2589ff;
        font-weight: bold;
    }

    .username {
        color: #fff;
        font-weight: bold;
    }

    footer {
        text-align: center;
        color: #555;
        padding: 30px;
        font-size: 12px;
    }

    @media (max-width: 700px) {

        body {
            padding: 30px 20px;
        }

        .top {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
        }

        .home-btn {
            width: 100%;
            text-align: center;
        }

        th, td {
            padding: 12px 10px;
        }
    }
</style>

</head>

<body>

<div class="container">

<div class="top">
    <div>
        <h1>Users List</h1>
        <p class="subtitle">Registered users in the system</p>
    </div>

    <a class="home-btn" href="<?= site_url('student') ?>">
        ← Back to Home
    </a>
</div>

<div class="table-card">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
            </tr>
        </thead>

        <tbody>
            <?php foreach ($users as $user): ?>
                <tr>
                    <td class="id"><?= htmlspecialchars($user['id']) ?></td>
                    <td><?= htmlspecialchars($user['firstname']) ?></td>
                    <td><?= htmlspecialchars($user['lastname']) ?></td>
                    <td><?= htmlspecialchars($user['email']) ?></td>
                    <td class="username"><?= htmlspecialchars($user['username']) ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
</div>

<footer>
    © 2026 — Built with LavaLust ✦
</footer>

</body>
</html>
