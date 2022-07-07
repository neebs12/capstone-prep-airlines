import React, { useState, useRef } from 'react';
import './App.css';

import Table from './components/Table.jsx'
import Select from './components/Select.jsx'

import data, {getAirlineById, getAirportByCode} from './data'

const perPage = 25
const { routes, airlines, airports } = data

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
  const [airlineFilter, setAirlineFilter] = useState('')
  const [airportFilter, setAirportFilter] = useState('')

  const resetPageToggler = useRef()

  const filteredAirlinesOnSelect = (filter) => {
    setAirlineFilter(filter)
    resetPageToggler.current.resetPageToStart()
  }

  const filteredAirportsOnSelect = (filter)  => {
    setAirportFilter(filter)
    resetPageToggler.current.resetPageToStart()
  }

  const clearFilters = () => {
    setAirlineFilter('')
    setAirportFilter('')
    resetPageToggler.current.resetPageToStart()
  }

  let processedRoutes = routes.filter(r => {
    if (airlineFilter === '') return true
    
    return r['airline'] === +airlineFilter
  })

  processedRoutes = processedRoutes.filter(r => {
    if (airportFilter === '') return true

    return [r['src'], r['dest']].includes(airportFilter)
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
        <div className="inline-filters">
          <Select 
            options={airlines} 
            valueKey="id" titleKey="name"
            allTitle="All Airlines" 
            labelTitle="Show routes on"
            value={airlineFilter} onSelect={filteredAirlinesOnSelect}
          />
          <Select 
            options={airports}
            valueKey="code" titleKey="name"
            allTitle="All Airports"
            labelTitle="flying in or out of"
            value={airportFilter} onSelect={filteredAirportsOnSelect}
          />
          <button onClick={clearFilters}>Show all Routes</button>
        </div>
        <Table 
          className="routes-table" 
          columns={columns}
          rows={processedRoutes}
          format={formatValue}
          perPage={perPage}
          ref={resetPageToggler}
        />
      </section>
    </div>
  )
}

export default App;