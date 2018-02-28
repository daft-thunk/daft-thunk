import React from 'react'
import {connect} from 'react-redux'

export function SingleProduct(props){
  return (
    <div>
    <h1>Single Product Page</h1>
    </div>
  )
}

const mapProps = state => ({
  products: state.activeProduct
})

const Container = connect(mapProps)(SingleProduct)

export default Container
