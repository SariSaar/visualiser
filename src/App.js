import { useState } from 'react';
import './App.css';
import User from './components/User';
import {structureData} from './data/structureData';

let data = require('./input/data.json');
const initialData = structureData(data);
const fileReader = new FileReader();
const images = [];


function App() {
  const [content, updateContent] = useState(initialData);

  const onChange = async (e) => {
    for (let file of e.target.files) {
      if (file.type === 'application/json') {
        await fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
          const result = e.target?.result;
          updateContent(structureData(JSON.parse(result)));
        }
      } else {
        const src = URL.createObjectURL(file)
        const image = new Image();
        image.src = src;
        
        image.onload = function () {
          const height = this.height;
          const width = this.width;

          const ratio = height / width;
          if (ratio > 1) {
            this.width = 200;
            this.height = 200 * ratio;
          } else {
            this.height = 200;
            this.width = 200 / ratio;
          }
        }

        images.push({
          name: file.name,
          image,
        })
      }
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
          images={images}
        />
      ))}
      {content.length === 0 && (
        <div>
          <p>Add your Flex data export file to see your data visualised.</p>
          <input 
            type="file" 
            id="input"
            multiple
            onChange={onChange}
          />
        </div>
      ) }
      </div>
    </div>
  );
}

export default App;
