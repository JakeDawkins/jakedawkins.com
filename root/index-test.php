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
    <header class="intro-header" style="background-image: url('img/about-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="page-heading">
                        <h1>Jake Dawkins</h1>
                        <hr class="small">
                        <span class="subheading">I make things with a keyboard and (occasionally) a mouse.</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                
                <img class="img-responsive img-rounded inlineImg" src="/img/selfportrait.png"/>
                
                <p><strong>I'm Jake</strong> (or Jackson for the more formal types). I'm a 
                junior in Computer Science at <a href="http://clemson.edu">Clemson University</a>,
                and Clemson is where I set up shop (for now). I also work as the Digital Media
                Content Coordinator for <a href="http://newspring.cc">NewSpring Church</a> in
                in Anderson, SC.
                </p>
                
                <p>I have a passion for technology, and a knack for making things work.
                I love making things for people to use. Real people. Take a look around
                and feel free to sift through my work and thoughts. For the truly ambitious,
                reach out to me!
                </p>
            </div>

        </div>

        <!-- Technical Skills -->
        <div class="row background-orange">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <h2>Basic Progress Bar</h2>
                    <div class="progress">
                    <div class="progress-bar progress-purple" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:90%">
                      <span class="sr-only">70%</span>
                    </div>
                    </div>
            </div>
        </div>
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
