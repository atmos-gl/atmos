import {Howl} from 'howler';
import {computed, onUnmounted, ref} from 'vue';

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
            console.log('Sound effects ready')
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

let musicCanceled = false
const music = new Howl({
    src: ['/assets/audio/bg.mp3'],
    loop: true
})
const musicVolume = 0.1
export function initMusic() {
    const startMusic = () => {
        if (musicCanceled) return
        music.play()
        music.fade(0, musicVolume, 5000)
        document.body.removeEventListener('scroll', startMusic)
        document.body.removeEventListener('click', startMusic)
    }
    document.body.addEventListener('scroll', startMusic, {once: true})
    document.body.addEventListener('click', startMusic, {once: true})
}

const musicFadeDuration = 300
export function useMusicPlay() {
    const _playing = ref(music.playing())
    const playing = computed({
        get: () => {
            return _playing.value
        },
        set: (val) => {
            if (val) {
                music.play()
                music.fade(0, musicVolume, musicFadeDuration)
            } else {
                music.fade(musicVolume, 0, musicFadeDuration)
                setTimeout(() => music.pause(), musicFadeDuration)
            }
        }
    })
    music.on('play', () => _playing.value = true)
    music.on('pause', () => _playing.value = false)
    return {
        playing
    }
}

export function cancelMusic() {
    musicCanceled = true
    music?.stop?.()
}
