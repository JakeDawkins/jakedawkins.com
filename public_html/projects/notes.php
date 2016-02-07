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
                        <h1>Notes</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on February 7, 2016</span>
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
                	<a class="btn btn-primary" href="notes_files/jacksod.a2.zip">
                		<span class="glyphicon glyphicon-circle-arrow-down"></span>
                		Download Source Code
            		</a>
                    <a class="btn btn-primary" href="notes_files/dox_html/annotated.html">
                        <span class="glyphicon glyphicon-circle-arrow-down"></span>
                        Doxygen Documentation
                    </a>
                    <p>
                        A note-taking tool for taking short-form notes. Uses a local SQLite DataBase for management and persistent note storage.
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
                <a href="notes_files/notes_ss_1.png">
                    <img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="notes_files/notes_ss_1.png"  />
                </a>
                <a href="notes_files/notes_ss_6.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes_files/notes_ss_6.png" />
                </a>
                <a href="notes_files/notes_ss_5.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes_files/notes_ss_5.png" />
                </a>
                <a href="notes_files/notes_ss_4.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes_files/notes_ss_4.png" />
                </a>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <br /><br />
                    <strong>Acknowledgments:</strong><br />
                    <ul>
                        <li> 
                            <a href="https://developer.android.com/training/basics/firstapp/starting-activity.html#RespondToButton">Starting Another Activity</a>
                        </li>
                        <li>
                            <a href="https://developer.android.com/training/implementing-navigation/temporal.html">Back Navigation</a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/questions/3013791/live-character-count-for-edittext">Live Character Count</a>
                        </li>
                        <li>
                            <a href="https://github.com/codepath/android_guides/wiki/Using-an-ArrayAdapter-with-ListView">Custom ArrayAdapter</a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/questions/4878159/whats-the-best-way-to-share-data-between-activities">Persistent Data</a>
                        </li>
                        <li>
                            <a href="http://www.tutorialspoint.com/java/java_regular_expressions.htm">Regular Expressions</a>
                        </li>
                        <li>
                            <a href="https://stackoverflow.com/questions/19662233/how-open-new-activity-clicking-an-item-in-listview">Clickable ListView Items</a>
                        </li>
                        <li>
                            <a href="codestars.usefedora.com/courses/the-complete-android-developer-course">Rob Percival</a>
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
