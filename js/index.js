+function() {
	var data=null;//设置存放数组
	var RN=4,CN=4;//设置行高=4
	var score=0;//得分
	var status=0,GAMEOVER=0,RUNNING=1;//status状态标志，游戏结束为0，运行中为1
	function start(){
		status=RUNNING;//运行中
		data=[];
		for(var r=0;r<RN;r++){
			data.push([]);
			for(var c=0;c<CN;c++)
			data[r].push(0);
		}
		//生成两个随机数
		randomNum();
		randomNum();
		//更新页面
		updateView();
		console.log(data.join("\n"));
		document.onkeydown=function(e){
			console.log(e.keyCode);
			switch(e.keyCode){
				case 37:
					moveLeft();
					break;
				case 38:
					moveUp();
					break;
				case 39:
					moveRight();
					break;
				case 40:
					moveDown();
					break;
			}
		}
	}
	function randomNum(){
		//随机在数组位置生成2/4
		while(true){
		var r=parseInt(Math.random()*RN);//产生的随机数大于等于0小于1的double值,*RN,产生0-3的整数
		var c=parseInt(Math.random()*CN);
		if(data[r][c]==0){
			data[r][c]=Math.random()>0.5?"2":"4";
			break;
		}
	}
	}
	function updateView(){
		/*遍历data数组，使用id查找对应div*/
		for(var r=0;r<RN;r++){
			for(var c=0;c<CN;c++){
				var divId=document.getElementById("c"+r+c);//div的id:c00赋给divId
				if(data[r][c]==0){
					divId.innerHTML="";
					divId.className="";
				}else{
					divId.innerHTML=data[r][c];
					divId.className="n"+data[r][c];
				}
			}
		}
		document.getElementById("scoreNum").innerHTML=score;
		var gameOverDiv=document.getElementById("gameOver");
		var scoreSpan=document.getElementById("final");
		if(status==GAMEOVER){
			gameOverDiv.style.display="block";
			scoreSpan.innerHTML=score;
		}else{
			gameOverDiv.style.display="none";
		}
	}
	function moveLeft(){
		/*将未移动前的数组保存，再移动后对比，如果前后不一样，随机生成2/4，再更新页面*/
		var before=String(data);
		for(var r=0;r<RN;r++){
			moveLeftInRow(r);//左移按行
		}
		var after=String(data);
		if(before!=after){
			randomNum();
			if(isGameOver()){
				status=GAMEOVER;
			}
			updateView();
		}
	}
	/*左移第r行*/
 function moveLeftInRow(r){
        //c从0开始，到<CN-1
        for(var c=0;c<CN-1;c++){
            //找到r行c列右侧下一个不为0的位置nextc
            var nextc=getNextInRow(r,c);
            //如果找到
            if(nextc==-1){break;}
            else{
               if(data[r][c]==0){
                    data[r][c]=data[r][nextc];
                    data[r][nextc]=0;
                    c--;
                } else if(data[r][c]==data[r][nextc]){
                    data[r][c]*=2;
                    score+=data[r][c];
                    data[r][nextc]=0;
                }            
            }

        }
    }
	/*查找右边第一个不为0的位置*/
	function getNextInRow(r,c){
		//列从c+1开始到CN-1
		for(var nextc=c+1;nextc<CN;nextc++){
			if(data[r][nextc]!=0){
				return nextc;
			}
		}
		return -1;
	}
	function moveRight(){
		/*将未移动前的数组保存，再移动后对比，如果前后不一样，随机生成2/4，再更新页面*/
		var before=String(data);
		for(var r=0;r<RN;r++){
			moveRightInRow(r);//右移按行
		}
		var after=String(data);
		if(before!=after){
			randomNum();
			if(isGameOver()){
				status=GAMEOVER;
			}
			updateView();
		}
	}
	function moveRightInRow(r){
		//列从0开始到c<CN-1
		//找到r行c列右边第一个不为0的位置
		for(var c=CN-1;c>0;c--){
			var nextc=getLeftNextInRow(r,c);
			//如果找到
		  if(nextc==-1){break;}
            else{
                if(data[r][c]==0){
                    data[r][c]=data[r][nextc];
                    data[r][nextc]=0;
                    c++;
                }else if(data[r][c]==data[r][nextc]){
                    data[r][c]*=2;
                    score+=data[r][c];
                    data[r][nextc]=0;

                }
            }

            
		}
	}
	function getLeftNextInRow(r,c){
		//列从c+1开始到CN-1
		for(var nextc=c-1;nextc>=0;nextc--){
			if(data[r][nextc]!=0){
				return nextc;
			}
		}
		return -1;
	}
	function moveUp(){
		var before=String(data);
		for(var c=0;c<CN;c++){
			moveUpInCol(c);
		}
		var after=String(data);
		if(before!=after){
			randomNum();
			if(isGameOver()){
				status=GAMEOVER;
			}
			updateView();
		} 
	}
	function moveUpInCol(c){
		for(var r=0;r<RN-1;r++){
			var nextr=getDownNextInRow(r,c);
			if(nextr==-1){break;
            nextr=-1}else{
                if(data[r][c]==0){
                    data[r][c]=data[nextr][c];
                    data[nextr][c]=0;
                    r--;
                }else if(data[r][c]==data[nextr][c]){
                    data[r][c]*=2;
                    score+=data[r][c];
                    data[nextr][c]=0;
                }
            }
		}
	}
	function getDownNextInRow(r,c){
		for(var nextr=r+1;nextr<RN;nextr++){
			if(data[nextr][c]!=0){
				return nextr;
			}
		}
		return -1;
	}
	function moveDown(){
		var before=String(data);
		for(var c=0;c<CN;c++){
			moveDownInCol(c);
		}
		var after=String(data);
		if(before!=after){
			randomNum();
			if(isGameOver()){
				status=GAMEOVER;
			}
			updateView();
		}  
	}
	function moveDownInCol(c){
		for(var r=RN-1;r>0;r--){
			var nextr=getUpNextInRow(r,c);
			if(nextr==-1){
                break;
            }else{
                if(data[r][c]==0){
                    data[r][c]=data[nextr][c];
                    data[nextr][c]=0;
                    r++;
                }
                else if(data[nextr][c]==data[r][c]){
                    data[r][c]*=2;
                    score+=data[r][c];
                    data[nextr][c]=0;
                }
            }
		}
	}
	function getUpNextInRow(r,c){
		for(var nextr=r-1;nextr>=0;nextr--){
			if(data[nextr][c]!=0){
				return nextr;
			}
		}
		return -1;
	}
	function isGameOver(){
		for(var r=0;r<RN;r++){
			for(var c=0;c<CN;c++){
				if(data[r][c]==0){
					return false;
				}
				if(r<CN-1 && data[r][c]==data[r][c+1]){
                        return false;
                    }
                    if(r<RN-1 && data[r][c] == data[r+1][c]){
                        return false;
                    }

			}
		}
		return true;
	}
	start();
}();
