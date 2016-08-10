import React from 'react'
import { Link } from 'react-router'

function NotFound () {
  return (
    <div className='not-found-container'>
      <h1 className='not-found-title'>Страница не является собой...</h1>
      <br/>
      <p>
        <strong className='not-found-error'>404</strong>
        <span className='not-found-text'>PAGE NOT FOUND</span>
      </p>
      <br/>
      <Link to='/' className='not-found-button'>
        Back to home page
      </Link>
    </div>
  )
}

export default NotFound
