import { useEffect, useState } from "react"

function UseState( { name } ) {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect ( () => {
    console.log("Empezando el efecto");
    
    if ( loading ) {
      setTimeout(() => {
        console.log("Haciendo la validación");
      
        setLoading(false)
      
        console.log("terminando la validación");
      }, 3000);
    }
    console.log("Terminando el efecto");
  }, [loading])

    return(
      <div>
        <h2>Eliminar { name }</h2>
        <p>Por favor escriba el código de seguridad: </p>

        { error && 
          <p>El código es incorrecto</p> 
        }

        { loading && 
          <p>Cargando...</p> 
        }

        <input placeholder="Código de seguridad" />
        
        <button 
          onClick={()=>setLoading(prevState => !prevState)}
        >Comprobar</button>
      </div>
    )
}

export { UseState }
