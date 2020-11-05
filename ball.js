export class Ball{
    constructor(r, canvasWidth, canvasHeight, bar, blocks){
        this.x = 0;
        this.y = 0;
        this.r = r;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.vx = Math.random() * 5 + 3;
        this.vy = -5;

        this.bar = bar;
        this.blocks = blocks;

        this.isGameStart = false;

        this.color = "#cf2f23";
    }

    // 수평 바와 충돌한 경우
    collisionBar(ctx){
        const minX = this.bar.x - this.r;
        const maxX = this.bar.x + this.bar.width + this.r;
        const minY = this.bar.y - this.r;

        if(this.x >= minX && this.x <= maxX && this.y >= minY){
            this.y = this.bar.y - this.r;
            this.vy *= -1;
        }
    }

    // canvas의 외벽과 충돌한 경우
    collisionCanvas(ctx){
        if(this.x <= this.r) { 
            this.x = this.r; 
            this.vx *= -1;
        } else if(this.x + this.r >= this.canvasWidth){
            this.x = this.canvasWidth - this.r;
            this.vx *= -1;
        }

        if(this.y <= this.r) { 
            this.y = this.r; 
            this.vy *= -1;
        } 

        // 바닥에 충돌한 경우는 게임을 다시 시작
        if(this.y + this.r >= this.canvasHeight){
            this.y = this.bar.y - this.r;
            this.isGameStart = false;
        }
    }

    collisionBlock(ctx){
    }

    draw(ctx, blocks){
        if(!this.isGameStart){
            this.x = this.bar.x + this.bar.width/2;
            this.y = this.bar.y - this.r;
        } else{
            this.x += this.vx;
            this.y += this.vy;
        }

        this.collisionBar(ctx);
        this.collisionCanvas(ctx);
        this.collisionBlock(ctx);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        this.blocks.forEach((block) => {
            block.draw(ctx);
        });
    }
}