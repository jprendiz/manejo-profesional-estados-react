import { useState } from "react"

function UseState( { name } ) {
  const [error, setError] = useState(true);

    return(
      <div>
        <h2>Eliminar { name }</h2>
        <p>Por favor escriba el código de seguridad: </p>

        { error && 
          <p>El código es incorrecto</p> 
        }

        <input placeholder="Código de seguridad" />
        
        <button 
          onClick={()=>setError(prevState => !prevState)}
        >Comprobar</button>
      </div>
    )
}

export { UseState }
