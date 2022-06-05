import {createMachine, interpret} from 'xstate';
import {growLoader} from '../composables/useLoader';
const sequenceMachine =
/** @xstate-layout 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 */
createMachine({
  id: "Experience",
  initial: "introduction",
  states: {
    introduction: {
      on: {
        next: {
          target: "setupPowerBlock",
        },
        skip: {
          target: "leaveWork",
        },
      },
    },
    setupPowerBlock: {
      initial: "openDoor",
      states: {
        openDoor: {
          on: {
            doorOk: {
              target: "plugCO2",
            },
          },
        },
        plugCO2: {
          on: {
            co2Ok: {
              target: "plugWater",
            },
          },
        },
        plugWater: {
          on: {
            waterOk: {
              target: "pourFertilizer",
            },
          },
        },
        pourFertilizer: {
          on: {
            fertilizerOk: {
              target: "putUranium",
            },
          },
        },
        putUranium: {
          on: {
            uraniumOk: {
              target: "start",
            },
          },
        },
        start: {
          on: {
            started: {
              target: "#Experience.leaveWork",
            },
          },
        },
      },
      on: {
        skip: {
          target: "leaveWork",
        },
      },
    },
    leaveWork: {
      on: {
        phonePaired: {
          target: "tomatoExplanation",
        },
        skip: {
          target: "customizeTomato",
        },
      },
    },
    tomatoExplanation: {
      on: {
        startTomato: {
          target: "customizeTomato",
        },
      },
    },
    customizeTomato: {
      on: {
        tomatoOk: {
          target: "growReady",
        },
        skip: {
          target: "growReady",
        },
      },
    },
    growReady: {
      on: {
        startGrow: {
          target: "grow",
        },
        skip: {
          target: "grow",
        },
        "skip-to-collect": {
          target: "collectReady",
        },
        "skip-to-share": {
          target: "share",
        },
      },
    },
    collect: {
      on: {
        collected: {
          target: "collected",
        },
      },
    },
    collected: {
      on: {
        dropped: {
          target: "share",
        },
      },
    },
    grow: {
      on: {
        growOk: {
          target: "collectReady",
        },
      },
    },
    collectReady: {
      on: {
        startCollect: {
          target: "collect",
        },
        skip: {
          target: "share",
        },
      },
    },
    share: {},
  },
}
  )
// temp
// sequenceMachine.initial = 'collect'
// growLoader.load()
//
const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
