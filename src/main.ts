//var isFirefox = typeof InstallTrigger !== 'undefined'

class the
{
  static fontNameLeviBrush = "LeviBrush";
  static fontNameNervous = "Nervous";
  static get MENU_STATE() { return 0; }
  //MENU_STATE = 0;
  static PLAY_STATE = 1;
  static GAMEOVER_STATE = 2;
  static WIN_STATE = 3;
  static gameState = 0;
  static scenes = new Array(1);
  static doOnce = true;
  static canvas = null;
  static fullscreenIcon = null;
  static scaledDisplay = null;
  static scale = 1.0;
  static width = 320;//DPI(800);;//1920;//DPI(800);
  static height = 240;//DPI(450);;//1080;//DPI(600);
  static renderer;// = null;
  static app;// = null;
  static menuAssets = null;
  
  constructor() {
    if (this instanceof the) {
      throw Error('A static class cannot be instantiated.');
    }
  }

  static main()
  {
    window.addEventListener("resize", function(event)
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
    document.body.appendChild(the.app.view);
    PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST;
    //app.stop();
    the.app.resizeTo = the.canvas;
    
    PIXI.Assets.addBundle("menu", {
        LeviBrush: "assets/fonts/LEVIBRUSH.TTF",
        Nervous: "assets/fonts/Nervous.ttf",
        MenuImg: "assets/images/CouchMenu.png"
    });


    PIXI.Assets.loadBundle("menu").then((assets) => {
      the.menuAssets = assets;
      the.setup();
      //app.start();
      // Listen for animate update
      the.app.ticker.add(function(delta) 
      {
        the.update(delta);   
      });
    });
  }

  static setup() 
  {
    the.gameState = the.MENU_STATE;  
    the.doOnce = true;
    the.scaledDisplay = new PIXI.Container();
    the.scaleToWindow();
    
    // Title Screen
    the.scenes[the.MENU_STATE] = new MenuState();
    the.scenes[the.PLAY_STATE] = new PlayState();
    
    for (var i = 0; i < the.scenes.length; i++)
    {
      the.scaledDisplay.addChild(the.scenes[i]);
      the.scenes[i].visible = false;
    }
    the.app.stage.addChild(the.scaledDisplay);
   
    the.scenes[the.MENU_STATE].visible = true;

    // use renderer.events
    //app.renderer.plugins.interaction.on('pointerup', mouseReleased);
    //app.renderer.plugins.interaction.on('keydown', keyPressed);
    //app.renderer.plugins.interaction.on('keyup', keyReleased);
    window.addEventListener("keydown", keyPressed, false);
    window.addEventListener("keyup", keyReleased, false);
    //app.stage.interactive = true;
    //app.stage.interactiveChildren = false;
    
    the.scaleToWindow();
  }

  static update(delta)
  {
    //console.log("hello");
    the.scaleToWindow();
    the.renderer.render(the.scaledDisplay);
    for (var i = 0; i < the.scenes.length; i++)
    {
      if (the.scenes[i].visible)
        the.scenes[i].update(delta);
    }
    //the.scenes[the.gameState].update(delta);
  }

  static scaleToWindow()
  { 
    var aspectCorrectScale = window.innerWidth / the.width;
    var heightScale = window.innerHeight / the.height;
    if (heightScale < aspectCorrectScale)
      aspectCorrectScale = heightScale;
    
    var pixelPerfectScale = Math.max(Math.floor(aspectCorrectScale), 1);
  
    const newWidth = the.width * pixelPerfectScale;
    const newHeight = the.height * pixelPerfectScale;
    the.canvas.style.width = newWidth + "px";
    the.canvas.style.height = newHeight + "px";
  
    //console.log(pixelPerfectScale);
  
    if (the.scaledDisplay)
    {
      the.scaledDisplay.scale.x = pixelPerfectScale;
      the.scaledDisplay.scale.y = pixelPerfectScale;
    }
  }

  static DPI(size)
  {
    return size * the.scale;
  }
}

class MenuState extends PIXI.Container 
{
  backgroundBuffer;
  backgroundTimer;
  isBackgroundAnimating;

  constructor() 
  {
    super();
    
    const plane = new PIXI.SimplePlane(the.menuAssets.MenuImg, 10, 10);
    //plane.x = 100;
    //plane.y = 100;
    this.addChild(plane);
    
    
    // Get the buffer for vertice positions.
    this.backgroundBuffer = plane.geometry.getBuffer("aVertexPosition");
    this.backgroundTimer = 0;
    this.isBackgroundAnimating = false;
    this.backgroundBuffer.originalData = Array.from(this.backgroundBuffer.data);


    let title = new PIXI.Text("I have done acid. Will you babysit me, please? I cannot get off the couch.", {
      fontSize: 16,
      fontFamily: the.fontNameLeviBrush,
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
      fontFamily: the.fontNameLeviBrush,
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
    yesText.on("pointerdown", function() { the.gameState = the.PLAY_STATE; } );

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
      fontFamily: the.fontNameLeviBrush,
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
    /*PIXI.sound.add(
      "NormalMusic", 
      PIXI.sound.Sound.from({
        url: "assets/music/Normal Music.mp3",
        autoPlay: true,
        loop: true,
        complete: function() {
        //console.log('Sound finished');
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
    
    // Randomize the vertice positions a bit to create movement.
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

    /*if(FlxG.keys.justPressed("SPACE")) {
      FlxG.state = new PlayState();
      FlxG.pause = false;
    }
    super.update();*/
  }
  
  onExit()
  {
  }
}

class PlayState extends PIXI.Container 
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

function gameStart()
{
  //the.transitionTimer = 2;
  the.gameState = the.PLAY_STATE;
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
  var code = e.keyCode ? e.keyCode : e.which; //e.key.toUpperCase().charCodeAt(0);
  
}

function keyReleased(e) 
{
  var code = e.keyCode ? e.keyCode : e.which;

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

the.main();



