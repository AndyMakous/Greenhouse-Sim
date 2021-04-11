/* TO DO:
 * Add sex baby
 * competition between plants
 * Dead plants provide extra nutrition
 *  
 */

// Setting canvas size and context
var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global variables for plant properties
plantSize = 15;
pollinateRange = 100;
frameNum = 0;

// Mouse tracking variables and listeners
var mouseX = undefined;
var mouseY = undefined;

// window.addEventListener('mousemove',
//     function (event) {
//         mouseX = event.clientX;
//         mouseY = event.clientY;
//     }
// )

window.addEventListener('mousedown',
    function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        seeds.push(new Seed(mouseX, mouseY, plantSize, pollinateRange, frameNum));
    }
)

// Seed array and class
var seeds = [];

class Seed {
    constructor(xPos, yPos, radius, pollinateRange, frameNum) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.pollinateRange = pollinateRange;
        this.planted = frameNum;
        this.age = 0;
        this.alive = true;
    }

    draw() {
        if (this.alive) {
            c.beginPath();
            c.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
            let green = 255 - this.age*20;
            c.fillStyle = "rgb(0," + green + ",0)";
            c.strokeStyle = '#25BE43';
            c.fill();
            c.stroke();
        }
        else {
            c.beginPath();
            c.arc(this.xPos, this.yPos, this.radius*.5, 0, Math.PI * 2, false);
            c.fillStyle = "rgb(32,32,32)";
            c.strokeStyle = '#25BE43';
            c.fill();
            c.stroke();
        }
    };

    update() {
        this.age = frameNum - this.planted;
        // this.age++; possibly simpler
        if (this.age < 10) {
            if (Math.random() < .1)
                this.pollinate();
        }
        else {
            this.alive = false;
        }
        this.draw();
    };

    pollinate() {
        let theta = getFloatInRange(0, 2*Math.PI);
        let randomRad = getFloatInRange(0, this.pollinateRange);
        let xPt = this.xPos + Math.cos(theta)*randomRad;
        let yPt = this.yPos + Math.sin(theta)*randomRad;
        seeds.push(new Seed(xPt, yPt, plantSize, this.pollinateRange, frameNum))
    }
}

function getPointInRadius(originX, originY, radius) {
    
    return getIntInRange(originX - radius, originX + radius)
}

function getIntInRange(min, max) {
    return Math.floor(min + (Math.random() * (max - min)));
}

function getFloatInRange(min, max) {
    return min + (Math.random()*(max-min));
}

function init() {
    seeds = [];
    for (let i = 0; i < 1; i++) {
        seeds.push(
            new Seed(
                getIntInRange(plantSize, innerWidth - plantSize),
                getIntInRange(plantSize, innerHeight - plantSize),
                plantSize,
                pollinateRange,
                frameNum)
        )
        seeds[i].draw();
    }
    animate();
}


function animate() {
    frameNum = requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    console.log(frameNum);

    for (let i = 0; i < seeds.length; i++) {
        seeds[i].update();
    }
}



init();