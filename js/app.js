// Define Game function for intro and outro
var Game = function() {
    this.gameOn = false;
};

// Game instantiate with enemy array Enemy bugs and a player
Game.prototype.start = function() {
    allEnemies = [];
    canvasWidth = 505;
    canvasHeight = 586;
    for (var i = 0; i < 4; i++) {
        var enemy = new Enemy(-i * canvasWidth / 5, 83 * i + 62);
        allEnemies.push(enemy);
    }
    var initialPlayerX = 202;
    var initialPlayerY = 404;
    player = new Player(initialPlayerX, initialPlayerY);
    // timer = 60;
    // document.getElementById('timer').innerHTML = timer;

    // populate initial values of the HTML
    document.getElementById('lives').innerHTML = player.lives;
    document.getElementById('score').innerHTML = player.score;
    document.getElementById('body').style.backgroundColor = 'lightblue';
    document.getElementById('body').style.color = 'black';

    // initiate game, this will start rendering
    this.gameOn = true;
};

// Handle intro and outro spacebar inputs
Game.prototype.handleInput = function(key) {
    switch (key) {
        case 'spacebar':
            // If the game is not on, turn it on!
            if (!this.gameOn) {
                this.start();
            }
            // If the game is On and all lives are lost, start the game again
            if (this.gameOn && player.lives === 0) {
                this.start();
            }
    }
};



// Game.prototype.timer = function() {
// };


// Superclass for Enemy and Player render functions
var GameObject = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = '';
};

// Common render function for Enemy and Player classes
GameObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.rate = 100 + Math.floor(Math.random() * 100);
};

// Adding subclass to use the common render function from GameObject superclass
// Draw the enemy on the screen, required method for game
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var startPosition = -100; // to remove magic numbers
    this.x = this.x + (dt * this.rate);
    if (this.x > canvasWidth) {
        this.x = startPosition;
    }
};

// Increase speed of enemies for every 5 points in score
// Also change background color to let players know
Enemy.prototype.increaseRate = function() {
    var rateOfIncrease = 30;
    if (player.score >= 5 && this.rate < 200) {
        this.rate += rateOfIncrease;
        document.getElementById('body').style.backgroundColor = '#cfe2e2';
    }
    if (player.score >= 10 && this.rate < 230) {
        this.rate += rateOfIncrease;
        document.getElementById('body').style.backgroundColor = '#9fc6c6';

    }
    if (player.score >= 15 && this.rate < 260) {
        this.rate += rateOfIncrease;
        document.getElementById('body').style.backgroundColor = '#70a9a9';

    }
    if (player.score >= 20 && this.rate < 290) {
        this.rate += rateOfIncrease;
        document.getElementById('body').style.backgroundColor = '#4d8080';
        document.getElementById('body').style.color = 'white';

    }
    if (player.score >= 25 && this.rate < 320) {
        this.rate += 30;
        document.getElementById('body').style.backgroundColor = 'DarkSlateGray';
        document.getElementById('body').style.color = 'white';

    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.initialX = x; //to avoid magic numbers later on
    this.initialY = y; // "
    this.score = 0;
    this.lives = 3;
};

// Adding subclass to use the common render function from GameObject superclass
// Draw the player on the screen, required method for game
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// Update score of the player and reset player position  
Player.prototype.update = function() {
    if (this.y < 0) {
        this.x = this.initialX;
        this.y = this.initialY;
        this.score++;
        document.getElementById('score').innerHTML = this.score;
    }
};

// Handle the keyboard inputs for player
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 404) {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
    }
};

// Reduce player lives if collision occurs
Player.prototype.reset = function() {
    if (this.lives > 0) {
        this.lives--;
        document.getElementById('lives').innerHTML = this.lives;
    }
    this.x = this.initialX;
    this.y = this.initialY;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

game = new Game();

// This listens for key presses and sends the keys to your
// player.handleInput() method and game.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys;
    if (!game.gameOn || (game.gameOn && player.lives === 0)) {
        allowedKeys = {
            32: 'spacebar'
        };
        game.handleInput(allowedKeys[e.keyCode]);
    } else allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'up', //W
        65: 'left', //A
        83: 'down', //S
        68: 'right' //D
    };
    player.handleInput(allowedKeys[e.keyCode]);
    if (e.keyCode in allowedKeys) {
        e.preventDefault();
    }
});