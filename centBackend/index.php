<?php
    header('Content-Type: application/json; charset=utf-8'); 
    header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0');
    header('Access-Control-Allow-Origin: *');  
    
    include_once( "./inc/init.inc.php");

    $zeiger = db_verbinden();
    
    switch ($step) {
        case 'land':
            echo $step;
            break;
        
        default:
            echo json_encode(db_laender($zeiger));
            break;
    }

    db_trennen($zeiger);
?>