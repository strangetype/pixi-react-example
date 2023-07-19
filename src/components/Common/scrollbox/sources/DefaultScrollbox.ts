import { Graphics } from 'pixi.js';
import { ScrollBox } from 'components/Common/scrollbox/sources/ScrollBox';

export class DefaultScrollBarDrawer extends Graphics {
    public draw (x: number, y: number, width: number, height: number, isPane: boolean = false): DefaultScrollBarDrawer {
        const paneRad: number = 4;

        if (isPane) {
            y = this.height / (this.height - height) * y;
            return this
                .beginFill(0x000000, 0.05)
                .drawCircle(x + width / 2, y + paneRad, width + 3)
                .beginFill(0xFFFFFF)
                .drawCircle(x + width / 2, y + paneRad, width);
        } else {
            return this.drawRoundedRect(x + width / 2 - paneRad, y, paneRad * 2, height, paneRad);
        }
    }
}

export default class DefaultScrollBox extends ScrollBox {
    public topViewportMargin: number = 0;
    public bottomViewportMargin: number = 0;

    constructor (options: any, drawer: DefaultScrollBarDrawer = new DefaultScrollBarDrawer()) {
        super(options, drawer);
        this.topViewportMargin = options.topViewportMargin || 0;
        this.bottomViewportMargin = options.bottomViewportMargin || 0;
        this.update();
    }

    public update (): void {
        super.update();
        // @ts-ignore
        this._maskContent.clear();
        // @ts-ignore
        this._maskContent.beginFill(0xffffff, 1).drawRect(0, -this.topViewportMargin, this.boxWidth, this.boxHeight + this.topViewportMargin + this.bottomViewportMargin);
    // @ts-ignore
    }

    public resize (options: any = {}): void {
        super.resize(options);
    }
}
