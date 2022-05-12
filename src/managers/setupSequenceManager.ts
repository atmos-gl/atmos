import {createMachine, interpret} from 'xstate';
import sequenceMachineJSON from './setupSequenceMachine.json'
import {useMachine} from '@xstate/vue';

const sequenceMachine = createMachine({
    ...sequenceMachineJSON,
    // FOR DEV ONLY
    initial: 'leaveWork'
})

const setupSequenceManager = interpret(sequenceMachine)
setupSequenceManager.start()
export default setupSequenceManager
