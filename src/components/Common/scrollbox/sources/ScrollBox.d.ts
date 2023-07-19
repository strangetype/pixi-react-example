import {Graphics, Container} from 'pixi.js';
import {Viewport} from 'pixi-viewport';

declare class DefaultScrollBarDrawer extends Graphics {
	public draw(x: number, y: number, width: number, height: number): DefaultScrollBarDrawer;
}

declare class ScrollBox extends Container {
	constructor(options: any, scrollbarDrawer?: DefaultScrollBarDrawer);
	public x: number;
	public y: number;
	public content: Viewport;
	public scrollbar: Graphics;
	public update(): void;
	public resize(options: any): void;
	public boxWidth: number;
	public boxHeight: number;
	protected _maskContent: Graphics;
	protected options: any;
}
