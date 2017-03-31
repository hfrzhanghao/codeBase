<?php 
/*获取新闻列表*/
header("Content-type:application/json; charset=utf-8");
require_once('db.php');

$sql = '';

if($link){

	if($_GET['newstype']){
		$newstype = $_GET['newstype'];
		$sql = "SELECT * FROM `baidunews` WHERE `newstype` = '{$newstype}' AND `isDelete` = 0";
	}else{
		$sql = "SELECT * FROM baidunews WHERE `isDelete` = 0";
	}

	mysqli_query($link,"SET NAMES 'UTF8'");

	$result = mysqli_query($link,$sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'id' => $row['id'], 
			'newstype' => $row['newstype'], 
			'newstitle' => $row['newstitle'], 
			'newsimg' => $row['newsimg'], 
			'newstime' => $row['newstime'], 
			'newssrc' => $row['newssrc']
			));
	}
	echo json_encode($senddata);
}else{
	echo json_decode(array('success'=>'none'));
}
mysqli_close($link);

?>