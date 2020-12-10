 function init()
{ 

	var canvas= document.getElementById("mycanvas");
    H=canvas.height = 1000;
    W=canvas.width = 1000;
    pen=canvas.getContext('2d');
    pen.fillStyle = "blue";
    cs=66;
    game_over=false;
    score=0;
     
    food_img=new Image();
    food_img.src="apple.png"; 
     
    t_img=new Image();
    t_img.src="trophy.png"; 
 

    food=getrandomfood();

    snake={
	          initial_length:4,
	          color:"blue",
	          cells:[],
	          direction:"right",
	         // speed=cs,

	          createsnake: function()
	          {
                  for(var i=this.initial_length;i>0;i--)
                  {
                  	this.cells.push({x:i,y:0});
                  }
	          },

	          drawsnake: function()
	          {
                for(var i=0;i<this.cells.length;i++)
                  {
	          	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
	             }
	          },

	          updatesnake:function()
	          {
	          	
	          	var headx=this.cells[0].x;
	          	var heady=this.cells[0].y;
                 
                if(headx==food.x && heady==food.y)
                {
                	food=getrandomfood();
                	score++;
                } 
                else
	          	{this.cells.pop();}

	          	var nextx,nexty;

                if(this.direction=="right")
                {
                	nextx=headx+1;
                	nexty=heady;
                }
                else if(this.direction=="left")
                {
                	nextx=headx-1;
                	nexty=heady;
                }	
                else if(this.direction=="up")
                {
                	nextx=headx;
                	nexty=heady-1;
                }
                else
                {
                	nextx=headx;
                	nexty=heady+1;
                }
                

                this.cells.unshift({x:nextx,y:nexty});


                var lastx=Math.round(W/cs);
                var lasty=Math.round(H/cs);

                if(this.cells[0].x<0 || this.cells[0].y<0 ||this.cells[0].x>lastx ||this.cells[0].y>lasty )
                   game_over=true;
                

                

	          }

         };

   snake.createsnake();
   
   function keypressed(e)
   {
   	  if(e.key=="ArrowRight")
   	  	 snake.direction="right";
   	  else if (e.key=="ArrowLeft")
   	  	 snake.direction="left";
   	  else if (e.key=="ArrowDown")
   	  	 snake.direction="down";
   	  else
   	  	 snake.direction="up";	 	 	
   }

   document.addEventListener("keydown",keypressed);

}

function draw()
{
	pen.clearRect(0,0,W,H);
	pen.fillStyle=snake.color;
    snake.drawsnake();
    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs-2,cs-2);
    pen.fillStyle="purple";
    pen.font="25px Roboto"
    pen.fillText("**",snake.cells[0].x*cs+20,snake.cells[0].y*cs+30);
	

    pen.drawImage(t_img,18,20,cs,cs);	

    pen.fillStyle="purple";
    pen.font="25px Roboto"
    pen.fillText(score,45,50);

}

function update()
{
   snake.updatesnake();
}

function getrandomfood()
{
	var foodx =Math.round(Math.random()*(W-cs)/cs); 
	var foody =Math.round(Math.random()*(W-cs)/cs);

	var food={
		x:foodx,
		y:foody,
		color:"red",
	} 

	return food;
}

function gameloop()
{
	if(game_over==true)
		{clearInterval(f);
         alert("game over,score is "+score);
         return ;
		}

	draw();
	update();
}

init();
var f=setInterval(gameloop,100);
