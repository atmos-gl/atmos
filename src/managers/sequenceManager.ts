import {createMachine, interpret} from 'xstate';
import sequenceMachineJSON from './sequenceMachine.json'
const sequenceMachine = createMachine({
    ...sequenceMachineJSON,
    // FOR DEV ONLY
    // initial: 'leaveWork'
})

const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
