import { LOAD_GAMING } from 'const/Common/EVENTS_EMMITER';

declare const UNDEFINED_VOID_ONLY: unique symbol;
// Destructors are only allowed to return void.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type EffectCallback = () => (void | Destructor);

export const useLoadGaming = (callback: EffectCallback) => {
    global.$emitter.on(LOAD_GAMING, e => callback());
};
