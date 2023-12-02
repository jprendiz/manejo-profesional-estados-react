
import { act } from "@testing-library/react";
import { useReducer, useEffect } from "react"

const SECURITY_CODE = 'paradigma'

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

function UseReducer( { name } ) {
  const [state, dispatch] = useReducer( reducer, initialState);
  
  const onConfirm = () => dispatch({type: actionTypes.confirm});
  const onError = () => dispatch({type: actionTypes.error});

  const onWrite = ({target: { value }}) => {
    // dispatch( { type: actionTypes.write, payload: newValue } )
    dispatch( { type: actionTypes.write, payload: value } )

  };

  const onCheck = () => dispatch( { type: actionTypes.check});
  const onDelete = () => dispatch( { type: actionTypes.delete});
  const onReset = () => dispatch( { type: actionTypes.reset});

useEffect ( () => {
  console.log("Empezando el efecto");
  
  if ( state.loading ) {
    setTimeout(() => {
      console.log("Haciendo la validación");
    
      if (state.value === SECURITY_CODE) {
        onConfirm()
      } else {
        onError()
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
        // onChange={(e) => 
        //    onWrite(e.target.value)
        // }
        onChange={onWrite}
      />
      
      <button 
        onClick={onCheck}
      >Comprobar</button>
    </div>
  )
} else if ( state.confirmed && !state.deleted ) {
    return (
      <>
        <h2> Estado de confirmación </h2>
        <p> Seguro que desea eliminar el UseState? </p>
        <button onClick={onDelete}
        > Confirmar </button>
        <button onClick={onReset}> Cancelar </button>
      </>
    )
  } else {
    return (
      <>
      <h3> Eliminado con éxito </h3>
      <button onClick={onReset}
      > Deshacer? </button>
  </>
  )
}
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET'
}
const reducerObject = (state, payload) => ({
    [actionTypes.confirm]:  {
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    },
    [actionTypes.error]: {
      ...state,
      loading: false,
      error: true,
    },
    [actionTypes.write]: {
      ...state,
      value: payload,
    },
    [actionTypes.check]: {
      ...state,
      loading: true,
    },
    [actionTypes.delete]: {
      ...state,
      deleted: true, 
      confirmed: true,
    },
    [actionTypes.reset]: {
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