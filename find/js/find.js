function find(){
	var array = document.getElementById('array').value.split(',');
	var newArray = [];//是一个二维数组，每个元素是以字母为名的数组，内容为该字母所在的各个位置
	var max = 1;//记录当前最多次数

	for(var i = 0; i < array.length; i++){
		if(newArray[array[i]]){ //存在则将当前位置放入
			var len = newArray[array[i]].push(i);
			if(len > max){ //判断是否当前最长
				max = len;
			}
		}else{ //不存在则创建数组，并放入当前位置
			newArray[array[i]] = [];
			newArray[array[i]].push(i);
		}
	}

	var letterArray = '';//记录所有出现次数达到max的字母
	var indexArray = '';//最多字母出现位置的字符串————a:1 2 4 b:0 3 5
	for(var letter in newArray){
		if(newArray[letter].length == max){
			indexArray = indexArray + letter + ":";
			letterArray = letterArray + " " + letter;
			for (var lt in newArray[letter]) {
				indexArray = indexArray + newArray[letter][lt] + ' ';
			}
		}
	}

	document.getElementById('letter').innerText = letterArray;
	document.getElementById('count').innerText = max;
	document.getElementById('index').innerText = indexArray;
}