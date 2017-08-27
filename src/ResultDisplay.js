import React from 'react'

const ResultDisplay = props => {
  if (props.result) return <p>Result: {props.result}</p>
  else return null
}

export default ResultDisplay
