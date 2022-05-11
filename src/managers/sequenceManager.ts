import {createMachine, interpret} from 'xstate';
import sequenceMachineJSON from './sequenceMachine.json'
import {useMachine} from '@xstate/vue';

const sequenceMachine = createMachine(sequenceMachineJSON)

const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
