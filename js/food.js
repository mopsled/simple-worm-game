var Food = function(max_x, max_y) {
    var random_x = Math.floor(Math.random() * max_x);
    var random_y = Math.floor(Math.random() * max_y);
    this.location = {x: random_x, y: random_y};
    this.color = "#123456";
}
Food.prototype.draw = function(game) {
    game.context.fillStyle = this.color;
    game.context.fillRect(this.location.x * game.grid_size, this.location.y * game.grid_size, game.grid_size, game.grid_size)
}
Food.prototype.collided = function(snake) {
    for (var i = 0; i < snake.body.length; i++) {
        snake_part = snake.body[i];
        if (this.location.x == snake_part.x && this.location.y == snake_part.y) {
            return true;
        }
    }
    return false;
}

var GrowFood = function(max_x, max_y) {
    Food.call(this, max_x, max_y)
    this.color = "#12CF08";
}
GrowFood.prototype = new Food();
GrowFood.prototype.eaten = function(game) {
    game.snake.grow();
}

var ExtraGrowFood = function(max_x, max_y) {
    var random_x = Math.floor(Math.random() * (max_x - 1));
    var random_y = Math.floor(Math.random() * (max_y - 1));
    this.location = {x: random_x, y: random_y};
    this.color = "#08BB24";
}
ExtraGrowFood.prototype = new Food();
ExtraGrowFood.prototype.draw = function(game) {
    game.context.fillStyle = this.color;
    for (var x = 0; x < 2; x++) {
        for (var y = 0; y < 2; y++) {
            game.context.fillRect((this.location.x + x) * game.grid_size, (this.location.y + y) * game.grid_size, game.grid_size, game.grid_size)
        }
    }
}
ExtraGrowFood.prototype.collided = function(snake) {
    for (var i = 0; i < snake.body.length; i++) {
        snake_part = snake.body[i];
        for (var x = 0; x < 2; x++) {
            for (var y = 0; y < 2; y++) {
                if ((this.location.x + x) == snake_part.x && (this.location.y + y) == snake_part.y) {
                    return true;
                }
            }
        }
    }
    return false;
}
ExtraGrowFood.prototype.eaten = function(game) {
    game.snake.growth_amount *= 2;
    game.snake.grow();
    game.snake.growth_amount /= 2;
}