const initialState = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false
}

export const sideBarSliceReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}