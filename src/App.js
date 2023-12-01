import { UseState } from './UseState'
import { UseReducer } from './UseReducer'
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name='Use State'/>
      {/* <ClassState name='ClassState'/> */}
      <UseReducer name='Use Reducer'/>
    </div>
  );
}

export default App;
