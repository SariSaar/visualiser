import '../components/CsvTable.css';

const ModifySelect = (props) => {
  const {options, mode, onSelect, passedRef} = props;

  return (
    <div className="modifySelect">
      {mode} by: 
      <select
        ref={passedRef}
        onChange={onSelect}>
          <option value='-'>--</option>
      {options.map(opt => (
        <option value={opt.dataIndex}>{opt.title}</option>))
      }
      </select>
    </div>
  )
}

export default ModifySelect;