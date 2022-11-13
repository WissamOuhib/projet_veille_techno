<?php

require 'connect.php';

$postdata = file_get_contents('php://input');


if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $data = json_decode($postdata, true);
  $id = $data['id']; 
//   echo $id;

$id = (int)$id;

// valider.

$sql = "UPDATE document SET valide= 1 WHERE id = '{$id}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}


}

