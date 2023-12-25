import React, { Component } from 'react'
import loading from './loading.gif'

//.center {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   text-align: center;
// }
export default class Spinner extends Component {
  render() {
    return (
      <div className='center-spinner'>
        <img src={loading} alt="loading.gif"></img>
      </div>
    )
  }
}
