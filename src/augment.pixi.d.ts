// Import the PIXI definitions
import type * as PIXI from "pixi.js";
import type * as sound from '@pixi/sound';

// Export it as a namespace
export as namespace PIXI;
// Expose that namespace globally, to match the global
// variable pixi.js creates
export = PIXI;

