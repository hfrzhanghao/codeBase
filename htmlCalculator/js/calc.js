/*初始化状态，给按钮添加事件，并定义算符优先级*/
window.onload = function(){
	var buttons = document.getElementsByTagName('button');
	for(var i = 0; i < buttons.length; i++){
		var buttonid = buttons[i].id;
		if(buttonid != '='){
			(function(temp){
				buttons[i].onclick = function(){
					display(temp)
				};
			})(buttonid);
		}
	}
	//定义算符优先级
	proi = [];
	proi['#'] = 0; proi['+'] = 1; proi['-'] = 1; proi['×'] = 2; proi['/'] = 2; proi['√'] = 3;
	//用来判断显示屏上的数字是不是计算结果
	isResult = false;
}

/*显示屏显示规则*/
function display(signal){
	var alreadyDisplay = document.getElementById('screen').innerText;
	var newDisplay;
	//退格键，向前删除一个字符
	if (signal == 'del'){
		newDisplay = alreadyDisplay.substring(0,alreadyDisplay.length-1);
		if (newDisplay == '') {
			newDisplay = '0';
		}
	//归零键，归零
	}else if (signal == 'clear') {
		newDisplay = '0';
	}else{
		//如果显示屏上是0，或者是一个计算结果，则当用户输入不同字符，显示方法也不同
		if (alreadyDisplay == '0' || isResult == true){
			if(!isNaN(signal) || signal == '√'){
				newDisplay = signal;
			}else if(signal == '.'){
				newDisplay = '0.'
			}else{
				newDisplay = alreadyDisplay + signal;
			}
		//否则判断是否连续输入二元操作符
		}else{
			if(signal == '+' || signal == '-' || signal == '×' || signal == '/'){
				var lastChar = alreadyDisplay.substring(alreadyDisplay.length-1,alreadyDisplay.length);
				if(lastChar == '+' || lastChar == '-' || lastChar == '×' || lastChar == '/'){
					newDisplay = alreadyDisplay.substring(0,alreadyDisplay.length-1) + signal;
				}else{
					newDisplay = alreadyDisplay + signal;
				}
			// 控制小数点的输入，不允许在一个数字中出现两个小数点
			}else if(signal == '.' && alreadyDisplay.lastIndexOf('.') > -1){
				var betweenPoint = alreadyDisplay.substring(alreadyDisplay.lastIndexOf('.'),alreadyDisplay.length);
				if(betweenPoint == '.' || !isNaN(betweenPoint)){
					newDisplay = alreadyDisplay;
				}else{
					newDisplay = alreadyDisplay + signal;
				}
			} else{
				newDisplay = alreadyDisplay + signal;
			}
		}
		//重新置为false
		isResult = false;
	}
	document.getElementById('screen').innerText = newDisplay;
}

//双目运算符运算
function calc_2_num(first,op,second){
	if(second == 0){
		alert("除数不能为0");
		return '';
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
	}else if(op=='×'){
		result = first * second;
	}else if(op=='/'){
		result = first / second;
	}
	//先保留7位小数避免精度差，再通过parseFloat去掉多余的0
	result = parseFloat(result.toFixed(7));
	return result;
}

/*按下'='，开始计算*/
function calc(){
	//采用算符优先文法对表达式进行计算
	var numStack = []; //存放操作数
	var opstack = ['#']; //存放操作符
	var expression = document.getElementById('screen').innerText;
	//'-'或'.'出现在第一位，自动在前面补0
	if(expression[0] == '-' || expression[0] == '.'){
		expression = '0' + expression;
	}
	//根号和数字直接相连，则插入乘号
	if(expression.indexOf('√') > 0 && !isNaN(expression[expression.indexOf('√') - 1])){
		expression = expression.substring(0,expression.indexOf('√')) + '×' + expression.substring(expression.indexOf('√'),expression.length)
	}
	//表达式自动在末尾添加'#'作为结束标识
	expression = expression + '#';
	var numTemp = ''; //用来记录单步运算结果
	//扫描表达式字符串，根据算符优先规则进行计算
	for( var i = 0; i < expression.length; i++){
		if(!isNaN(expression[i]) || expression[i] == '.'){
			//如果读到数字，则追加，往后继续读，直到出现操作符
			numTemp = numTemp + expression[i];
		}else if(expression[i] == '√'){//单目运算符最高级别，直接入栈
			opstack.push(expression[i]);
		}else{
			numStack.push(Number(numTemp));
			numTemp = '';
			//当即将入栈的操作符优先级小于栈顶操作符的优先级，则先进行计算
			while(proi[expression[i]] <= proi[opstack[opstack.length-1]]){
				if(!(expression[i] == '#' && opstack[opstack.length-1] == '#')){
					//单目运算和双目运算分开
					if(opstack[opstack.length-1] == '√'){
						var resultTemp = Math.sqrt(numStack.pop());
						opstack.pop();
						numStack.push(resultTemp);
					}else{
						var second = numStack.pop();
						var first = numStack.pop();
						var op = opstack.pop();
						var resultTemp = calc_2_num(first,op,second);
						numStack.push(resultTemp);
					}
				}else{
					break;
				}
			}
			opstack.push(expression[i]);
		}
	}
	//出现两个'#'相遇，并且操作数栈中只有一个数字时，则表示计算完成
	if(numStack.length == 1 && opstack[0] == '#' && opstack[1] == '#'){
		document.getElementById('screen').innerText = numStack[0];
		isResult = true;
	}
}