export default function reducer(state, action) {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'GET_ALL_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload,
      }
    default:
      return state
  }
}
