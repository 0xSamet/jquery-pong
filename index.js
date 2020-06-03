$(document).ready(function(){
    var arena = $("#arena");
    var playerDom = $("#player");
    var computerDom = $("#computer");
    var ballDom = $("#ball");
    var userScore = $("#user-score");
    var computerScore = $("#computer-score");
    var gameOver = $("#gameover");

    var Ball = function(element){
        this.x = arena.innerWidth() / 2 - ballDom.innerWidth();
        this.y = arena.innerHeight() / 2 - ballDom.innerHeight();
        this.velocityX = 5;
        this.velocityY = 5;
        this.speed = 5;
        this.radius = 25;
        this.update = function(){
            this.x = this.x + this.velocityX;
            this.y = this.y + this.velocityY;
        }
        this.reset = function(){
            this.speed = 5;
            this.x = arena.innerWidth() / 2 - ballDom.innerWidth();
            this.y = arena.innerHeight() / 2 - ballDom.innerHeight();
            ball.velocityX = -this.velocityX;     
        }
        this.edges = function(){
            if(this.y < 0 || this.y > arena.innerHeight() - this.radius){
                this.velocityY *= -1;
            }
        }
        this.draw = function(){
            element.css({
                width: this.radius,
                height: this.radius,
                borderRadius: this.radius,
                backgroundColor: "#fd1d1d",
                zIndex: 5,
                left: this.x ,
                top: this.y 
            });
        }
    }

    var Computer = function(element){
        this.x = arena.innerWidth() - element.innerWidth();
        this.y = (arena.innerHeight() / 2) - (element.innerHeight() / 2);
        this.score = 0;
        this.draw = function(){
            element.css({
                top: this.y,
                left: this.x,
        });
        }
    }

    var Player = function(element){
        this.x = 0;
        this.y = (arena.innerHeight() / 2) - (element.innerHeight() / 2);
        this.score = 0;
        this.draw = function(){
            element.css({
                top: this.y,    
                left: this.x
            });
        }
    }

    var Collision = function(ball, player){
        this.check = function(){
        this.ball = ball;
        this.player = player;
        this.player.top = this.player.y;
        this.player.bottom = this.player.y + 100;
        this.player.left = this.player.x;
        this.player.right = this.player.x + 15;
        
        this.ball.top = this.ball.y - this.ball.radius;
        this.ball.bottom = this.ball.y + this.ball.radius;
        this.ball.left = this.ball.x - this.ball.radius;
        this.ball.right = this.ball.x + this.ball.radius;
        return this.ball.right > this.player.left && this.ball.top < this.player.bottom && this.ball.left < this.player.right && this.ball.bottom > this.player.top;
        }
    }

    var isGameOver = function(player, computer){
        var winner = "";
        if(player.score === 3 || computer.score === 3){
            if(player.score === 3){
                winner = "oyuncu";
            }else{
                winner = "bilgisayar"
            }
            clearInterval(gameLoop);
            $(document).off();
            playerDom.hide();
            computerDom.hide();
            gameOver.css({
                display: "flex"
            });
            gameOver.html("oyun bitti kazanan "+ winner);
        }
    }

    var player = new Player(playerDom);
    var computer = new Computer(computerDom);
    var ball = new Ball(ballDom);

    computer.draw();
    player.draw();
    ball.draw();

    var gameLoop = setInterval(function(){
        isGameOver(player, computer);
        computer.y += (ball.y - (computer.y + (computerDom.innerHeight() / 2 ))) * 0.2;
        computer.draw();
        let user = (ball.x < arena.innerWidth()/2 ) ? player : computer;
        var col = new Collision(ball, user);
        if(col.check()){
            let collidePoint = (ball.y - (player.y + (playerDom.innerHeight()/2)));
            collidePoint = collidePoint / (playerDom.innerHeight() / 2);
            let angleRad = (Math.PI / 4) * collidePoint;
            let direction = (ball.x < arena.innerWidth() / 2) ? 1 : -1;
            ball.velocityX =  direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            ball.speed += 1;
        }
        ball.update();
        ball.edges();
        ball.draw();
        if(ball.x - ball.radius < 0){
            computer.score++;
            computerScore.html(computer.score);
            ball.reset();
        }
        if(ball.x + ball.radius > arena.innerWidth()){
            player.score++;
            userScore.html(player.score);
            ball.reset();
        }
    },25);

    $(document).on('mousemove', function(e){
        player.y = e.clientY - arena.innerHeight() + playerDom.innerHeight();
        player.draw();
    });

});