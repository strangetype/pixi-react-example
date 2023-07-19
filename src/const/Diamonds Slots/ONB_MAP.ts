import { ONB_TXT_STYLE } from 'const/Diamonds Slots/textStyles';

export const ONB_PROPS_MAP: { v?: { [key: string]: any }, h?: { [key: string]: any }, wordWrapWidth?: number }[] = [
    null,
    { h: { y: 0 }, v: { y: 16 } },
    {
        h: {
            style: {
                ...ONB_TXT_STYLE,
                wordWrapWidth: 400
            }
        },
        v: {
            style: ONB_TXT_STYLE
        }
    }
];
