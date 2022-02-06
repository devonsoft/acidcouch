package;

import flixel.*;
import flixel.math.FlxPoint;

class BackgroundImage extends FlxSprite
{
	/*[Embed(source = '../content/SeizureBgTopLeft.png')] private var TopLeftImg:Class;
		[Embed(source = '../content/SeizureBgTopRight.png')] private var TopRightImg:Class;
		[Embed(source = '../content/SeizureBgBottomleft.png')] private var BottomLeftImg:Class;
		[Embed(source = '../content/SeizureBgBottomRight.png')] private var BottomRightImg:Class; */
	public function new(quadrant:UInt)
	{
		super(0, 0);
		var frameSize:FlxPoint = new FlxPoint(160, 120);
		if (quadrant == 3)
		{
			this.x = frameSize.x;
			this.y = frameSize.y;
			// this.loadGraphic(BottomRightImg, true, false, frameSize.x, frameSize.y);
		}
		else if (quadrant == 2)
		{
			this.y = frameSize.y;
			// this.loadGraphic(BottomLeftImg, true, false, frameSize.x, frameSize.y);
		}
		else if (quadrant == 1)
		{
			this.x = frameSize.x;
			// this.loadGraphic(TopRightImg, true, false, frameSize.x, frameSize.y);
		}
		else
		{ // 0 or bad number
			// this.loadGraphic(TopLeftImg, true, false, frameSize.x, frameSize.y);
		}
		this.alpha = 0.75;
		this.animation.add("Pulse", [0, 1, 2, 3, 4, 5, 6, 7], 8);
		this.animation.play("Pulse");
		this.scrollFactor = new FlxPoint(0, 0);
	}

	override public function update(elapsed:Float)
	{
		super.update(elapsed);
	}
}
