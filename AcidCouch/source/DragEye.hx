package;

import flixel.*;
import flixel.group.FlxSpriteGroup;
import flixel.math.FlxPoint;

class DragEye extends FlxSpriteGroup
{
	public var isDragging:Bool = false;
	public var eye:FlxSprite = new FlxSprite(820, 7840);
	public var brow:FlxSprite = new FlxSprite();

	public function new(clickEye:ClickEye)
	{
		super();
		this._clickEye = clickEye;
		// this.eye.loadGraphic(DragEyeImg, true, false, 75, 43);

		// this.brow.loadGraphic(DragEyeBrowImg, true, false, 92, 71);

		this.brow.x = this.eye.x - 29;
		this.brow.y = this.eye.y - 27;
		this.add(this.eye);
		this.add(this.brow);

		this._last.x = this.x;
		this._last.y = this.y;
	}

	override public function update(elapsed:Float)
	{
		if (FlxG.mouse.justPressed)
		{
			this.isDragging = true;
			this.eye.frame = this.eye.frames.frames[1];
			// FlxG.playMusic(Game.MountainMusic);
		}
		if (FlxG.mouse.justReleased)
		{
			this.isDragging = false;
			this.eye.frame = this.eye.frames.frames[0];
			// if (this._clickEye.dilation > 0)
			//	FlxG.playMusic(Game.NormalMusic);
		}
		if (this.isDragging)
		{
			var eyeScreen:FlxPoint = this.eye.getScreenPosition();
			var mouseVelocity:FlxPoint = new FlxPoint(FlxG.mouse.x - this._lastMousePosition.x, FlxG.mouse.y - this._lastMousePosition.y);
			eyeScreen.x += mouseVelocity.x;
			eyeScreen.y += mouseVelocity.y;
			var bleed:FlxPoint = new FlxPoint(this.eye.frameWidth - 7, this.eye.frameHeight - 5);
			if (eyeScreen.x > -bleed.x && eyeScreen.x < (FlxG.width - this.eye.frameWidth) + bleed.x)
			{
				this.x += mouseVelocity.x;
			}
			if (eyeScreen.y > -bleed.y && eyeScreen.y < (FlxG.height - this.eye.frameHeight) + bleed.y)
			{
				this.y += mouseVelocity.y;
			}
			var finalVelocity:FlxPoint = new FlxPoint((this.x - this._last.x), (this.y - this._last.y));

			for (member in this.members)
			{
				member.x += finalVelocity.x;
				member.y += finalVelocity.y;
			}
		}
		this._lastMousePosition.x = FlxG.mouse.x;
		this._lastMousePosition.y = FlxG.mouse.y;
		this._last.x = this.x;
		this._last.y = this.y;
		super.update(elapsed);
	}

	// [Embed(source = '../content/DragEye.png')] private var DragEyeImg:Class;
	// [Embed(source = '../content/DragEyeBrow.png')] private var DragEyeBrowImg:Class;
	private var _lastMousePosition:FlxPoint = new FlxPoint();
	private var _last:FlxPoint = new FlxPoint();
	private var _clickEye:ClickEye;
}
