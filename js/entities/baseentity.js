var doAnim = function(renderable, animation) {
    if (!renderable.isCurrentAnimation(animation))
	renderable.setCurrentAnimation(animation);
}

game.Entity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
    },

    update : function () {
	    if (this.jumping || this.falling) {
		    switch (this.direction){
			case "left":
				doAnim(this.renderable, 'jumpleft');
				break;
			case "right":
				doAnim(this.renderable, 'jumpright');
				break;
			//this.moving = true;
		   	//this.vel.y += this.accel.y * me.timer.tick;
            } else {
		    switch (this.direction) {
			case "left":
			    doAnim(this.renderable, 'left');
			    break;
		       
			case "right":
			   if (!this.renderable.isCurrentAnimation("right"))
				this.renderable.setCurrentAnimation("right");
			    break;
		    }
            }

        if (this.moving) {
            // Look into replacing this with dispatch tables
            // http://designpepper.com/blog/drips/using-dispatch-tables-to-avoid-conditionals-in-javascript

		
	    switch (this.direction) {
		case "left":
		    this.moving = false;
		    this.vel.x -= this.accel.x * me.timer.tick;                   		    break;
	       
		case "right":
		    this.moving = false;
		    this.vel.x += this.accel.x * me.timer.tick;
		    break;
	    }
        }

        this.updateMovement();

        if (this.vel.x || this.vel.y) {
            this.parent();
            return true;
        }

        if (!this.renderable.isCurrentAnimation("stand-" + this.direction)) {
            this.renderable.setCurrentAnimation("stand-" + this.direction);
            return true;
        }

        return false;
    }
});
