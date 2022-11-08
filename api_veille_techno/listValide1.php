<?php
/**
 * Returns the list of documents.
 */
require 'connect.php';

/*
$data= $_POST;
var_dump($data);
*/

$postdata = file_get_contents('php://input');


if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $data = json_decode($postdata, true);
  $domaine = $data['domaine']; 
  //echo $domaine;;
}

    
$documents = [];
$sql = "SELECT * FROM document WHERE valide=1 AND domaine='{$domaine}'";

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