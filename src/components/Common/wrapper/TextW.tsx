import { Text } from '@inlet/react-pixi';
import React, { useEffect, useRef, useState } from 'react';
import { useStoreComputed } from 'features/useComputed';
import { textLengthCoefFilter } from 'utils/textLengthCoefFilter';
import helper from 'utils/helper';
import { setProps } from 'utils/setProps';
import { applyOrientation } from 'utils/applyOrientation';
import TweenManager from 'plugins/Tween/TweenManager';
import { useStoreSettingsActions } from 'store/Default/settings/actions_F';
import { debounce } from 'utils/debounce';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';

export const TextW = (props: any) => {
    const [text, setText] = useState(props.prefixText ? props.prefixText(props.text) : (props.text ?? ''));
    const [style, setStyle] = useState(props.style);
    const refText = useRef(null);

    useEffect(() => {
        if (helper.isEmpty(refText.current)) {
            return;
        }

        const _setProps = function () {
            if (props.props) {
                setProps(refText.current, props.props[applyOrientation()]);
            }
        };

        const _setPropsDebounce = debounce(_setProps, DEBOUNCE_TIME_ELEMENT);

        if (props.delayVisisble) {
            refText.current.visible = false;
            setTimeout(_ => {
                refText.current.visible = true;
            }, props.delayVisisble);
        }

        const resizeText = (txt = text) => {
            if (props.isResizeText) {
                const {
                    lineHeight,
                    fontSize
                } = textLengthCoefFilter({ text: txt, data: [props.style.fontSize, props.isResizeText] });
                setStyle({
                    ...props.style,
                    fontSize,
                    lineHeight
                });
            }
        };

        let computedText = null as any;
        if (props.store) {
            computedText = useStoreComputed(props.store, [props.storeKey], (data = {}) => {
                if (helper.typeOf(props.storeKey) === 'object') {
                    setText(props.prefixText ? props.prefixText(data[props.storeKey.key]) : data[props.storeKey.key]);
                } else {
                    setText(props.prefixText ? props.prefixText(data[props.storeKey]) : data[props.storeKey]);
                }
                resizeText();
            });
        } else {
            setText(props.prefixText ? props.prefixText(props.text) : props.text);
        }

        if (useStoreSettingsActions.isCN()) {
            if (style.wordWrap) {
                setStyle({ ...props.style, breakWords: true });
            }
        }

        resizeText();

        _setProps();

        window.addEventListener('resize', _setPropsDebounce);

        if (props.tween) {
            const Tween: any = new TweenManager().createTween(refText.current);
            Tween.time = 30000;
            props.tween(Tween);
        }

        if (props.instanceCallback) {
            props.instanceCallback(refText.current, props.keyState ?? 'text');
        }

        return () => {
            window.removeEventListener('resize', _setPropsDebounce);
            computedText?.cancel();
        };
    }, [refText.current, props.store, props.isResizeText, props.text, props.props, props.delayVisisble, text]);
    return (
        <Text {...props} {...{ text, style }} ref={refText}/>
    );
};
