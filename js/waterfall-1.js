window.onload=function(){
	waterfall('main','box');
	var dataInt={'data':[{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'}]}
	window.onscroll=function(){
		if(checkscrollside('main','box')){
			var oParent = document.getElementById('main');// 父级对象
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='./images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
				}
				waterfall('main','box');
			}
			
		}
	}

function waterfall(parent,box){
	var oParent=document.getElementById(parent);//获取父级对象
	var oBox=getByClassName(oParent,box);
	var oBoxW=oBox[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText='width:'+num*oBoxW+'px;margin:0 auto;';
	var boxArry=[];
	for(var i=0;i<oBox.length;i++){
		var oBoxH=oBox[i].offsetHeight;
		if(i<num){
			boxArry[i]=oBoxH;//首先将第一行num个值存入数组boxArry中。
			//console.log(boxArry);
			}else{
				//获取第一行最短的值以及序号
			var minH=Math.min.apply(null,boxArry);//因为Math.min()里面传的参数是数字，而boxArry是数组故使用apply方法。
				var index=getMinIndex(boxArry,minH);
				oBox[i].style.position='absolute';//一定要记得设置position
			    oBox[i].style.top=minH+'px';
				oBox[i].style.left=oBox[index].offsetLeft+'px';
				boxArry[index]+=oBox[i].offsetHeight;//更新添加了块框后的列高
				}
				
		}
		
	}
	//通过父级和子元素的className获取子元素数组
function getByClassName(parent,className){
	var obj=parent.getElementsByTagName('*');
	var pinS=[];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className==className){
			pinS.push(obj[i]);
			}
		}
	 return pinS;
	}
function getMinIndex(arr,minH){
	
	for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
	
}
function checkscrollside(parent,box){
	var oParent=document.getElementById(parent);
	var oBox=getByClassName(oParent,box);
	var scrollH=document.documentElement.scrollTop||document.body.scrollTop;
	var documentH=document.documentElement.clientHeight;
	var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
	return (lastBoxH<scrollH+documentH)?true:false;
	
	}