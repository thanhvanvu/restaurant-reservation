export default function reducer(state, action) {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'GET_ALL_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload,
      }

    // when create one reservation
    // dispatch will update an array with existed reservations and NEW reservation
    case 'CREATE_ONE_RESERVATION':
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      }

    default:
      return state
  }
}
