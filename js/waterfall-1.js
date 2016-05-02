window.onload=function(){
	waterfall('main','box');
	var dataInt={'data':[{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'}]}
	window.onscroll=function(){
		if(checkscrollside('main','box')){
			var oParent = document.getElementById('main');// ��������
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
	var oParent=document.getElementById(parent);//��ȡ��������
	var oBox=getByClassName(oParent,box);
	var oBoxW=oBox[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText='width:'+num*oBoxW+'px;margin:0 auto;';
	var boxArry=[];
	for(var i=0;i<oBox.length;i++){
		var oBoxH=oBox[i].offsetHeight;
		if(i<num){
			boxArry[i]=oBoxH;//���Ƚ���һ��num��ֵ��������boxArry�С�
			//console.log(boxArry);
			}else{
				//��ȡ��һ����̵�ֵ�Լ����
			var minH=Math.min.apply(null,boxArry);//��ΪMath.min()���洫�Ĳ��������֣���boxArry�������ʹ��apply������
				var index=getMinIndex(boxArry,minH);
				oBox[i].style.position='absolute';//һ��Ҫ�ǵ�����position
			    oBox[i].style.top=minH+'px';
				oBox[i].style.left=oBox[index].offsetLeft+'px';
				boxArry[index]+=oBox[i].offsetHeight;//��������˿�����и�
				}
				
		}
		
	}
	//ͨ����������Ԫ�ص�className��ȡ��Ԫ������
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
	var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//������������ӿ����waterfall()���ĸ߶ȣ����һ�����ľ�����ҳ����+����ߵ�һ��(ʵ��δ�����׾Ϳ�ʼ����)
	return (lastBoxH<scrollH+documentH)?true:false;
	
	}