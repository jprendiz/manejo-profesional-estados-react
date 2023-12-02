
import { useReducer, useEffect } from "react"

const SECURITY_CODE = 'paradigma'

function UseReducer( { name } ) {

  const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}
  const [state, dispatch] = useReducer( reducer, initialState);

useEffect ( () => {
  console.log("Empezando el efecto");
  
  if ( state.loading ) {
    setTimeout(() => {
      console.log("Haciendo la validación");
    
      if (state.value === SECURITY_CODE) {
        dispatch({type: 'CONFIRM'})
      } else {
        dispatch({type: 'ERROR'})
      }
    
      console.log("terminando la validación");
    }, 3000);
  }
  console.log("Terminando el efecto");
}, [state.loading])

if ( !state.deleted && !state.confirmed ) {
  return(
    <div>
      <h2>Eliminar { name }</h2>
      <p>Por favor escriba el código de seguridad: </p>

      { state.error && !state.loading &&
        <p>El código es incorrecto</p> 
      }

      { state.loading && 
        <p>Cargando...</p> 
      }

      <input 
        placeholder="Código de seguridad" 
        value = {state.value}
        onChange={(e) => dispatch( { type: 'WRITE', payload: e.target.value })
          // onWrite(e.target.value)
        }
      />
      
      <button 
        onClick={()=>{
          dispatch( { type: 'CHECK'})
        }}
      >Comprobar</button>
    </div>
  )
} else if ( state.confirmed && !state.deleted ) {
    return (
      <>
        <h2> Estado de confirmación </h2>
        <p> Seguro que desea eliminar el UseState? </p>
        <button onClick={()=>
          dispatch( { type: 'DELETE'})

      }
        > Confirmar </button>
        <button onClick={()=>
          dispatch( { type: 'RESET'})
        }> Cancelar </button>
      </>
    )
  } else {
    return (
      <>
      <h3> Eliminado con éxito </h3>
      <button onClick={()=>
          dispatch( { type: 'RESET'})
        }
      > Deshacer? </button>
  </>
  )
}
}

const reducerObject = (state, payload) => ({
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
      value: payload,
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
    return reducerObject(state, action.payload)[action.type]
  } else {
    return state
  }
}

export { UseReducer }


// const reducerIf = (state, action) => {
//   if ( action.type === 'CONFIRM') {
//     return {
//       ...state,
//       loading: false,
//       error: false,
//       confirmed: true,
//     }
//   } else if ( action.type === 'ERROR') {
//     return {
//       ...state,
//       loading: false,
//       error: true,
//     }
//   } else if ( action.type === 'WRITE') {
//     return {
//       ...state,
//       value: newValue,
//     }
//   } else if  ( action.type === 'CHECK') {
//     return {
//       ...state,
//       loading: true,
//     }
//   } else if  ( action.type === 'DELETE') {
//     return {
//       ...state,
//       deleted: true, 
//       confirmed: true,
//     }
//   } else if ( action.type === 'RESET') {
//     return {
//       ...state,
//       deleted: false, 
//       confirmed: false, 
//       value: ''
//     }
//   } else {
//     return {
//       ...state
//     }
//   }

// }

// const reducerSwitch = (state, action) => {
//   switch ( action.type) {
//     case 'CONFIRM': 
//     return {
//       ...state,
//       loading: false,
//       error: false,
//       confirmed: true,
//     };
//     case 'ERROR':
//     return {
//       ...state,
//       loading: false,
//       error: true,
//     };
//     case 'WRITE':
//     return {
//       ...state,
//       value: newValue,
//     };
//     case 'CHECK':
//     return {
//       ...state,
//       loading: true,
//     };
//     case 'DELETE':
//     return {
//       ...state,
//       deleted: true, 
//       confirmed: true,
//     };
//     case 'RESET':
//     return {
//       ...state,
//       deleted: false, 
//       confirmed: false, 
//       value: ''
//     };
//     default: 
//     return {
//       ...state,
//     }
//   }
// }