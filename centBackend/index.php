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
        case 'history':
            $jahr = post_get_session_pruefen("jahr");    
            $monat = post_get_session_pruefen("monat");            
            echo json_encode(db_history($zeiger,$jahr,$monat));
            break;
        case 'deleteCent':
            $id = post_get_session_pruefen("id");
            echo json_encode(db_delete_cent($zeiger,$id));
            break;
        case 'add':
            $anzahl = post_get_session_pruefen("count");
            $idkomb = post_get_session_pruefen("combination");
            echo json_encode(db_cent_hinzufuegen($zeiger, $anzahl, $idkomb));
            break;
        default:
        $return = "Cent-Backend antwortet";
            break;
    }

    db_trennen($zeiger);
?>