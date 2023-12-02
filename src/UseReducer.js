
const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const reducerIf = (state, action) => {
  if ( action.type === 'CONFIRM') {
    return {
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    }
  } else if ( action.type === 'ERROR') {
    return {
      ...state,
      loading: false,
      error: true,
    }
  } else if ( action.type === 'WRITE') {
    return {
      ...state,
      value: newValue,
    }
  } else if  ( action.type === 'CHECK') {
    return {
      ...state,
      loading: true,
    }
  } else if  ( action.type === 'DELETE') {
    return {
      ...state,
      deleted: true, 
      confirmed: true,
    }
  } else if ( action.type === 'RESET') {
    return {
      ...state,
      deleted: false, 
      confirmed: false, 
      value: ''
    }
  } else {
    return {
      ...state
    }
  }

}

const reducerSwitch = (state, action) => {
  switch ( action.type) {
    case 'CONFIRM': 
    return {
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    };
    case 'ERROR':
    return {
      ...state,
      loading: false,
      error: true,
    };
    case 'WRITE':
    return {
      ...state,
      value: newValue,
    };
    case 'CHECK':
    return {
      ...state,
      loading: true,
    };
    case 'DELETE':
    return {
      ...state,
      deleted: true, 
      confirmed: true,
    };
    case 'RESET':
    return {
      ...state,
      deleted: false, 
      confirmed: false, 
      value: ''
    };
    default: 
    return {
      ...state,
    }
  }
}

const reducerObject = (state) => ({
    'CONFIRM':  {
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    },
    'ERROR': {
      ...state,
      loading: false,
      error: true,
    },
    'WRITE': {
      ...state,
      value: newValue,
    },
    'CHECK': {
      ...state,
      loading: true,
    },
    'DELETE': {
      ...state,
      deleted: true, 
      confirmed: true,
    },
    'RESET': {
      ...state,
      deleted: false, 
      confirmed: false, 
      value: ''
    },
})

const reducer = ( state, action ) => {
  if ( reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type]
  } else {
    return state
  }
}
