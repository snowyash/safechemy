<?php
  	error_reporting(E_ALL);
  	ini_set('display_errors', 1);
  	
  	if($_GET)
	{
		/* sanitize the url */
		$url=filter_var($_GET["url"], FILTER_SANITIZE_URL);

		/* create an agent to fake ajax request as if requesting from a webpage */
		$agent= 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)';

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_VERBOSE, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, $agent);
		curl_setopt($ch, CURLOPT_URL, $url);

		$result = curl_exec($ch);

		/* return the result to .get function */
		if($result){
			die(json_encode(array('type' => 'message', 'text' => $result)));
		} else {
			die(json_encode(array('type' => 'error', 'text' => "fail")));
		}
	}
?>