<?php
/*
----------------------------------------------------------------------------------------------------
Name....................:datenbank.inc.php
Projekt.................:newCent
Autoren.................:Steffen Biegler, Juliane Henning
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:regelt die Datenbankzugriffe & -abfragen
----------------------------------------------------------------------------------------------------
*/

/*
----------------------------------------------------------------------------------------------------
Name....................:db_verbinden
Projekt.................:newCent
Autor...................:Steffen Biegler
Erstellung..............:19.07.2011
Modifizierungen.........:21.02.2012
Funktion................:stellt Verbindung zur Datenbank her
----------------------------------------------------------------------------------------------------
*/


function db_verbinden(){
	$zeiger =	@mysqli_connect(K_DB_HOST,K_USER,K_PW,K_DB);				
	if( @mysqli_connect_errno()) {
			$error = @mysqli_connect_error();
			$zeiger = FALSE;
			//echo "<h1>Verbindung zur Datenbank fehlgeschlagen!</h1>";						
	}		
	mysqli_set_charset($zeiger, "utf8");
	return $zeiger;	
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_trennen
Projekt.................:newCent
Autor...................:Steffen Biegler
Erstellung..............:19.07.2011
Modifizierungen.........:
Funktion................:schließt Verbindung zur Datenbank
----------------------------------------------------------------------------------------------------
*/
function db_trennen($zeiger){
	if ($zeiger){
		mysqli_close($zeiger);
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_cent_hinzufuegen
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:trägt cents ein
----------------------------------------------------------------------------------------------------
*/
function db_cent_hinzufuegen($zeiger, $anzahl, $idkomb, $datum =""){	
	if ($zeiger){
		if ($datum == "") $datum = date("Y-m-d H:i:s");
		else $datum.=date(" H:i:s");
		$sql = 'INSERT INTO `'.K_DB.'`.`tbl_cent` (`IDkomb`,`anzahl`,`datum`) VALUES (\''.$idkomb.'\',\''.$anzahl.'\',\''.$datum.'\');'; 
		$result= mysqli_query($zeiger, $sql);	
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_kombinationen
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:gibt alle kombinationen eines landes zurück
----------------------------------------------------------------------------------------------------
*/
function db_kombinationen($zeiger, $landid = "", $jahr ="", $stadtid = "" ){	
	if ($zeiger){
		if ($jahr != "")
			// wenn land, jahr und stadt bekannt und nur die id gesucht ist
		if ($stadtid != "" && $stadtid >= 1) $sql = 'SELECT IDkomb ,jahr,stadt_lang,stadt_kurz,land FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt`USING(`IDstadt`) WHERE `tbl_kombination`.`IDland` = '.$landid.'  AND `tbl_kombination`.`IDstadt` ='.$stadtid.'  AND `tbl_kombination`.`jahr` ='.$jahr;
		// wenn land und jahr bekannt und nur die id gesucht ist
		else $sql = 'SELECT IDkomb ,jahr,land FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) WHERE `tbl_kombination`.`IDland` = '.$landid.' AND `tbl_kombination`.`jahr` ='.$jahr;    
		// wenn land bekannt und alle kombis gesucht werden
		else if ($landid != "")	$sql = 'SELECT IDkomb ,jahr,stadt_lang,stadt_kurz FROM `tbl_kombination` LEFT JOIN `tbl_stadt`USING(`IDstadt`) WHERE `tbl_kombination`.`IDland` = '.$landid.' ORDER BY `stadt_kurz` ASC, `jahr` DESC'; 		
		// alle Kombinationen finden
		else $sql = 'SELECT * FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt` USING(IDstadt) ORDER BY `land` ASC, `stadt_kurz` ASC, `jahr` DESC'; 
		$result= mysqli_query($zeiger, $sql);	
		if ($result){ // Falls Datensatz vorhanden 
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
				{
					$a_komb[]= $row;
				}
		}
		return $a_komb;
	}
}
	
	
	/*
----------------------------------------------------------------------------------------------------
Name....................:db_kombinationen
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:
----------------------------------------------------------------------------------------------------
*/
function db_kombinationenByID($zeiger, $kombid){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt` USING(IDstadt)  WHERE `tbl_kombination`.`IDkomb` = '.$kombid.'  ORDER BY `land` ASC, `stadt_kurz` ASC, `jahr` DESC'; 
		$result= mysqli_query($zeiger, $sql);	
		if ($result){ // Falls Datensatz vorhanden 
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
				{
					$a_komb[]= $row;
				}
		}
	}
	return $a_komb;	
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_dt_kombinationen
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:30.12.2015
Modifizierungen.........:
Funktion................:gibt alle deutschen Kombination zurück
----------------------------------------------------------------------------------------------------
*/
function db_dt_kombinationen($zeiger){	
	if ($zeiger){
		$sql = 'SELECT IDkomb ,jahr,stadt_lang,stadt_kurz,land FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt`USING(`IDstadt`) WHERE `tbl_kombination`.`IDland` = 2  ORDER BY  `jahr` ASC,`stadt_kurz` ASC;';
		$result= mysqli_query($zeiger, $sql);	
		if ($result){ // Falls Datensatz vorhanden 
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
				{
					$a_komb[]= $row;
				}
		}
		return $a_komb;
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_check_kombination
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:03.04.2013
Modifizierungen.........:
Funktion................:überprüft ob es die übergebene Kombination gibt
----------------------------------------------------------------------------------------------------
*/
function db_check_kombination($zeiger, $land, $jahr ){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_kombination` LEFT JOIN `tbl_land` USING ( `IDland` ) WHERE `jahr` = '.$jahr.' AND `land` = "'.$land.'"'; 
		$result= mysqli_query($zeiger, $sql);	
		$ok = false;
		if ($result){ // Falls Datensatz vorhanden 
			$a_komb = mysqli_fetch_row($result);
			if (count($a_komb) > 0) $ok = true;
		}
		return $ok;
	}
}


/*
----------------------------------------------------------------------------------------------------
Name....................:db_neues_land
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:erstellt ein neues Land
----------------------------------------------------------------------------------------------------
*/
function db_neues_land($zeiger, $land){	
	if ($zeiger){
		$sql = 'INSERT INTO `'.K_DB.'`.`tbl_land` (`land`) VALUES (\''.$land.'\');'; 
		$result = mysqli_query($zeiger, $sql);	
		$sql = 'SELECT LAST_INSERT_ID()';
		$result= mysqli_query($zeiger, $sql);
		$lastid = mysqli_fetch_row($result);
		return $lastid[0];
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_neue_kombination
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:erstellt eine neue Prägekombination
----------------------------------------------------------------------------------------------------
*/
function db_neue_kombination($zeiger, $landid, $jahr){	
		if ($zeiger){
		$ok = TRUE;
		$sql = 'SELECT * FROM `tbl_kombination` WHERE jahr = '.$jahr.' and IDland = '.$landid; 
		$result= mysqli_query($zeiger, $sql);	
		if (mysqli_num_rows($result) == 0){
			$sql = 'SELECT * FROM `tbl_land` WHERE `IDland`='.$landid;
			$result= mysqli_query($zeiger, $sql);		
			$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
			if ($row["land"] == "Deutschland"){
				$a_stadt = db_staedte($zeiger);		
				if (is_array($a_stadt)){
					foreach ($a_stadt as $stadt){
						$sql = 'INSERT INTO `'.K_DB.'`.`tbl_kombination` (`IDland`, `IDstadt`, `jahr`) VALUES (\''.$landid.'\',\''.$stadt["IDstadt"].'\',\''.$jahr.'\');'; 					
						$result= mysqli_query($zeiger, $sql);			
					}
				}
				else{
					$sql = 'INSERT INTO `'.K_DB.'`.`tbl_kombination` (`IDland`, `jahr`) VALUES (\''.$landid.'\',\''.$jahr.'\');'; 	
					$result= mysqli_query($zeiger, $sql);		
				}
			}	
			else{
				$sql = 'INSERT INTO `'.K_DB.'`.`tbl_kombination` (`IDland`, `jahr`) VALUES (\''.$landid.'\',\''.$jahr.'\');'; 	
				$result= mysqli_query($zeiger, $sql);		
			}	
		}
		else{
			$ok = FALSE;
		}
		return $ok;	
	}
}


/*
----------------------------------------------------------------------------------------------------
Name....................:db_loesche_kombination
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:löscht eine Prägekombination
----------------------------------------------------------------------------------------------------
*/
function db_loesche_kombination($zeiger, $kombid){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_cent` where `IDkomb` = '.$kombid; 
		$result= mysqli_query($zeiger, $sql);	
		if (!$result || mysqli_num_rows($result) == 0){ // Falls kein Datensatz vorhanden ist
			$sql = 'DELETE FROM `tbl_kombination` WHERE `tbl_kombination`.`IDkomb` = '.$kombid.' LIMIT 1'; 
			$result= mysqli_query($zeiger, $sql);	
			return TRUE;
		}	
		else{
			return FALSE;
		}
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_letzteAtualisierung
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:22.02.2012
Modifizierungen.........:
Funktion................:gibt an wann das letzte mal an der Dantenbank gearbeitet wurde
----------------------------------------------------------------------------------------------------
*/
function db_letzteAtualisierung($zeiger){	
	if ($zeiger){
		$sql = 'SELECT `datum` FROM `tbl_cent` ORDER BY `tbl_cent`.`datum` DESC Limit 0,1'; 
		$result= mysqli_query($zeiger, $sql);	
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		return $row["datum"];
	}
}




/*
----------------------------------------------------------------------------------------------------
Name....................:db_laender
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:gibt die Länder zurück
----------------------------------------------------------------------------------------------------
*/
function db_laender($zeiger){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_land` ORDER BY `IDland` ASC'; 	
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_land[]= $row;
			}
		return $a_land;
	}
}


/*
----------------------------------------------------------------------------------------------------
Name....................:db_staedte
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:gibt die Städte zurück
----------------------------------------------------------------------------------------------------
*/
function db_staedte($zeiger){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_stadt` ORDER BY `stadt_kurz` ASC'; 	
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_stadt[]= $row;
			}
		return $a_stadt;
	}
}


/*
----------------------------------------------------------------------------------------------------
Name....................:db_cents_gesamt
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:gibt die gesamtzahl an Cents zurück
----------------------------------------------------------------------------------------------------
*/
function db_cents_gesamt($zeiger, $datum = ""){	
	if ($zeiger){
		if ($datum == "") $datum = date("Y-m-d H:i:s");
		$sql = 'SELECT SUM(`anzahl`) AS gesamt FROM `tbl_cent` where `datum` <= \''.$datum.'\'';
		$result= mysqli_query($zeiger, $sql);	
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		return $row["gesamt"];
	}	
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_cents_jahre
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:21.02.2012
Modifizierungen.........:
Funktion................:gibt alle Jahre mit zugehöriger Anzahl Cents zurück
----------------------------------------------------------------------------------------------------
*/
function db_cents_jahre($zeiger)
{
	if ($zeiger){	
		$sql = 'SELECT `jahr`, SUM(`anzahl`) as anzahl FROM tbl_kombination left join tbl_cent using(`IDkomb`) group by `jahr`';
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_cents_jahr[]= $row;
		}
		db_trennen($zeiger);
		return $a_cents_jahr;
	}
}
/*
----------------------------------------------------------------------------------------------------
Name....................:db_staedte_jahre
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:22.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die Deutschen Prägekombinationen zurück
----------------------------------------------------------------------------------------------------
*/

function db_staedte_jahre($zeiger)
{
	if ($zeiger){
		$sql = 'select stadt_lang, stadt_kurz, jahr, sum(anzahl) as anzahl '
			. ' from tbl_stadt'
			. ' left join tbl_kombination using(IDstadt)'
			. ' left join tbl_cent using(IDkomb)'
			. ' where IDland IN(Select IDland from tbl_land where land ="Deutschland")'
			. ' group by jahr, IDstadt'; 
	  $result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_staedte_jahre[]= $row;
		}
		db_trennen($zeiger);
		return $a_staedte_jahre;
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_laender_jahre
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:22.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die europäischen Prägekombinationen zurück
----------------------------------------------------------------------------------------------------
*/
function db_laender_jahre($zeiger)
{
	if ($zeiger){
		$sql = 'select jahr , land , sum( anzahl ) as anzahl '
			. ' from tbl_kombination '
			. ' left join tbl_land using ( IDland ) '
			. ' left join tbl_cent using ( IDkomb ) '
			. ' group by land , jahr '
			. ' order by jahr, IDland ';
	  $result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_laender_jahre[]= $row;
		}
		db_trennen($zeiger);
		return $a_laender_jahre;
		
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_monatssummen
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:23.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die Zuwachsstatistik zurück
----------------------------------------------------------------------------------------------------
*/
function db_monatssummen($zeiger)
{
	if ($zeiger){
		$sql = 'select MONTHNAME( datum ) as monat , YEAR( datum ) as eingabejahr , sum( anzahl ) as anzahl from tbl_cent group by eingabejahr , monat  order by datum'; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_monatssumme[]= $row;
		}
		db_trennen($zeiger);
		//print_r($a_monatssumme);
		return $a_monatssumme;
	}
}
/*
----------------------------------------------------------------------------------------------------
Name....................:db_monatssummen_dt
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:23.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die Zuwachsstatistik zurück
----------------------------------------------------------------------------------------------------
*/
function db_monatssummen_dt($zeiger)
{
	if ($zeiger){
		$sql = 'select MONTHNAME( datum ) as monat , YEAR( datum ) as eingabejahr , sum( anzahl ) as anzahl from tbl_cent '
			. ' left join tbl_kombination using(IDkomb)'
			. ' left join tbl_land using(IDland)'
			. ' where land=\'Deutschland\' '
			. ' group by eingabejahr , monat order by datum'; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_monatssumme_dt[]= $row;
		}
		db_trennen($zeiger);
		//print_r($a_monatssumme);
		return $a_monatssumme_dt;
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_staettesummen
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:24.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die Stätte-Statistik zurück
----------------------------------------------------------------------------------------------------
*/
function db_staettesummen($zeiger)
{
	if ($zeiger){
		$sql = 'select stadt_kurz, stadt_lang, sum(anzahl) as anzahl '
			. ' from tbl_stadt'
			. ' left join tbl_kombination using(IDstadt)'
			. ' left join tbl_cent using(IDkomb)'
			. ' left join tbl_land using(IDland)'
			. ' where land=\'Deutschland\''
			. ' group by IDstadt'
			. ' order by stadt_kurz'; 
	  
	  $result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_staettesumme[]= $row;
		}
		db_trennen($zeiger);
		
		return $a_staettesumme;      
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_staettesummen
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:24.02.2012
Modifizierungen.........:
Funktion................:gibt die gesamte History zurück
----------------------------------------------------------------------------------------------------
*/
function db_history($zeiger, $jahr = "", $monat = ""){
	if ($zeiger){
		$a_history = null;
		if ($jahr == "" && $monat == "") 	$sql = 'SELECT anzahl , land , jahr , stadt_lang , stadt_kurz, datum as heute FROM `tbl_cent` LEFT JOIN `tbl_kombination` USING(`IDkomb`) LEFT JOIN tbl_land USING(`IDland`) LEFT JOIN tbl_stadt USING(`IDstadt`) ORDER BY `datum` DESC'; 
		else if ($monat == "") $sql = 'SELECT anzahl , land , jahr , stadt_lang , stadt_kurz, datum as heute, FROM `tbl_cent` LEFT JOIN `tbl_kombination` USING(`IDkomb`) LEFT JOIN tbl_land USING(`IDland`) LEFT JOIN tbl_stadt USING(`IDstadt`) where YEAR(`datum`) = '.$jahr.' ORDER BY `datum`'; 
		else $sql = 'SELECT anzahl , land , jahr , stadt_lang , stadt_kurz, datum as heute FROM `tbl_cent` LEFT JOIN `tbl_kombination` USING(`IDkomb`) LEFT JOIN tbl_land USING(`IDland`) LEFT JOIN tbl_stadt USING(`IDstadt`) where YEAR(`datum`) = '.$jahr.' AND MONTH(`datum`) = '.$monat.' ORDER BY `datum` DESC';		
		$result= mysqli_query($zeiger, $sql);
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_history[]= $row;
			}
		return $a_history;
	}
}


/*
----------------------------------------------------------------------------------------------------
Name....................:db_monat
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:27.02.2012
Modifizierungen.........:
Funktion................:gibt alle monate, in denen Cents eingetragen wurden, zurück
----------------------------------------------------------------------------------------------------
*/
function db_monat($zeiger, $sort='DESC'){	
	if ($zeiger){
		$a_monat = null;
		$sql = 'SELECT Distinct MONTH( `datum` ) AS monatnr , MONTHNAME(datum) as monat, YEAR( `datum` ) AS jahr FROM `tbl_cent` Order by jahr '.$sort.', monatnr '.$sort.''; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
				$a_monat[]= $row;			
		}
		/*if ($a_monat[0]["monatnr"] < intval(date("m"))){		
			$a_monat[-1]["monatnr"] = intval(date("m"));
			$a_monat[-1]["jahr"] = date("Y");
			ksort($a_monat);
		} */
		return $a_monat;
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_zuwachs
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:27.02.2012
Modifizierungen.........:
Funktion................:gibt die Daten für die städteweise Zuwachsstatistik zurück
----------------------------------------------------------------------------------------------------
*/
function db_zuwachs($zeiger,$stadt_kurz, $jahr, $monat)
{
	if ($zeiger){
		$sql = 'select jahr, sum(anzahl) as anzahl'
			. ' from tbl_cent'
			. ' left join tbl_kombination using(IDkomb)'
			. ' left join tbl_stadt using(IDstadt)'
			. ' where stadt_kurz = \''.$stadt_kurz.'\' AND MONTH(datum)='.$monat.' AND YEAR(datum)='.$jahr
			. ' group by jahr';

	  $result= mysqli_query($zeiger, $sql);	
		$a_zuwachs = array();
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_zuwachs[]= $row;			
			}

		return $a_zuwachs;     
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_praegejahre_dt
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:27.02.2012
Modifizierungen.........:
Funktion................:gibt die Prägejahre Deutschlands zurück (ANDERE VERWENDUNG UNMÖGLICH!!!!!!) :P
----------------------------------------------------------------------------------------------------
*/
function db_praegejahre_dt($zeiger){	
	if ($zeiger){
		$sql = 'SELECT jahr FROM `tbl_kombination` '
			. ' left join tbl_land using(IDland)'
			. ' where `land` = \'Deutschland\' '
			. ' group by jahr'
			. ' ORDER BY `jahr` ASC'; 	
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_jahr[]= $row["jahr"];
			}
		db_trennen($zeiger);
		return $a_jahr;
	}
}

/*
----------------------------------------------------------------------------------------------------
Name....................:db_monatswerte
Projekt.................:newCent
Autoren.................:Steffen Biegler
Erstellung..............:27.02.2012
Modifizierungen.........:
Funktion................:gibt die Zahlen für die Monatsabrechnung zurück
----------------------------------------------------------------------------------------------------
*/
function db_monatswerte($zeiger,$jahr="",$monat=""){
		if ($zeiger){
		$a_monat = null;
		$sql = 'SELECT sum( anzahl ) as anzahl , land , jahr , stadt_lang , stadt_kurz FROM `tbl_kombination` ';
		$sql.=' LEFT JOIN `tbl_cent` USING ( `IDkomb` ) ';
		$sql.=' LEFT JOIN `tbl_stadt` USING ( `IDstadt` ) ';
		$sql.=' LEFT JOIN `tbl_land` USING ( `IDland` ) WHERE';
		if ($monat != "") $sql.=' MONTH( `Datum` ) = '.$monat.' AND';
		$sql.=' YEAR( `Datum` ) = '.$jahr;
		$sql.=' GROUP BY `IDkomb` ';
		$sql.=' ORDER BY `land` ASC, `stadt_kurz` ASC, jahr ASC ';;        
	  $result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_monat[]= $row;
			}	
		return $a_monat;     		
	}
}
/*
----------------------------------------------------------------------------------------------------
Name....................:db_ranking
Projekt.................:newCent
Autoren.................:Juliane Henning
Erstellung..............:28.02.2012
Modifizierungen.........:
Funktion................:gibt die Zahlen für das Ranking zurück
----------------------------------------------------------------------------------------------------
*/
function db_ranking($zeiger)
{
	if ($zeiger){
		$sql = 'select land, stadt_lang, jahr, sum(anzahl) as anz'
			. ' from tbl_cent'
			. ' left join tbl_kombination using(idkomb)'
			. ' left join tbl_stadt using(idstadt)'
			. ' left join tbl_land using(idland)'
			. ' group by land, stadt_lang, jahr'
			. ' order by anz DESC'
			. ' limit 0,30'; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_ranking[]= $row;
			}	
		return $a_ranking; 
	}
}

?>