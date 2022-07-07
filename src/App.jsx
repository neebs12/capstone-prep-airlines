import React, { useState, useEffect, useRef } from 'react';
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

function disableSelectAirlines(processedRoutes, airlines) {
  const airlineIdAry = Array.from(new Set(processedRoutes.map(p => {
    return p['airline']
  })))

  airlines = airlines.map(a => {
    // if included, set to false, if not included, set to true
    return {...a, disabled: !airlineIdAry.includes(a.id)}
  })
  // debugger;
  return airlines
}

function disableSelectAirports(processedRoutes, airports, filter) {
  const airportCodeAry = Array.from(new Set(processedRoutes.map(p => {
    return [p['src'], p['dest']]
  }).flat()))
  // <--- flattens the array, so that (@map) instead of [[n0, n1], [n2, n3]], we get [n0, n1, n2, n3]

  console.log(airportCodeAry, airports.length)
  airports = airports.map(a => {
    // console.log(a.code)
    return {...a, disabled: !airportCodeAry.includes(a.code)}
  })

  return airports
}

const App = () => {
  const [airlineFilter, setAirlineFilter] = useState('')
  const [airportFilter, setAirportFilter] = useState('')

  const resetPageToggler = useRef()
  useEffect(() => {
    // I want this to run everytime this component re-renders
    resetPageToggler.current.resetPageToStart()
  })


  const filteredAirlinesOnSelect = (filter) => {
    setAirlineFilter(filter)
  }

  const filteredAirportsOnSelect = (filter)  => {
    setAirportFilter(filter)
  }

  const clearFilters = () => {
    setAirlineFilter('')
    setAirportFilter('')
  }

  let processedRoutes = routes.filter(r => {
    if (airlineFilter === '') return true
    
    return r['airline'] === +airlineFilter
  }).filter(r => {
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
            options={disableSelectAirlines(processedRoutes, airlines, airlineFilter)}
            valueKey="id" titleKey="name"
            allTitle="All Airlines" 
            labelTitle="Show routes on"
            value={airlineFilter} onSelect={filteredAirlinesOnSelect}
          />
          <Select 
            options={disableSelectAirports(processedRoutes, airports, airportFilter)}
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