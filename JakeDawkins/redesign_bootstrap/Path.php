<?php
/*
	A common class for obtaining paths to files.
*/
class Path {
	static public function externalRoot() {
		return 'jakedawkins.com/';
	}

	static public function base() {
		return '/home/jakedawk/public_html/';
	}

	static public function css() {
		return Path::base().'css/';
	}

	static public function js() {
		return Path::base().'js/';
	}

	static public function php() {
		return Path::base().'PHP/';
	}

	static public function partials() {
		return Path::base().'partials/';
	}

	static public function images() {
		return Path::base().'img/';
	}	
	
	static public function errors() {
		return Path::base().'errors/';
	}

}
?>
