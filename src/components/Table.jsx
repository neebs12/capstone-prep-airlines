import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Table = ({ className, columns, rows, format, perPage }, refs) => {
  const [page, setPage] = useState(0)

  const resetPageToStart = () => {
    setPage(0)
  }

  useImperativeHandle(refs, () => {
    return {
      resetPageToStart // <--- linked to refs
    }
  })

  // filter amount of rows based on page and perPage
  const paginatedRows = rows.slice(page, page + perPage)
  // console.log(paginatedRows.length)

  const columnOrder = columns.map(c => c.property)

  const constructRow = (rowData) => {
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

  return (
    <div>
      <table className={className}>
        <thead>
          <tr>{columns.map(c => <th key={c.name}>{c.name}</th>)}</tr>
        </thead>
        <tbody>
          {/* where the body of the information is going to go */}
          {paginatedRows.map(constructRow)}
        </tbody>
      </table>
      {`Showing ${page + 1}-${Math.min((page + perPage), paginatedRows.length)} of ${rows.length} routes.`}
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

export default forwardRef(Table)