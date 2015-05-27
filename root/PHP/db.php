<?php
class DB {
	//database connection
	protected static $connection;

	
	/*	
	*	Connect to the DB.
	*
	*	@return false on failure / mysqli object on success
	*/
	public function connect(){
		if(!isset(self::$connection)){
			$config = parse_ini_file('config.ini');
			self::$connection = new mysqli('localhost',$config['username'],$config['password'],$config['dbname']);
		}

		//handle any errors
		if(self::$connection === false){
			//handle here
			printf("could not connect!\n");
			return false;
		}

		return self::$connection;
	}//connect

	/*
	*	Query the DB
	*
	*	@param query - query string
	*	@return - query results.
	*/
	public function query($query){
        // Connect to the database
        $connection = $this -> connect();

        // Query the database
        $result = $connection -> query($query);

        return $result;		
	}

	/*
	*	Fetch rows from the DB (SELECT)
	*
	*	@param $query - query string
	*	@return bool false on failure / array Database rows on success 
	*/
	public function select($query){
        $rows = array();
        $result = $this -> query($query);
        if($result === false) {
            return false;
        }
        while ($row = $result -> fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
	}

	/*
	*	Fetch last error from DB
	*
	*	@return string database error
	*/
	public function error(){
		$connection = $this -> connect();
		return $connection -> error;
	}

	/*
	*	Quote and escape values for DB query
	*
	*	@param string to be quoted and escaped
	*	@return string after quoting and escaping
	*/
	public function quote($value){
		$connection -> connect();
		return "'" . $connection -> real_escape_string($value) . "'";
	}
}//class


?>