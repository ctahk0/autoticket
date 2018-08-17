<?php

// if(!isset($_SERVER['HTTP_REFERER'])){
//     // redirect them to your desired location
//     header('location:../index.html');
//     exit;
// }

$_json = file_get_contents('php://input');

if(isset($_json) && !empty($_json))
{
    header('Content-Type: application/json');
    $arr = json_decode( $_json, true );
    // var_dump($arr);
    include_once 'connection.php';

    try
    { 
    $dba = new Connection();
    $db = $dba->openConnection();

        $prep = array();
        $sql = 'INSERT INTO pravila (opis, kvota1, kvota2, razlika) VALUES ';
        $insertQuery = array();
        $insertData = array();
        // foreach ($arr as $item) {
            $insertQuery[] = '(?, ?, ?, ?)';
            $insertData[] = $arr['opis'];
            $insertData[] = $arr['kvota1'];
            $insertData[] = $arr['kvota2'];
            $insertData[] = $arr['razlika'];
        // }
        
        if (!empty($insertQuery)) {
            $sql .= implode(', ', $insertQuery);
            $stm = $db->prepare($sql);
            $stm->execute($insertData);
        }

        echo json_encode("Pravilo insert successfully");
    }
    catch (PDOException $e)
    {
        echo json_encode("There is some problem in connection: " . $e->getMessage());
    }

    try {
        $dba->closeConnection();
        $stm = null;
        $dba = null;
        $db = null;
        // echo json_encode('Connection closed');
    }
    catch (PDOException $e) {
        echo "There is some problem closing connection: " . $e->getMessage();
    }
}
?>