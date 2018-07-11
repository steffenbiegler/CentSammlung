<?php
    header('Content-Type: application/json; charset=utf-8'); 
    header('Cache-Control: must-revalidate, pre-check=0, no-store, no-cache, max-age=0, post-check=0');
    header('Access-Control-Allow-Origin: *');  
    
    include_once( "./inc/init.inc.php");

    $zeiger = db_verbinden();
    
    switch ($request) {
        case 'comb_year':
            echo json_encode(getYearCombinationResultSet($zeiger));
            break;           
     
     
        case 'countries':
            echo json_encode(db_laender($zeiger));
            break;        
        case 'combinations':
            echo json_encode(db_kombinationen($zeiger));
            break;
        case 'cities':
            echo json_encode(db_staedte($zeiger));
            break;
        case 'count':
            echo json_encode(db_cents_gesamt($zeiger));
            break;                    
        case 'count_year':
            echo json_encode(db_cents_jahre($zeiger));
            break;     
        case 'count_city':
            echo json_encode(db_staedte_jahre($zeiger));
            break; 
        case 'count_country':
            echo json_encode(db_laender_jahre($zeiger));
            break;
        case 'grow':
            echo json_encode(db_monatssummen($zeiger));
            break;
        case 'ranking':
            echo json_encode(db_ranking($zeiger, '40'));
            break;
        default:
        $return = "Cent-Backend antwortet";
            break;
    }

    db_trennen($zeiger);
?>