import React, { Component } from 'react'
import loading from "./loading.gif"
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-3'>
        <img style={{width:"50px", heigth:"70px"}} src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner