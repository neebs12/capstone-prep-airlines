import React from 'react'

const Select = ({
  options, valueKey, titleKey, allTitle, labelTitle, value, onSelect
}) => {
  // options: the filtered airlines, or etc.
  // valueKey: prop that points to the id that is to be filtered with
  // -- thus, id in airlines will ref the airline code in routes
  // titleKey: prop that pts to the name that is to be seen with select
  // allTitle: prop that is displayed with label
  // value: prop that is the value selected (state from parent)
  // -- is the value={value} for the controlled select component
  // onSelect: prop that is fn defined in parent component

  const onChangeHandler = (e) => {
    const val = e.target.value
    onSelect(val)
  }

  return (
    <div>
      <label htmlFor={allTitle}>{labelTitle}</label>
      <select
        id={allTitle}
        value={value}
        onChange={onChangeHandler}
      >
        <option key={allTitle} value={''}>{allTitle}</option>
        {options.map(o => {
          // o is eg: {"id":24,"name":"American Airlines"}
          // val is therefore the id
          const val = o[valueKey]
          const title = o[titleKey]
          return <option key={val} value={val}>{title}</option>
        })}
      </select>
    </div>
  )
}

export default Select