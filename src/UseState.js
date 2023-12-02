import { useEffect, useState } from "react"

const SECURITY_CODE = 'paradigma'

function UseState( { name } ) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(value);

  useEffect ( () => {
    console.log("Empezando el efecto");
    
    if ( loading ) {
      setTimeout(() => {
        console.log("Haciendo la validación");
      
        if (value === SECURITY_CODE) {
          setLoading(false)
          setError(false)
        } else {
          setLoading(false)
          setError(true)
        }
      
        console.log("terminando la validación");
      }, 3000);
    }
    console.log("Terminando el efecto");
  }, [loading])

    return(
      <div>
        <h2>Eliminar { name }</h2>
        <p>Por favor escriba el código de seguridad: </p>

        { error && !loading &&
          <p>El código es incorrecto</p> 
        }

        { loading && 
          <p>Cargando...</p> 
        }

        <input 
          placeholder="Código de seguridad" 
          value = {value}
          onChange={(e) => setValue(e.target.value)}
        />
        
        <button 
          onClick={()=>{
            setLoading(prevState => !prevState)
          }}
        >Comprobar</button>
      </div>
    )
}

export { UseState }
