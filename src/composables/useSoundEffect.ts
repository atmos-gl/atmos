import {Howl} from 'howler';

let sound
export function initSoundEffects() {
    sound = new Howl({
        src: ['/assets/audio/sprites.mp3'],
        sprite: {
            click: [0, 571],
            screw1: [571, 989],
            screw2: [1560, 652],
            drop: [2212, 1095],
        },
        onload() {
            console.log('sound effects ready')
        }
    })
    Howler.volume(1)
}
export default function useSoundEffect(name: string) {
    const play = () => {
        sound.play(name)
    }
    return { play }
}
