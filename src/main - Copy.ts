/*const ASSET_MANIFEST = {
  bundles: [{
    name: "MenuScene",
    assets: [
      {
        name: 'MENU_FONT',
        srcs: 'assets/fonts/LEVIBRUSH.TTF',
      },
      {
        name: 'MENU_IMAGE',
        srcs: "assets/images/CouchMenu.png",
      },
    ],
  },
  {
      name: "PlayScene",
      assets: [
          {
              name: "NormalMusic",
              srcs: "assets/music/Normal Music.mp3",
          },
      ],
  }],
};*/

const atlasData = {
	frames: {
		enemy1: {
			frame: { x: 0, y:0, w:32, h:32 },
			sourceSize: { w: 32, h: 32 },
			spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 }
		},
		enemy2: {
			frame: { x: 32, y:0, w:32, h:32 },
			sourceSize: { w: 32, h: 32 },
			spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 }
		},
	},
	meta: {
		image: 'images/spritesheet.png',
		format: 'RGBA8888',
		size: { w: 128, h: 32 },
		scale: 1
	},
	animations: {
		enemy: ['enemy1','enemy2'] //array of frames by name
	}
}
//let isFirefox = typeof InstallTrigger !== 'undefined'

class The
{
  MENU_SCREEN_FONT_NAME = "LeviBrush";
  UI_FONT_NAME = "Nervous";

  STATE = {
    MENU: 0,
    PLAY: 1,
    GAMEOVER: 2,
    WIN: 3,
    COUNT: 4
  }

  sceneState = 0;
  scenes = new Array(1);
  doOnce = true;
  canvas = null;
  fullscreenIcon = null;
  scaledDisplay = null;
  scale = 1.0;
  width = 320;//DPI(800);;//1920;//DPI(800);
  height = 240;//DPI(450);;//1080;//DPI(600);

  //renderer;
  /** @type {PIXI.Application<PIXI.ICanvas>} */
  //app = new PIXI.Application({width: 320, height: 240, backgroundColor: 0xb4a912, antialias: false});
  /** @type {PIXI.IRenderer<PIXI.ICanvas>} */
  /*renderer = PIXI.autoDetectRenderer({
      width: 320,
      height: 240,
      resolution: window.devicePixelRatio || 1
    });*/

  app;// = null;
  renderer;
  music = undefined;
  menuAssets = null;
  
  /*constructor() {
    if (this instanceof the) {
      throw Error('A static class cannot be instantiated.');
    }
  }*/
  setup() 
  {
    the.sceneState = the.STATE.MENU;  
    the.doOnce = true;
    the.scaledDisplay = new PIXI.Container();
    the.scaleToWindow();

    PIXI.Assets.addBundle(MenuScene.name, {
      MENU_FONT: "assets/fonts/LEVIBRUSH.TTF",
      UI_FONT: "assets/fonts/Nervous.ttf",
      MENU_IMAGE: "assets/images/CouchMenu.png",
      //NormalMusic: "assets/music/Normal Music.mp3",
      // PauseImg: "assets/images/Pause.png"
      // CursorImg: "assets/images/Cursor.png"
    });

    PIXI.Assets.addBundle(PlayScene.name, {
      ClickEyeImg: "assets/images/ClickEye.png",
      ClickEyeBrowImg: "assets/images/ClickEyeBrow.png",
      ClickEyeHighlightImg: "assets/images/ClickEyeHighlight.png",
      ClickEyePupilImg: "assets/images/ClickEyeHighlight.png",
      DragEyeImg: "assets/images/DragEye.png",
      DragEyeBrowImg: "assets/images/DragEye.png",
      DragEyeBeamImg: "assets/images/DragEyeBeam.png",
      PlayerImg: "assets/images/Player.png",
      BouncerEnemyImg: "assets/images/Enemies.png",
      TilesImg1: "assets/images/bubbleHippieTiles.png",
      TilesImg2: "assets/images/midLevelFreakoutTiles.png",
      TilesImg3: "assets/images/SpaceMadnessTiles.png",
      TilesImg4: "assets/images/MountainTopTiles.png",
      TopLeftImg: "assets/images/SeizureBgTopLeft.png",
      TopRightImg: "assets/images/SeizureBgTopRight.png",
      //BottomLeftImg: "assets/images/SeizureBgBottomleft.png",
      //BottomRightImg: "assets/images/SeizureBgBottomRight.png",
      EyePokeSound: "assets/sounds/Eye Poke.mp3"
      //MonsterSound: "assets/sounds/Monster Dies.mp3"
    });

    PIXI.Assets.addBundle("Music", {
      LoseImg: "assets/images/CouchOnlyLose.png",
      BgTwirlImg: "assets/images/BgTwirl.png",
      NormalMusic: "assets/music/Normal Music.mp3",
      DieMusic: "assets/music/You Die.mp3",
      TripMusic:  "assets/music/Trip Out.mp3",
      MountainMusic: "assets/music/Mountain Music.mp3"
    });

    PIXI.Assets.addBundle("WinScene", {
      CouchImg: "assets/images/Couch.png",
      WinMusic: "assets/music/You Win.mp3"
    });

    PIXI.Assets.backgroundLoadBundle(MenuScene.name).then(() => {
      PIXI.Assets.backgroundLoadBundle(PlayScene.name).then(() => {
        PIXI.Assets.backgroundLoadBundle("Music").then(() => {
          PIXI.Assets.backgroundLoadBundle("WinScene").then(() => {

          });
        });
      });
    });
    
    // Title Screen
    the.scenes[the.STATE.MENU] = new MenuScene();
    the.scenes[the.STATE.PLAY] = new PlayScene();
    
    for (let i = 0; i < the.scenes.length; i++)
    {
      the.scaledDisplay.addChild(the.scenes[i]);
      the.scenes[i].visible = false;
    }
    the.app.stage.addChild(the.scaledDisplay);
   
    the.scenes[the.STATE.MENU].visible = true;

    // use renderer.events
    //app.renderer.plugins.interaction.on('pointerup', mouseReleased);
    //app.renderer.plugins.interaction.on('keydown', keyPressed);
    //app.renderer.plugins.interaction.on('keyup', keyReleased);
    window.addEventListener("keydown", keyPressed, false);
    window.addEventListener("keyup", keyReleased, false);
    //app.stage.interactive = true;
    //app.stage.interactiveChildren = false;
    
    the.scaleToWindow();

    the.app.ticker.add(the.update);
  }

  update(delta)
  {
    the.scaleToWindow();
    the.renderer.render(the.scaledDisplay);
    for (let i = 0; i < the.scenes.length; i++)
    {
      if (the.scenes[i].visible)
        the.scenes[i].update(delta / 60.0);
    }
    //the.scenes[the.gameState].update(delta);
  }

  scaleToWindow()
  { 
    let aspectCorrectScale = window.innerWidth / the.width;
    let heightScale = window.innerHeight / the.height;
    if (heightScale < aspectCorrectScale)
      aspectCorrectScale = heightScale;
    
    let pixelPerfectScale = Math.max(Math.floor(aspectCorrectScale), 1);
  
    const newWidth = the.width * pixelPerfectScale;
    const newHeight = the.height * pixelPerfectScale;
    the.canvas.style.width = newWidth + "px";
    the.canvas.style.height = newHeight + "px";
  
    if (the.scaledDisplay)
    {
      the.scaledDisplay.scale.x = pixelPerfectScale;
      the.scaledDisplay.scale.y = pixelPerfectScale;
    }
  }

  DPI(size)
  {
    return size * the.scale;
  }

  playMusic(musicName) {
    if (the.music)
      the.music.stop();
    the.music = PIXI.Assets.get(musicName);
    if (the.music) {
      the.music.loop = true;
      the.music.play();
    }
  }

  playSound(soundName) {
    const sound = PIXI_SOUND.Sound.from(soundName);
    //const sound = PIXI.Assets.get(soundName);
    sound.play(soundName);
  }
}

class MenuScene extends PIXI.Container 
{
  backgroundBuffer = null;
  backgroundTimer = 0;
  isBackgroundAnimating = false;
  music = undefined;
  timer = 0;

  constructor() 
  {
    super();
    this.load();
  }

  async load()
  {
    const bundle = await PIXI.Assets.loadBundle(MenuScene.name);
    const plane = new PIXI.SimplePlane(bundle.MENU_IMAGE, 10, 10);
    //plane.x = 100;
    //plane.y = 100;
    this.addChild(plane);
    
    // Get the buffer for vertice positions.
    //this.backgroundBuffer = plane.geometry.getBuffer("aVertexPosition");
    //this.backgroundBuffer.originalData = Array.from(this.backgroundBuffer.data);

    let title = new PIXI.Text("I have done acid. Will you babysit me, please? I cannot get off the couch.", {
      fontSize: 16,
      fontFamily: the.MENU_SCREEN_FONT_NAME,
      fill: "black",
      align: "center",
      wordWrap: true,
      wordWrapWidth: the.width,
    });
    title.anchor.set(0.5); 
    title.x = the.width/2;
    title.y = the.height/2 - 90;
    this.addChild(title);
    
    let yesText = new PIXI.Text("-Yes", {
      fontSize: 20,
      fontFamily: the.MENU_SCREEN_FONT_NAME,
      fill: "0x2c3867",
    });
    yesText.anchor.set(0.5, 0); 
    yesText.x = 125;
    yesText.y = 60;
    yesText.interactive = true;
    yesText.cursor = "pointer";
    let menuState = this;
    yesText.on("mouseover", function() { yesText.style.fill = "white"; menuState.isBackgroundAnimating = true; } );
    yesText.on("mouseout", function() { yesText.style.fill = "0x2c3867"; menuState.isBackgroundAnimating = false; } );
    yesText.on("pointerdown", function() { the.sceneState = the.STATE.PLAY; } );

    // Pointers normalize touch and mouse
    //yesText.on("pointerdown", onClick);

    // Alternatively, use the mouse & touch events:
    // sprite.on("click", onClick); // mouse-only
    // sprite.on("tap", onClick); // touch-only

    this.addChild(yesText);

    //function onClick() {
    //    yesText.x *= 1.25;
    //    yesText.y *= 1.25;
    //}
    
    let noText = new PIXI.Text("-No", {
      fontSize: 20,
      fontFamily: the.MENU_SCREEN_FONT_NAME,
      fill: "0x2c3867",
    });
    noText.anchor.set(0.5, 0); 
    noText.x = 185;
    noText.y = 60;
    noText.interactive = true;
    noText.cursor = "pointer";
    noText.on("mouseover", function() { noText.style.fill = "white"; } );
    noText.on("mouseout", function() { noText.style.fill = "0x2c3867"; } );
    noText.on("pointerdown", function() { window.open("http://en.wikipedia.org/wiki/Milquetoast", "__blank"); } );

    this.addChild(noText);

    PIXI.Assets.load("NormalMusic");//.then((sound) => {  
  }
  
  onEnter()
  {
    the.playMusic("NormalMusic");
    this.timer = 0;
  }
   
  update(deltaTime) 
  {
    if (this.timer <= 0 && !the.music)
    {
      the.playMusic("NormalMusic");
      this.timer = 1;
    }
    else
      this.timer -= deltaTime;

    // Randomize the vertice positions a bit to create movement.
    if (this.backgroundBuffer)
    {
      if (this.isBackgroundAnimating)
      {
        for (let i = 0; i < this.backgroundBuffer.data.length; i++) 
        {
            this.backgroundBuffer.data[i] += Math.sin((this.backgroundTimer / 10) + i) * 0.25;
        }
        this.backgroundTimer++;
      }
      else
      {
        for (let i = 0; i < this.backgroundBuffer.data.length; i++) 
        {
            this.backgroundBuffer.data[i] = this.backgroundBuffer.originalData[i];
        }      
      }
      this.backgroundBuffer.update();
    }

    /*if(FlxG.keys.justPressed("SPACE")) {
      FlxG.state = new PlayState();
      FlxG.pause = false;
    }
    super.update();*/
  }
  
  onExit()
  {
    if (this.music != undefined)
    {
      this.music.stop(); 
    }
  }
}

class PlayScene extends PIXI.Container
{
  constructor() 
  {
    super();


    //this.addChild(noText);
    
    /*PIXI.sound.add(
      "NormalMusic", 
      PIXI.sound.Sound.from({
        url: "assets/music/Normal Music.mp3",
        autoPlay: true,
        loop: true,
        complete: function() {
        }
      })
    );*/
  }
  
  onEnter()
  {
    //PIXI.sound.play("NormalMusic");
  }
   
  update(delta) 
  {
  }
  
  onExit()
  {
  }
}

class ClickEye extends PIXI.Container {
  /** @type {Number} */
  dilation = 1;
   /** @type {PIXI.Sprite} */
  eye = new PIXI.Sprite();
   /** @type {PIXI.Point} */
  scrollFactor;
  
  constructor() {
    super();
    this.eye = new PIXI.Sprite(PIXI.Assets.get("ClickEyeImg"));
    this.eye.position.x = 50;
    this.eye.position.y = 58;
    this.scrollFactor = new PIXI.Point(0, 0);
    //this.eye.scrollFactor = this.scrollFactor;

    PIXI.Assets.load("NormalMusic");

    this.eye.on("pointerdown", function(e) { 
      this._isTripping = false;
      the.playSound("EyePokeSound");
      if (this.dilation <= 0)
        the.playMusic("NormalMusic");
      this.dilation += this._dilateSpeed * (the.app.ticker.deltaTime / 60.0);	
    });
    
    this._brow = new PIXI.Sprite(PIXI.Assets.get("ClickEyeBrowImg"));
    this._brow.x = this.eye.x - 2;
    this._brow.y = this.eye.y - 26;
    this._brow.scrollFactor = this.scrollFactor;
    
    this._pupil = PIXI.Sprite.from("ClickEyePupilImg"); 
    this._pupil.x = this.eye.x + 28;
    this._pupil.y = this.eye.y + 9;
    this._pupil.scrollFactor = this.scrollFactor;
    
    this._highlight = PIXI.Sprite.from("ClickEyeHighlightImg"); 		
    this._highlight.x = this.eye.x;
    this._highlight.y = this.eye.y;
    this._highlight.scrollFactor = this.scrollFactor;
    
    this.addChild(this.eye);
    this.addChild(this._brow);
    this.addChild(this._pupil);
    this.addChild(this._highlight);
  }
  
  update(deltaTime) {
    //if (!this.exists) return;
    this.dilation -= this._constrictSpeed * 
      (10) * 
      deltaTime;
    if (this.dilation <= 0) {
      if (!this._isTripping)
        the.playMusic("TripMusic");
      this._isTripping = true;
      this.dilation = 0;
    }
    /*if (FlxG.mouse.justPressed() && 
      this.eye.overlapsPoint(
        FlxG.mouse.screenX + FlxG.scroll.x, 
        FlxG.mouse.screenY + FlxG.scroll.y))
    {
      this._isTripping = false;
      //FlxG.mouse.reset();
      FlxG.play(EyePokeSound);
      if (this.dilation <= 0)
        FlxG.playMusic(Game.NormalMusic);
      this.dilation += this._dilateSpeed * deltaTime;	
    }*/
    if (this.dilation > this._maxDilation) 
      this.dilation = this._maxDilation;
    this._pupil.scale.x = this.dilation + 0.1;
    this._pupil.scale.y = this.dilation + 0.1;
    /*for each(var member:FlxObject in this.members) {
      member.x += (this.x - this._last.x);
      member.y += (this.y - this._last.y);
    }*/
  }
  
  /** @type {Boolean} */
  _isTripping = false;
  /** @type {Number} */
  _maxDilation = 0.92;
  /** @type {Number} */
  _dilateSpeed = 5;
  /** @type {Number} */
  _constrictSpeed = 0.01;
   /** @type {PIXI.Sprite} */
  _brow;
   /** @type {PIXI.Sprite} */
  _pupil;
   /** @type {PIXI.Sprite} */
  _highlight;
}

class DragEye extends PIXI.Container {
  isDragging = false;
  eye = new PIXI.Sprite();
  brow = new PIXI.Sprite();
  scene;
  
  constructor(scene, clickEye) {
    super();
    this._clickEye = clickEye;
    //FlxSprite = new FlxSprite(820, 7840);
    this.eye = PIXI.Sprite.from("DragEyeImg");//, true, false, 75, 43);
    //this.eye.alpha = 0.65;
    
    const baseTexture = PIXI.BaseTexture.from("DragEyeBrowImg");
    const fw = 92;
    const fh = 71;
    const frames = [];
    for (let x = 0; x < baseTexture.width; x += fw) {
      frames.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(x,0,fw,fh)));
    }
    this.brow = new PIXI.AnimatedSprite(frames);//, true, false, 92, 71);
    //this._eyeBrow.alpha = 0.4;
    this.brow.x = this.eye.x - 29;
    this.brow.y = this.eye.y - 27;
    this.addChild(this.eye);
    this.addChild(this.brow);
    
    the.scenes[the.STATE.PLAY].on("pointerdown", function() {
      this.isDragging = true;
      this.eye.frame = 1;
      the.playMusic("MountainMusic");
    });

    the.scenes[the.STATE.PLAY].on("pointerup", function()  {
      this.isDragging = false;
      this.eye.frame = 0;
      if (this._clickEye.dilation > 0)
        the.playMusic("NormalMusic");
    });

    the.scenes[the.STATE.PLAY].on("pointermove", function(event)  {
      if (this.isDragging) {
        const eyeScreen= this.eye.getGlobalPosition();
        const mouseVelocity = new PIXI.Point(
          event.globalX - this._lastMousePosition.x,
          event.globalY - this._lastMousePosition.y);
        eyeScreen.x += mouseVelocity.x;
        eyeScreen.y += mouseVelocity.y;
        const bleed = new PIXI.Point(
          this.eye.width - 7, this.eye.height - 5);
        if (eyeScreen.x > -bleed.x && 
          eyeScreen.x < (the.width - this.eye.width) + bleed.x)
        {
          this.x += mouseVelocity.x;
        }
        if (eyeScreen.y > -bleed.y && 
          eyeScreen.y < (the.height - this.eye.height) + bleed.y)
        {
          this.y += mouseVelocity.y;
        }
        const finalVelocity= new PIXI.Point(
          (this.x - this._last.x),
          (this.y - this._last.y));
        /*for each(var member:FlxObject in this.members) {
          member.x += finalVelocity.x;
          member.y += finalVelocity.y;
        }*/
        event.x
        this._lastMousePosition.x = event.globalX;
        this._lastMousePosition.y = event.globalY;
      }
    });
  }

  _lastMousePosition;
  _clickEye;
}

class GameOverScene extends PIXI.Container 
{

}


function gameStart()
{
  //the.transitionTimer = 2;
  the.sceneState = the.STATE.PLAY;
}

function mouseReleased()
{
  //console.log("ok");
  /*
  if (the.gameState < PLAY_STATE)
  {
    the.scenes[the.gameState].visible = false;
    the.scenes[++the.gameState].visible = true;
    //console.log(the.gameState);
  } 
  else if (the.gameState > PLAY_STATE && the.transitionTimer <= 0)
  {
    the.scenes[the.gameState].visible = false;
    the.gameState = PLAY_STATE;
    the.scenes[the.gameState].visible = true;
    the.doOnce = true;
  }*/
  
  /*if (the.fullscreenIcon)
  {
    the.fullscreenIcon.setFullscreen();
  }*/
}

function keyPressed(e) 
{
  let code = e.keyCode ? e.keyCode : e.which; //e.key.toUpperCase().charCodeAt(0);
  
}

function keyReleased(e) 
{
  let code = e.keyCode ? e.keyCode : e.which;

  if (code == 27) // esc
  {
    /*
    the.scenes[the.gameState].visible = false;
    the.gameState = MENU_STATE_00;
    the.scenes[the.gameState].visible = true;
    the.doOnce = true;
    BABBY_COUNT = 1;*/
  }
 
}

function createVector(x, y)
{
  return new PIXI.Point(x, y);
}

function random(min, max) 
{
  return Math.random() * (max - min) + min;
}

function int(f)
{
  return Math.floor(f);
}

function constrain(val, min, max) 
{
    return val > max ? max : val < min ? min : val;
}

function main()
{
  window.addEventListener(
    "resize", 
    function(event)
    {
      the.scaleToWindow();
    });

  the.app = new PIXI.Application({width: the.width, height: the.height, backgroundColor: 0xb4a912, antialias: false});
  the.renderer = PIXI.autoDetectRenderer({
      width: the.width,
      height: the.height,
      resolution: window.devicePixelRatio || 1
    });
  the.canvas = the.app.view;
  the.scaleToWindow();
  //document.body.appendChild(the.app.view);
  PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
  //the.app.stop();
  the.app.resizeTo = the.canvas;

  the.setup();
  //the.app.start();
  

}

let the = new The();

main();



