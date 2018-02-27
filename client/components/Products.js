import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {SearchBar, ProductSelector} from './index'


export function Products(props){
  return (
    <div>
    <h1> all the products</h1>
    <div className="flex">
      <SearchBar />
      <ProductSelector />
    </div>
      {
        //logic to not run for now
        1 === 11 && props.products.map(product => {
          return (
            <h1 key={product.id}>{product.name}</h1>
          )
        })
      }
    </div>
  )
}

const mapProps = state => ({
  products: state.products
})

const Container = connect(mapProps)(Products)

export default Container

