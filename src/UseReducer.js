import React from "react";
import { useEffect } from "react"

const SECURITY_CODE = '1234';

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

function UseReducer( { name } ) {
    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    
    const onConfirm = ()=> {
        dispatch({ type: actionTypes.confirm })
      }
    
      const onError = ()=> {
        dispatch({ type: actionTypes.error })
    
      }
    
      const onWrite = (newValue) => {
        dispatch({ type: actionTypes.write, payload: newValue })
      }
    
      const onCheck = () => {
        dispatch({ type: actionTypes.check })
    
      }
    
      const onDelete = () => {
        dispatch({ type: actionTypes.delete })
    
      }
    
      const onReset = () => {
        dispatch({ type: actionTypes.reset })
    
      }

  useEffect(() => {
    console.log('Empezando el useEffect');

    if (!!state.loading) {
      setTimeout(()=> {
        console.log('Haciendo la validación');
  
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
            onError()
        }
  
        console.log('Terminando la validación del backend');
      }, 3000);
    }

    console.log('Terminando el useEffect');

  }, [state.loading] );

  if ( !state.deleted && !state.confirmed) 
  {
    return (
      <div>
          <h2>Eliminar {name}</h2>
          <p>Por favor, escribe el código de seguridad</p>
  
          { state.error && !state.loading && (<p> Error: el código es incorrecto </p>)}
          { state.loading && (<p> Cargando ...</p>)}
  
          <input 
            placeholder="Código de seguridad"
            value={ state.value } 
            onChange={ (e) => onWrite(e.target.value) }
          />

          <button
            onClick={ onCheck }
          >
            Comprobar
          </button>
        </div>
    )
  } else if ( !!state.confirmed && !state.deleted ) {
    return (
      <>
        <h2> Eliminar {name} </h2>
        <p> ¿Seguro que quieres eliminar UseState? </p>

        <button
            onClick={ onDelete }
          >
            Sí, eliminar
          </button>
          <button 
            onClick={ onReset }
          >
            No, volver
          </button>
      </>
    )
  } else {
    return (
        <>
            <p> Estado de eliminación exitosa </p>
            <button
                onClick= { onReset }
            >
                Resetear, volver atrás
            </button>
        </>
    )
  }
  
}

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
  }
  
  const actionTypes = {
      confirm: 'CONFIRM',
      error: 'ERROR',
      write: 'WRITE',
      check: 'CHECK',
      delete: 'DELETE',
      reset: 'RESET',
  }
  
  
  const reducerObject = (state, payload) => ({ 
    
      'ERROR': {
          ...state,
          error: true,
          loading: false
      },
  
      'CONFIRM': {
          ...state,
          error: false,
          loading: false,
          confirmed: true
      },
  
      'WRITE': {
          ...state,
          value: payload
      },
  
      'CHECK': {
          ...state,
          loading: true,
          error: false,
      },
          
      'DELETE': {
          ...state, 
          confirmed: false,
          deleted: false,
          value: ''
      },
  
      'RESET': {
          ...state, 
          confirmed: false,
          delete: false,
          value: ''
      }
  });
  
export { UseReducer }
    
   