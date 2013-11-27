<?php
include 'config.php';
ob_start();
$username=$_POST['username'];
$password=$_POST['password'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

// protect MySQL injection
$username = stripslashes($username);
$password = stripslashes($password);

$result = $mysqli->query(
	"SELECT * FROM beaudryland_users 
	WHERE username='".$username."' and password='".$password."'"
) or die(mysql_error() );

if($result->num_rows > 0) {
	//session_save_path("sessions");
	session_start();
	$_SESSION["username"] = $username;
	header("location:beaudryland.php");
} else { 
	//echo "Wrong Username or Password";
	header("location:index.php?error=loginfailed");
}

//echo $result;

$mysqli->close();
ob_end_flush();
?>