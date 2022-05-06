import {animate, AnimationOptions} from 'popmotion';

export function animateAsync<V>(params: AnimationOptions<V>) {
    return new Promise<void>(resolve => {
        params.onComplete = () => {
            resolve()
        }
        animate(params)
    })
}
