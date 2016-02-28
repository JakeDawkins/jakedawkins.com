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
                        <h1>Notes (jacksod a3)</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on February 27, 2016</span>
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
                	<a class="btn btn-primary" href="notes-a3_files/jacksod.a3.zip">
                		<span class="glyphicon glyphicon-circle-arrow-down"></span>
                		Download Source Code
            		</a>
                    <a class="btn btn-primary" href="notes-a3_files/dox_html/annotated.html">
                        <span class="glyphicon glyphicon-circle-arrow-down"></span>
                        Doxygen Documentation
                    </a>
                    <p>
                        A note-taking tool for taking short-form notes. Uses a local SQLite DataBase for management and persistent note storage.
                    </p>
                    <p>
                        <strong>Something New:</strong>The ability to choose and save images for notes.
                    </p>
                    <p>
                        <strong>Known Issues:</strong>In lists of notes, the image icon does not show next to the first item in the list if it has an image saved.
                    </p>
                    <ul>
                        <li>
                            To enter a new note, tap the "+" at the bottom of the main list of notes. There is an option to add tags to a note.
                            Tags must be alphanumeric or contain a _. Alerts will prompt the user for empty notes. 
                        </li> 
                        <li>
                            To edit a note, tap on it in the main list of notes.
                        </li>
                        <li>
                            To delete a note, tap on it in the main list of notes, and tap "delete". Then tap "okay" on the alert.
                        </li>
                    </ul>
                    <br />
                </div> 
            </div> <!-- end row -->
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p><strong>Database Schema</strong></p>
                    <a href="notes-a3_files/jacksod.a3.FinalSchema.jpg">
                        <img class="img-responsive" src="notes-a3_files/jacksod.a3.FinalSchema.jpg" />
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p><strong>Screenshots</strong></p>
                </div>
                <a href="notes-a3_files/notesa3-1.png">
                    <img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="notes-a3_files/notesa3-1.png" />
                </a>
                <a href="notes-a3_files/notesa3-2.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes-a3_files/notesa3-2.png" />
                </a>
                <a href="notes-a3_files/notesa3-3.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes-a3_files/notesa3-3.png" />
                </a>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <br /><br />
                    <strong>Acknowledgments:</strong><br />
                    <ul>
                        <li> 
                            <a href="http://stackoverflow.com/questions/26615889/how-to-change-the-launcher-logo-of-an-app-in-android-studio">How to Create a Launcher Icon</a>
                        </li>
                        <li> 
                            <a href="http://www.sketchappsources.com/resource/download-477.html">Icon Template for Sketch 3</a>
                        </li>
                        <li> 
                            <a href="http://stackoverflow.com/questions/3805599/add-delete-view-from-layout">Removing a View Programmatically</a>
                        </li>
                        <li> 
                            <a href="http://www.codeproject.com/Articles/995286/Saving-an-image-in-a-SQLite-database-in-your-Andro">Images and SQLite</a>
                        </li>
                        <li> 
                            <a href="(http://codestars.usefedora.com/courses/the-complete-android-developer-course/lectures/474991">Choosing Photos - Rob Percival</a>
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
