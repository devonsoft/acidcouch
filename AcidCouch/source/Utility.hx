package;

import Math;
import flixel.*;
import flixel.math.FlxPoint;

class Utility
{
	public static function getLength(v:FlxPoint):Float
	{
		return Math.sqrt((v.x * v.x) + (v.y * v.y));
	}

	public static function normalize(v:FlxPoint):Float
	{
		var length:Float = Math.sqrt((v.x * v.x) + (v.y * v.y));
		if (length <= 0)
		{
			v.x = 0;
			v.y = 0;
		}
		else
		{
			v.x /= length;
			v.y /= length;
		}
		return length;
	}

	public static function scale(v:FlxPoint, scale:Float):FlxPoint
	{
		v.x *= scale;
		v.y *= scale;
		return v;
	}

	public static function add(v:FlxPoint, w:FlxPoint):FlxPoint
	{
		return new FlxPoint(v.x + w.x, v.y + w.y);
	}

	public static function toFixed(n:Float, prec:Int)
	{
		n = Math.round(n * Math.pow(10, prec));
		var str = '' + n;
		var len = str.length;
		if (len <= prec)
		{
			while (len < prec)
			{
				str = '0' + str;
				len++;
			}
			return '0.' + str;
		}
		else
		{
			return str.substr(0, str.length - prec) + '.' + str.substr(str.length - prec);
		}
	}

	static public function getAnglePrecise(X:Float, Y:Float):Float
	{
		return Math.atan2(Y, X) * 180 / Math.PI;
	};
}
