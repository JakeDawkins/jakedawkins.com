<?php
	require_once './PHP/db.php';
?>

<!DOCTYPE html>
<html>
<head>
	<title>TEST</title>
	
</head>
<body>
	<?php
		$category = 'c-snippet';

		$database = new DB();

		$results = $database->select("SELECT title,subtitle,content FROM posts INNER JOIN categories ON posts.category = categories.category_id WHERE name='$category'");
		if ($test === false){
		    printf("Query error.\n");
		}

		foreach($results as $row){
			?>
		<h1><?php echo $row['title'];?></h1><?php
		}

		printf("NUM: %d", count($results));
	?>
	<br />
	still goin strong...
</body>
</html>