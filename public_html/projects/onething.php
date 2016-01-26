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
                	<a class="btn btn-primary" href="onething_files/jacksod.a1.zip">
                		<span class="glyphicon glyphicon-circle-arrow-down"></span>
                		Download Source Code
            		</a>
                    <p>
                        <strong>Purpose:</strong><br />
                        Research has shown that multitasking dramatically reduces the 
                        efficiency of an individual in performing tasks. 
                        
                        <small>
                            <a href="http://fyiliving.com/mental-health/adhd/why-multi-tasking-is-nothing-to-brag-about/">Reference</a>
                        </small>
                    </p>
                    <p>
                        OneThing aims to keep the user focused on one thing at a time.
                    </p>
                    <ol>
                        <li>
                            The user types in the name of a task and selects a time they would 
                            like to work on it. The default options for time are 5 and 10 
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
                    </ol>
                    <br />
                </div> 
            </div> <!-- end row -->
            <div class="row">
                <a href="onething_files/img/onething-1.jpg">
                    <img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="onething_files/img/onething-1.jpg"  />
                </a>
                <a href="onething_files/img/onething-2.jpg">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/onething-2.jpg" />
                </a>
                <a href="onething_files/img/onething-3.jpg">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/onething-3.jpg" />
                </a>
                <a href="onething_files/img/onething-4.jpg">
                    <img class="img-responsive col-lg-2 col-md-2" src="onething_files/img/onething-4.jpg" />
                </a>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <br /><br />
                    <strong>Acknowledgments:</strong><br />
                    <ul>
                        <li> 
                            <a href='https://stackoverflow.com/questions/6267733/android-resizing-imageview-in-xml'>Resizing Images</a>
                        </li>
                        <li>
                            <a href="https://developer.android.com/training/appbar/up-action.html">Enabling Up Button Navigation</a>
                        </li>
                        <li>
                            <a href="https://developer.android.com/training/basics/firstapp/starting-activity.html">Starting Another Activity</a>
                        </li>
                        <li>
                            <a href='http://codestars.usefedora.com/courses/the-complete-android-developer-course'>Rob Percival: CodeStars</a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/questions/8697499/hide-keyboard-when-user-taps-anywhere-else-on-the-screen-in-android">Keyboard Hiding</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
