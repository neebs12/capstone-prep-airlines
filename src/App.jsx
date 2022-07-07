import React, { useState, useEffect } from 'react';
import './App.css';

import Table from './components/Table.jsx'
import Select from './components/Select.jsx'

import data, {getAirlineById, getAirportByCode} from './data'

const perPage = 25
const { routes, airlines } = data

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

const App = () => {
  const [airlineFilter, setAirlineFilter] = useState(null)
  const [airportFilter, setAirportFilter] = useState(null)
  /*
  <Select options={filteredAirlines} valueKey="id" titleKey="name"
  allTitle="All Airlines" value="" onSelect="" />
  */

  const filteredAirlinesOnSelect = (filter) => {
    setAirlineFilter(filter)
  }

  const processedRoutes = routes.filter(r => {
    if (airlineFilter === '') return true
    return r['airline'] === +airlineFilter
  })

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>

        <Select 
          options={airlines} 
          valueKey="id" titleKey="name"
          allTitle="All Airlines" 
          labelTitle="Show routes on"
          value={airlineFilter} onSelect={filteredAirlinesOnSelect}
        />
        <Table 
          className="routes-table" 
          columns={columns}
          rows={processedRoutes}
          format={formatValue}
          perPage={perPage}
        />
      </section>
    </div>
  )
}

export default App;