package;

import flash.display.Shader;
import flash.filters.ShaderFilter;
import flash.geom.Point;
import flash.geom.Rectangle;
import flixel.*;
import flixel.FlxState;
import flixel.effects.FlxFlicker;
import flixel.group.FlxGroup;
import flixel.math.FlxAngle;
import flixel.math.FlxPoint;
import flixel.math.FlxRandom;
import flixel.text.FlxText;
import flixel.tile.FlxTilemap;
import flixel.tweens.FlxTween;

// import flash.sampler.NewObjectSample;
/*class PlayState extends FlxState
	{
	override public function create()
	{
		super.create();
	}

	override public function update(elapsed:Float)
	{
		super.update(elapsed);
	}
}*/
class PlayState extends FlxState
{
	public static final LEVEL_WIDTH:Float = 1760;
	public static final LEVEL_HEIGHT:Float = 8000;

	public var player:Player;
	public var timer:Float = 0;

	override public function create()
	{
		// FlxG.debug = false;
		this.bgColor = 0xFFFFFFFF;
		this._dragEye = new DragEye(this._clickEye);
		FlxG.worldBounds.set(0, 0, 2000, 8000);

		// this._tunnelShader = new Shader(new TunnelShaderCode());
		// this._wavesShader = new Shader(new WavesShaderCode());
		this._filter = new ShaderFilter(this._tunnelShader);

		this.player = new Player(this._clickEye, this._dragEye);

		// this._eyeBeam.loadGraphic(DragEyeBeamImg); // , 64);
		this._eyeBeam.alpha = 0.75;
		var difference:FlxPoint = new FlxPoint(this.player.x - 16 - this._dragEye.eye.x, this.player.y - this._dragEye.eye.y);
		var distance:Float = Utility.getLength(difference);
		this._eyeBeam.x = this._dragEye.eye.x - 128 + (difference.x * 0.5);
		this._eyeBeam.y = this._dragEye.eye.y + (difference.y * 0.5);

		this._timerText = new FlxText(0, FlxG.height - 85, FlxG.width, "");
		this._timerText.alpha = 0.75;
		// this._timerText.scrollFactor = new FlxPoint(0, 0);
		this._timerText.setFormat("Nervous", 72, 0xFFFFFFFF, "right");

		var twirl:FlxSprite = new FlxSprite();
		// twirl.loadGraphic(BgTwirlImg, true, false, 320, 240);
		twirl.animation.add("Twirl", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 30);
		twirl.animation.play("Twirl");
		twirl.alpha = 0.4;
		// twirl.scrollFactor = new FlxPoint(0, 0);

		// load maps
		// this._map1.loadMap(AssetPaths., TilesImg1, 8, 8);
		// this._map2.loadMap(new MapData2, TilesImg2, 8, 8);
		// this._map3.loadMap(new MapData3, TilesImg3, 8, 8);
		// this._map4.loadMap(new MapData4, TilesImg4, 8, 8);

		FlxG.camera.follow(this._eyeBeam, LOCKON, 5);

		// this.make(10, BouncerEnemy);
		for (i in 0...10)
			this._enemies.add(new BouncerEnemy());

		this.add(new BackgroundImage(0));
		this.add(new BackgroundImage(1));
		this.add(new BackgroundImage(2));
		this.add(new BackgroundImage(3));
		this.add(twirl);

		// Don't add backgrounds after this line
		this._backgroundIndex = this.members.length;

		this.add(this._map1);
		this.add(this._map2);
		this.add(this._map3);
		this.add(this._map4);

		this.add(this._enemies);
		this.add(this.player);
		this.add(this._eyeBeam);
		this.add(this._clickEye);
		this._clickEyeIndex = this.members.length - 1;
		this.add(this._dragEye);
		this.add(this._timerText);
	}

	override public function update(elapsed:Float)
	{
		if (this.player.health <= 0)
			FlxG.switchState(new GameOverState(this.timer));
		else if (this.player.x > 1000 && this.player.y < 1100)
		{
			if (!this._hasWon)
			{
				// FlxG.playMusic(Game.WinMusic);
				this._couch = new Couch();
				FlxG.camera.follow(this.player, LOCKON, 20);
				this.members[8] = this._couch;
				this._hasWon = true;
				this._dragEye.exists = false;
				this._clickEye.exists = false;
				this._eyeBeam.exists = false;
				this._timerText.visible = false;
				this._winStateTimer = 0;
			}
		}

		if (this._hasWon)
		{
			if (this._winStateTimer > 8 && this._winStateTimer < 10)
			{
				this._timerText.visible = true;
				this._timerText.y = 0;
				this._timerText.size = 48;
				this._timerText.text = "Music By";
			}
			else if (this._winStateTimer >= 10 && this._winStateTimer < 15)
			{
				this._timerText.text = "ANDY NELSON \n and \n DAN POLAK";
			}
			else if (this._winStateTimer >= 15 && this._winStateTimer < 17)
			{
				this._timerText.text = "Everything Else By";
			}
			else if (this._winStateTimer >= 17 && this._winStateTimer < 22)
			{
				this._timerText.text = "JOHN MURPHY \n and DEVON SCOTTTUNKIN";
			}
			else if (!this._couch.overlaps(this.player))
			{
				var couchVelocity:FlxPoint = new FlxPoint(this.player.x - this._couch.x, this.player.y - this._couch.y);
				Utility.normalize(couchVelocity);
				var playerMag:Float = Utility.getLength(this.player.velocity);
				this._couch.velocity.x = couchVelocity.x * 1.5 * playerMag;
				this._couch.velocity.y = couchVelocity.y * 1.5 * playerMag;
			}
			else
			{
				this.player.moves = false;
				this._couch.velocity.set(this.player.velocity.x, this.player.velocity.y);
			}
			this._winStateTimer += FlxG.elapsed;
		}
		else
		{
			FlxG.collide(this.player, this._map1);
			FlxG.collide(this.player, this._map2);
			FlxG.collide(this.player, this._map3);
			FlxG.collide(this.player, this._map4);
			FlxG.collide(this._enemies, this._map1);
			FlxG.collide(this._enemies, this._map2);
			FlxG.collide(this._enemies, this._map3);
			FlxG.collide(this._enemies, this._map4);
			this.timer += FlxG.elapsed;
			this._timerText.text = Utility.toFixed(this.timer, 1); // .toFixed();
		}
		var bounds:FlxObject = new FlxObject(player.x - 400, player.y - 400, player.x + 400, player.y - 400);

		var difference:FlxPoint = new FlxPoint(this.player.x - 16 - this._dragEye.eye.x, this.player.y - this._dragEye.eye.y);
		var distance:Float = Utility.getLength(difference);
		if (this._eyeBeam.exists)
		{
			this._eyeBeam.x = this._dragEye.eye.x - 128 + (difference.x * 0.5);
			this._eyeBeam.y = this._dragEye.eye.y + (difference.y * 0.5);
			this._eyeBeam.angle = Utility.getAnglePrecise(difference.x, difference.y);
			this.player.angle = this._eyeBeam.angle - 90;
			Utility.normalize(difference);
			this._eyeBeam.scale.x = (distance / (this._eyeBeam.frameWidth - 50));
		}
		if (FlxG.keys.anyJustPressed([ESCAPE]))
		{
			FlxG.switchState(new MenuState());
		}
		final MAX_ATTEMPTS:UInt = 10;
		var isColliding:Bool = false;
		var attemptCount:UInt = 0;
		var oldX:Float;
		var oldY:Float;
		var enemyScreen:FlxPoint;
		for (e in this._enemies.members)
		{
			var enemy:FlxSprite = cast e;
			if (FlxG.collide(enemy, this.player))
			{
				if (!FlxFlicker.isFlickering(this.player))
				{
					// FlxG.play(Game.MonsterSound);
					this.player.health -= 1;
					FlxFlicker.flicker(this.player, 1);
					FlxFlicker.flicker(enemy, 1);
				}
			}
			enemyScreen = enemy.getScreenPosition();
			var bleed:FlxPoint = new FlxPoint(200, 200);
			if ((enemyScreen.x >= -bleed.x && enemyScreen.x < (FlxG.width + bleed.x))
				&& (enemyScreen.y >= -bleed.y && enemyScreen.y < (FlxG.height + bleed.y)))
			{
				continue;
			}

			oldX = enemy.x;
			oldY = enemy.y;
			enemy.x = bounds.x + (FlxG.random.float() * bounds.width);
			enemy.y = bounds.y + (FlxG.random.float() * bounds.height);
			enemy.velocity.set(100, 0);
		}

		super.update(elapsed);
	}

	/*override public function draw()
		{
			var o:FlxObject;
			var l:UInt = this.members.length;
			var eyeScreen:FlxPoint = this._dragEye.eye.getScreenPosition();
			for (i in 0...l)
			{
				// Apply filter after background is drawn.
				if ((i == this._backgroundIndex && this._dragEye.isDragging && this._clickEye.dilation > 0)
					|| (i == this._clickEyeIndex && this._clickEye.dilation <= 0))
				{
					if (i == this._clickEyeIndex)
					{
						o = cast(this.members[i + 1], FlxObject);
						if ((o != null) && o.exists && o.visible)
							o.draw();
					}

					this._filter.shader = this._tunnelShader;
					this._filter.shader.data.imgSize.value = [FlxG.width, FlxG.height];
					this._filter.shader.data.center.value = [eyeScreen.x + 25, eyeScreen.y + 25];
					FlxG.buffer.applyFilter(FlxG.buffer, new Rectangle(0, 0, FlxG.width, FlxG.height), new Point(0, 0), this._filter);

					if (i == this._clickEyeIndex)
					{
						o = cast(this.members[i], FlxObject);
						if ((o != null) && o.exists && o.visible)
							o.draw();
						// i++;
						continue;
					}
				}

				o = cast(this.members[i], FlxObject);
				if ((o != null) && o.exists && o.visible)
					o.draw();
			}
	}*/
	// override public function postProcess() {}
	/*function make(enemyCount:UInt)
		{
			for (i in 0...enemyCount)
				this._enemies.add(new EnemyType());
	}*/
	// embedded images
	/*
		[Embed(source = '../content/DragEyeBeam.png')] 
			private var DragEyeBeamImg:Class;
		[Embed(source = '../content/BgTwirl.png')] 
			private var BgTwirlImg:Class;
			
		// tile map images
		[Embed(source = '../content/bubbleHippieTiles.png')] 
			private var TilesImg1:Class;
		[Embed(source='../content/midLevelFreakoutTiles.png')]
			private var TilesImg2:Class;
		[Embed(source='../content/SpaceMadnessTiles.png')] 
			private var TilesImg3:Class;
		[Embed(source='../content/MountainTopTiles.png')]
			private var TilesImg4:Class;
		// map data
		[Embed(source = '../content/MapLayer1.txt', mimeType = "application/octet-stream")] 
			private var MapData1:Class;
		[Embed(source = '../content/MapLayer2.txt', mimeType = "application/octet-stream")] 
			private var MapData2:Class;
		[Embed(source = '../content/MapLayer3.txt', mimeType = "application/octet-stream")] 
			private var MapData3:Class;
		[Embed(source = '../content/MapLayer4.txt', mimeType = "application/octet-stream")] 
			private var MapData4:Class;
			
		[Embed(source = '../content/Waves.pbj', mimeType = "application/octet-stream")] 
			private var WavesShaderCode:Class;
		[Embed(source = '../content/Tunnel.pbj', mimeType = "application/octet-stream")] 
			private var TunnelShaderCode:Class;
		[Embed(source = "../content/Nervous.ttf", fontFamily = "Nervous", embedAsCFF="false")] 	
			private var MonFont:String; */
	private var _wavesShader:Shader;
	private var _tunnelShader:Shader;
	private var _filter:ShaderFilter;
	private var _eyeBeam:FlxSprite = new FlxSprite();
	private var _clickEye:ClickEye = new ClickEye();
	private var _dragEye:DragEye;
	private var _timerText:FlxText;
	private var _map1:FlxTilemap = new FlxTilemap();
	private var _map2:FlxTilemap = new FlxTilemap();
	private var _map3:FlxTilemap = new FlxTilemap();
	private var _map4:FlxTilemap = new FlxTilemap();
	private var _enemies:FlxGroup = new FlxGroup();
	private var _clickEyeIndex:UInt;
	private var _backgroundIndex:UInt;
	private var _hasWon:Bool = false;
	private var _couch:Couch;
	private var _winStateTimer:Float;
}
