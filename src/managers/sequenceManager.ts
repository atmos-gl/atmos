import {createMachine, interpret} from 'xstate';
const sequenceMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFEAeAHMAnAlmAdgMZgB0O+ALlgPYQCuhFO1+AxPmKhYqOtbDiYseIVIgBMARgCsJcQGYALPIAci8dOniA7ADZNAGhABPRDMUkADNcuTt26ZYfjL4gL5ujaTLgLESsGAUdOgACtQA7tgAQgA21IQA1iTUmPgAItTUWKwQWVgA8okifAJC+CJiCIoqKiSS8jr68pLitQ1Gpgh2ulY2OgCcigMqWloeXhjYeESkgcFhkTHxSSTosXRQAMIF4qyE1OJFJfyCzBVIoojair1OKq2W0najurqdZnp91oPDoxruTwgbzTPxzIIhcJRLBxBLJdabADqAEMKNhWBFUdhjpdSmdhJcqpJrHcBqpxIplLoVNoBtoPt0vjZXLS-mNAZMfDN-PNIUsYSt4dQ6FgAGLYJixHAAL3RADMJTgpbLCsVcadypUzOI6VZtJZ5NodA0nooGT1vrZahS1C0VBNgVNfLMAhDFtDYat0HQKABVLDI-A4OgAW1YIsDwZDON4GvOWu6unklhIuhqmjJUlpMnNTJskmtNWUqgdIOd-liYGRADcwIjsolWOgABYsMChZE4LCQE5leOExBaBmKPM-Fo1fWU0tO7mkCjUEOo6jeWKB1HnViwCjIrAUAAqC6XvfxF1AVUUkkkJBUum0kgGD5qtkNw9HrnHNMsU6BZdnJEIdBbguMpgAei7zqw87gdQMYgHimoDgg4hvPUNKOBSDS3to8gMjcdw2Ia4gaFoAzTlyYIkFANARAASlWEDGJu267gA4tRx4IWeg7iOatj4dYKhtNIAySBekhkaCLoHLElaMPs1AyWAjA9uqfYElxCBDiY2o3t8l7mM86j2j+M4UVRkSsOZESwfB-YaTqvQqPIwmPLSQyONIvGSPxX6XtIoxDNoHhAvgtBwCIv4UeQVC0AwnFwXG6lXNUPHad0NSWpYTnWNISa1BJ5bggsULLHCKRpJk2QcXZyWNAMqZ2HY6hGjcxL0mldgpsyyZaFlrUFX+vLuqVXobNsuzVUlVTCRYlhkjctRqL1qVdJ1lo9S4NIXgNFFDSVAplQiUAomiWCTaeyVLdeX76vIuiuPdt65l1+aODcNSjIoO0unt-KekKIriruSogWdqkngm+naCQ8h3a9qhZThHX6utTybf1JnkT9br7f9aw+v6kahudkPqLIl5GoorhUwWbTPajvVbeJmOSTyON-YKJOIT1DV3jcOg6BeTgMrqzK2FobzyGSxmcqzpCVjWdYNlzGk9CmybDER0g3CMNz091aN9Re8jff4UFLiua7xbZU1mEMchKKosPaCoj5Gq+L3WM5I7Ia7Jss4V-6AVBIFgUe4PxdN7VdDcnvvkaRHEqRAd-lZdHIgxKu1bU9S0tSUiYcM2G4VTloUo0gkPqbpDSbJ3ARzV55fnIrsGhOSYDPdZodbYccNERehU7o1cBK2ETRJEsRZ0SKMPBoxIPGSD7mm0nsmk4Ba0tII9WdPnzyCQijSC0lhJllxHSN3q295a9iOC0sP+7LhV790KgMgoJAPt-P8-0RwVuCAA */
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
          target: "showBowl",
        },
      },
    },
    showBowl: {},
    grow: {
      on: {
        growOk: {
          target: "collect",
        },
      },
    },
  },
}
  )

// sequenceMachine.initial = 'collect'
const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
