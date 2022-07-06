import React, {useState} from 'react'

const Table = ({ className, columns, rows, format, perPage }) => {
  const [page, setPage] = useState(0)
  const [filterAirlines, setFilterAirlines] = useState('All Airlines')

  const availableFilters = Array.from(
    new Set(rows.map(r => format('airline', r['airline'])))
  ).concat('All Airlines')

  

  rows = rows.filter(r => {
    if (filterAirlines === 'All Airlines') return true
    // get formatted airline value
    const airlineName = format('airline', r['airline'])
    // ---> passes filter if equal, otherwise not
    return filterAirlines === airlineName
  })

  // filter amount of rows based on page and perPage
  const paginatedRows = rows.slice(page, page + perPage)
  // console.log(paginatedRows.length)

  const columnOrder = columns.map(c => c.property)

  const constructRow = (rowData) => {
    // rowData is eg. {"airline":24,"src":"DFW","dest":"XNA"}
    // use the format function
    // const keys = Object.keys(rowData)
    return (
      <tr key={JSON.stringify(rowData)}>
        {columnOrder.map(c => {
          // returns the respective -formatted- td elements
          const tableValue = format(c, rowData[c])
          return <td key={tableValue}>{tableValue}</td>
        })}
      </tr>
    )
  }

  const handleAirlineFilter = (e) => {
    setFilterAirlines(e.target.value)
    setPage(0)
  }

  return (
    <div>
      <label htmlFor="airline-filter">Show routes on:</label>
      <select 
        id="airline-filter"
        value={filterAirlines}
        onChange={handleAirlineFilter}
      >
        {availableFilters.map(f => {
          return <option key={f} value={f}>{f}</option>
        })}
      </select>
      <table className={className}>
        <thead>
          <tr>{columns.map(c => <th key={c.name}>{c.name}</th>)}</tr>
        </thead>
        <tbody>
          {/* where the body of the information is going to go */}
          {paginatedRows.map(constructRow)}
        </tbody>
      </table>
      {`Showing ${page + 1}-${page + perPage} of ${rows.length} routes.`}
      <br></br>
      <button 
        disabled={page === 0}
        onClick={() => setPage(p => p - 25)}
      >Previous Page</button>
      <button 
        disabled={(page + 25) >= rows.length}
        onClick={() => setPage(p => p + 25)}
      >Next Page</button>
    </div>
  )
}

export default Table