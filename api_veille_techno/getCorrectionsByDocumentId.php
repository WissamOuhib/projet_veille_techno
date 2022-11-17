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
  //echo $id_document;

    
$corrections = [];
//$sql = "SELECT * FROM document WHERE valide=1 AND id=(SELECT id_correction FROM correction WHERE id_document={$id_document})";
//$sql = "SELECT * FROM document WHERE valide=1 AND id=(SELECT id_correction FROM correction WHERE id_document=1)";
$sql1 = "SELECT * FROM correction WHERE id_document=$id_document";


if($result1 = mysqli_query($con,$sql1))
{
 //var_dump($result1);

  $ids_corrections = array();
  $i = 0;

  while($row_correction = mysqli_fetch_assoc($result1))
  {
    $ids_corrections[$i] = $row_correction;
    $i++;
  }  

  //var_dump($ids_corrections);

  $doc = 0;
  foreach($ids_corrections as $row){ 
      $id_correction = $row['id_correction'];
      //var_dump($id_correction);
      $sql2 = "SELECT * FROM document WHERE id=$id_correction";

      if($result2 = mysqli_query($con,$sql2)){ 
        //var_dump($result2);

        while($row_document_correction = mysqli_fetch_assoc($result2)){

            $corrections[$doc]['id']    = $row_document_correction['id'];
            $corrections[$doc]['nom'] = $row_document_correction['nom'];
            $corrections[$doc]['path'] = $row_document_correction['path'];
            $corrections[$doc]['annee']    = $row_document_correction['annee'];
            $corrections[$doc]['domaine'] = $row_document_correction['domaine'];
            $corrections[$doc]['niveau'] = $row_document_correction['niveau'];
            $corrections[$doc]['date_ajout']    = $row_document_correction['date_ajout'];
            $corrections[$doc]['valide'] = $row_document_correction['valide'];
            $doc++;
        }

        //var_dump($corrections);

      }

  }
  
  echo json_encode(['data'=>$corrections]);
}
}
