package;

import flixel.*;
import flixel.math.FlxPoint;

class Player extends FlxSprite
{
	public var speed:Float = 5000;
	public var direction:FlxPoint = new FlxPoint();

	public function new(clickEye:ClickEye, dragEye:DragEye)
	{
		super(dragEye.eye.x - 50, dragEye.eye.y + 40);
		// this.loadGraphic(AssetPaths., true, true, 32, 58);
		this.animation.add("Twitch", [0, 1], 10);
		this.animation.play("Twitch");
		this._clickEye = clickEye;
		this._dragEye = dragEye;
		this.width = 14;
		this.height = 48;
		this.offset.x = 9;
		this.offset.y = 5;
		this.health = 10;
	}

	override public function update(elapsed:Float)
	{
		// this._dragEye.brow.frame = this.health;
		if ((this._directionChangeCounter += FlxG.elapsed) >= 0.25 && this._dragEye.exists)
		{
			this._directionChangeCounter = 0;
			this.direction.x = this._dragEye.eye.x - this.x;
			this.direction.y = this._dragEye.eye.y - this.y;
		}
		if (Utility.normalize(direction) < 1 || this._clickEye.dilation == 0)
			this.acceleration = new FlxPoint();
		else
		{
			this.acceleration.x = this.direction.x * this.speed;
			this.acceleration.y = this.direction.y * this.speed;
		}
		this.velocity.x *= this._clickEye.dilation;
		this.velocity.y *= this._clickEye.dilation;
		super.update(elapsed);
	}

	// [Embed(source = '../content/Player.png')]
	// private var PlayerImg:Class;
	private var _clickEye:ClickEye;
	private var _dragEye:DragEye;
	private var _directionChangeCounter:Float = 0.5;
}
