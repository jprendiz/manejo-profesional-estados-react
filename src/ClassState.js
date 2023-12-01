import React from "react"

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true,
    }
  }
  render () {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escriba el código de seguridad: </p>

        { this.state.error && 
          <p>El código es incorrecto</p> 
        }

        <input placeholder="Código de seguridad" />
        <button
          onClick={() => (this.setState( prevState => ({error: !prevState.error }) ) ) }
        >Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState }