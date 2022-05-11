import {animate, AnimationOptions} from 'popmotion';
import {Vector2} from 'three';

export function animateAsync<V>(params: AnimationOptions<V>) {
    return new Promise<void>(resolve => {
        params.onComplete = () => {
            resolve()
        }
        animate(params)
    })
}

export function delay(duration: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, duration)
    })
}

export function normalizedToCanvasSpace(vec: Vector2, canvas: HTMLCanvasElement) {

}
export function canvasSpaceToNormalized(vec: Vector2, canvas: HTMLCanvasElement) {

}
