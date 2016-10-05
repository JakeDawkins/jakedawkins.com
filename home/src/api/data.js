/* eslint-disable no-useless-escape */

const data = {
	"site": {
		"title": "Jake Dawkins",
		"description": "Personal site of Jake Dawkins. Web developer at NewSpring Church. B.S. in computer science from Clemson University.",
		"baseurl": "/",
		"url": "http://jakedawkins.com"
	},
	"user": {
		"username": "jakedawkins",
		"user_description": "Web Developer | Software Engineer",
		"user_title": "Web Developer | Software Engineer",
		"email": "dawkinsjh@gmail.com",
		"twitter_username": "jakedawkins",
		"github_username": "jakedawkins"
	},
	"pages": {
		"about": {
			"title": "About Me",
			"description": "I make things with a keyboard (and sometimes a mouse)",
			"content": "![Self Portrait](http://content.jakedawkins.com/layout/selfportrait.png)\n\n**I'm Jake**. I'm a Web Developer at [NewSpring Church](https://newspring.cc) in Anderson, SC. I have a degree from [Clemson University](https://clemson.edu) in Computer Science with a minor in Psychology.\n\nI have a passion for technology, and a knack for making things work. I love making things for people to use. Real people. Take a look around and feel free to sift through my work and photos. For the truly ambitious, reach out to me!\n\n----\n\n### Current Interests\n\n- Code Tesing\n- Machine Learning & Recommender Systems\n- API Design\n- Documentation Practices"
		}
	},
	"posts": [
		{
			postId: 0,
			publishedDateTime: "1475459431",
			publishedDay: "02",
			publishedMonth: "October",
			publishedYear: "2016",
			linkUrl: "https://github.com/jakedawkins/jakedawkins.com", //relative link
			title: "JakeDawkins.com",
			description: "A complete ground-up rebuild of my personal site. Built using React. Based on theme by Willian Justen.",
			readMoreText: "View on GitHub...", //title ex: "read more..."
			tags: ["web","react"],
			content: "A complete ground-up rebuild of my personal site. Built using React. Based on theme by Willian Justen.",
		},
		{
			postId: 1,
			publishedDateTime: "1457776800",
			publishedDay: "12",
			publishedMonth: "March",
			publishedYear: "2016",
			title: "ThrowNote (Android)",
			description: "A android note-taking tool for taking short-form notes. Uses a local SQLite, a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.",
			readMoreText: "Read More...", //title ex: "read more..."
			tags: ["school","android"],
			content: "[< Back to Posts](/posts)\n\nA note-taking tool for taking short-form notes. Uses a local SQLite, a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.\n\n**Something New:** Password Salted Hashing, Shared preference within android for storing user information, Backed by aRESTful API, ability to refresh feed.\n\n**Known Issues:** Logins take two tries, feed does not refresh automatically always.\n\n- To refresh the feed, tap the 'more' icon in the menubar and tap 'refresh'.\n- To enter a new note, tap the '+' at the bottom of the main list of notes. Tags are integrated now, similar to Twitter's Hashtags. Alerts will appear for the user for empty notes.\n- To edit a note, tap on it in the main list of notes and tap edit.\n- To delete a note, tap on it in the main list of notes, and tap 'delete'. Then tap 'okay' on the alert.\n- To logout, tap the 'more' icon in the menubar and tap 'logout'.\n\n----\n### Acknowledgments\n\n- [Volley HTTP Requests](http://developer.android.com/training/volley/request.html#request-json)\n- [JSON Parsing](http://stackoverflow.com/questions/2591098/how-to-parse-json-in-java)\n- [Android Shared Preferences](http://developer.android.com/guide/topics/data/data-storage.html)\n- [Implicit Tagging \(like Twitter hashtags\)](http://stackoverflow.com/questions/10432543/extract-hash-tag-from-string)\n- [DateTime Parsing](http://stackoverflow.com/questions/16910344/how-to-convert-string-into-date-time-format-in-java)\n\n----\n### Schema and Screenshots\n\n<img src='http://content.jakedawkins.com/content/thrownote/jacksod.a4.ExternalSchema.jpg' alt='External Schema' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/thrownote/jacksod.a4.InternalSchema.jpg' alt='Local Schema' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/thrownote/notesa4-1.png' alt='List of Notes' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/thrownote/notesa4-2.png' alt='Options Menu' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/thrownote/notesa4-3.png' alt='Edit Note' style='width: 45%; display: inline;' />",
		},
		{
			postId: 2,
			publishedDateTime: "1451901600",
			publishedDay: "04",
			publishedMonth: "January",
			publishedYear: "2016",
			title: "OneThing (Android)",
			description: "My first Android projet, OneThing is an Android app that aims to keep the user focused on one thing at a time, using advancing timers and a queue of tasks.",
			readMoreText: "Read More...", //title ex: "read more..."
			tags: ["school","android"],
			content: "[< Back to Posts](/posts)\n\n### Purpose:\n\nResearch has shown that multitasking dramatically reduces the efficiency of an individual in performing tasks. Reference\n\nOneThing aims to keep the user focused on one thing at a time.\n\n1. The user types in the name of a task and selects a time they would like to work on it. The default options for time are 5 and 10 minutes, with an option for a custom time duration.\n2. The user taps the add button, causing the new task to be added to aqueue of tasks.\n3. The user taps the start button and works on whatever task they added first.\n4. At the end of the timer, the user can choose to move on to the next task, or take a break between tasks.\n\n----\n### Acknowledgments:\n\n- [Resizing Images]()\n- [Enabling Up Button Navigation]()\n- [Starting Another Activity]()\n- [Rob Percival: CodeStars]()\n- [Keyboard Hiding]()\n\n----\n### Screenshots\n\n <img src='http://content.jakedawkins.com/content/onething/onething-1.jpg' alt='Basic Timer' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/onething/onething-2.jpg' alt='Timer with custom time' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/onething/onething-3.jpg' alt='Finished Timer Queue' style='width: 45%; display: inline;' /> <img src='http://content.jakedawkins.com/content/onething/onething-4.jpg' alt='About Page' style='width: 45%; display: inline;' /> ",
		}
	]
}

export default data;


/*
publishedDateTime: PropTypes.string,
publishedDay: PropTypes.string,
publishedMonth: PropTypes.string,
publishedYear: PropTypes.string,
linkUrl: PropTypes.string, //relative link
title: PropTypes.string,
description: PropTypes.string,
readMoreText: PropTypes.string, //title ex: "read more..."
tags: PropTypes.array,

*/
