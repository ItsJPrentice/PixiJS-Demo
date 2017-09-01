import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Prop } from '../props/prop';
import { Actor } from '../actors/actor';

export class CollisionDetector {

  private _boundary: PIXI.Rectangle;
  private _props = <Prop[]>[];
  private _actors = <Actor[]>[];

  constructor(boundary: Observable<PIXI.Rectangle>,
              props: Observable<Prop[]>,
              actors: Observable<Actor[]>) {
    boundary.subscribe(boundary => this._onBoundaryUpdated(boundary));
    props.subscribe(props => this._onPropsUpdated(props));
    actors.subscribe(actors => this._onActorsUpdated(actors));   
  }
  
  private _onBoundaryUpdated(boundary: PIXI.Rectangle): void {
    this._boundary = boundary;
  }
  
  private _onPropsUpdated(props: Prop[]): void {
    this._props = props;
  }
  
  private _onActorsUpdated(actors: Actor[]): void {
    this._actors = actors;
  }

  public test(): void {
    this._checkActors();
  }

  private _checkActors(): void {
    _.each(this._actors, this._checkActor.bind(this));
  }

  private _checkActor(actor: Actor, index: number): void {
    _.each(_.slice(this._actors, index + 1),
                   otherActor => this._checkActorCollision(actor, otherActor));
  }

  private _checkActorCollision(actorA: Actor, actorB: Actor): void {
    if (this._testRectangleIntersection(actorA.sprite.getBounds(), actorB.sprite.getBounds())) {
      console.log('COLLISION');
    }
  }

  private _testRectangleIntersection(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return !(
             (r2.x > (r1.x + r1.width))  ||
             ((r2.x + r2.width) < r1.x)  ||
             (r2.y > (r1.y + r1.height)) ||
             ((r2.y + r2.height) < r1.y)
            );
  }
}