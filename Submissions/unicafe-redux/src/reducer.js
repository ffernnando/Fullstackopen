const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const oldGood = state.good
      return { ...state, good: oldGood + 1 }
    }
    case 'OK': {
      const oldOk = state.ok
      return { ...state, ok: oldOk + 1 }
    }
    case 'BAD': {
      const oldBad = state.bad
      return { ...state, bad: oldBad + 1 }
    }
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }

    default: return state
  }
}

export default counterReducer
