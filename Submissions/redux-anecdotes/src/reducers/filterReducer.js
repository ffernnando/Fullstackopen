
const reducer = (state='', action) => {
  switch(action.type) {
    case 'CHANGE_FILTER': {
      console.log('Payday: ', action.payload)
      return action.payload.content
    }
    default:
      return state
  }
}

export const changeFilter = (text) => {
  return {
    type: 'CHANGE_FILTER',
    payload: {
      content: text
    }
  }
}

export default reducer