import React, { PropTypes } from 'react'

function FormError (props) {
  const { error, customClass } = props
  return (
    <p className={customClass} style={{display: (error ? '' : 'none')}}>{error}</p>
  )
}

FormError.propTypes = {
  props: PropTypes.object,
  error: PropTypes.string,
  customClass: PropTypes.string
}
export default FormError
