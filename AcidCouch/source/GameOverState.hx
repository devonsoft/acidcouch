package;

import flash.net.*;
import flixel.*;
import flixel.text.FlxText;

class GameOverState extends FlxState
{
	public var timer:Float = 0;

	public function new(t:Float)
	{
		this.timer = t;
		super();
	}

	override public function create()
	{
		this.add(new BackgroundImage(0));
		this.add(new BackgroundImage(1));
		this.add(new BackgroundImage(2));
		this.add(new BackgroundImage(3));
		// add(new FlxSprite(35, 60, LoseImg));

		this.add(new FlxText(0, FlxG.height - 85, FlxG.width, ""));

		// FlxG.playMusic(Game.DieMusic);
		this.timer = 0;
	}

	override public function update(elapsed:Float)
	{
		timer += FlxG.elapsed;
		if (FlxG.keys.anyJustPressed([SPACE]) || FlxG.mouse.justPressed || this.timer > 10)
		{
			FlxG.switchState(new MenuState());
		}
		super.update(elapsed);
	}

	// [Embed(source = '../content/CouchOnlyLose.png')]
	// private var LoseImg:Class;
}
