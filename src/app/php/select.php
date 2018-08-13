<?php
include_once "connection.php";

if (isset($_GET['tbl'])) {
    $tbl = $_GET['tbl'];

    // $request = json_decode( file_get_contents('php://input') );
    // $tbl = $request->data;

    try 
    {
        header('Content-Type: application/json');
        $dba = new Connection();
        $db = $dba->openConnection();
        $sql = "SELECT * FROM `$tbl`";

        // echo $sql;
        $stm = $db->prepare($sql);

        // $dbreturn = array();
        $stm->execute();
        $dbreturn = $stm->fetchAll(PDO::FETCH_ASSOC);

        // foreach ($db->query($sql) as $row) {
        //     $dbreturn[] = $row;
        // }
        
        echo json_encode($dbreturn);
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