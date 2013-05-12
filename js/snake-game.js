var SnakeGame = function(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext('2d');
    this.width = 600;
    this.height = 500;
    this.delay = 80;
    this.grid_size = 20;
    this.snake = new Snake(5, 10);
    this.food = this.pick_random_food();
    this.running = true;
}
SnakeGame.prototype.game_loop = function() {
    if (this.running) {
        var _this = this;
        setTimeout(function() { _this.game_loop() }, this.delay);
    }
    this.update_world();
    this.draw_world();
}
SnakeGame.prototype.update_world = function() {
    this.snake.move();
    if (this.snake.collided(this)) {
        this.reset();
    }
    if (this.food.collided(this.snake)) {
        this.food.eaten(this);
        this.food = this.pick_random_food();
    }
}
SnakeGame.prototype.draw_world = function () {
    this.draw_backgorund("#FFFFFF");
    this.draw_grid("#000000");
    this.snake.draw(this)
    this.food.draw(this)
}
SnakeGame.prototype.draw_backgorund = function(color) {
    this.canvas.height = this.canvas.height;
    this.canvas.width = this.canvas.width;
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height)
}
SnakeGame.prototype.draw_grid = function(color) {
    this.context.strokeStyle = color;
    this.context.lineWidth = 1.0;
    this.context.strokeRect(0, 0, this.width, this.height)
}
SnakeGame.prototype.pick_random_food = function() {
    var food = new GrowFood(this.width / this.grid_size, this.height / this.grid_size);;
    var random = Math.floor(Math.random() * 100) + 1;
    if (random > 75 && random <= 85) {
        food = new ExtraGrowFood(this.width / this.grid_size, this.height / this.grid_size);
    } else if (random > 85 && random <= 95) {
        food = new PortalFood(this.width / this.grid_size, this.height / this.grid_size);
    } else if (random > 95) {
        food = new BlurFood(this.width / this.grid_size, this.height / this.grid_size);
    }
    return food;
}
SnakeGame.prototype.key_hit = function(key) {
    // Change snake direction
    if (key.keyCode == 38) {
        this.snake.apply_direction(Direction.UP);
    } else if (key.keyCode == 40) {
        this.snake.apply_direction(Direction.DOWN);
    } else if (key.keyCode == 37) {
        this.snake.apply_direction(Direction.LEFT);
    } else if (key.keyCode == 39) {
        this.snake.apply_direction(Direction.RIGHT);
    }
}
SnakeGame.prototype.reset = function() {
    this.snake = new Snake(5, 10);
    this.food = new GrowFood(this.width / this.grid_size, this.height / this.grid_size);
    this.running = true;
}