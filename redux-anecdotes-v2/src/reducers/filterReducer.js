const reducer = (filter = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return filter
  }
}

export const changeFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default reducer