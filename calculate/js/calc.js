function calc(first,op,second){

	if(isNaN(first) || isNaN(second)){
		alert("填入的内容必须为数字");
		return;
	}
	if(second == 0){
		alert("除数不能为0");
		return;
	}
	var result = 0;
	
	//字符串转为数字
	first = parseFloat(first);
	second = parseFloat(second);
	
	//开始计算
	if(op=='+'){
		result = first + second;
	}else if(op=='-'){
		result = first - second;
	}else if(op=='*'){
		result = first * second;
	}else if(op=='/'){
		result = first / second;
	}
	//先保留7位小数避免精度差，再通过parseFloat去掉多余的0
	result = parseFloat(result.toFixed(7));

	//填写结果
	document.getElementById('result').value = result;
}