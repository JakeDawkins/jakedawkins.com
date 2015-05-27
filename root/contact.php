<?php require_once 'Path.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Jake Dawkins</title>
    <?php include Path::partials().'bs_head.php' ?>

</head>

<body>
    <!-- IMPORT NAV BAR-->
    <?php include Path::partials().'nav.php' ?>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('img/phone-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="page-heading">
                        <h1>Contact Me</h1>
                        <hr class="small">
                        <span class="subheading">Have questions? I have answers (maybe)</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1">
                <p><strong>I would love to hear from you!</strong>
                Feel free to use one of the following options to connect with me!</p>
            </div>
            <div class="snippet col-lg-7 col-md-7">
                <p>
                    <ul>
                        <li>Email Me At <a href="mailto:hello@jakedawkins.com">Hello@JakeDawkins.com.</a></li>
                        <li>Look me up on <a href="http://facebook.com/dawkinsjh">Facebook</a>, 
                            <a href="http://instagram.com/jakedawkins">Instagram</a>, 
                            <a href="http://twitter.com/jakedawkins">or Twitter.</a> 
                        </li>
                        <li>Follow me on <a href="http://github.com/jakedawkins">Github.</a></li>
                    </ul>
                </p>
            </div>
        </div>
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
