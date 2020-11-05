import { Block } from "./block.js";

class App{
    constructor(){
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        const blockWidth = 50;
        const blockHeight = 20;
        
        this.blocks = [];
        for(let i = 0; i <= this.canvas.width - blockWidth; i += blockWidth){
            for(let j = 50; j <= 200; j += blockHeight){
                this.blocks.push(new Block(i, j));
            }
        }

        window.requestAnimationFrame(this.animate.bind(this));
    }

    draw(){
        this.ctx.fillStyle = "#102330";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.blocks.forEach((block) => {
            block.draw(this.ctx);
        });
    }

    animate(){
        this.draw();

        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
}