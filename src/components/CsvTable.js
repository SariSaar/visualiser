import Table from 'rc-table';
import { useEffect, useState, useRef } from 'react';
import '../components/CsvTable.css';
import ModifySelect from './ModifySelect';
import { sortByAttribute, filterByAttribute } from '../util/sort';
import React from 'react';

const extDataKeys = ['PublicData', 'ProtectedData', 'PrivateData', 'Metadata']

const getExtendedDataAttributes = (dataKey, content) => {
  if (!content[0][dataKey]) {
    return {
      keys: [],
      data: {}
    }
  }

  const boolParser = (_, value) => {
    if (typeof value == 'boolean') {
      return value.toString();
    } else {
      return value;
    }
  }

  const attr = content.reduce((acc, val) => {
    const extDataObject = val[dataKey];
    const data = JSON.parse(extDataObject, boolParser);
    const keys = data ? Object.keys(data) : [];
    const accKeys = acc.keys ?? [];
    return {
      keys: [...accKeys, ...keys],
      data: {
        ...acc.data ?? {},
        ...(data && {[val.Id]: data}),
      }
    };
  }, {})

  const uniqueAttrKeys = attr.keys ? attr.keys.filter((a, idx, self) => self.indexOf(a) === idx) : [];

  return {
    ...attr,
    keys: uniqueAttrKeys
  }
}

const empty = '-';

const CsvTable = (props) => {
  const { content, columns } = props;

  const [sortFilterData, updateSortFilterData] = useState([])
  const sortInputRef = useRef();
  const filterInputRef = useRef();
  const [sortParam, updateSortParam] = useState(empty)
  const [filterParam, updateFilterParam] = useState(empty)

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
    const pub = extAttributes.PublicData?.data[c.Id];
    const prot = extAttributes.ProtectedData?.data[c.Id];
    const priv = extAttributes.PrivateData?.data[c.Id];
    return {
      ...c,
      ...(pub && {...pub}),
      ...(prot && {...prot}),
      ...(priv && {...priv}),
    }
  })

  const sortTable = (e) => {
    const sort = e.target.value;
    updateSortParam(sort);

    console.log({ sort }, { filterParam })

    if (sort === empty && filterParam !== empty) {
      updateSortFilterData(filterByAttribute(data, filterParam))
    } else if (sort === empty && filterParam === empty) {
      clearSortAndFilter()
    } else {  
      updateSortFilterData(sortByAttribute(sortFilterData, sort))
    }
  }

  const filterTable= (e) => {
    const filter = e.target.value;
    updateFilterParam(filter);

    if (filter === empty && sortParam !== empty) {
      updateSortFilterData(sortByAttribute(data, sortParam))
    } else if (filter === empty && sortParam === empty) {
      clearSortAndFilter();
    } else {
      updateSortFilterData(filterByAttribute(sortFilterData, filter));
    }
  }

  const clearSortAndFilter = () => {
    updateSortFilterData(data);
    updateSortParam(empty);
    updateFilterParam(empty);
    sortInputRef.current.value = empty;
    filterInputRef.current.value = empty;
;
  }

  useEffect(() => {
    updateSortFilterData(data);
  }, [])

  return (
    <div>
      <div className="buttonContainer">
      Rows: {sortFilterData.length}
        <ModifySelect options={cols} mode='Sort' passedRef={sortInputRef} onSelect={sortTable} />
        <ModifySelect options={cols} mode='Filter' passedRef={filterInputRef} onSelect={filterTable} />
      <button onClick={clearSortAndFilter} >Clear sorting and filtering</button>
      </div>
      <Table 
        columns={cols}
        data={sortFilterData}
      />
    </div>
  )
}

export default CsvTable;