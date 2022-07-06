import React, { Component } from 'react';
import './App.css';

import data, {getAirlineById, getAirportByCode} from './data'

const App = () => {
  
  const { routes, airlines, airports } = data

  // debugger;

  const RoutesTable = ({ routes }) => {
    // [col1, col2, col3]
    // ---> displayed in correct order
    const humanColNames = ["Airline", "Source Airport", "Destination Airport"]
    const airlineAry = routes.map(r => {
      const airlineId = r['airline']
      const airlineName = getAirlineById(airlineId).name
      return airlineName
    })
    const sourceAry = routes.map(r => {
      const airportCode = r['src']
      const airportName = getAirportByCode(airportCode).name
      return airportName
    })
    const destAry = routes.map(r => {
      const airportCode = r['dest']
      const airportName = getAirportByCode(airportCode).name
      return airportName      
    })

    return (
      <table className=".routes-table">
        <thead>
          <tr>{/*first row, are the col names*/}
            {humanColNames.map(name => <th key={name}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {routes.map((r, ind) => {
            return (
              <tr key={JSON.stringify(r)}>
                <td>{airlineAry[ind]}</td>
                <td>{sourceAry[ind]}</td>
                <td>{destAry[ind]}</td>
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