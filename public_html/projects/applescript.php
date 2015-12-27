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
                        <h1>Scaling &amp; Padding Images with AppleScript</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on December 27, 2015</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Post Content -->
    <article>
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                    <p>
                    	This script takes a folder* path (line 5) and scales all
                    	images in the folder to the target dimensions (lines 1 &amp; 2)
                    	and pads the sides or top and bottom with black.<br />
                    	<em>* all files in the folder must be images.</em>
                    </p>

                    <p>
                    	I <strong>do not</strong> take credit for this code.
                    	This script was built using scripts found on
	                    <a href="http://www.macosxautomation.com/applescript/imageevents/05.html">MacOSXAutomation.com</a> and 
	                    <a href="https://stackoverflow.com/questions/14400782/applescript-open-all-file-in-folder-one-by-one">Stack Overflow</a>.
                    </p>

                    <p><strong>For the best viewing experience, view this code in a desktop browser</strong></p>
<!-- THIS IS THE BLOCK OF CODE -->
<pre>
set target_W to 1920
set target_H to 1080

tell application "Finder"
	set fl to files of folder POSIX file "/Users/username/path/to/folder" as alias list
end tell

repeat with f in fl
	set this_file to f
	try
		tell application "Image Events"
			-- start the Image Events application
			launch
			-- open the image file
			set this_image to open this_file
			-- get dimensions of the image
			copy dimensions of this_image to {W, H}
			-- calculate scaling
			if target_W is greater than target_H then
				if W is greater than H then
					set the scale_length to (W * target_H) / H
					set the scale_length to ¬
						round scale_length rounding as taught in school
				else
					set the scale_length to target_H
				end if
			else if target_H is greater than target_W then
				if H is greater than W then
					set the scale_length to (H * target_W) / W
					set the scale_length to ¬
						round scale_length rounding as taught in school
				else
					set the scale_length to target_W
				end if
			else -- square pad area
				set the scale_length to target_H
			end if
			-- perform action
			scale this_image to size scale_length
			-- perform action
			pad this_image to dimensions {target_W, target_H}
			-- save the changes
			save this_image with icon
			-- purge the open image data
			close this_image
		end tell
	on error error_message
		display dialog error_message
	end try
end repeat
</pre>



                </div> 
            </div> <!-- end row --> 
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
