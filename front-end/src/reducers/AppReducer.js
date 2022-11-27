export default function reducer(state, action) {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}
