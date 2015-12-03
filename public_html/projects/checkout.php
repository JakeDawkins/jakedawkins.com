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
                        <span class="meta">Updated by Jake on December 3, 2015</span>
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
                    I'm currently preparing for the first release and user testing. I just recently finished functionality, and
                    added a calendar view to the checkouts page (although I still allow users to use a table view instead). I didn't
                    Use OAuth for this, just a JQuery plugin.
                    <br /><br />
                    Keep up with progress here or at <a href="http://github.com/jakedawkins/checkout">GitHub</a>.
                    </p>

                    <h3>Current Photos</h3>
                    <br />
                    <a href="checkout_files/co-2.jpg"><img src="checkout_files/co-2.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-3.jpg"><img src="checkout_files/co-3.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-1.jpg"><img src="checkout_files/co-1.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-4.jpg"><img src="checkout_files/co-4.jpg" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-5.jpg"><img src="checkout_files/co-5.jpg" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />
                    <a href="checkout_files/co-6.png"><img src="checkout_files/co-6.jpg" class="img-rounded" alt="" width="50%" /></a>
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
