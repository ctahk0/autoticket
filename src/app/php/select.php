<?php

// if(!isset($_SERVER['HTTP_REFERER'])){
//     // redirect them to your desired location
//     header('location:../index.html');
//     exit;
// }

include_once "connection.php";

if (isset($_GET['tbl'])) {
    $tbl = $_GET['tbl'];

    // $request = json_decode( file_get_contents('php://input') );
    // $tbl = $request->data;

    try 
    {
        // header('Content-Type: application/json');
        $dba = new Connection();
        $db = $dba->openConnection();
        // echo 'Connection is open';
        if ($tbl == 't1') {
            $sql = "SELECT * FROM qtiket WHERE tip like '1' or tip like '2'";
        }else if ($tbl == 't2') {
            $sql = "SELECT * FROM qtiket WHERE tip like 'U' or tip like 'O'";
        }else{ 
            $sql = "SELECT * FROM `$tbl`";
        }

        // echo $sql;
        header('Content-type: application/json; charset=utf-8');
        $stm = $db->prepare($sql);

        $arr = array();
        $stm->execute();
        // $dbreturn = $stm->fetchAll(PDO::FETCH_ASSOC);
        $rows = array();

        while ($row = $stm->fetch(PDO::FETCH_ASSOC)) {
            $arr[] = array_map('utf8_encode', $row);
        }

        echo json_encode($arr);
        
        
        // echo json_encode($dbreturn);
        // echo json_encode($dbreturn);
        }
    catch (PDOException $e)
    {
        echo "There is some problem in connection: " . $e->getMessage();
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