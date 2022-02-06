package;

import flixel.*; // Allows you to refer to flixel objects in your code
import flixel.group.*;

// [SWF(width = "450", height = "338", backgroundColor = "#000000")] // Set the size and color of the Flash file
// [Frame(factoryClass = "Preloader")] // Tells Flixel to use the default preloader
class Game extends FlxGame
{
	/*[Embed(source = '../content/Mountain Music.mp3')]
		public static var MountainMusic:Class;
		[Embed(source = '../content/Normal Music.mp3')]
		public static var NormalMusic:Class;
		[Embed(source = '../content/Roiling Mountain Ambience.mp3')]
		public static var AmbienceMusic:Class;
		[Embed(source = '../content/Trip Out.mp3')]
		public static var TripMusic:Class;
		[Embed(source = '../content/You Die.mp3')]
		public static var DieMusic:Class;
		[Embed(source = '../content/You Win.mp3')]
		public static var WinMusic:Class;
		[Embed(source = '../content/Monster Dies.mp3')]
		public static var MonsterSound:Class; */
	public function new()
	{
		super(320, 240, MenuState, 1); // Create a new FlxGame object at 320x240 with 2x pixels, then load PlayState
		FlxG.mouse.visible = true;
		// FlxG.mouse.load(CursorImg);
		/*this.pause = new FlxGroup();
			this.pause.scrollFactor.x = 0;
			this.pause.scrollFactor.y = 0;
			this.pause.add(new FlxSprite(0, 0, PauseImg), true); */
		this.scaleX = 1.41;
		this.scaleY = 1.41;
	}
	// [Embed(source = '../content/Cursor.png')]
	// private var CursorImg:Class;
	// [Embed(source = '../content/Pause.png')]
	// private var PauseImg:Class;
}
