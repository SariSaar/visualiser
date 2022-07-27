import { useState } from 'react';
import './App.css';
import User from './components/User';
import CsvTable from './components/CsvTable';
import {structureData} from './data/structureData';

let data = require('./input/data.json');
// let csvToJson = require('convert-csv-to-json'); // https://www.npmjs.com/package/csvtojson
const initialData = structureData(data);
const fileReader = new FileReader();
const images = [];


function App() {
  const [exportContent, updateExportContent] = useState(initialData);
  const [isExport, toggleIsExport] = useState(true);
  const [csvContent, updateCsvContent] = useState('');
  const [csvColumns, updateCsvColumns] = useState([]);
  const csv = require('csvtojson')
  
  const onChange = async (e) => {
    for (let file of e.target.files) {
      if (file.type === 'application/json') {
        await fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
          const result = e.target?.result;
          updateExportContent(structureData(JSON.parse(result)));
        }
      } else if (file.type === 'text/csv') {
        toggleIsExport(false);
        await fileReader.readAsText(file, "UTF-8");
        fileReader.onload = async e => {
          const result = e.target?.result;
          const jsonObj = await csv().fromString(result);
          console.log({ jsonObj })
          updateCsvContent(jsonObj);

          const cols = result.split('\n')[0].split(',')
          console.log({ cols })
          updateCsvColumns(cols)
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
      {isExport && exportContent.map(item => (
        <User
          key={item.id}
          user={item}
          images={images}
        />
      ))}
      {!isExport && csvContent.length ? (
        <CsvTable content={csvContent} columns={csvColumns}/>
      ) : null
      }
      {exportContent.length === 0 && csvContent.length === 0 && (
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
