export default function useKeySequence(sequence: Array<string>, expireDelay = 1000, callback: () => void) {
    let enteredSequence = []
    let lastKeyTime = Date.now()

    const isSequence = () => {
        return enteredSequence.length == sequence.length &&
            enteredSequence.every((val, index) => val == sequence[index])
    }

    document.addEventListener('keyup', e => {
        const {key} = e

        const currentTime = Date.now()
        if (currentTime - lastKeyTime > expireDelay) {
            enteredSequence = []
        }
        enteredSequence.push(key)
        lastKeyTime = currentTime

        if (isSequence()) {
            callback()
        }
    })
}
