
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    case 'CLEAR':
      return state === action.message ? null : state
    default:
      return state
  }
}

export const notify = (message, time=5) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        message
      })
    }, time * 1000)
  }
}

export default reducer