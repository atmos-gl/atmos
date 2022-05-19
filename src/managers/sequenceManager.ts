import {createMachine, interpret} from 'xstate';
const sequenceMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFEAeAHMAnAlmAdgMZgB0O+ALlgPYQCuhFO1+AxPmKhYqOtbDiYseIVIgBMARgCsJcQGYALPIAci8dOniA7ADZNAGhABPRDMUkADNcuTt26ZYfjL4gL5ujaTLgLESsGAUdOgACtQA7tgAQgA21IQA1iTUmPgAItTUWKwQWVgA8okifAJC+CJiCIoqKiSS8jr68pLitQ1Gpgh2ulY2OgCcigMqWloeXhjYeESkgcFhkTHxSSTosXRQAMIF4qyE1OJFJfyCzBVIoojair1OKq2W0najurqdZnp91oPDoxruTwgbzTPxzIIhcJRLBxBLJdabADqAEMKNhWBFUdhjpdSmdhJcqpJrHcBqpxIplLoVNoBtoPt0vjZXLS-mNAZMfDN-PNIUsYSt4dQ6FgAGLYJixHAAL3RADMJTgpbLCsVcadypUzOI6VZtJZ5NodA0nooGT1vrZahS1C0VBNgVNfLMAhDFtDYat0HQKABVLDI-A4OgAW1YIsDwZDON4GvOWu6unklhIuhqmjJUlpMnNTJskmtNWUqgdIOd-liYGRADcwIjsolWOgABYsMChZE4LCQE5leOExBaBmKPM-Fo1fWU0tO7mkCjUEOo6jeWKB1HnViwCjIrAUAAqC6XvfxF1AVUUkkkJBUum0kgGD5qtkNw9HrnHNMsU6BZdnJEIdBbguMpgAei7zqw87gdQMYgHimoDgg4hvPUNKOBSDS3to8gMjcdw2Ia4gaFoAzTlyYIkFANARAASlWEDGJu267gA4tRx4IWeg7iOatj4dYKhtNIAySBekhkaCLoHLElaMPs1AyWAjA9uqfYElx1QtNeUiWLoyG3PIugPvSJjaje3yXuYzzKBJ5akNJslohAuQ0OgmAQBx-YaUZsiCV+I5vMmli1OabT8a0QytNI9jyLZf5UZErAJREsHwV5VxIQMvQqPIwmPLSQyONIvGSPxX6XtIoxDNocUUQ5SkUHRyIMUxO4UFsCmOZ56kZbcAwkA4TgAiMTg4aZ3TErILzoeolU3roHhAvgtBwCIv4UeQVC0AwnFwXGPXnjx42iXUzLBUF0hJrUtUury7rLHCKRpJk2TdaeGWNP1uh2HY6hGjcxImV0dgpsyyZaMFAM3TybpQg9XobNsuxvQmwkWJYZI3LUagQ0dwP6pa4MuDSF7Q+CCxwwKj0IlAKJolgKOITj15fvqhmuLoulA58oP5o4Nw1KMihk66FP8p6QoiuKu5KiBDOqSeCaWdoJDyOz1gyKo525rz1hE5DpM-jOFF3ZTEtrD6-qRqGjMaaJGj1HYFKuIoVptDrhNPMTUNG+Rt2w+Lgq2x9Typj9Nw6DoF5OAyupndIuW3OV9q+5JFZVrW9ZYGqsZqe9RJ6CmybDER0V-DcHtg17BsNCLUFLiua67WlB1mEMchKKoavaCoj5Gq+usGtII7Ib3sWp3Z-6AVBIFgUeCu7VU0W4a7loKEaRHEqRE-xdRTUMcHVSqHUdhZYJl6GcM2Er4PFKNIJD4i-VjCH4grvyB3ygJ5zlJtGax0WmcLpZ2tJqQckdH7fwz8nKvwQJdOo78VAY1aDILmoVaQkEcM+YepUh7Cx3hRZKsC7Af0UAnYkSZgrEWHiVQe9hHAtDVuPTkad7KdQavvLoudFaIUpBYHudI9CGR1KJAYxVjquFkNSW8Wh9SY2iiLWAzYdxgFgTlK8bRLwGjUMoUYKhQpJnqNSO8aZAojBTiwuyxD9HjQpJaW8xJKTRQeOPDwQA */
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
          target: "growReady",
        },
      },
    },
    growReady: {
      on: {
        startGrow: {
          target: "grow",
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

// sequenceMachine.initial = 'customizeTomato'
const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
