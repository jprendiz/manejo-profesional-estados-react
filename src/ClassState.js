import React from "react"
import { Loading } from './Loading'

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
      loading: false,
    }
  }

  // UNSAFE_componentWillMount() {
    //   console.log("componentWillMount");
    // };
    // componentDidMount() {
      //   console.log("componentDidMount");
      // };
      
      componentDidUpdate() {
        console.log("Actualización...");
        console.log(this.state.value);

    if ( this.state.loading ) {
      setTimeout(() => {
        console.log("Haciendo la validación");
      
        if ( SECURITY_CODE === this.state.value) {
          this.setState({ loading: false, error: false })
        } else {
          this.setState({error: true, loading: false})
        }
      
        console.log("terminando la validación");
      }, 3000);
    }
  }

  render () {
    const { error, loading, value } = this.state;  // haciendo destructuración para simplificar el código
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escriba el código de seguridad: </p>

        { error && !loading &&
          <p>El código es incorrecto</p> 
        }

        { loading && 
          <Loading /> 
        }

        <input 
          placeholder="Código de seguridad" 
          value={value}
          onChange={(e) => { 
            this.setState( {value: e.target.value} )
          }}
          
        />
        <button
          onClick={() => (this.setState( { loading: true }) ) }
        >Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState }