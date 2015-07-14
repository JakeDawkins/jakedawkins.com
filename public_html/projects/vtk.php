<?php require_once '../Path.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Jake Dawkins - VTK</title>
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
                        <h1>Video Toolkit (iOS) </h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on April 23, 2015</span>
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
                    <p>VTK is a toolkit for video professionals, whether they specialize in live, filming, 
                    or editing. This tool allows the user to calculate timecode (quite a pesky task otherwise), 
                    bitrate, and estimated file size for a number of formats.</p>
                    <ul>
	                    <li>
	                    A custom settings tab allows users to store their favorite encoding settings using an internal 
	                    database and sqlite3.
	                    </li>
	                    <li>
	                    Ability to connect to an external MySQL database (currently offline) to save and sync 
	                    custom settings across devices.
	                    </li>
	               	</ul>
	               	<p>Download the source code <a href="vtk_files/vtk.zip">here</a>!</p>
                </div> 
            </div> <!-- end row --> 
            <div class="row">
            	<a href="vtk_files/vtk01.png"><img class="img-responsive col-lg-2 col-lg-offset-2 col-md-2 col-md-offset-1" src="vtk_files/vtk01.png" /></a>
            	<a href="vtk_files/vtk02.png"><img class="img-responsive col-lg-2 col-md-2" src="vtk_files/vtk02.png" /></a>
            	<a href="vtk_files/vtk03.png"><img class="img-responsive col-lg-2 col-md-2" src="vtk_files/vtk03.png" /></a>
            	<a href="vtk_files/vtk04.png"><img class="img-responsive col-lg-2 col-md-2" src="vtk_files/vtk04.png" /></a>
            </div> <!-- end row -->
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
