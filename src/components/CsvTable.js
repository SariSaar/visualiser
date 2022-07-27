import Table from 'rc-table';
import { useEffect, useState } from 'react';
import '../components/CsvTable.css';
import ModifySelect from './ModifySelect';
import { sortByAttribute, filterByAttribute } from '../util/sort';

const extDataKeys = ['PublicData', 'ProtectedData', 'PrivateData']

const getExtendedDataAttributes = (dataKey, content) => {
  const attr = content.reduce((acc, val) => {
    const data = JSON.parse(val[dataKey]);
    const keys = data ? Object.keys(data) : [];
    const accKeys = acc.keys ?? [];
    return {
      keys: [...accKeys, ...keys],
      data: {
        ...acc.data,
        ...(data && {[val.Id]: data}),
      }
    };
  }, {})

  const uniqueAttrKeys = attr.keys.filter((a, idx, self) => self.indexOf(a) === idx);

  return {
    ...attr,
    keys: uniqueAttrKeys
  }
}

const CsvTable = (props) => {
  const { content, columns } = props;

  const [sortFilterData, updateSortFilterData] = useState([])

  const extAttributes = extDataKeys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: getExtendedDataAttributes(key, content)
    }
  }, {})

  const cols = columns.reduce((acc, col) => {
    if (extDataKeys.includes(col)) {
      const extColKeys = extAttributes[col].keys;
      const extCols = extColKeys.map(c => {
        return {
          title: `${col} ${c}`,
          dataIndex: c,
          key: c,
          width: 100,
        }
      })
      return [
        ...acc,
        ...extCols
      ]
    } else {
      return [
        ...acc,
        {
          title: col,
          dataIndex: col,
          key: col,
          width: 100,
        }
      ]
    }
  }, [])

  const data = content.map(c => {
    const pub = extAttributes.PublicData.data[c.Id];
    const prot = extAttributes.ProtectedData.data[c.Id];
    const priv = extAttributes.PrivateData.data[c.Id];
    return {
      ...c,
      ...(pub && {...pub}),
      ...(prot && {...prot}),
      ...(priv && {...priv}),
    }
  })

  const sortTable = (e) => {
    const newData = sortByAttribute(data, e.target.value);
    updateSortFilterData(newData);
  }

  const filterTable= (e) => {
    const newData = filterByAttribute(data, e.target.value);
    updateSortFilterData(newData);
  }

  const clearSortAndFilter = () => {
    updateSortFilterData(data);
  }

  useEffect(() => {
    updateSortFilterData(data);
  }, [])

  return (
    <div>
      <ModifySelect options={cols} mode='Sort' onSelect={sortTable} />
      <ModifySelect options={cols} mode='Filter' onSelect={filterTable} />
      <button onClick={clearSortAndFilter} >Clear sorting and filtering</button>
      <Table 
        columns={cols}
        data={sortFilterData}
      />
    </div>
  )
}

export default CsvTable;