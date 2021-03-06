game.Player = game.Entity.extend({
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.setVelocity(4.0, 16.0);
        this.setFriction(0.5, 0.5);
        this.step = 0;
        this.id;
        this.moving = false;
        this.direction = 'right';
        this.font = new me.Font("Helvetica", 10, "#000", "center");

        if(this.name === "player") {
            global.state.localPlayer = this;
            me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
        }

        var names = [];

        /* Cool idea to steal
        var dirs = [ "left", "right", "up", "down" ];
        for (var j = 0; j < dirs.length; j++) {
            for (var i = 1; i <= 7; i++) {
                names.push("player-" + dirs[j] + "-" + i + ".png");
            }
           names.push("player-stand-"+dirs[j]+".png")
        }
        */

	//array is 40  units long
        names.push("roboidle1.png");
        names.push("roboidle2.png");
	names.push("roboidle3.png");
	names.push("robowalk1.png");
	names.push("robowalk2.png");
	names.push("robowalk3.png");
	names.push("robowalk4.png");
	names.push("robowalk5.png");
	names.push("robowalk6.png");
	names.push("robowalk7.png");
	names.push("robostop1.png");
	names.push("robostop2.png");
	names.push("robojump1.png");
	names.push("robojump2.png");
	names.push("robojump3.png");
	names.push("robojump4.png");
	names.push("robojump5.png");
	names.push("robojump6.png");
	names.push("robojump7.png");
	names.push("robojump8.png");
	names.push("robojump9.png");
	names.push("roboidleleft1.png");
	names.push("roboidleleft2.png");
	names.push("roboidleleft3.png");
	names.push("robowalkleft1.png");
	names.push("robowalkleft2.png");
	names.push("robowalkleft3.png");
	names.push("robowalkleft4.png");
	names.push("robowalkleft5.png");
	names.push("robowalkleft6.png");
	names.push("robowalkleft7.png");	
	names.push("robojumpleft1.png");
	names.push("robojumpleft2.png");
	names.push("robojumpleft3.png");
	names.push("robojumpleft4.png");
	names.push("robojumpleft5.png");
	names.push("robojumpleft6.png");
	names.push("robojumpleft7.png");
	names.push("robojumpleft8.png");
	names.push("robojumpleft9.png");
 
        this.renderable = game.texture.createAnimationFromName(names);
        this.renderable.animationspeed = ~~(me.sys.fps / 30);

        this.renderable.addAnimation("stand-left", [21,22,23]);
        this.renderable.addAnimation("left", [24,25,26,27,28,29,30]);

        this.renderable.addAnimation("stand-right", [0,1,2]);
        this.renderable.addAnimation("right",[3,4,5,6,7,8,9]);

	this.renderable.addAnimation("jumpright", [12,13,14,15,16,17,18,19,20]);
 	this.renderable.addAnimation("jumpleft", [31,32,33,34,35,36,37,38,39]);

	this.renderable.setCurrentAnimation("stand-right");
    },

    update : function () {
        // Movement
        var self = this;
        this.step++;

        if(this.name === global.state.playername) {
            if(me.input.isKeyPressed("left")) {
                this.moving = true;
                this.direction = "left";
            } else if(me.input.isKeyPressed("right")) {
                this.moving = true;
                this.direction = "right";
            }

            if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
                this.jumping = true;
                this.vel.y = -this.accel.y * me.timer.tick;
            }

        }

        me.game.collide(this, true);
        var result = this.parent();

        // Add step checking and interpolation instead of this
        if(this.name === global.state.playername && result) {
            socket.emit("move player", {x: this.pos.x, y: this.pos.y, vX: this.vel.x, vY: this.vel.y});
        }

        if(this.step > 99) {
            this.step = 0;
        }

        return result;
    },

    draw: function(context) {
            var self= this;
            this.font.draw(
                context,
                self.name,
                self.pos.x + 25,
                self.pos.y - 15
            );

            this.parent(context);
    }
});
