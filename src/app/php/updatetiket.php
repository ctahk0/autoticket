<?php

// if(!isset($_SERVER['HTTP_REFERER'])){
//     // redirect them to your desired location
//     header('location:../index.html');
//     exit;
// }

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
        $_rez = $arr['rez'];
        $dba = new Connection();
        $db = $dba->openConnection();
        $sql = "UPDATE tiket SET rezultat = " . $_rez . " WHERE `gameID` = '" . $_id . "'";
        // var_dump($sql);
        $affectedrows  = $db->exec($sql);
    
      if(isset($affectedrows))
       {
          echo json_encode('Result has been successfully updated');
       }
   }
   catch (PDOException $e)
   {
      echo 'There is some problem with tiket connection: ' . $e->getMessage();
   }
   try {
    $dba->closeConnection();
    // $stm = null;
    $dba = null;
    $db = null;
    // echo json_encode('Connection closed');
    }
    catch (PDOException $e) {
        echo "There is some problem closing connection: " . $e->getMessage();
    }
}
?>