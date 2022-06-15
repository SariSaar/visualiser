import { useState } from 'react';
import './App.css';
import User from './components/User';
import {structureData} from './data/structureData';

let data = require('./input/data.json');
const initialData = structureData(data);
const fileReader = new FileReader();


function App() {
  const [content, updateContent] = useState(initialData);

  const onChange = (e) => {
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const result = e.target?.result;
      updateContent(structureData(JSON.parse(result)));
    }
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Flex data visualiser</h1>
      {content.map(item => (
        <User
          key={item.id}
          user={item}
        />
      ))}
      {content.length === 0 && (
        <div>
          <p>Add your Flex data export file to see your data visualised.</p>
          <input 
            type="file" 
            id="input"
            onChange={onChange}
          />
        </div>
      ) }
      </div>
    </div>
  );
}

export default App;
