import {Howl} from 'howler';

let sound
let doorSound
export function initSoundEffects() {
    sound = new Howl({
        src: ['/assets/audio/sprites.mp3'],
        sprite: {
            click: [0, 571],
            screw1: [571, 989],
            screw2: [1560, 652],
            drop: [2212, 1095],
            openDoor: [3307, 1350],
            closeDoor: [4657, 2019],
            clacDoor: [6676, 637]
        },
        onload() {
            console.log('sound effects ready')
        }
    })
    // doorSound = new Howl({
    //     src: ['/assets/audio/door_loop.mp3'],
    //     loop: true
    // })
    // doorSound.volume(0)
    Howler.volume(1)
}
export default function useSoundEffect(name: string) {
    const play = () => {
        sound.play(name)
    }
    return { play }
}
export function playSoundEffect(name: string, volume = 1) {
    const id = sound.play(name)
    sound.volume(volume, id)
}

export function useDoorSoundEffect() {
    const play = () => {
        console.log('hey')
        doorSound.play()
    }
    const stop = () => {
        doorSound.stop()
    }

    const setIntensity = intensity => {
        doorSound.volume(intensity)
    }

    return { play, stop, setIntensity }
}

export function initMusic() {
    const music = new Howl({
        src: ['/assets/audio/bg.mp3'],
        loop: true
    })
    const startMusic = () => {
        music.fade(0, 0.15, 5000)
        music.play()
        document.body.removeEventListener('scroll', startMusic)
        document.body.removeEventListener('click', startMusic)
    }
    document.body.addEventListener('scroll', startMusic, {once: true})
    document.body.addEventListener('click', startMusic, {once: true})
}
