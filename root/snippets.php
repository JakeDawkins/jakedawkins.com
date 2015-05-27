<?php 
	require_once 'Path.php'; 
    require_once 'PHP/db.php';

    $category = 'c-snippet'; //default category

    //if category is selected
    if(isset($_GET['category'])){
        $category = $_GET['category'];
    }

    $database = new DB();

    $results = $database->select("SELECT title,subtitle,content FROM posts INNER JOIN categories ON posts.category = categories.category_id WHERE name='$category'");
    if ($test === false){
        printf("Query error.\n");
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Jake Dawkins - Snippets</title>
    <?php include Path::partials().'bs_head.php' ?>

</head>

<body>
    <!-- IMPORT NAV BAR-->
    <?php include Path::partials().'nav.php' ?>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('<?php echo Path::images().'code-lt2-bg.jpg'?>')">
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
                <a class="btn full" href="snippets.php?category=php-snippet">PHP</a><br />
                <a class="btn full" href="snippets.php?category=html-snippet">HTML</a><br />
                <a class="btn full" href="snippets.php?category=c-snippet">C / C++ / Obj-C</a><br />
                <a class="btn full" href="snippets.php?category=js-snippet">Javascript</a><br />
                <hr />
            </div>

            <!-- Begin Snippet Section -->
            <div class="snippet col-lg-7 col-md-7">
                <?php foreach($results as $row){  ?>
                    <!-- BEGIN SNIPPET -->
                    <h2 class="snippet-title">
                        <?php echo $row['title'];?>
                    </h2>
                    <p class="snippet-subtitle">
                        <?php echo $row['subtitle'];?>
                    </p> 
                    <pre class="prettyprint"><?php echo $row['content'];?></pre>
                    <hr />
                     <!-- END SNIPPET -->
                <?php } ?>
            </div>
            <!-- End Snippet Section -->        

        </div>
    </div>

    <hr>

    <!-- IMPORT FOOTER & JS -->
    <?php include Path::partials().'footer.php' ?>

    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>

</body>

</html>
