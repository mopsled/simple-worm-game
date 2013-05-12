// Food (abstract class) - Provides coordinates, color, and default draw and collision functions
var Food = function(max_x, max_y) {
    var random_x = Math.floor(Math.random() * max_x);
    var random_y = Math.floor(Math.random() * max_y);
    this.location = {x: random_x, y: random_y};
    this.color = "#123456";
}
Food.prototype.draw = function(game) {
    game.context.fillStyle = this.color;
    game.context.fillRect(this.location.x * game.grid_size, this.location.y * game.grid_size, game.grid_size, game.grid_size);
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

// GrowFood (basic food type)
var GrowFood = function(max_x, max_y) {
    Food.call(this, max_x, max_y)
    this.color = "#12CF08";
}
GrowFood.prototype = new Food();
GrowFood.prototype.eaten = function(game) {
    game.snake.grow();
}

// ExtraGrowFood (twice as wide and fat as normal food, causes 2x growth)
var ExtraGrowFood = function(max_x, max_y) {
    var random_x = Math.floor(Math.random() * (max_x - 1));
    var random_y = Math.floor(Math.random() * (max_y - 1));
    this.location = {x: random_x, y: random_y};
    this.color = "#08BB56";
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

// PortalFood (creates two seperate, connected portals)
var PortalFood = function(max_x, max_y) {
    Food.call(this, max_x, max_y)
    var random_x = Math.floor(Math.random() * max_x);
    var random_y = Math.floor(Math.random() * max_y);
    this.second_location = {x: random_x, y: random_y};
    this.color = "#FF9409";
    this.second_color = "#0C1FD4";
}
PortalFood.prototype = new Food();
PortalFood.prototype.draw = function(game) {
    game.context.fillStyle = this.color;
    game.context.fillRect(this.location.x * game.grid_size, this.location.y * game.grid_size, game.grid_size, game.grid_size);
    game.context.fillStyle = this.second_color;
    game.context.fillRect(this.second_location.x * game.grid_size, this.second_location.y * game.grid_size, game.grid_size, game.grid_size);
}
PortalFood.prototype.collided = function(snake) {
    var head = snake.body[0];
    if (this.location.x == head.x && this.location.y == head.y) {
        return true;
    } else if (this.second_location.x == head.x && this.second_location.y == head.y) {
        return true;
    }
    return false;
}
PortalFood.prototype.eaten = function(game) {
    if (game.snake.body[0].x == this.location.x && game.snake.body[0].y == this.location.y) {
        game.snake.body[0] = this.second_location;
    } else {
        game.snake.body[0] = this.location;
    }
}

// BlurFood (blur the board for 3 seconds)
var BlurFood = function(max_x, max_y) {
    Food.call(this, max_x, max_y)
    this.color = "#555555";
}
BlurFood.prototype = new Food();
BlurFood.prototype.draw = function(game) {
    game.context.fillStyle = "rgba(200, 200, 200, 1.0)";
    game.context.shadowColor = "rgba(200, 200, 200, 1.0)";
    game.context.shadowBlur = 8;
    game.context.shadowOffsetX = 0;
    game.context.shadowOffsetY = 0;
    game.context.rect(this.location.x * game.grid_size, this.location.y * game.grid_size, game.grid_size, game.grid_size);
    game.context.fill();
}
BlurFood.prototype.eaten = function(game) {
    game.canvas.setAttribute("style", "-webkit-filter: blur(4px); -webkit-transition: all 2.5s ease-in-out;");
    setTimeout(function() { game.canvas.setAttribute("style", "-webkit-filter: blur(0px); -webkit-transition: all 0.5s ease-in-out;"); }, 3000);
}