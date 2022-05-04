import {createMachine, interpret} from 'xstate';
import sequenceMachineJSON from './sequenceMachine.json'

const sequenceMachine = createMachine(sequenceMachineJSON)

const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
