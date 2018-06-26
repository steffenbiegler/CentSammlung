<?php

function db_verbinden(){
	$zeiger =	@mysqli_connect(K_DB_HOST,K_USER,K_PW,K_DB);				
	if( @mysqli_connect_errno()) {
			$error = @mysqli_connect_error();
			$zeiger = FALSE;					
	}		
	mysqli_set_charset($zeiger, "utf8");
	return $zeiger;	
}

function db_trennen($zeiger){
	if ($zeiger){
		mysqli_close($zeiger);
	}
}


function db_cent_hinzufuegen($zeiger, $anzahl, $idkomb, $datum =""){	
	if ($zeiger){
		if ($datum == "") $datum = date("Y-m-d H:i:s");
		else $datum.=date(" H:i:s");
		$sql = 'INSERT INTO `'.K_DB.'`.`tbl_cent` (`IDkomb`,`anzahl`,`datum`) VALUES (\''.$idkomb.'\',\''.$anzahl.'\',\''.$datum.'\');'; 
		$result= mysqli_query($zeiger, $sql);	
	}
}

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
	

function db_kombinationenByID($zeiger, $kombid){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt` USING(IDstadt)  WHERE `tbl_kombination`.`IDkomb` = '.$kombid.'  ORDER BY `land` ASC, `stadt_kurz` ASC, `jahr` DESC'; 
		$result= mysqli_query($zeiger, $sql);	
		if ($result){ 
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
				{
					$a_komb[]= $row;
				}
		}
	}
	return $a_komb;	
}

function db_dt_kombinationen($zeiger){	
	if ($zeiger){
		$sql = 'SELECT IDkomb ,jahr,stadt_lang,stadt_kurz,land FROM `tbl_kombination` LEFT JOIN `tbl_land` USING(IDland) LEFT JOIN `tbl_stadt`USING(`IDstadt`) WHERE `tbl_kombination`.`IDland` = 2  ORDER BY  `jahr` ASC,`stadt_kurz` ASC;';
		$result= mysqli_query($zeiger, $sql);	
		if ($result){ 
			while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
				{
					$a_komb[]= $row;
				}
		}
		return $a_komb;
	}
}

function db_check_kombination($zeiger, $land, $jahr ){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_kombination` LEFT JOIN `tbl_land` USING ( `IDland` ) WHERE `jahr` = '.$jahr.' AND `land` = "'.$land.'"'; 
		$result= mysqli_query($zeiger, $sql);	
		$ok = false;
		if ($result){ 
			$a_komb = mysqli_fetch_row($result);
			if (count($a_komb) > 0) $ok = true;
		}
		return $ok;
	}
}


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

function db_loesche_kombination($zeiger, $kombid){	
	if ($zeiger){
		$sql = 'SELECT * FROM `tbl_cent` where `IDkomb` = '.$kombid; 
		$result= mysqli_query($zeiger, $sql);	
		if (!$result || mysqli_num_rows($result) == 0){
			$sql = 'DELETE FROM `tbl_kombination` WHERE `tbl_kombination`.`IDkomb` = '.$kombid.' LIMIT 1'; 
			$result= mysqli_query($zeiger, $sql);	
			return TRUE;
		}	
		else{
			return FALSE;
		}
	}
}

function db_letzteAtualisierung($zeiger){	
	if ($zeiger){
		$sql = 'SELECT `datum` FROM `tbl_cent` ORDER BY `tbl_cent`.`datum` DESC Limit 0,1'; 
		$result= mysqli_query($zeiger, $sql);	
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		return $row["datum"];
	}
}


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

function db_cents_gesamt($zeiger, $datum = ""){	
	if ($zeiger){
		if ($datum == "") $datum = date("Y-m-d H:i:s");
		$sql = 'SELECT SUM(`anzahl`) AS gesamt, MAX(`datum`) AS datum FROM `tbl_cent` where `datum` <= \''.$datum.'\'';		
		$result= mysqli_query($zeiger, $sql);	
		return  mysqli_fetch_array($result, MYSQLI_ASSOC);
	}	
}

function db_cents_jahre($zeiger)
{
	if ($zeiger){	
		$sql = 'SELECT `jahr`, SUM(`anzahl`) as anzahl FROM tbl_kombination left join tbl_cent using(`IDkomb`) group by `jahr`';
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_cents_jahr[]= $row;
		}
		
		return $a_cents_jahr;
	}
}

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
		
		return $a_staedte_jahre;
	}
}

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
		
		return $a_laender_jahre;
		
	}
}

function db_monatssummen($zeiger)
{
	if ($zeiger){
		$sql = 'select MONTHNAME( datum ) as monat , YEAR( datum ) as eingabejahr , sum( anzahl ) as anzahl from tbl_cent group by eingabejahr , monat  order by datum'; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
			$a_monatssumme[]= $row;
		}
		
		return $a_monatssumme;
	}
}

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
		
		return $a_monatssumme_dt;
	}
}

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
		
		
		return $a_staettesumme;      
	}
}


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


function db_monat($zeiger, $sort='DESC'){	
	if ($zeiger){
		$a_monat = null;
		$sql = 'SELECT Distinct MONTH( `datum` ) AS monatnr , MONTHNAME(datum) as monat, YEAR( `datum` ) AS jahr FROM `tbl_cent` Order by jahr '.$sort.', monatnr '.$sort.''; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
		{
				$a_monat[]= $row;			
		}
		return $a_monat;
	}
}

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
		
		return $a_jahr;
	}
}


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

function db_ranking($zeiger, $limit="")
{
	if ($zeiger){
		$sql = 'select sum(anzahl) as anz, jahr, land, stadt_lang'
			. ' from tbl_cent'
			. ' left join tbl_kombination using(idkomb)'
			. ' left join tbl_stadt using(idstadt)'
			. ' left join tbl_land using(idland)'
			. ' group by land, stadt_lang, jahr'
			. ' order by anz DESC';
			if ($limit != "") $sql.=' limit 0,'.$limit; 
		$result= mysqli_query($zeiger, $sql);	
		while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
			{
				$a_ranking[]= $row;
			}	
		return $a_ranking; 
	}
}

?>