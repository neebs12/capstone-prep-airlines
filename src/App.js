import React, { Component } from 'react';
import './App.css';

import data from './data'

const App = () => {
  
  const { routes, airlines, airports } = data

  const RoutesTable = ({ routes }) => {
    // [col1, col2, col3]
    // ---> displayed in correct order
    const columnNames = Object.keys(routes[0])
    const colRowHash = {}
    // create colRowHash object with properties pertaining to columnNames
    // -- the values of each property is then [] (empty array)
    columnNames.forEach(colName => {colRowHash[colName] = []})
    // colRowHash now is
    /*
    {
      "airline": [], 
      ...
    }
    */
   // then populate the sub arrays in object accordingly
    routes.forEach(route => {
      // route is an object
      columnNames.forEach(colName => {
        // now populating the sub arrays!
        colRowHash[colName].push(route[colName])
      })
    })

    // debugger;
    return (
      <table>
        <thead>
          <tr>{/*first row, are the col names*/}
            {columnNames.map(name => <th key={name}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {/*subseq rows, are the routes*/}
          {routes.map((route, ind) => {
            // iter through routes, for number of columns, but get ind number
            const tds = columnNames.map(name => {
              const value = colRowHash[name][ind]
              return (<td key={value}>{value}</td>)
            })
            return (
              <tr key={JSON.stringify(route)}>
                {tds}
              </tr>
            )
            
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <RoutesTable routes={routes}/>
      </section>
    </div>
  )
}

export default App;