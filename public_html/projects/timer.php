<?php require_once '../Path.php'; ?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Timer</title>

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<!-- jQuery --> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

	<!-- import custom styles --> 
	<link rel="stylesheet" href="timer_files/timer_styles.css">

</head>

<body onload="show();">
	<div class="timer-container container-fluid">
		<div class="row">
			<div class="timer-col col-sm-12" style="">
				<h1>
					<span id="time"></span>
				</h1>
				<input class="control btn btn-primary" type="button" value="Start" onclick="start();">
				<input class="control btn btn-primary" type="button" value="Stop" onclick="stop();">
				<input class="control btn btn-primary" type="button" value="Reset" onclick="reset();">
				<input class="control btn btn-primary" type="button" value="Mark Time" onclick="markTime();">
			</div>
		</div>
	</div><div class="mark-container container">
		<div class="row">
			<div class="col-sm-12" id="timeList">

			</div>
		</div>
	</div>


	
</body>
</html>



<script type="text/javascript">
	//The stopwatch class
	var	clsStopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
		}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
		};

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
		};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
		};

		// Duration without stopping
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
		};
	};


	//------------------------ VARIABLES ------------------------
	var timer = new clsStopwatch();
	var $time;
	var clocktimer;
	var $timeList;
	var markCounter = 1;

	//------------------------ HELPER FUNCTIONS ------------------------
	function pad(num, size) {
		var s = "0000" + num;
		return s.substr(s.length - size);
	}

	function formatTime(time) {
		var h = m = s = ms = 0;
		var newTime = '';

		h = Math.floor( time / (60 * 60 * 1000) );
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
		ms = time % 1000;

		newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + '.' + pad(ms, 3);
		return newTime;
	}

	//------------------------ ACTION FUNCTIONS ------------------------
	//runs on page load
	function show() {
		$time = document.getElementById('time');
		$timeList = document.getElementById('timeList');
		update();
	}

	function update() {
		$time.innerHTML = formatTime(timer.time());
	}

	function start() {
		clocktimer = setInterval("update()", 1);
		timer.start();
	}

	function stop() {
		timer.stop();
		clearInterval(clocktimer);
	}

	function reset() {
		stop();
		timer.reset();
		update();
	}

	//used to mark the current time. appends to the #timeList div
	function markTime() {
		//	add the mark name
		//	<p> 		id:counter
		//	<strong> 	id:strong_counter
		timeList.innerHTML = timeList.innerHTML + 
			'<p class="edit" id="' + markCounter + '">' +
			'<strong id="strong_' + markCounter + '" class="mark-title" id="title_' + markCounter + '">Mark ' + markCounter++ + '</strong>' +
			formatTime(timer.time()) + '</p>';
	}

	//if user pressed 'm', mark time
	window.onkeypress = function(event) {
		//ascii codes: http://www.asciitable.com/
   		if (event.keyCode == 109) {
      		markTime();
   		}
	};

</script>
