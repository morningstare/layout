const $ = (a) => document.querySelector(a);
const $$ = (a) => document.querySelectorAll(a);




function rand(a, b){
    return Math.floor(Math.random() * (b - a) + a)
}
function createRGBRandomColor(){
    return `rgb(${rand(0,255)},${rand(0,255)},${rand(0,255)})`
}

const canvas = $('canvas');
canvas.width = innerWidth
canvas.height = 400
const ctx = canvas.getContext('2d');

class CanvasObject {
    constructor() {
        this.x = rand(0, innerWidth)
        this.y = rand(0, innerHeight)
        this.color = createRGBRandomColor();
        this.size = rand(10, 50);
        this.dx = (rand(0, 2) === 0 ? -1 : 1) * rand(1, 5);
        this.dy = (rand(0, 2) === 0 ? -1 : 1) * rand(1, 5);
    }
}

class Rectangle extends CanvasObject {
    render(){
        this.x += this.dx;
        this.y += this.dy;

        ctx.fillStyle = this.color
        ctx.save();
        ctx.rotate(Math.PI / 4)
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fill();
        ctx.restore();
    }
}

class Circle extends CanvasObject{
    render(){
        this.x += this.dx;
        this.y += this.dy;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

window.onmousedown = function(e){
    const rect = Math.random() < 0.5 ? new Rectangle() : new Circle();
    rect.x = e.x;
    rect.y = e.y;
    objects.push(rect)
}
window.onmousemove = function(e){
    const rect = new Rectangle();
    rect.x = e.x;
    rect.y = e.y;
    objects.push(rect)
}

setInterval(() => {
    objects.push(new Rectangle())
}, 50)

const objects = [new Rectangle(), new Circle()];

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(const obj of objects){
        obj.render();
    }

    return requestAnimationFrame(animate);
}
animate();

//-----------------------------------;

let array = ['index.html','animation.js','style.css','saman.html'];

var elements = document.getElementsByTagName("button");

var clickEvent  = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
for (var i=0; i < elements.length; i++)
{
    // elements[i].addEventListener("click",function (e) {
    //     // for (let index of array)
    //     downloadFile("./"+e.target.getAttribute("download"),"");
    // });
    // elements[i].addEventListener("click",function (e) {
    //     // for (let index of array)
    //     console.log(e);
    //     downloadFile("./"+e.target.getAttribute("download"),"");
    // }.bind(this));

    elements[i].onclick = function (...args){
        downloadFile(args[0],args[0]);
    }.bind(this,array[i]);
}

function downloadFile(url, fileName){
    console.log(url, fileName);

    fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
        .then(res => res.blob())
        .then(res => {
            const aElement = document.createElement('a');
            aElement.setAttribute('download', fileName);
            const href = URL.createObjectURL(res);
            aElement.href = href;
            // aElement.setAttribute('href', href);
            aElement.setAttribute('target', '_blank');
            aElement.click();
            URL.revokeObjectURL(href);
        });
};






// document.querySelectorAll('.button')