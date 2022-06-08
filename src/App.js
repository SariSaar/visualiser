import logo from './logo.svg';
import './App.css';
import User from './components/User';
import {structureData} from './data/structureData';

let data = require('./input/data.json');

const structuredData = structureData(data);

function App(props) {

  console.log({ structuredData })

  return (
    <div className="App">
      <div className="container">
        <h1>Flex data visualiser</h1>
      {structuredData.map(item => (
        <User
          key={item.id}
          user={item}
        />
      ))}
      {structuredData.length === 0 && (
        <p>Replace the contents of 'visualiser/src/input/data.json' with the contents of your Flex data export file to see your data visualised.</p>
      ) }
      </div>
    </div>
  );
}

export default App;
