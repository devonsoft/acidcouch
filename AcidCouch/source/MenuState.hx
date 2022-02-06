package;

import flixel.FlxG;
import flixel.FlxSprite;
import flixel.FlxState;
import flixel.system.scaleModes.BaseScaleMode;
import flixel.system.scaleModes.FillScaleMode;
import flixel.system.scaleModes.FixedScaleMode;
import flixel.system.scaleModes.PixelPerfectScaleMode;
import flixel.system.scaleModes.RatioScaleMode;
import flixel.system.scaleModes.RelativeScaleMode;
import flixel.system.scaleModes.StageSizeScaleMode;
import flixel.text.FlxText;
import flixel.tile.*;
import flixel.tile.FlxTilemap;
import flixel.util.FlxStringUtil;
import openfl.Assets;

class MenuState extends FlxState
{
	// These are all the scale modes available in HaxeFlixel,
	// as written here: http://api.haxeflixel.com/flixel/system/scaleModes/index.html
	var modeBase:BaseScaleMode;
	var modeFill:FillScaleMode;
	var modeFixed:FixedScaleMode;
	var modeRatio:RatioScaleMode;
	var modeRelative:RelativeScaleMode;
	var modeStage:StageSizeScaleMode;
	var modePixel:PixelPerfectScaleMode;

	// Add some debug text so we know what mode we're looking at
	var debugText:FlxText;
	var level:FlxTilemap;
	var player:FlxSprite;

	override public function create():Void
	{
		super.create();

		// Set the camera background for visibility sake
		FlxG.camera.bgColor = 0xFF999999;

		// Each scale mode has to be instanced
		// Note the RelativeScaleMode's values are arbitrary.
		modeBase = new BaseScaleMode();
		modeFill = new FillScaleMode();
		modeFixed = new FixedScaleMode();
		modeRatio = new RatioScaleMode();
		modeRelative = new RelativeScaleMode(0.75, 0.75);
		modeStage = new StageSizeScaleMode();
		modePixel = new PixelPerfectScaleMode();

		// Load a tilemap that's huge enough
		level = new FlxTilemap();
		var mapData:String = Assets.getText("assets/data/sample-large-map.csv");
		level.loadMapFromCSV(mapData, AssetPaths.Tiles__png, 8, 8);
		add(level);

		// Create a player and make camera follow it,
		// so we can easily use it as a reference against
		// the screen size.
		player = new FlxSprite(100, 50);
		player.makeGraphic(5, 8);
		add(player);
		FlxG.camera.follow(player, flixel.FlxCamera.FlxCameraFollowStyle.TOPDOWN, 10);

		// Add a debug text on top of everything, and set the scrollFactor
		// to zero so it will never scroll with the camera.
		debugText = new FlxText(10, 10, 200, "Default scale mode (ratio)");
		debugText.scrollFactor.set(0, 0);
		add(debugText);
	}

	override public function update(elapsed:Float)
	{
		super.update(elapsed);

		// Change scale mode
		if (FlxG.keys.justPressed.ONE)
			SetScaleMode(1);
		if (FlxG.keys.justPressed.TWO)
			SetScaleMode(2);
		if (FlxG.keys.justPressed.THREE)
			SetScaleMode(3);
		if (FlxG.keys.justPressed.FOUR)
			SetScaleMode(4);
		if (FlxG.keys.justPressed.FIVE)
			SetScaleMode(5);
		if (FlxG.keys.justPressed.SIX)
			SetScaleMode(6);
		if (FlxG.keys.justPressed.SEVEN)
			SetScaleMode(7);

		// Move player
		var moveSpeed = 5;
		if (FlxG.keys.pressed.LEFT)
			player.x += -moveSpeed;
		if (FlxG.keys.pressed.RIGHT)
			player.x += moveSpeed;
		if (FlxG.keys.pressed.UP)
			player.y += -moveSpeed;
		if (FlxG.keys.pressed.DOWN)
			player.y += moveSpeed;
	}

	function SetScaleMode(screenMode:Int = -1)
	{
		// Remember: Switch block do not fall through
		// in haxe, so there's no need for "break;"
		// for each case.
		var modeText = "Unknown";
		switch (screenMode)
		{
			case 1:
				FlxG.scaleMode = modeBase;
				modeText = "base";
			case 2:
				FlxG.scaleMode = modeFill;
				modeText = "fill";
			case 3:
				FlxG.scaleMode = modeFixed;
				modeText = "fixed";
			case 4:
				FlxG.scaleMode = modeRatio;
				modeText = "ratio";
			case 5:
				FlxG.scaleMode = modeRelative;
				modeText = "relative";
			case 6:
				FlxG.scaleMode = modeStage;
				modeText = "stage size";
			case 7:
				FlxG.scaleMode = modePixel;
				modeText = "pixel perfect";
		}

		// Update debug text
		if (screenMode != -1)
			debugText.text = "screen mode : " + modeText;
	}

	override public function destroy():Void
	{
		super.destroy();
	}
}
/*package;

	import flash.net.*;
	import flixel.*;
	import flixel.system.scaleModes.FillScaleMode;
	import flixel.system.scaleModes.PixelPerfectScaleMode;
	import flixel.text.FlxText;
	import flixel.ui.FlxButton;

	class MenuState extends FlxState
	{
	// [
	//	Embed(source = "../content/LEVIBRUSH.TTF", fontFamily = "Brush", embedAsCFF = "false")
	// ]
	public var BrushFont:String;

	public function new()
	{
		super();
	}

	override public function create()
	{
		super.create();
		FlxG.scaleMode = new FillScaleMode();

		this.bgColor = 0xb4a912;
		add(new FlxSprite(0, 0, AssetPaths.CouchMenu__png));
		var title:FlxText;
		title = new FlxText(12, 12, FlxG.width - 20, "I have done acid. Will you babysit me, please? I cannot get off the couch.");
		title.setFormat("Brush", 16, 0x000000, "center");
		add(title);

		var yesButton:FlxButton = new FlxButton(100, 60, onClickYes);
		var buttonBackground:FlxSprite = new FlxSprite();
		buttonBackground.makeGraphic(50, 32, 0x00ffff00);
		// yesButton.loadGraphic(buttonBackground);
		var yesTextBlack:FlxText = new FlxText(0, 0, 50, "-Yes");
		yesTextBlack.setFormat("Brush", 20, 0x2c3867, "center");
		var yesTextWhite:FlxText = new FlxText(0, 0, 50, "-Yes");
		yesTextWhite.setFormat("Brush", 20, 0xffffffff, "center");
		// yesButton.loadText(yesTextBlack, yesTextWhite);
		add(yesButton);

		var noButton:FlxButton = new FlxButton(165, 60, onClickNo);
		// noButton.loadGraphic(buttonBackground);
		var noTextBlack:FlxText = new FlxText(0, 0, 50, "-No");
		noTextBlack.setFormat("Brush", 20, 0x2c3867, "center");
		var noTextWhite:FlxText = new FlxText(0, 0, 50, "-No");
		noTextWhite.setFormat("Brush", 20, 0xffffffff, "center");
		// noButton.loadText(noTextBlack, noTextWhite);
		add(noButton);

		// FlxG.playMusic(Game.NormalMusic);
		this.update(0);
		// FlxG.pause = true;
	}

	override public function update(elapsed:Float)
	{
		if (FlxG.keys.anyJustPressed([SPACE]))
		{
			FlxG.switchState(new PlayState());
			// FlxG.pause = false;
		}
		super.update(elapsed);
	}

	function onClickYes()
	{
		FlxG.switchState(new PlayState());
		// FlxG.pause = false;
	}

	function onClickNo()
	{
		// navigateToURL(new URLRequest("http://en.wikipedia.org/wiki/Milquetoast"));
	}
	}
 */
