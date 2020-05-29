$(document).ready(function(){
    var arena = $("#arena");
    var player1Dom = $("#player1");
    var player2Dom = $("#player2");
    var ballDom = $("#ball");

    var Ball = function(element){
        this.x = arena.innerWidth() / 2 - ballDom.innerWidth();
        this.y = arena.innerHeight() / 2 - ballDom.innerHeight();
        this.xSpeed = 1;
        this.ySpeed = 3;
        this.radius = 25;
        this.update = function(){
            this.x = this.x + this.xSpeed;
            this.y = this.y + this.ySpeed;
        }
        this.reset = function(){
            this.x = arena.innerWidth() / 2 - ballDom.innerWidth();
            this.y = arena.innerHeight() / 2 - ballDom.innerHeight();
        }
        this.edges = function(){
            if(this.y < 0 || this.y > arena.innerHeight() - this.radius){
                this.ySpeed *= -1;
            }
            if(this.x > arena.innerWidth() - this.radius){
                this.xSpeed *= -1;
            }
            if(this.x < 0){
                this.xSpeed *= -1;
            }
        }
        this.drawBall = function(){
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

    var Player = function(element, name){
        this.name = name;
        this.top = 0;
        this.maximumTop = arena.innerHeight() - element.innerHeight();
        this.minimumTop = 0;
        this.moveDown = function(){
            if(this.top < this.maximumTop){
                element.css({ top: this.top + 10 });
                this.top = this.top + 10;
            }
        }
        this.moveUp = function(){
            if(this.top > this.minimumTop){
                element.css({ top: this.top - 10 });
                this.top = this.top - 10;
            }
        }
    }

    var playerOne = new Player(player1Dom);
    var playerTwo = new Player(player2Dom);

    var ball = new Ball(ballDom);

   // ball.drawBall();
   console.log(arena.innerWidth());
    setInterval(function(){
        ball.update();
        ball.edges();
        ball.drawBall();
    },10);


    $(document).on('keydown', function(e){
        switch(e.which) {
            case 87:
                playerOne.moveUp();
                break;
            case 83:
                playerOne.moveDown();
              break;
            default:
              console.log("boş");
          }
    })

});