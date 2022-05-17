import {createMachine, interpret} from 'xstate';
const sequenceMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFEAeAHMAnAlmAdgMZgB0O+ALlgPYQCuhFO1+AxPmKhYqOtbDiYseIVIgBMARgCsJcQGYALPIAckxeMUB2afPkAaEAE9EM+SQCcVi1snjpWgGwrxjxwF93htJlwFiJLBgFHToAArUAO7YAEIANtSEANYk1Jj4ACLU1FisENlYAPJJInwCQvgiYgiKKiokkvLiKgAMCtLSjtLiToYmCJI6ltaOtU0W4haqnt4Y2HhEpEEh4VGxCckk6HF0UADCheKshNTixaX8gsyVSKKIWoqOJC1aauLvFrWKLSp9pkPWCyjFTjSbTLwgHzzfxLYKhCLRLDxRIpba7ADqAEMKNhWJFsdhzrcyldhLdqpIWi0ni0plolIpFLolJI-gMASMxpMwSoZpC5n5FoE4atEcjNnw6FgAGLYJhxHAAL1xADM5TgFcqiiViZcKlVTJMtM8tG0HkDpBYZGzBrJAcDQVNeRCoYKAst4WskRtUXQKABVLCY-A4OgAW1YUuDobDRN4euuBoGjnkLRIDpslpUFipjhtHKsDu5Tr5roWATiYExADcwOicklWOgABYsMBhTE4LCQC7lRPkxDdNnaO3WaSSCwgjTNUsC8ukCjUMPY6g+OLB7HXViwCiYrAUAAqS5XvdJN1A1UUkkkJBUjlsU+njmvw4LFnHk6U72ds1885IhB0DuS5KmAR7LourCLhB1BxiAJL6gOCCuE8kgqDodiDE0kj3nmxj3EywxWPIVp6FaKazn+MIkFANCRKwtFRHBCH9heg7iDaLQyEREyOM0jK0j+-JUUKJxxJWjDHNQ4lgIwPa6n2ZJsch77poME5tC046WgY+EDFxo5WK4-HfJOngQvgtBwCIZbUeQVC0AwiHxop553DUHF6eoxqAq0Wj2A8XHyJR0JCh6orrCiqTpFkOSns57njGptgTA4Uj0loNqOBYPEPKmgnONIIVurCKwIpFEo7Pshzxax7mWoozx0iRgxTCmWU5YCeVUpOhXFf+4Xld6UVolAWI4lgtVKe5KiEa0jxqFeZE4R1uXKD1d4qEVLpztRg1euKqLUFKsr7hqoGTQpZ5JtegwkHolotPlEwTp5-Q4Z11jdQVW39XtIpDYdWx+oG0bhlNbkUhosjXrYjzSLNjx4e92Vrc9m3bb+oXugDB0+hDSaprIz4pQF6XyJlelAjx6EyC0ihTBof1CpWNZ1g2BNIYMjhpqmjw9A646rV160-eIzMBNBK5rhuCUsdNFKfHISgU8yi0M8OqP2uo461E9EukIBwFhqB4EnldCXVA4bL0p9Vi1DzE70kJtlCoxkSc8pqj1K1zivKo6ga3pts8Q7XE2OCWMlQB0kSdwFt1RSlokEy8h2PNej029pg9Tx8gON0jz+QbgTNugkQxFEcSe+5V6NRoNj0w8ug5oynG0nnBeaPe4s7SJxA1xSvx6QoPEOPSaF3j05nuEAA */
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
              target: "#Experience.leaveWork",
            },
          },
        },
      },
    },
    leaveWork: {
      on: {
        phonePaired: {
          target: "tomatoExplanation",
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
          target: "grow",
        },
      },
    },
    grow: {
      on: {
        growOk: {
          target: "collect",
        },
      },
    },
    collect: {
      on: {
        collected: {
          target: "shpwBowl",
        },
      },
    },
    shpwBowl: {},
  },
}
  )

const sequenceManager = interpret(sequenceMachine)
sequenceManager.send('next')
sequenceManager.start()
export default sequenceManager
