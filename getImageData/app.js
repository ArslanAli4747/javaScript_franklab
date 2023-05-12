const canva = document.getElementById("canvas1")
const ctx = canva.getContext('2d')

canva.width = 600;
canva.height = 400;
const image1 = new Image();
image1.src = 'p.png';
image1.addEventListener('load',function(){
    ctx.drawImage(image1,0,0,canva.width,canva.height); 
    const scannedImage = ctx.getImageData(0,0,canva.width,canva.height);
    // console.log(scannedImage);  
    const scannedData = scannedImage.data; 
    for (let index = 0; index < scannedData.length; index+=4) {
        const red = scannedData[index];
        const green = scannedData[index+1];
        const blue = scannedData[index+2];
        const avg = (red+green+blue)/3;
        scannedData[index] = avg;
        scannedData[index+1] = avg;
        scannedData[index+2] = avg;  
    }
    scannedImage.data = scannedData
    ctx.putImageData(scannedImage,0,0)

})