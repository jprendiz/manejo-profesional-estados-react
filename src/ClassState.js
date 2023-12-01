import React from "react";
import { Loading } from './Loading'

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      error: false,
      loading: false,
    }
  }
  
  componentDidMount() {
    console.log('Componente Did Mount');
  }

  
  // UNSAFE_componentWillMount() {
  //   console.log('Componente Will Mount');
  // }
 
  // componentWillUnmount() {
  //   console.log('Componente Will Unmount');
  // }

  componentDidUpdate() {
    console.log('Actualización');

    if (!!this.state.loading) {
      setTimeout(()=> {
        console.log('Validando el backend');
  
        if (this.state.value !== SECURITY_CODE) {
           this.setState({error: true })
        }
        else {
          this.setState({error: false })
        }
        this.setState({loading: false })

  
        console.log('Terminando la validación del backend');
      }, 3000);
    }
  }
  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {this.state.error && !this.state.loading && (<p>Error: el código es incorrecto</p>)}

        {this.state.loading && <Loading />}

        <input 
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(e) => this.setState({value: e.target.value }) }
        />
        <button
          onClick={()=> 
            {
              this.setState({ loading: true })
            }
          }
        >Comprobar</button>
      </div>
    );
  }  
}
  
  export { ClassState }