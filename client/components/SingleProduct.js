import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export function SingleProduct(props){
  return (
    <div>
    <h1>Single Product Page</h1>
      {
        //logic to not run for now
        1 === 11 && props.activeProduct.map(product => {
          return (
            <div  key={product.id}>
              <img src={product.imgUrl} />
              <h1>{product.name}</h1>
              <h2>{product.description}</h2>
              <h3>{product.price}</h3>
              <h4>{product.quantity}</h4>
              <h5>{product.catagories}</h5>
            </div>
          )
        })
      }
    </div>
  )
}

const mapProps = state => ({
  products: state.activeProduct
})

const Container = connect(mapProps)(SingleProduct)

export default Container
