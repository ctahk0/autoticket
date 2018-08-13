<?php

$_json = file_get_contents('php://input');

$arr = json_decode( $_json, true );
// var_dump($arr['id']);
// exit;

if(isset($_json) && !empty($_json))
{
    header('Content-Type: application/json');
    $arr = json_decode( $_json, true );
    // var_dump($arr);
    include_once 'connection.php';

    try
    { 
        $_id = $arr['id'];
        $dba = new Connection();
        $db = $dba->openConnection();
        $sql = "DELETE FROM tiket WHERE `gameID` = '" . $_id . "'";
        // var_dump($sql);
        $affectedrows  = $db->exec($sql);
    
      if(isset($affectedrows))
       {
        //   echo json_encode('Tiket has been successfully deleted');
       }
   }
   catch (PDOException $e)
   {
      echo 'There is some problem with tiket connection: ' . $e->getMessage();
   }

   try {
    $dba->closeConnection();
    $dba = null;
    $db = null;
    // echo json_encode('Connection closed');
    }
    catch (PDOException $e) {
        echo "There is some problem closing connection: " . $e->getMessage();
    }
}
?>