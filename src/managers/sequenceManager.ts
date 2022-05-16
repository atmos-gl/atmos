import {createMachine, interpret} from 'xstate';
import sequenceMachineJSON from './sequenceMachine.json'
const sequenceMachine = createMachine({
    ...sequenceMachineJSON,
    // FOR DEV ONLY
    // initial: 'grow'
})

const sequenceManager = interpret(sequenceMachine)
sequenceManager.send('next')
sequenceManager.start()
export default sequenceManager
