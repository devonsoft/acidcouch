var isFirefox = typeof InstallTrigger !== 'undefined';

the_fontNameLeviBrush = "LeviBrush";
the_fontNameNervous = "Nervous";
var fontA = new FontFaceObserver(the_fontNameLeviBrush);
var fontB = new FontFaceObserver(the_fontNameNervous);

var MENU_STATE_00 = 0;
var MENU_STATE_01 = 1;
var MENU_STATE_02 = 2;
var PLAY_STATE = 3;
var GAMEOVER_STATE = 4;
var WIN_STATE = 5;

var the_scenes = new Array(1);




var the_transitionTimer = 2;
var the_screen_offset = 0;
var the_screenShakeTimer = 0;
var the_doOnce = true;
var the_canvas = null;
var the_fullscreenIcon;

var jtr = 4;
var vx = 0;
var vy = 0;

var frameCount = 0;

var the_scale = 2.0;

function DPI(size)
{
  return size * the_scale;
}

var width = 320;//DPI(800);;//1920;//DPI(800);
var height = 240;//DPI(450);;//1080;//DPI(600);

//Create the renderer
/*var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x1099bb});

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();
//Tell the `renderer` to `render` the `stage`
renderer.render(stage);*/

var loader = null;
var app = null;
//var renderer = null;
Promise.all([fontA.load(), fontB.load()]).then(
  function () {
    app = new PIXI.Application({width: width, height: height, backgroundColor: 0xb4a912, antialias: false});
    renderer = PIXI.autoDetectRenderer(width, height);  
    the_canvas = app.view;
    document.body.appendChild(app.view);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    app.stop();
    app.resizeTo = the_canvas;
    var loader = PIXI.Loader.shared;//PIXI.loader;
    /*
    loader.add('babbySpritesheet', 'babby.json');
    loader.add('headSpritesheet', 'head.json');
    loader.add('mandibleSpritesheet', 'mandible.json');
    loader.add('grass', 'grass.png');
    loader.add('keyboard', 'keyboard.png');
    loader.add('body0', 'body0.png');
    loader.add('body1', 'body1.png');
    loader.add('leg0', 'leg0.png');
    loader.add('leg1', 'leg1.png');
    loader.add('leg2', 'leg2.png');*/
      
    loader.load(function(loader, resources)
    {
      /*the_headNormalImage = PIXI.Texture.fromFrame('Head_Normal.png');
      the_headAnnoyedImage = PIXI.Texture.fromFrame('Head_Annoyed.png');
      the_headAngryImage = PIXI.Texture.fromFrame('Head_Angry.png');
      the_headPainImage = PIXI.Texture.fromFrame('Head_Pain.png');
      the_body0Image = resources.body0.texture;
      the_body1Image = resources.body1.texture;
      the_leg0Image = resources.leg0.texture;
      the_leg1Image = resources.leg1.texture;
      the_leg2Image = resources.leg2.texture;

      var i;
      for (i = 0; i < 4; i++) 
      {
           var texture = PIXI.Texture.fromFrame('Babby_Walk ' + (i+1) + '.png');
           the_babbyWalkTextures.push(texture);
      }
      for (i = 0; i < 1; i++) 
      {
           var texture = PIXI.Texture.fromFrame('Babby_Dead ' + (i+1) + '.png');
           the_babbyDeadTextures.push(texture);
      }
      
      the_mandibleNormalTextures.push(PIXI.Texture.fromFrame('Mandible_Normal.png'));
      for (i = 0; i < 3; i++) 
      {
           var texture = PIXI.Texture.fromFrame('Mandible_Eating ' + (i+1) + '.png');
           the_mandibleEatingTextures.push(texture);
      }  
      
      the_keyboardSprite = new PIXI.Sprite(resources.keyboard.texture);
      the_keyboardSprite.anchor.set(0.5);
      the_keyboardSprite.x = width / 2;
      the_keyboardSprite.y = height / 2;
      the_keyboardSprite.scale.set(height / the_keyboardSprite.height);
      the_grassSprite = new PIXI.Sprite(resources.grass.texture);
      
      var graphics = new PIXI.Graphics();
      graphics.beginFill(PIXI.utils.rgb2hex([1.0, 0.1875, 0.0625]), 0.5);
      graphics.drawCircle(0, 0, 100); 
      graphics.endFill();
      the_bloodTexture = graphics.generateTexture();*/
      
      setup();
      app.start();
    });
    
    // Listen for animate update
    app.ticker.add(function(delta) 
    {
      for (var i = 0; i < the_scenes.length; i++)
      {
        //if (the_scenes[i].visible)
        //  the_scenes[i].update(delta);
      }
      //the_scenes[the_gameState].update(delta);
      
      frameCount += 1;
    });
  },
  function () {
    alert('Unable to load required font!');
  }
);

function scaleToWindow()
{ 
  var aspectCorrectScale = window.innerWidth / width;
  var heightScale = window.innerHeight / height;
  if (heightScale < aspectCorrectScale)
    aspectCorrectScale = heightScale;
  
  var pixelPerfectScale = Math.max(Math.floor(aspectCorrectScale), 1);

  the_canvas.style.width = width * pixelPerfectScale + 'px';//width * aspectCorrectScale + "px";
  the_canvas.style.height = height * pixelPerfectScale + 'px';//height * aspectCorrectScale + "px";
  console.log(aspectCorrectScale);
  the_scaledDisplay.scale.x = pixelPerfectScale;
  the_scaledDisplay.scale.y = pixelPerfectScale;
  //the_Scenes[0].
  //renderer.resize(pixelPerfectScale, pixelPerfectScale);
}

window.onresize = function() 
{ 
  scaleToWindow();
}

function gameStart()
{
  //the_transitionTimer = 2;
  the_gameState = PLAY_STATE;
}

function mouseReleased()
{
  //console.log("ok");
  /*
  if (the_gameState < PLAY_STATE)
  {
    the_scenes[the_gameState].visible = false;
    the_scenes[++the_gameState].visible = true;
    //console.log(the_gameState);
  } 
  else if (the_gameState > PLAY_STATE && the_transitionTimer <= 0)
  {
    the_scenes[the_gameState].visible = false;
    the_gameState = PLAY_STATE;
    the_scenes[the_gameState].visible = true;
    the_doOnce = true;
  }*/
  
  /*if (the_fullscreenIcon)
  {
    the_fullscreenIcon.setFullscreen();
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
    the_scenes[the_gameState].visible = false;
    the_gameState = MENU_STATE_00;
    the_scenes[the_gameState].visible = true;
    the_doOnce = true;
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

var the_scaledDisplay = null;
function setup() 
{
  MENU_STATE_00 = 0;
  MENU_STATE_01 = 1;
  MENU_STATE_02 = 2;
  PLAY_STATE = 3;
  GAMEOVER_STATE = 4;
  WIN_STATE = 5;

  the_gameState = MENU_STATE_00;  
  the_doOnce = true;
  the_scaledDisplay = new PIXI.Container();
  scaleToWindow();
  
  // Title Screen
  the_scenes[0] = new PIXI.Container();
  the_scenes[0].titleText = new PIXI.Text('I have done acid. Will you babysit me, please? I cannot get off the couch.', {
    fontSize: 16,
    fontFamily: the_fontNameLeviBrush,
    fill: 'black',
    align: 'center',
    wordWrap: true,
    wordWrapWidth: width,
  });
  the_scenes[0].titleText.anchor.set(0.5); 
  
  /*the_scenes[0].subtitleText = new PIXI.Text('@devonsoft', {
    fontSize: DPI(64),
    fontFamily: the_font,
    fill: "#3a0e05",
    align: 'center',
    padding: DPI(64)
  });    
  the_scenes[0].subtitleText.anchor.set(0.5);  */
  
  the_scenes[0].titleText.x = width/2;
  the_scenes[0].titleText.y = height/2 - 90;
  //the_scenes[0].subtitleText.x = width/2;
  //the_scenes[0].subtitleText.y = height/2 + DPI(100);   
  //the_scenes[0].update = function(delta)
  //{

  //}
  
  the_scenes[0].addChild(the_scenes[0].titleText);//, the_scenes[0].subtitleText);
  
/*  
  // Play State
  the_scenes[3] = new PIXI.Container(); 
   
  var h =  DPI(800) / the_grassSprite.width * the_grassSprite.height;  
  var backgroundGrass = new PIXI.Sprite(the_grassSprite.texture);
  backgroundGrass.x = 0;
  backgroundGrass.y = height - h + DPI(4);
  backgroundGrass.width = width;
  backgroundGrass.height = h;
  app.stage.addChild(backgroundGrass);
  
  //the_spider = new Spider();
  
  the_scenes[3].update = function(delta)
  {
    if (the_doOnce)
    {
      gameStart();
      the_doOnce = false;
    }
    
    //if (frameCount % 2)
    {
      this.x = random(-the_screen_offset, the_screen_offset);
      this.y = random(-the_screen_offset, the_screen_offset);
    }
    if (the_blood)
      the_blood.run();
    the_spider.draw();

    var deadBabbyCount = 0;
    for (var i = the_babbySpiders.length-1; i >= 0 && !the_spider.buttExploding; i--)
    {
      the_babbySpiders[i].update();
      if (the_babbySpiders[i].isDead)
        deadBabbyCount += 1;
    }  
    if (deadBabbyCount >= BABBY_COUNT)
    {
      //the_scenes[the_gameState].visible = false;
      the_gameState = WIN_STATE;
      the_scenes[the_gameState].visible = true;
      the_scenes[the_gameState].alpha = 0;
    
      if (BABBY_COUNT < 3)
        BABBY_COUNT += 1;
      else if (BABBY_COUNT < 7)
        BABBY_COUNT += 2;
      else if (BABBY_COUNT >= 7)
        BABBY_COUNT *= 2;
    } 
    else
    {          
      for (var i = 0; i < the_babbySpiders.length && !the_spider.buttExploding; i++)
      {
        var isFeeding = false;
        var isHit = false;
        babby = the_babbySpiders[i];
        for (var j = 0; j < the_spider.m_legs.length; j++)
        {
          leg = the_spider.m_legs[j];
          var isOverlapping = false;
          if (!leg.m_isReaching && !babby.isStabbed && (babby.y >= the_ground || babby.carriedSegment == null)) 
            isOverlapping = leg.isOverlappingTipSegment(babby);

          if (isOverlapping)
          {
            if (leg.m_dx != 0)
            { 
              isHit = true;
              babby.speed = 20;
              babby.x += leg.m_dx;
              if (leg.m_dx > 0)
                babby.direction.x = 1;
              else if (leg.m_dx < 0)
                babby.direction.x = -1;
            } 
            else if (babby.speed <= babby.normalSpeed || the_spider.tipCount == 1)
            {
              isFeeding = true;

              if (babby.isClimbing)
              {
                babby.stabLeg = null;
                babby.isClimbing = false;
              }
              if (babby.carriedSegment == null && dist(babby.x, babby.y, leg.m_segments[2].m_x, leg.m_segments[2].m_y) < babby.radius)
              { 
                leg.shouldRemoveHealth = true;
              }

              babby.stabLeg = leg;

              if (leg.health <= 0)
              {
                babby.stabLeg = null;
                isFeeding = false;
                the_screenShakeTimer = 0.75;
                if (leg.stabbedBabby != null)
                {
                  leg.stabbedBabby.isDead = true;
                }

                babby.carriedSegment = leg.getTipSegment();
                leg.getTipSegment().isBeingCarried = true;
                var idx = the_scenes[PLAY_STATE].getChildIndex(babby.sprite);
                the_scenes[PLAY_STATE].setChildIndex(leg.getTipSegment().m_drip, idx-1);
                the_scenes[PLAY_STATE].setChildIndex(leg.getTipSegment().m_img, idx-1);
                leg.getTipSegment().m_angle = -HALF_PI;
              }
            }
          } 
          else if (leg.m_isReaching && leg.stabbedBabby == null && leg.getTipSegment().isBeingCarried == false)
          {
			var midTipX = leg.m_tipX + ((leg.getTipSegment().m_x - leg.m_tipX));// * 0.5);
			var midTipY = leg.m_tipY + ((leg.getTipSegment().m_y - leg.m_tipY));// * 0.5);
            isOverlapping = //dist(leg.m_tipX, leg.m_tipY, babby.x, babby.y) < babby.radius * 2;
				//circleLineIntersect(midTipX, midTipY, leg.m_tipX, leg.m_tipY, babby.x, babby.y, babby.radius * 2.0);
   				circleLineIntersect(leg.m_tipX, leg.m_tipY, leg.m_targetX, leg.m_targetY, babby.x, babby.y, babby.radius * 2.0);
            if (isOverlapping)
            {
              babby.isStabbed = true;
              babby.isClimbing = false;
              babby.stabLeg = leg;
              leg.stabbedBabby = babby;
            }
          } 
          else if (the_spider.tipCount == 1 && !babby.isFeeding && !babby.isStabbed)
          {
            if (!leg.isBeingCarried())
            {
              var distSQ = (leg.m_tipX - babby.x) * (leg.m_tipX - babby.x);
              if (distSQ < babby.speed * babby.speed)
              {
                babby.isClimbing = true;
                babby.stabLeg = leg;
              }
            }
          }
        }
        babby.isFeeding = isFeeding;
        if (isHit)
          babby.isFeeding = false;
      }
    }    
    
    the_screenShakeTimer -= 1 / 60.0;
    if (the_screenShakeTimer > 0)
    {
      the_screen_offset = DPI(20.0) * the_screenShakeTimer;
    } 
    else
      the_screen_offset = 0.0;
  
  }
  
  // GAMEOVER_STATE
  the_scenes[4] = new PIXI.Container();
  the_scenes[4].titleText = new PIXI.Text('THE CHILD BECOMES THE PARENT', {
    fontSize: DPI(80),
    fontFamily: the_font,
    fill: "#3a0e05",
    align: 'center',
    padding: DPI(80)
  });
  the_scenes[4].titleText.anchor.set(0.5); 
  the_scenes[4].titleText.x = width/2;
  the_scenes[4].titleText.y = height/2;
  the_scenes[4].alpha = 0;
  the_scenes[4].gradient = drawGradient(0, width, 0, height, 1, the_scenes[4]);
  the_scenes[4].addChild(the_scenes[4].titleText);
  the_scenes[4].update = function(delta)
  {
    the_transitionTimer -= 1 / 60.0;
    if (the_transitionTimer > 0)
    {
      this.titleText.alpha = 0;
      if (this.alpha < 1)
        this.alpha += 0.01;  
      else  
        this.alpha = 1;        
    }
    else
    {
      the_scenes[PLAY_STATE].alpha = 1;
      the_scenes[PLAY_STATE].visible = false;
      this.titleText.alpha = 1;
      if (frameCount % 2 == 0)
      {
        vx = (width/2 + random(-jtr, jtr) - this.titleText.x) / 2;
        vy = (height/2 + random(-jtr, jtr) - this.titleText.y) / 2;
      }
      this.titleText.x += vx;
      this.titleText.y += vy;
    }
  }
 
  // WIN_STATE
  the_scenes[5] = new PIXI.Container();
  the_scenes[5].titleText = new PIXI.Text('YOU CAN BREED AGAIN', {
    fontSize: DPI(80),
    fontFamily: the_font,
    fill: "#3a0e05",
    align: 'center',
    padding: DPI(80)
  });
  the_scenes[5].titleText.anchor.set(0.5); 
  the_scenes[5].titleText.x = width/2;
  the_scenes[5].titleText.y = height/2;
  the_scenes[5].alpha = 0;
  the_scenes[5].gradient = drawGradient(0, width, 0, height, 1, the_scenes[5]);
  the_scenes[5].addChild(the_scenes[5].titleText);
  the_scenes[5].update = function(delta)
  {
    the_transitionTimer -= 1 / 60.0;
    if (the_transitionTimer > 0)
    {
      this.titleText.alpha = 0;
      if (this.alpha < 1)
        this.alpha += 0.01;  
      else  
        this.alpha = 1;        
    }
    else
    {
      the_scenes[PLAY_STATE].alpha = 1;
      the_scenes[PLAY_STATE].visible = false;
      this.titleText.alpha = 1;
      if (frameCount % 2 == 0)
      {
        vx = (width/2 + random(-jtr, jtr) - this.titleText.x) / 2;
        vy = (height/2 + random(-jtr, jtr) - this.titleText.y) / 2;
      }
      this.titleText.x += vx;
      this.titleText.y += vy;
    }
  }
     */
  for (var i = 0; i < the_scenes.length; i++)
  {
    the_scaledDisplay.addChild(the_scenes[i]);
    the_scenes[i].visible = false;
  }
  app.stage.addChild(the_scaledDisplay);
 
  the_scenes[0].visible = true;
 
  app.renderer.plugins.interaction.on('pointerup', mouseReleased);
  //app.renderer.plugins.interaction.on('keydown', keyPressed);
  //app.renderer.plugins.interaction.on('keyup', keyReleased);
  window.addEventListener('keydown', keyPressed, false);
  window.addEventListener('keyup', keyReleased, false);
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  
  scaleToWindow();
}


