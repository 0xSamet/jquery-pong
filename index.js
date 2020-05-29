$(document).ready(function(){
    var arena = $("#arena");
    var player1Dom = $("#player1");
    var player2Dom = $("#player2");

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

    $(document).on('keydown', function(e){

        //// w 87
        //// s 83
        /// üst 38
        /// alt 40
        switch(e.which) {
            case 87:
                playerOne.moveUp();
                break;
            case 83:
                playerOne.moveDown();
              break;
            case 38:
                playerTwo.moveUp();
              break;
            case 40:
                playerTwo.moveDown();
              break;
            default:
              console.log("sa");
          }
    })

});