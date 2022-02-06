package;

import flixel.*;

class BouncerEnemy extends FlxSprite
{
	public function new()
	{
		super();
		// this.loadGraphic(BouncerEnemyImg, true, true, 32, 32);
		this.scale.x = 0.5;
	}

	override public function update(elapsed:Float)
	{
		if (!this.active)
			return;

		this.frame = cast((this.y / PlayState.LEVEL_HEIGHT) * 4);

		if (justTouched(FlxObject.WALL))
		{
			this.velocity.x = -this.velocity.x;
		}

		if (this._timer < 2)
			this.scale.x += FlxG.elapsed;
		if (this._timer >= 2)
			this.scale.x -= FlxG.elapsed;
		if (this._timer >= 4)
			this._timer = 0;
		this._timer += FlxG.elapsed;
		super.update(elapsed);
	}

	// [Embed(source = '../content/Enemies.png')]
	// private var BouncerEnemyImg:Class;
	private var _isCreated:Bool = false;
	private var _timer:Float = 0;
}
