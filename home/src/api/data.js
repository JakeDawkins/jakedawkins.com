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
			publishedDateTime: "1475459431",
			publishedDay: "02",
			publishedMonth: "October",
			publishedYear: "2016",
			linkUrl: "https://github.com/jakedawkins/jakedawkins.com", //relative link
			title: "JakeDawkins.com",
			description: "A complete ground-up rebuild of my personal site. Built using React. Based on theme by Willian Justen.",
			readMoreText: "View on GitHub...", //title ex: "read more..."
			tags: ["web","react"],
		},
		{
			publishedDateTime: "1457776800",
			publishedDay: "12",
			publishedMonth: "March",
			publishedYear: "2016",
			linkUrl: "#", //relative link
			title: "ThrowNote (Android)",
			description: "A android note-taking tool for taking short-form notes. Uses a local SQLite, a MySQL DataBase for management and persistent note storage. Uses UserCake Library for user authentication.",
			readMoreText: "Read More...", //title ex: "read more..."
			tags: ["school","android"],
		},
		{
			publishedDateTime: "1451901600",
			publishedDay: "04",
			publishedMonth: "January",
			publishedYear: "2016",
			linkUrl: "#", //relative link
			title: "OneThing (Android)",
			description: "My first Android projet, OneThing is an Android app that aims to keep the user focused on one thing at a time, using advancing timers and a queue of tasks.",
			readMoreText: "Read More...", //title ex: "read more..."
			tags: ["school","android"],
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
