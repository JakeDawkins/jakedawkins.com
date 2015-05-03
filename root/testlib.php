<?php require_once 'Path.php'; ?>

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
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('<?php echo Path::images().'home-bg.jpg'?>')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>Snippet Library</h1>
                        <hr class="small">
                        <span class="subheading">Bits and pieces of code that make my life easy.</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">

            <div class="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1" style="text-align:center;">
                <h2>Languages</h2>
                <hr />
                <a class="btn" style="width: 100%" href="">PHP</a><br />
                <a class="btn" style="width: 100%" href="">HTML</a><br />
                <a class="btn" style="width: 100%" href="">C / C++ / Obj-C</a><br />
                <a class="btn" style="width: 100%" href="">Javascript</a><br />
                <a class="btn" style="width: 100%" href=""></a><br />
                <hr />
            </div>

            <!-- Begin Snippet -->
            <div class="snippet col-lg-7 col-md-7">
                <h2 class="snippet-title">
                    Snippet Title
                </h2>
                <p class="snippet-subtitle">
                    This is a description of the snippet.
                </p>
                <!-- Import snippet --> 
                <?php include 'snippets/testsnip.html' ?>
                <hr />
            </div>
            <!-- End Snippet -->

        </div>
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>

</body>

</html>
