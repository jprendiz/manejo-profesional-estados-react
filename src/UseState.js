import { useEffect, useState } from "react"

const SECURITY_CODE = 'paradigma'

function UseState( { name } ) {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  console.log(state);

  useEffect ( () => {
    console.log("Empezando el efecto");
    
    if ( state.loading ) {
      setTimeout(() => {
        console.log("Haciendo la validación");
      
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            loading: false, error: false, confirmed: true 
          })
        } else {
          setState({ 
            ...state,
            loading: false, error: true
          })
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
          onChange={(e) => 
            setState({
              ...state, 
              value: e.target.value
            }) }
        />
        
        <button 
          onClick={()=>{
            setState({
              ...state,
              loading: true 
            })
          }}
        >Comprobar</button>
      </div>
    )
  } else if ( state.confirmed && !state.deleted ) {
      return (
        <>
          <h2> Estado de confirmación </h2>
          <p> Seguro que desea eliminar el UseState? </p>
          <button onClick={()=>setState({ 
            ...state,
            deleted: true, confirmed: true,
          })}
          > Confirmar </button>
          <button onClick={()=>setState({ 
            ...state,
            deleted: false, confirmed: false,  value: ''
          })}> Cancelar </button>
        </>
      )
    } else {
      return (
        <>
        <h3> Eliminado con éxito </h3>
        <button onClick={()=>setState({ 
              ...state,
              deleted: false, confirmed: false, value: ''
            })}
        > Deshacer? </button>
    </>
    )
  }
}

export { UseState }
