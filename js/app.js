//used to check X locations of the player and enemy - will be used to identify collisions
function XrangeCheck(pX, eX) { //pX = player.x; eX = enemy.x
    var xPos1 = pX - 50.5;
    var xPos2 = pX + 50.5;
    // rangecheck for collisions
    if(eX > xPos1 && eX < xPos2){
        return true;
    }
}

// checks for a collision
function collision(pX, pY, eX, eY) {
    if (pY === eY && XrangeCheck(pX,eX)) {
        return true;
    }
}

// resets player back to original coordinates
function playerInit() {
    player.x = 202;
    player.y = 303;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; //"sprite" represents an enemy object
    this.x = x; //coordinates set in allEnemies object
    this.y = y; //coordinates set in allEnemies object
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = this.x + 202 * dt;
    this.x = this.speed;
// resets the enemy position on the map once it reaches the end
    if (this.x > 505) {
        this.x = this.speed - 505;
    }

//resets player location upon collision
    if (collision(player.x,player.y, this.x, this.y)) {
        playerInit();
    }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x; // starting position x-coord set when Player object is instantiated
    this.y = y; // starting position y-coord set when Player object is instantiated
};

Player.prototype.update = function () {
//does nothing, waste of typing and space
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//controls player movement and checks to ensure the player stays on the canvas
Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'left' :
            if (this.x > 0) {
            this.x = this.x - 101;
            }
        break;
        case 'right':
            if (this.x < 404) {
            this.x = this.x + 101;
            }
        break;
        //resets original player position once it makes it to the water; alerts player they scored
        case 'up':
            if (this.y > 3) { //possible combos 3, 78, 153, 228
                this.y = this.y - 75;
            } else {
                playerInit();
                alert('YOU ROCK!');
            }
        break;
        case 'down':
            if (this.y < 375) {
            this.y = this.y + 75;
            }
        break;
        }
};

// Now instantiate your objects.
var allEnemies = [];

allEnemies[0] = new Enemy(0, 78);
allEnemies[1] = new Enemy(250, 153);
allEnemies[2] = new Enemy(450, 228);

// Place the player object in a variable called player
var player = new Player(202,303);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});