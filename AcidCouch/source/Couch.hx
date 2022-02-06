package;

import flixel.*;
import flixel.math.FlxPoint;

class Couch extends FlxSprite
{
	public var speed:Float = 5000;
	public var direction:FlxPoint = new FlxPoint();

	public function new()
	{
		super(1000, 2000);
		// this.loadRotatedGraphic(CouchImg, 32);
	}

	override public function update(elapsed:Float)
	{
		super.update(elapsed);
	}

	// [Embed(source = '../content/Couch.png')]
	// private var CouchImg:Class;
}
