<?php
/*更新之前先展示原有信息*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

if($link){
	$newsid = $_GET['newsid'];

	$sql = "SELECT * FROM `baidunews` WHERE `id` = '{$newsid}'";

	mysqli_query($link,"SET NAMES 'UTF8'");
	$result = mysqli_query($link,$sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'newstype' => $row['newstype'], 
			'newstitle' => $row['newstitle'], 
			'newsimg' => $row['newsimg'], 
			'newstime' => $row['newstime'], 
			'newssrc' => $row['newssrc']
			));
	}
	echo json_encode($senddata);
} 

mysqli_close($link);
?>