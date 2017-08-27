import React from 'react'

const DealerValueDisplay = props => {
  let value
  if (!props.waitingForPlayer) value = props.value

  return <p>Dealer Value: {value}</p>
}

export default DealerValueDisplay
