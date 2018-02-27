import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


export function Cart(props){
  return (
    <h1>Cart</h1>
  )
}

const mapProps = state => ({
})

const Container = connect(mapProps)(Cart)

export default Container
