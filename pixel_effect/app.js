const canva = document.getElementById("canvas1");
const ctx = canva.getContext('2d');
canva.width = window.innerWidth ;
canva.height = window.innerHeight ;

class Particle{
    constructor(effect,color,x,y){
        this.effect = effect;
        this.x = Math.random()*this.effect.width;
        this.y = Math.random()*this.effect.height;
        this.size = 3;
        this.vx = 0;
        this.vy = 0;
        this.originX = Math.floor(x);
        this.originY = Math.floor(y);
        this.color = color
        this.ease = 0.05;
        this.angle = 0;
        this.dx = 0;
        this.dy=0;
        this.fraction = 0.8;
        this.distance = 0;
        this.force = 0;


        
     
    }
    draw(cx){
        cx.fillStyle = this.color
        cx.fillRect(this.x,this.y,this.size,this.size)
    }
    update(){
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -(this.effect.mouse.radius )/ this.distance;
            if (this.distance < this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy,this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }

            this.x += (this.vx*=this.fraction) +(this.originX - this.x) * this.ease;
            this.y += (this.vy*=this.fraction) +(this.originY - this.y) * this.ease;
        
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
        this.gap = 3;
        this.mouse={
            radius:3000,
            x:undefined,
            y:undefined 
        }
        addEventListener('mousemove',event=>{
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
            // console.log(this.mouse.x,this.mouse.y);
        });
    }
    init(cx){
        cx.drawImage(this.image,this.cx,this.cy);
        
        const imageData = cx.getImageData(0,0,this.width,this.height).data;
     
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