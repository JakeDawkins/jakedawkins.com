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
                	<a class="btn btn-primary" href="notes-a4_files/jacksod.a4.zip">
                		<span class="glyphicon glyphicon-circle-arrow-down"></span>
                		Download Source Code
            		</a>
                    <a class="btn btn-primary" href="notes-a4_files/dox_html/annotated.html">
                        <span class="glyphicon glyphicon-circle-arrow-down"></span>
                        Doxygen Documentation
                    </a>
                    <p>
                        A note-taking tool for taking short-form notes. Uses a local SQLite, 
                        a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.
                    </p>
                    <p>
                        <strong>Something New:</strong> Password Salted Hashing, Shared 
                        preference within android for storing user information, Backed by a
                        RESTful API, ability to refresh feed.
                    </p>
                    <p>
                        <strong>Known Issues:</strong> Logins take two tries, feed does not
                        refresh automatically always.
                    </p>
                    <ul>
                        <li>
                            To refresh the feed, tap the "more" icon in the menubar and tap 
                            "refresh".
                        </li>
                        <li>
                            To enter a new note, tap the "+" at the bottom of the main list of notes. Tags are integrated now, similar to Twitter's Hashtags. Alerts will appear for the user for empty notes. 
                        </li> 
                        <li>
                            To edit a note, tap on it in the main list of notes and tap edit.
                        </li>
                        <li>
                            To delete a note, tap on it in the main list of notes, and tap "delete". Then tap "okay" on the alert.
                        </li>
                        <li>
                            To logout, tap the "more" icon in the menubar and tap "logout".
                        </li>
                    </ul>
                    <br />
                </div> 
            </div> <!-- end row -->
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <a href="notes-a4_files/jacksod.a4.InternalSchema.jpg">
                        <img class="img-responsive" src="notes-a4_files/jacksod.a4.InternalSchema.jpg" />
                    </a>
                    <a href="notes-a4_files/jacksod.a4.ExternalSchema.jpg">
                        <img class="img-responsive" src="notes-a4_files/jacksod.a4.ExternalSchema.jpg" />
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p><strong>Screenshots</strong></p>
                </div>
                <a href="notes-a4_files/notesa4-1.png">
                    <img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="notes-a4_files/notesa4-1.png" />
                </a>
                <a href="notes-a4_files/notesa4-2.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes-a4_files/notesa4-2.png" />
                </a>
                <a href="notes-a4_files/notesa4-3.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes-a4_files/notesa4-3.png" />
                </a>
                <a href="notes-a4_files/notesa4-3.png">
                    <img class="img-responsive col-lg-2 col-md-2" src="notes-a4_files/notesa4-4.png" />
                </a>
            </div>
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <br /><br />
                    <strong>Acknowledgments:</strong><br />
                    <ul>
                        <li> 
                            <a href="http://developer.android.com/training/volley/request.html#request-json">Volley HTTP Requests</a>
                        </li>
                        <li> 
                            <a href="http://stackoverflow.com/questions/2591098/how-to-parse-json-in-java">JSON Parsing</a>
                        </li>
                        <li> 
                            <a href="http://developer.android.com/guide/topics/data/data-storage.html">Android Shared Preferences</a>
                        </li>
                        <li> 
                            <a href="http://stackoverflow.com/questions/10432543/extract-hash-tag-from-string">Implicit Tagging (like Twitter hashtags)</a>
                        </li>
                        <li> 
                            <a href="http://stackoverflow.com/questions/16910344/how-to-convert-string-into-date-time-format-in-java">DateTime Parsing</a>
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
