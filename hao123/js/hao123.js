window.onload = function(){
	//从cookie中读取颜色
	var color = document.cookie.split(';')[0].split('=')[1];
	if(!color){
		color = "#07ac72";//默认颜色
	}
	var strong = document.getElementsByClassName('strong');
	for(var i = 0; i < strong.length; i++){
		strong[i].style.color = color;
	}
	document.getElementById('index').style.backgroundColor = color;
	document.getElementById('setFront').style.backgroundColor = color;
	document.getElementById('navigator').style.borderColor = color;
	document.getElementById('navigator2').style.borderColor = color;
	document.getElementById('leftPanel').style.borderColor = color;
	document.getElementById('mainPanel').style.borderColor = color;

	//鼠标悬停颜色改变
	var a_array = document.getElementsByTagName('a');
	for(var i = 0; i < a_array.length; i++){
		if(a_array[i].id != 'index' && a_array[i].id != 'setFront'){
			a_array[i].onmouseover = function(){
				this.style.color = color;
			}
			a_array[i].onmouseout = function(){
				this.style.color = '#000';
			}
		}
	}
}

function changeColor(color){//获取到的新颜色
	var strong = document.getElementsByClassName('strong');
	for(var i = 0; i < strong.length; i++){
		strong[i].style.color = color;
	}
	document.getElementById('index').style.backgroundColor = color;
	document.getElementById('setFront').style.backgroundColor = color;
	document.getElementById('navigator').style.borderColor = color;
	document.getElementById('navigator2').style.borderColor = color;
	document.getElementById('leftPanel').style.borderColor = color;
	document.getElementById('mainPanel').style.borderColor = color;

	//鼠标悬停颜色改变
	var a_array = document.getElementsByTagName('a');
	for(var i = 0; i < a_array.length; i++){
		if(a_array[i].id != 'index' && a_array[i].id != 'setFront'){
			a_array[i].onmouseover = function(){
				this.style.color = color;
			}
			a_array[i].onmouseout = function(){
				this.style.color = '#000';
			}
		}
	}
	//写入cookie
	var date = new Date(); 
	date.setTime(date.getTime()+30*60*1000); //设置date为当前时间+30分
	document.cookie="color=" + color + ";expires=" + date.toGMTString(); //将date赋值给expires
}