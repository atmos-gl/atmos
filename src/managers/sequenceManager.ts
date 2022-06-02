import {createMachine, interpret} from 'xstate';
const sequenceMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QFEAeAHMAnAlmAdgMZgB0O+ALlgPYQCuhFO1+AxPmKhYqOtbDiYseIVIgBMARgCsJcQGYALPIAci8dOniA7ADZNAGhABPRDMUkADNcuTt26ZYfjL4gL5ujaTLgLESsGAUdOgACtQA7tgAQgA21IQA1iTUmPgAItTUWKwQWVgA8okifAJC+CJiCIoqKiSSqnbSuvKSiopORqYIdtpyurqW6ooAnDq1Kh5eGNh4RKSBwWGRMfFJJOixdFAAwgXirITU4kUl-ILMFUiiiNqKulYq8tLylk+6ipK6XWb2-YPDMbaCZTEDeWZ+BZBELhKJYOIJZKbbYAdQAhhRsKwIhjsKdrqULsJrlVJNYHpYRmMlA5pMoRj8en9xAMhuJRuNaqDwb55gFocs4Qj1nw6FgAGLYJixHAALyxADMpTgZfLCsUCedypUzOIRn0nNJga9WroGopGb1-pZ5LbdPZtCNFNpuTNef5FjCVvC1ki6BQAKpYNH4HB0AC2rDFIbD4fxvC1lx1PXkUhIKgcDhUHxe0hUjIUknTdJGTgaumz2fkrp8cw9Athq0RAQoaKwFFYsFb7cgZzKSZJZiNdTGpZGzTuLmdjPk9pIeikQ0suidLjUNYhfNiYDRADcwCjsolWOgABYsMChNE4LC9zX94mgKpaRnOik2Qs1bRDRQb92kChqHDDFqG8WIQwxS5O27CgABUgJAvsiSuJ9EE+Its20SQqSdFRbHkbRXz0KwP1aL8fz-OtSEIOguyAuUwHg4DANYQDmOoeMQEJbVBwQFkHkkDNHHZct7HkRk7nfawCPEDQtBGSjIRIKAaAiAAlHcIGMaC2woABxVSkJ41CEBfEwzFsKS3nEFRpBGNpJEkRS+SOWJt0YQ5qDcsBGDvBMHxQm5qladNF10Fl7lnKlCPMnobKkxzzGkNpq08ME3SokhXPczEIFyGh0EwCAjIHEyV1kFQpzfFprFqS14pI2w9U+DQxOc-wVMiVhOoiTjuNKoK9QeJ47MkFxHSdRxpEtSzGqGRy8zs512uoryco0tEtJ09sdjWnzuHvZDk3uEZ50cbQND1PDtHE2LHMsWQ7Fs1x1DzbNdA8NL8FoOARB5TLyCoWgGGMrjE0fIL1EtGo5reV4HpaLk0v+pTPUFJt1lSAhMmyEqIaqVNTvCjQ1FG+H2ktLDrUURxEbJX9kYy1GG29YUkS2XZ9jxwLnydKwqRkMYbScEZvjuqn+KGWnGiGFb+SWRsfWbZEoHRTEsG55NSfTMlHPkMZHIGSmi0loa7GGJ45bRxW2Y2agxUldsVQYjXDtB0lHL6JQHKGC7Z3sY3qellR6atlmhV9DZ-SDGMI013i2g0epZP0B680ncRA8lmnlxlhnplrZmFdZyOu10+OTJSywdd6FkyRXSQZ1cEhWlskZ3lkxKw+LiPEQroLXlkYm8xp+zyYtWL2+tKRbRsu46Tl7c9wPI9+9JCsHhumwhhG+fXxcOQEZTuuZI+xnC75NiQLAiDQf6-GzD5hRlCeAiVCpZ1M9i51q+355P4rCMVKBdNz+BonRcMDEmKITdgNZ8MVuh3F-qRC6ndKRyx6htLSa9ECqDqHYUWlU9YfH1LdRBHQ5rslTJVKkctsr7RwdUG0cglDPFnD+GyE9uie03loZc7IRYVncOfUBq1vK+WKrAh+pkKwkA6KoSkY0ZDLgQbqR0JBHD4TpF8G0C8RH-mUoZKRPNfjyDkS8eurxKqaDpDNMkc17COFaLaYB6UL5gL2owLB3R-JHV4u0CwwJ9R6FnHqNo44ZpJw3s4b8QDMxW1PG2MAjCngmxDmSVQ7RVB5nqi0eoFYsIfAGPrJGID-yMMEgWWQktBK2lqWoO4n03BAA */
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
sequenceMachine.initial = 'leaveWork'
const sequenceManager = interpret(sequenceMachine)
sequenceManager.start()
export default sequenceManager
