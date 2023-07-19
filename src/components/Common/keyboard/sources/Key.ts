import { Container, Graphics, TextStyle, Text, Sprite, Filter } from 'pixi.js';
// @ts-ignore
import colorShader from '../../../../shaders/color.frag';

export type TKeyboardStyle = {
	bkg?: number,
	font?: number,
	fontAccent?: number,
	fontSecond?: number,
	btn?: number,
	btnPressed?: number,
	btnAccent?: number,
	btnAccentPressed?: number,
	btnSecond?: number,
	btnSecondPressed?: number,
	btnShadow?: number,
}

export enum EKEY_CODES {
	CODE_1 = '1',
	CODE_2 = '2',
	CODE_3 = '3',
	CODE_4 = '4',
	CODE_5 = '5',
	CODE_6 = '6',
	CODE_7 = '7',
	CODE_8 = '8',
	CODE_9 = '9',
	DOT = '.',
	CODE_0 = '0',
	DEL = ' ',
	CLOSE = 'X',
	DONE = 'Ok',
	MIN = 'MIN',
	D2 = 'X/2',
	X2 = 'X2',
	MAX = 'MAX',
}

export default class Key extends Container {
    private _code: EKEY_CODES;
    private _front: Graphics = new Graphics();
    private _shadow: Graphics = new Graphics();
    private _text: Text;
    private _symbols: Sprite[] = [];

    private fillColor: number = Key.style.btn;
    private pressedColor: number = Key.style.btnPressed;
    private fontColor: number = Key.style.font;
    private fontSecondColor: number = Key.style.font;
    private shadowColor: number = Key.style.btnShadow;

    constructor (code: EKEY_CODES, text: string = '', stl: TKeyboardStyle = Key.style, app = null) {
        super();
        this._code = code;
        this.fillColor = Key.getBtnColor(code, stl);
        this.pressedColor = Key.getBtnPressedColor(code, stl);
        this.fontColor = Key.getFontColor(code, stl);
        this._front.beginFill(0xffffff, 1).drawRoundedRect(0, 0, 100, 50, 30).endFill();
        this._front.tint = this.fillColor;

        this._shadow.beginFill(this.shadowColor, 1).drawRoundedRect(0, 102, 100, 50, 30).endFill();

        this._front.interactive = true;
        this._front.buttonMode = true;
        this._front.on('pointerdown', this._onPressed, this);
        this._front.on('pointerup', this._onUnpressed, this);
        this._front.on('pointerupoutside', this._onUnpressed, this);
        this._front.on('pointertap', this._onTap, this);

        const style = new TextStyle({
            fontFamily: !Key.SECOND_CODES[code] ? 'Montserrat400' : 'Montserrat400',
            fontSize: 60,
            fill: this.fontColor
        });
        this._text = new Text(text || code, style);
        this._text.resolution = 1;
        this._text.anchor.set(0.5);
        this._text.position.set(168, 84);
        this._front.addChild(this._text);

        this.addChild(this._shadow, this._front);

        if (app && code === EKEY_CODES.DEL) {
            const keyboardBack: Sprite = new Sprite(app.loader.resources.keyboardBack.texture);
            keyboardBack.anchor.set(0.5);
            this.addSymbol(keyboardBack);
        }
    }

    private _onPressed (): void {
        this._front.tint = this.pressedColor;
    }

    private _onUnpressed (): void {
        this._front.tint = this.fillColor;
    }

    private _onTap (): void {
        this.emit('keydown', this._code);
    }

    public addSymbol (symbol: Sprite): void {
        this._symbols.push(symbol);
        const color = this.fontColor;
        let colorHex: string = color.toString(16);
        for (let i: number = colorHex.length; i < 6; i++) colorHex = '0' + colorHex;
        const b: number = parseInt('0x' + colorHex.slice(4, 6)) / 0xff;
        const g: number = parseInt('0x' + colorHex.slice(2, 4)) / 0xff;
        const r: number = parseInt('0x' + colorHex.slice(0, 2)) / 0xff;
        symbol.filters = [new Filter(null, colorShader, {
            color: [r, g, b]
        })];
        this.addChild(symbol);
    }

    public resize (width: number, height: number, radius: number = 4, fontSize: number = 12): void {
        this._front.clear().beginFill(0xffffff, 1).drawRoundedRect(0, 0, width, height, radius).endFill();
        this._shadow.clear().beginFill(this.shadowColor, 1).drawRoundedRect(0, radius / 8, width, height, radius).endFill();
        this._text.style.fontSize = fontSize;
        this._text.position.set(width / 2, height / 2);
        this._symbols.forEach((symbol: Sprite) => {
            symbol.x = width / 2;
            symbol.y = height / 2;
            symbol.scale.set((height / symbol.texture.height) / 2);
        });
    }

    static readonly CODE_1: EKEY_CODES = EKEY_CODES.CODE_1;
    static readonly CODE_2: EKEY_CODES = EKEY_CODES.CODE_2;
    static readonly CODE_3: EKEY_CODES = EKEY_CODES.CODE_3;
    static readonly CODE_4: EKEY_CODES = EKEY_CODES.CODE_4;
    static readonly CODE_5: EKEY_CODES = EKEY_CODES.CODE_5;
    static readonly CODE_6: EKEY_CODES = EKEY_CODES.CODE_6;
    static readonly CODE_7: EKEY_CODES = EKEY_CODES.CODE_7;
    static readonly CODE_8: EKEY_CODES = EKEY_CODES.CODE_8;
    static readonly CODE_9: EKEY_CODES = EKEY_CODES.CODE_9;
    static readonly DOT: EKEY_CODES = EKEY_CODES.DOT;
    static readonly CODE_0: EKEY_CODES = EKEY_CODES.CODE_0;
    static readonly DEL: EKEY_CODES = EKEY_CODES.DEL;
    static readonly CLOSE: EKEY_CODES = EKEY_CODES.CLOSE;
    static readonly DONE: EKEY_CODES = EKEY_CODES.DONE;

    public static style: TKeyboardStyle = {
        bkg: 0xdfdfdf,
        btnShadow: 0xdfdfdf,
        font: 0x4F4F4F,
        fontSecond: 0x828282,
        btn: 0xf9f9f9,
        btnPressed: 0xe9e9e9,
        btnAccent: 0x47bf6f,
        btnAccentPressed: 0x37af5f,
        btnSecond: 0xD0D5CF,
        btnSecondPressed: 0xc0c5bF

    };

    public static ACCENT_CODES: {[key: string]: boolean} = {
        [EKEY_CODES.DONE]: true
    };

    public static SECOND_CODES: {[key: string]: boolean} = {
        [EKEY_CODES.MAX]: true,
        [EKEY_CODES.MIN]: true,
        [EKEY_CODES.D2]: true,
        [EKEY_CODES.X2]: true
    };

    public static getBtnColor (key: EKEY_CODES, style: TKeyboardStyle): number {
        if (Key.ACCENT_CODES[key]) return style.btnAccent;
        if (Key.SECOND_CODES[key]) return style.btnSecond;
        return style.btn;
    }

    public static getBtnPressedColor (key: EKEY_CODES, style: TKeyboardStyle): number {
        if (Key.ACCENT_CODES[key]) return style.btnAccentPressed;
        if (Key.SECOND_CODES[key]) return style.btnSecondPressed;
        return style.btnPressed;
    }

    public static getFontColor (key: EKEY_CODES, style: TKeyboardStyle): number {
        if (Key.ACCENT_CODES[key]) return style.bkg;
        if (Key.SECOND_CODES[key]) return style.fontSecond;
        return style.font;
    }
}
