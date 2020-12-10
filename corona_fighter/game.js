/* eslint-disable */
function load_images()
{
    enemy_image=new Image;
    enemy_image.src="Assets/v1.png";
    
    gemm=new Image;
    gemm.src="Assets/gem.png";
    
    playerr=new Image;
    playerr.src="Assets/superhero.png";
}

function init()
{
    canvas=document.getElementById("mycanvas"); 
    console.log(canvas);   
    W=700;     
    H=400;        
    canvas.width=W;    
    canvas.height=H;
    game_over=false;
    
    pen=canvas.getContext("2d");
    console.log(pen);
    
    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20
    };
    
    e2={
        x:300,
        y:340,
        w:60,
        h:60,
        speed:20
    };
    
    e3={
        x:450,
        y:200,
        w:60,
        h:60,
        speed:20
    };
    
    player={
       x:20,
       y:H/2-30,
       w:60,
       h:60,
       speed:20,
       moving: false,    
    };
    
    gem={
       x:W-100,
       y:H/2-30,
       w:60,
       h:60,
        
    };
    
    
    enemies=[e1,e2,e3];
    
    canvas.addEventListener('mousedown',function(){
        //console.log("ok");
        player.moving=true;
    })
    
    
    canvas.addEventListener('mouseup',function(){
        player.moving=false;
    })
}

function overlap(rect1,rect2)
{
    if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) { 
        return true;
}
    return false;
}

function draw()
{
    pen.clearRect(0,0,W,H);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    if(player.moving==true)
         player.x+=20;
    
    pen.drawImage(gemm,gem.x,gem.y,gem.w,gem.h);
    pen.drawImage(playerr,player.x,player.y,player.w,player.h);
    
    
    for(var i=0;i<enemies.length;i++)
    {pen.drawImage(enemy_image,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);
    }
}

function update()
{
//    if(box.y+box.h>=H || box.y<=0)
//        box.speed=box.speed*(-1);
//    
    if(overlap(gem,player))
        {
            alert("you won");
            game_over=true;
        }
    for(var i=0;i<enemies.length;i++)
    {
        if(overlap(enemies[i],player))
        {
            alert("you lost");
            game_over=true;
        }
    }
    for(var i=0;i<enemies.length;i++)
       if(enemies[i].y+enemies[i].h>=H || enemies[i].y<=0)
         enemies[i].speed=enemies[i].speed*(-1);
     
    for(var i=0;i<enemies.length;i++)
        enemies[i].y=enemies[i].y+enemies[i].speed;
    
}

function gameloop()
{
    draw();
    update();
    if(game_over==true)
        clearInterval(f);
   // console.log("in gameloop");  
    
}

load_images();
init();
var f=setInterval(gameloop,100);  

