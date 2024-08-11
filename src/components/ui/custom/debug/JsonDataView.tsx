import React from 'react'

interface IProps {
  data: Object
}

const JsonDataView = ({ data }: IProps) => {
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default JsonDataView