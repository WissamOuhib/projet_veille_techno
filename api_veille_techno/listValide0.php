<?php
/**
 * Returns the list of documents.
 */
require 'connect.php';
    
$documents = [];
$sql = "SELECT * FROM document WHERE valide=0";

if($result = mysqli_query($con,$sql))
{
  $doc = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $documents[$doc]['id']    = $row['id'];
    $documents[$doc]['nom'] = $row['nom'];
    $documents[$doc]['path'] = $row['path'];
    $documents[$doc]['annee']    = $row['annee'];
    $documents[$doc]['domaine'] = $row['domaine'];
    $documents[$doc]['niveau'] = $row['niveau'];
    $documents[$doc]['date_ajout']    = $row['date_ajout'];
    $documents[$doc]['valide'] = $row['valide'];
    $doc++;
  }
    
  echo json_encode(['data'=>$documents]);
}
else
{
  http_response_code(404);
}