<?php
 
/* Database Configuration */
$dbhost   = 'localhost';
$dbuser   = 'root';
$dbpass   = '';
$dbname   = 'SM_COMPANY_APP';
$dbmethod = 'mysql:dbname=';

$dsn = $dbmethod.$dbname;
$pdo = new PDO($dsn, $dbuser, $dbpass);
$db = new NotORM($pdo);
 
?>