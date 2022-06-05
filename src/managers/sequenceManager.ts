import {createMachine, interpret} from 'xstate';
import {growLoader} from '../composables/useLoader';
const sequenceMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFEAeAHMAnAlmAdgMZgB0O+ALlgPYQCuhFO1+AxPmKhYqOtbDiYseIVIgBMARgCsJcQGYALPIAc46QAZFAdnna1AGhABPRDMUkNVrQE5JN9dMUaAbAF83RtJlwFiJWDAKOnQABWoAd2wAIQAbakIAaxJqTHwAEWpqLFYILKwAeUSRPgEhfBExBEUVFRJJZxdxRRsNG2la6SNTBEltF0trVQ1xF3lJeXlxDy8MbDwiUkDgsMiY+KSSdFi6KABhAvFWQmpxIpL+QWYKpFFEbUUBtr0XGxUatSlus37Bq2HRuNJtNPCBvPM-EsgiFwlEsHEEsltrsAOoAQwo2FYEQx2HOt1KV2EtyqkisA0k6g0Uw0Kle2j6316v2s1JUIzGEymMzBc18iwC0NWcIRmz4dCwADFsExYjgAF5YgBmMpwcsVhWKBMu5UqZnENm09Tazic8mkLkU4iZfSeQ3ZgK5INmPgW-mWMLW8I2SLoFAAqlg0fgcHQALasCXB0Nh-G8HXXPW9aTtEguFTaaTyakuJyWromH52-4OznAnng-nuoWw9aIgIUNFYCisWCN5uQC5lRMksy1DQkGrKGwODSaS0qG0s+0coHyCt8t1Qla172I1uJHDoAC0fDhACMfV2iTdQKT+4P3vIR+Ix64akzxM0-lppNInw1M-PQZWlyRYmAaIAG5gCi2SJKw6AABYsGAoRojgWCdtq3bEmeEi3nULgms8WY2C4khTgMKiTHoEwppaLhUQurqQv+gEgWBWAQbAm47tBsHHrqvYIO+TIuNo4gkKRigNJS74Ce4P6LnRFDUGGGLUN4sTBhi1ytu2FAACryYpXE9uhCDiO8aaNB0GiSO8ujaEyb5CSRSiUg8zjOJINEQgKhB0G28kKmAOkKXJrByYF1BxiAhLcYZTQ2HIll0oahriJmij8RZaZUZmKbXiohruVWpBeT5YZ+QFikblu24hXpKEnkmMVxbU9JJSltlZhlAnKAyrgkTY+V-lANARAASoBEDGBpTYUAA4kN+loXcRnKHIKiUte+g2M4CjWoWCCbXUImSA0zhTOM-V0YNkSjWi40VTul0RPNp6Lc08grWthq5VtUw2hogkkA562tLoDjaOdAoPddt2sZVcnbrAUFNmAT1Jgob3GR9G3fTtPRHbeAOTKJFnyFRrjg-4JyxABjDHNQVNgIwyHxqhz1VHxu0TPhBNKH9ijSJIVETOThV09TmIQLkNDoJgEAozxUwWE0mg6Neb5KDYNrXsRhO8-zgvfi6Hn+A9rAPeFkUGYtHz1FSOiZfh16pbt+3CYTR2KCdChudJtGeaLDMUFDE1tlNez+4wcuGdoDymWO6aiaoSjyEy7RGiJf0MmoVoqB4oL4LQcAiL+dHkFQtAMFFEUJgtVRWjaNQvutY7mkowuCiuXqiskqQEJk2SR4tUyxU0LSPFR6Yk7mU4Dqy76bVoDIC23HrCnWYo7PshwD2zm3GvP7Ik8ZbTTy+c8uYvUmGwV7eeiKPpbBv6KYlg2+IO8shqKt77Jdho8n7PBpz5HUvryX21YO533rOKKUqp1TYFfr0I6adMzUn0HzVwOMfgz2sGfBewDl41k7vfdAfpAzRnDAgho6h6gWgxm+XQ-NCIc20NgqwuCdD4J9kbZct817JBDs2ShglZBJ36A0DM7IMz-xwYAvBS8uHXxXquLuCDsyyBHptceE8qIFh6IaF8owdAjHNNIMGCi-wAWAqBcCCDbwNzJJtSkYw+bJ2YbFVkLQpC9WeG3aqcllKqUrhbGuiABK2UeNzPQnQnDsj6uYuiRUQqlV0nJBBVoZ5zi0GOMk-M2of1InYZwbRBJxKvgNIaQcEFhOdk4EgHRJgOxYVYZ0oDuEkEpmLBBrQ6j6EpLSNhWhcop35q7JQT4xjNCsGYspCTw7iyEQOVa6h3jYT0FoFwmtWjcytAoXMq0HBtweqoy0JBdAe1ErEhoTgU5WlGVaMYTgahtDbh0gOlTaqVx3rIUxq0BYTNpA0YZkg7njIVlM5eiMkJpNUHUmQ6ZkosLGSRTZsUHIXMtHoa8wtKGTl2goEgI5CVEqJXSXObggA */
createMachine({
  id: "Experience",
  initial: "introduction",
  states: {
    introduction: {
      on: {
        next: {
          target: "setupPowerBlock",
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
        "skip-powerblock": {
          target: "leaveWork",
        },
      },
    },
    leaveWork: {
      on: {
        phonePaired: {
          target: "tomatoExplanation",
        },
        "skip-phone": {
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
        "skip-tomato": {
          target: "growReady",
        },
      },
    },
    growReady: {
      on: {
        startGrow: {
          target: "grow",
        },
        "skip-grow": {
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
