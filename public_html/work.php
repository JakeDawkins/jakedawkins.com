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
    <header class="intro-header" style="background-image: url('img/work-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>Programming Projects</h1>
                        <hr class="small">
                        <span class="subheading">Things I spend my time on...</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <!-- Applescript  -->
                <!--
                <div class="post-preview">
                    <a href="projects/applescript.php">
                        <h2 class="post-title">
                            Scaling &amp; Padding Images with AppleScript
                        </h2>
                        <h3 class="post-subtitle">
                            A handy little code snippet to batch resize images and add
                            padding if needed.
                        </h3>
                    </a>
                    <p class="post-meta">Posted by Jake on December 27, 2015</p>
                </div>
                <hr> -->

                <!-- Checkout -->
                <div class="post-preview">
                    <a href="projects/checkout.php">
                        <h2 class="post-title">
                            Checkout
                        </h2>
                        <h3 class="post-subtitle">
                            A webapp used to schedule different kinds of gear among team members.
                        </h3>
                    </a>
                    <p class="post-meta">Posted by Jake on July 8, 2015</p>
                </div>
                <hr>

                <!-- Home Control -->
                <div class="post-preview">
                    <a href="projects/sdhome.php">
                        <h2 class="post-title">
                            Solar Decathlon Smart Home Control
                        </h2>
                        <h3 class="post-subtitle">
                            An iOS 7 app to interface with a MySQL database to control a smart home.
                        </h3>
                    </a>
                    <p class="post-meta">Posted by Jake on April 16, 2015</p>
                </div>
                <hr>

                <!-- VTK --> 
                <div class="post-preview">
                    <a href="projects/vtk.php">
                        <h2 class="post-title">
                            Video Toolkit
                        </h2>
                        <h3 class="post-subtitle">
                            An iOS 7 app to do simple bitrate and timecode math for video professionals.
                        </h3>
                    </a>
                    <p class="post-meta">Posted by Jake on April 23, 2015</p>
                </div>
                <hr>



                <!-- Pager -->
                <!-- <ul class="pager"> 
                    <li class="next"><a href="#">Older Posts &rarr;</a></li>
                </ul> -->
            </div> 
        </div> <!-- end row --> 
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
