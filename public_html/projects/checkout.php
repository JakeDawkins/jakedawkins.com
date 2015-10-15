<?php require_once '../Path.php'; ?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Jake Dawkins - Checkout</title>
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
                        <h1>Checkout</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Updated by Jake on October 15, 2015</span>
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
                    <h3>What Is Checkout?</h3>
                    <p>
                        Checkout is a project that I've been working on to allow a team of any type to share equipment more
                        easily. It allows team members to manage gear, and reserve pieces for projects. 
                    </p>
                    <h3>Current Status</h3>
                    <p>
                    I'm currently finishing up functionality, and preparing to polish the design. I've done a bit of the 
                    design work such as choosing colors, and tweaking some page elements. I'm looking into OAuth for calendar
                    integration, and a calendar view for desktop users for viewing checkouts in a more pleasant manner.
                    <br /><br />
                    Keep up with progress here or at <a href="http://github.com/jakedawkins/checkout">GitHub</a>.
                    </p>

                    <h3>Current Photos</h3>
                    <br />
                    <a href="checkout_files/co-1.jpg"><img src="checkout_files/co-1.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-2.jpg"><img src="checkout_files/co-2.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-3.jpg"><img src="checkout_files/co-3.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-4.jpg"><img src="checkout_files/co-4.jpg" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-5.jpg"><img src="checkout_files/co-5.jpg" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-6.png"><img src="checkout_files/co-6.png" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />

                </div> 
            </div> <!-- end row --> 
        </div>
    </article>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
