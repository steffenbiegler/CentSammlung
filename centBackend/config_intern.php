<?php


$request  = post_get_session_pruefen("request");

function post_get_session_pruefen($variable, $md5 = false, $session = true, $speichern = true){
	$rueckgabe = "";
	if (isset($_GET[$variable]) && $_GET[$variable]!=""){
			$rueckgabe = $_GET[$variable];
	}
	if ($session){
		if (isset($_SESSION[$variable]) && $_SESSION[$variable]!=""){
				$rueckgabe = $_SESSION[$variable];
		}
	}
	if (isset($_POST[$variable]) && $_POST[$variable]!=""){
			$rueckgabe = $_POST[$variable];			
			if ($md5){
				$rueckgabe = md5($rueckgabe);
			}
	}		
	if ($speichern){
		$_SESSION[$variable] = trim($rueckgabe);
	}
	return trim($rueckgabe);
}
?>