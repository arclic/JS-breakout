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
    collisionBar(){
        const minX = this.bar.x - this.r;
        const maxX = this.bar.x + this.bar.width + this.r;
        const minY = this.bar.y - this.r;

        if(this.x >= minX && this.x <= maxX && this.y >= minY){
            this.y = this.bar.y - this.r;
            this.vy *= -1;
        }
    }

    // canvas의 외벽과 충돌한 경우
    collisionCanvas(){
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

    // 벽돌과 충돌한 경우
    collisionBlock(){
        this.blocks = this.blocks.reduce((prev, block) => {
            const minX = block.x - this.r;
            const maxX = block.x + block.width + this.r;
            const minY = block.y - this.r;
            const maxY = block.y + block.height + this.r;

            if(this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY){
                // 위 아래/ 양 옆 중 어디에 충돌 했는지 확인한다.
                const distX = Math.min(Math.abs(this.x - minX), Math.abs(this.x - maxX));
                const distY = Math.min(Math.abs(this.y - minY), Math.abs(this.y - maxY));

                // 위 아래 충돌
                if (distX >= distY){
                    this.vy *= -1;
                    this.y += this.vy;
                } else {
                    this.vx *= -1;
                    this.x += this.vy;
                }

            } else{
                // 충돌하지 않을 때만 다시 그려준다.
                prev.push(block);
            }

            return prev;
        }, []);
    }

    draw(ctx, blocks){
        if(!this.isGameStart){
            this.x = this.bar.x + this.bar.width/2;
            this.y = this.bar.y - this.r;
        } else{
            this.x += this.vx;
            this.y += this.vy;
        }

        this.collisionBar();
        this.collisionCanvas();
        this.collisionBlock();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        this.blocks.forEach((block) => {
            block.draw(ctx);
        });
    }
}