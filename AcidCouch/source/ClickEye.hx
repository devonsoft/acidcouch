package;

import flixel.*;
import flixel.group.FlxSpriteGroup;
import flixel.math.FlxPoint;

class ClickEye extends FlxSpriteGroup
{
	public var dilation:Float = 1;
	public var eye:FlxSprite = new FlxSprite(50, 58);

	public function new()
	{
		super();
		// this.scrollFactor = new FlxPoint(0, 0);

		// this.eye.loadGraphic(ClickEyeImg);
		this.eye.scrollFactor = new FlxPoint(0, 0);

		// this._brow.loadGraphic(ClickEyeBrowImg);
		this._brow.x = this.eye.x - 2;
		this._brow.y = this.eye.y - 26;
		this._brow.scrollFactor = this.scrollFactor;

		// this._pupil.loadGraphic(ClickEyePupilImg);
		this._pupil.x = this.eye.x + 28;
		this._pupil.y = this.eye.y + 9;
		this._pupil.scrollFactor = this.scrollFactor;

		// this._highlight.loadGraphic(ClickEyeHighlightImg);
		this._highlight.x = this.eye.x;
		this._highlight.y = this.eye.y;
		this._highlight.scrollFactor = this.scrollFactor;

		this.add(this.eye);
		this.add(this._brow);
		this.add(this._pupil);
		this.add(this._highlight);

		this._last.x = this.x;
		this._last.y = this.y;
	}

	override public function update(elapsed:Float)
	{
		if (!this.exists)
			return;
		this.dilation -= this._constrictSpeed * (10) * FlxG.elapsed;
		if (this.dilation <= 0)
		{
			// if (!this._isTripping)
			//	FlxG.playMusic(Game.TripMusic);
			this._isTripping = true;
			this.dilation = 0;
		}
		if (FlxG.mouse.justPressed
			&& this.eye.overlapsPoint(cast(FlxG.mouse.screenX + FlxG.camera.scroll.x), cast(FlxG.mouse.screenY + FlxG.camera.scroll.y)))
		{
			this._isTripping = false;

			// FlxG.play(EyePokeSound);
			// if (this.dilation <= 0)
			//	FlxG.playMusic(Game.NormalMusic);
			this.dilation += this._dilateSpeed * FlxG.elapsed;
		}
		if (this.dilation > this._maxDilation)
			this.dilation = this._maxDilation;
		this._pupil.scale.x = this.dilation + 0.1;
		this._pupil.scale.y = this.dilation + 0.1;
		for (member in this.members)
		{
			member.x += (this.x - this._last.x);
			member.y += (this.y - this._last.y);
		}
		this._last.x = this.x;
		this._last.y = this.y;
		super.update(elapsed);
	}

	private var _isTripping:Bool = false;
	private var _maxDilation:Float = 0.92;
	private var _dilateSpeed:Float = 5;
	private var _constrictSpeed:Float = 0.01;
	private var _brow:FlxSprite = new FlxSprite();
	private var _pupil:FlxSprite = new FlxSprite();
	private var _highlight:FlxSprite = new FlxSprite();
	private var _last:FlxPoint = new FlxPoint();
	/*
		[Embed(source = '../content/ClickEye.png')] 
			private var ClickEyeImg:Class;
		[Embed(source = '../content/ClickEyeBrow.png')] 
			private var ClickEyeBrowImg:Class;
		[Embed(source = '../content/ClickEyeHighlight.png')] 
			private var ClickEyeHighlightImg:Class;
		[Embed(source = '../content/ClickEyePupil.png')] 
			private var ClickEyePupilImg:Class;
		// embedded sounds
		[Embed(source = '../content/Eye Poke.mp3')] 
			private var EyePokeSound:Class; */
}
