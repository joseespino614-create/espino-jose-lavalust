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
            font-family: Arial, Helvetica, sans-serif;
            background: #05070a;
            color: #ffffff;
            min-height: 100vh;
        }

        nav {
            height: 75px;
            padding: 0 7%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #080b10;
            border-bottom: 1px solid #18202b;
        }

        .logo {
            font-size: 19px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        nav a {
            color: #8993a1;
            text-decoration: none;
            margin-left: 30px;
            font-size: 14px;
            transition: 0.3s;
        }

        nav a:hover {
            color: #2589ff;
        }

        .wrapper {
            width: 88%;
            max-width: 1050px;
            margin: 60px auto;
        }

        .intro {
            margin-bottom: 35px;
        }

        .intro-label {
            color: #2589ff;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 12px;
        }

        .intro h1 {
            font-size: 46px;
            line-height: 1.1;
            letter-spacing: -2px;
        }

        .intro p {
            color: #727c89;
            margin-top: 12px;
            font-size: 15px;
        }

        .profile-card {
            display: grid;
            grid-template-columns: 300px 1fr;
            background: #0b0f14;
            border: 1px solid #1c2633;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
        }

        .profile-side {
            background: #080b10;
            padding: 40px 30px;
            border-right: 1px solid #1c2633;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .avatar-container {
            text-align: center;
        }

        .avatar {
            width: 120px;
            height: 120px;
            margin: 0 auto 22px;
            border-radius: 50%;
            background: #2589ff;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            font-weight: bold;
            box-shadow: 0 0 0 8px #101923;
        }

        .side-name {
            font-size: 21px;
            font-weight: bold;
        }

        .side-course {
            color: #687383;
            font-size: 13px;
            margin-top: 7px;
            line-height: 1.5;
        }

        .student-status {
            margin-top: 20px;
            display: inline-block;
            padding: 7px 14px;
            border: 1px solid #2589ff;
            border-radius: 30px;
            color: #2589ff;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .side-bottom {
            margin-top: 45px;
            color: #566170;
            font-size: 12px;
            line-height: 1.7;
            text-align: center;
        }

        .profile-content {
            padding: 40px;
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 25px;
        }

        .section-title::before {
            content: "";
            width: 4px;
            height: 25px;
            background: #2589ff;
            border-radius: 5px;
        }

        .section-title h2 {
            font-size: 19px;
        }

        .details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
        }

        .detail {
            background: #070a0e;
            border: 1px solid #1a2430;
            padding: 22px;
            border-radius: 12px;
            transition: 0.3s;
        }

        .detail:hover {
            border-color: #2589ff;
            transform: translateY(-2px);
        }

        .label {
            color: #5e6977;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .value {
            color: #f5f7fa;
            margin-top: 9px;
            font-size: 15px;
            word-break: break-word;
        }

        .contact {
            margin-top: 35px;
            padding-top: 30px;
            border-top: 1px solid #1c2633;
        }

        .contact-item {
            background: #070a0e;
            border: 1px solid #1a2430;
            border-radius: 10px;
            padding: 18px;
        }

        .contact-item span {
            display: block;
            color: #5e6977;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 7px;
        }

        .contact-item strong {
            font-size: 14px;
            color: #e8edf3;
        }

        .back {
            display: inline-flex;
            align-items: center;
            margin-top: 25px;
            padding: 11px 18px;
            border: 1px solid #263342;
            border-radius: 8px;
            color: #8993a1;
            text-decoration: none;
            font-size: 13px;
            transition: 0.3s;
        }

        .back:hover {
            color: #ffffff;
            border-color: #2589ff;
        }

        @media (max-width: 800px) {

            .profile-card {
                grid-template-columns: 1fr;
            }

            .profile-side {
                border-right: none;
                border-bottom: 1px solid #1c2633;
            }

            .side-bottom {
                margin-top: 25px;
            }
        }

        @media (max-width: 600px) {

            nav {
                padding: 0 5%;
            }

            nav a {
                margin-left: 15px;
            }

            .wrapper {
                width: 92%;
                margin: 40px auto;
            }

            .intro h1 {
                font-size: 36px;
            }

            .profile-content {
                padding: 25px;
            }

            .details {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

<nav>

    <div class="logo">
        JOWSEEWHY
    </div>

    <div>
        <a href="/LavaLust/student">Home</a>
        <a href="/LavaLust/student/profile">Profile</a>
    </div>

</nav>


<div class="wrapper">

    <div class="intro">

        <div class="intro-label">
            Student Portfolio
        </div>

        <h1>
            My Profile
        </h1>
    </div>


    <div class="profile-card">

        <div class="profile-side">

            <div class="avatar-container">

                <div class="avatar">
                    JE
                </div>

                <div class="side-name">
                    Jose Fernando Espino
                </div>

                <div class="side-course">
                    BS Information Technology
                </div>

                <div class="student-status">
                    ● ACTIVE STUDENT
                </div>

            </div>

            <div class="side-bottom">
                STUDENT PROFILE<br>
            </div>

        </div>


        <div class="profile-content">

            <div class="section-title">
                <h2>Academic Information</h2>
            </div>


            <div class="details">

                <div class="detail">

                    <div class="label">
                        Student ID
                    </div>

                    <div class="value">
                        00062
                    </div>

                </div>


                <div class="detail">

                    <div class="label">
                        Year Level
                    </div>

                    <div class="value">
                        3rd Year
                    </div>

                </div>


                <div class="detail">

                    <div class="label">
                        Section
                    </div>

                    <div class="value">
                        F2
                    </div>

                </div>


                <div class="detail">

                    <div class="label">
                        Email Address
                    </div>

                    <div class="value">
                        joseespino@gmail.com
                    </div>

                </div>

            </div>


            <div class="contact">

                <div class="section-title">
                    <h2>Contact Information</h2>
                </div>

                <div class="contact-item">

                    <span>
                        Mobile Number
                    </span>

                    <strong>
                        09307004823
                    </strong>

                </div>

            </div>

        </div>

    </div>


    <a class="back" href="/LavaLust/student">
        ← Back to Home
    </a>    

</div>

</body>
</html>