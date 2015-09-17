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
    <header class="intro-header" style="background-image: url('img/photos-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>Photos & Videos</h1>
                        <hr class="small">
                        <span class="subheading">Captured from some of my favorite adventures.</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                <img class="img-rounded" src="/img/content/IT_01.jpg" alt="The town of Positano, Italy during a storm" width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/IT_02.jpg" alt="The town of Amalfi, Italy at dusk" width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/IT_03.jpg" alt="The Roman coliseum." width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/IT_04.jpg" alt="Homes in Burano, Italy." width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/DC_01.jpg" alt="The Lincoln Memorial." width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/DC_02.jpg" alt="The Washington Monument." width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/DC_03.jpg" alt="A MLK Jr. Quote: we shall overcome because the arc of the moral universe is long, but it bends towards justice." width="100%" />
                <br /><br />
                <img class="img-rounded" src="/img/content/DC_04.jpg" alt="World War 2 Memorial facing the Lincoln Memorial." width="100%" />
                <br /><br />
            </div>
        </div>
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

</body>

</html>
