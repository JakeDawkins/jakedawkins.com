<?php require_once '../Path.php'; ?>

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
    <!-- background image for header below. -->
    <header class="intro-header" style="background-image: url('../img/imac-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="post-heading">
                        <h1>Notes (jacksod a4)</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on March 12, 2016</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Post Content -->
    <article>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p>
                        A short-form note taking tool for normal people.
                    </p>
                    <ul>
                        <li>
                            <a href='thrownote_files/11.P3.TRM.pdf'>Technical Reference Manual</a>
                        </li>
                        <li>
                            <a href='thrownote_files/11.P3.UM.pdf'>User Manual</a>
                        </li>
                        <li>
                            <a href='thrownote_files/11.P3.Sched.pdf'>Updated Schedule</a>
                        </li>
                    </ul>
                </div> 
            </div> <!-- end row -->
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
