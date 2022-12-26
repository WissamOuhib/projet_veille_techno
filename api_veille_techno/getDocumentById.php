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
  $id_document = $data['id_document']; 
  //echo $data;;


$document;

$sql = "SELECT * FROM document WHERE id=$id_document";

if($result = mysqli_query($con,$sql)){ 

  $row = mysqli_fetch_assoc($result);

  $document['id'] = $row['id'];
  $document['nom'] = $row['nom'];
  $document['path'] = $row['path'];
  $document['annee']    = $row['annee'];
  $document['domaine'] = $row['domaine'];
  $document['niveau'] = $row['niveau'];
  $document['date_ajout']    = $row['date_ajout'];
  $document['valide'] = $row['valide'];

        //var_dump($corrections);

}
    
  echo json_encode(['data'=>$document]);

}