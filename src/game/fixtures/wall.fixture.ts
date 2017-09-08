import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

export class Wall extends Fixture {
  
  constructor(width: number, height: number) {
    super();
    this._addSprite(width, height);
  }

  protected _addSprite(width: number, height: number): void {
    let sprite = new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/wall.png']);
    sprite.width = width;
    sprite.height = height;
    this.container.addChild(sprite);
  }

}