<?php

// if(!isset($_SERVER['HTTP_REFERER'])){
//     // redirect them to your desired location
//     header('location:../index.html');
//     exit;
// }

$_json = file_get_contents('php://input');
// var_dump($_json);

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
        date_default_timezone_set('Europe/Belgrade');
        $prep = array();
        $sql = 'INSERT IGNORE INTO tiket (gameID, tip, odds, razlika, currOdds, currtime, napomena) VALUES ';
        $insertQuery = array();
        $insertData = array();
        foreach ($arr as $item) {
            $insertQuery[] = '(?, ?, ?, ?, ?, ?, ?)';
            $insertData[] = $item['gameid'];
            $insertData[] = $item['tip'];
            $insertData[] = $item['odds'];
            $insertData[] = $item['razlika'];
            $insertData[] = $item['currodds'];
            $insertData[] = date('Y-m-d H:i:s'); // date("Y-m-d H:i:s", strtotime('+2 hours'));
            $insertData[] = $item['napomena'];
        }
        
        if (!empty($insertQuery)) {
            $sql .= implode(', ', $insertQuery);
            $stm = $db->prepare($sql);
            $stm->execute($insertData);
            $count = $stm->rowCount();
            $_lid = $db->lastInsertId();
        }
        if ($_lid !=0 ) {
            echo json_encode($count . " Tiket(s) inserted successfully. ID: " . $_lid);
        }
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