<?php

require 'connect.php';

$requete = "SELECT * FROM document WHERE id = $id ";

$stmt = $con ->query($requete);
$row = $stmt -> fetchAll();
if (!empty($row)){
  return $row[0];
}
?>
