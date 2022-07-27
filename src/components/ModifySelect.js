import '../components/CsvTable.css';

const ModifySelect = (props) => {
  const {options, mode, onSelect} = props;

  return (
    <div className="modifySelect">
      {mode} by: <select onChange={onSelect}>
      {options.map(opt => (
        <option value={opt.dataIndex}>{opt.title}</option>))
      }
      </select>
    </div>
  )
}

export default ModifySelect;