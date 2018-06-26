<?php
    header('Content-Type: application/json; charset=utf-8'); 
    header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0');
    header('Access-Control-Allow-Origin: *');  
    
    include_once( "./inc/init.inc.php");

    $zeiger = db_verbinden();
    
    switch ($step) {
        case 'countries':
            echo json_encode(db_laender($zeiger));;
            break;        
        case 'combinations':
            echo json_encode(db_kombinationen($zeiger));;
            break;
        case 'cities':
            echo json_encode(db_staedte($zeiger));;
            break;
        case 'count':
            echo json_encode(db_cents_gesamt($zeiger));;
            break;
            
        default:
        $return = json_encode(db_laender($zeiger))."<br>";
            $return.= json_encode(db_kombinationen($zeiger))."<br>";  
            $return.= json_encode(db_staedte($zeiger))."<br>";  
            $return.= json_encode(db_cents_gesamt($zeiger))."<br>";  
            echo $return;
            break;
    }

    db_trennen($zeiger);
?>