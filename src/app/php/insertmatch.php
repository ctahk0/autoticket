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
    include_once 'connection.php';

    try
    {
    $dba = new Connection();
    $db = $dba->openConnection();

    // inserting data into table using prepare statement to prevent from sql injections 
    //    $stm = $db->prepare("INSERT INTO matches (oID, league, country, dTime, HomeTeam, AwayTeam) 
    //                                    VALUES ( :id, :league, :country, :dTime, :HomeTeam, :AwayTeam)");

        // Empty temp table 
        $sql1 = 'DELETE FROM `matches_temp` WHERE 1';
        $affectedrows  = $db->exec($sql1);
        if(isset($affectedrows)) { 
            // echo json_encode('Record has been successfully deleted');
        }

        $prep = array();
        $sql = 'INSERT IGNORE INTO matches (oID, league, country, dTime, HomeTeam, AwayTeam, played, oah0_1, oah0_2, cah0_1, cah0_2) VALUES ';
        $sql1 = 'INSERT IGNORE INTO matches_temp (oID, cah0_1, cah0_2) VALUES ';
        $insertQuery = array();
        $insertData = array();
        $insertQuery1 = array();
        $insertData1 = array();
        date_default_timezone_set('Europe/Belgrade');
        // $dattetemp = date();
        foreach ($arr as $tim) {
            // $datetemp = $tim['time'];
            // $newdate = strtotime ( '+2 hours' , strtotime ( $datetemp ) ) ;
            // $newdate = date ( 'Y-m-d H:i:s' , $newdate );
            
            $date=date_create($tim['time']);
            date_add($date,date_interval_create_from_date_string("2 hours"));
            // echo date_format($date,"Y-m-d H:i:s ");

            $datetemp = $tim['time'];
            $insertQuery[] = '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            $insertQuery1[] = '(?, ?, ?)';
            $insertData[] = $tim['x-id'];
            $insertData1[] = $tim['x-id'];
            $insertData[] = $tim['league'];
            $insertData[] = $tim['country'];
            $insertData[] = date_format($date, 'Y-m-d H:i:s');
            $insertData[] = $tim['hometeam'];
            $insertData[] = $tim['awayteam'];
            $insertData[] = 0;
            $insertData[] = $tim['first']['1'];
            $insertData[] = $tim['first']['2'];
            $insertData[] = $tim['last']['1'];
            $insertData[] = $tim['last']['2'];
            $insertData1[] = $tim['last']['1'];
            $insertData1[] = $tim['last']['2'];

        }
        
        if (!empty($insertQuery)) {
            $sql .= implode(', ', $insertQuery);
            $sql1 .= implode(', ', $insertQuery1);
            // var_dump ($sql);

            $stm = $db->prepare($sql);
            $stm1 = $db->prepare($sql1);
            $stm->execute($insertData);
            $stm1->execute($insertData1);
        }

        echo json_encode('Matches inserted successfully ' . date('d-m-Y H:i:s'));
        
        // // UPDATE - kvote
        $sql3 = 'UPDATE matches INNER JOIN matches_temp ON (matches.oID = matches_temp.oID) ';
        $sql3 .= 'SET matches.cah0_1 = matches_temp.cah0_1, matches.cah0_2 = matches_temp.cah0_2';

        // // var_dump($sql3);

        $affectedrows = $db->exec($sql3);
        if(isset($affectedrows)) { 
            // echo json_encode($affectedrows . ' Current Odds has been successfully updated');
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