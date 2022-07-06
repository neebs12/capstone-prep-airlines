import React, { Component } from 'react';
import './App.css';

import Table from './components/Table.jsx'

import data, {getAirlineById, getAirportByCode} from './data'

const App = () => {
  
  const { routes } = data

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ]

  function formatValue(property, value) {
    if (property === 'airline') {
      return getAirlineById(value).name
    } else if (property === 'src' || property === 'dest') {
      return getAirportByCode(value).name
    }
  }

  const perPage = 25

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <Table 
          className="routes-table" 
          columns={columns}
          rows={routes}
          format={formatValue}
          perPage={perPage}
        />
      </section>
    </div>
  )
}

export default App;