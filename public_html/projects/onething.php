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
                        <h1>OneThing</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on January 14, 2016</span>
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
                        It has been researched and proven multiple times over by experts
                        that multitasking dramatically reduces the efficiency of an individual
                        to perform tasks. 
                        <br />
                        <small>
                            <a href="http://fyiliving.com/mental-health/adhd/why-multi-tasking-is-nothing-to-brag-about/">Source</a>
                        </small>.
                    </p>
                    <p>
                        OneThing aims to keep the user focused on one thing at a time.
                    </p>
                    <ol>
                        <li>
                            The user types in the name of a task and selects a time they would 
                            like to work on it. The default options for time are 5, 10, and 15 
                            minutes, with an option for a custom time duration.
                        </li>
                        <li>
                            The user taps the add button, causing the new task to be added to a
                            queue of tasks.
                        </li>
                        <li>
                            The user taps the start button and works on whatever task they added
                            first.
                        </li>
                        <li>
                            At the end of the timer, the user can choose to move on to the next
                            task, or take a break between tasks.
                        </li>
                        <li>

                        </li>
                    </ol>

                    <br />
                </div> 
            </div> <!-- end row -->
            <div class="row">
                <a href="onething_files/img/#">
                    <img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="onething_files/img/#"  />
                </a>
                <a href="onething_files/img/#">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/#" />
                </a>
                <a href="onething_files/img/#">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/#" />
                </a>
                <a href="onething_files/img/#">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/#" />
                </a>
            </div> 
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
