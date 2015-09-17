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
                        <h1>Checkout</h1>
                        <h2 class="subheading"></h2>
                        <span class="meta">Posted by Jake on July 8, 2015</span>
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
                    I'm currently polishing out user experience elements of the base functionality, as well as
                    preparing to add more functionality to make the system more useful beyond basic checkouts. I haven't
                    started working with the specifics of the design. I'm more focused on functionality and UX currently.
                    <br /><br />
                    Keep up with progress here or at <a href="http://github.com/jakedawkins/checkout">GitHub</a>.
                    </p>

                    <h3>Current Photos</h3>
                    <br />
                    <a href="checkout_files/CO-checkout.jpg"><img src="checkout_files/CO-checkout.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/CO-checkouts.jpg"><img src="checkout_files/CO-checkouts.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/CO-dropdown.jpg"><img src="checkout_files/CO-dropdown.jpg" class="img-rounded" alt="" width="50%" /></a>
                    <br /><br />
                    <a href="checkout_files/CO-editgeartypes.jpg"><img src="checkout_files/CO-editgeartypes.jpg" class="img-rounded" alt="" width="75%" /></a>
                    <br /><br />
                    <a href="checkout_files/CO-inventory.jpg"><img src="checkout_files/CO-inventory.jpg" class="img-rounded" alt="" width="75%" /></a>
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
