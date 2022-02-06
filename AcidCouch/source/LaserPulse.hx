package;

import flixel.*;
import flixel.effects.FlxFlicker;

class LaserPulse extends FlxSprite
{
	// [Embed(source = '../content/acidcouch_laser_3.png')]
	// private var laserExplosion:Class;
	public function new()
	{
		super(40, 25);
		// this.loadRotatedGraphic(laserExplosion, 30);
		this.scale.x = 0.8;
		this.scale.y = 2;
		FlxFlicker.flicker(this, 5);
	}

	override public function update(elapsed:Float)
	{
		if (FlxFlicker.isFlickering(this) == false)
		{
			FlxFlicker.flicker(this, 5);
		}
		if (this.scale.x < 3.4)
		{
			this.scale.x = 1.2 * this.scale.x;
		}

		if (this.scale.x >= 3.4)
		{
			this.scale.x = 2;
		}

		super.update(elapsed);
	}
}
