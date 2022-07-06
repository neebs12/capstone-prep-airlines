import React from 'react'

const Table = ({ className, columns, rows, format }) => {
  // format is a function
  // assume columns: 
  /* shape...
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  */
  // assume columns gives us proper column order, 
  // -- this formalizes it in an array
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

  return (
    <table className={className}>
      <thead>
        <tr>{columns.map(c => <th key={c.name}>{c.name}</th>)}</tr>
      </thead>
      <tbody>
        {/* where the body of the information is going to go */}
        {rows.map(constructRow)}
      </tbody>
    </table>
  )
}

export default Table