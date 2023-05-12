const canva = document.getElementById("canvas1");
const ctx = canva.getContext('2d');
canva.width = window.innerWidth ;
canva.height = window.innerHeight ;

class Particle{
    constructor(effect,color,x,y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.vx = Math.random()*2 - 1;
        this.vy = Math.random()*2 - 1;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.color = color
        this.speed = Math.floor(Math.random()*10);
        this.check = 0;
    }
    draw(cx){
        cx.fillStyle = this.color
        cx.fillRect(this.x,this.y,this.size,this.size)
    }
    update(){
        this.check++;
        if (this.check>this.speed){
            this.x+=this.vx;
            this.y+=this.vy;
            this.check = 0;
        }
        
    }
}
class Effect{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.image = document.getElementById('img1');
        this.particlesArray = []
        this.centerX = this.width * 0.5;
        this.centerY = this.height * 0.5;
        this.cx = this.centerX - this.image.width * 0.5;
        this.cy = this.centerY - this.image.height * 0.5;
        this.gap = 5;
    }
    init(cx){
        cx.drawImage(this.image,this.cx,this.cy);
        
        const imageData = cx.getImageData(0,0,this.width,this.height).data;
        console.log(imageData);
        for (let y = 0; y < this.height; y+=this.gap) {
            for (let x = 0; x < this.width; x+=this.gap) {
                const index = (y * this.width + x) * 4;
                const red = imageData[index];
                const green = imageData[index+1];
                const blue = imageData[index+2];
                const alpha = imageData[index+3];
                const color = 'rgb('+red+','+green+','+blue+')';

                if (alpha>0){
                    this.particlesArray.push(new Particle(this,color,x,y))
                }
                
            }
            
        }
        
        
        

    }
    draw(cx){
        
        this.particlesArray.forEach(p=>{
            p.draw(cx)
        })
    }
    update(){
        this.particlesArray.forEach(p=>{
            p.update()
        })
    }
    
}

const effect = new Effect(canva.width,canva.height);

effect.init(ctx);
function animate(){
    ctx.clearRect(0,0,canva.width,canva.height);
  
    effect.draw(ctx);
    effect.update();
    requestAnimationFrame(animate)
}

animate()