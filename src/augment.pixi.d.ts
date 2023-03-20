import type * as PIXI from "pixi.js";
//import type * as PIXI_SOUND from '@pixi/sound';

// Export it as a namespace
export as namespace PIXI;
// Expose that namespace globally, to match the global
// variable pixi.js creates
export = PIXI;
/*declare global
{
    export var PIXI: (typeof PIXI_MAIN & typeof PIXI_SOUND);
}*/