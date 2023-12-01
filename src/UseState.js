import { useEffect, useState } from "react"

const SECURITY_CODE = '1234';

function UseState( {name }) {
  const [state, setState] = useState( { 
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  
  console.log(state);
  console.log(state.error);

  // const [value, setValue] = useState('');
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);


  const onConfirm = ()=> {
    setState({ 
      ...state,
      error: false,
      loading: false,
      confirmed: true
      })  
  }

  const onError = ()=> {
    setState({
      ...state, 
      error: true,
      loading: false
    })
  }

  const onWrite = (newValue) => {
    setState({
      ...state, 
      value: newValue})
  }

  const onCheck = () => {
    setState({
      ...state, 
      loading: true,
      error: false
      })
  }

  const onDelete = () => {
    setState({
      ...state, 
      confirmed: false,
      deleted: false,
      value: ''
      })
  }

  const onReset = () => {
    setState({
      ...state, 
      confirmed: false,
      delete: false,
      value: ''
      })
  }

  useEffect(() => {
    console.log('Empezando el useEffect');

    if (!!state.loading) {
      setTimeout(()=> {
        console.log('Validando el backend');
  
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }
  
        console.log('Terminando la validación del backend');
      }, 2000);
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
            onChange={
              (e) => onWrite(e.target.value) 
            }
          />
          <button
            onClick={
              ()=> onCheck()
              
            }
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
            onClick={
              ()=>{
                setState({
                ...state, 
                deleted: true,
                })
              }
            }
          >
            Sí, eliminar
          </button>
          <button
            onClick={ 
              ()=> onReset()  
            }
          >
            No, volver
          </button>
      </>
    )
  } else {
    <>
        <p> Estado de eliminación exitosa </p>
        <button
            onClick= {
              ()=>onDelete()
            }
          >
            Resetear, volver atrás
          </button>
    </>
  }
}

export { UseState }