import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const instruments = [
  {text: 'Guitars', value:'guitar', image: {avatar: true, src: 'https://www.martinguitar.com/media/8543/d-21_f_1195x3000.jpg'}},
  {text: 'Drums', value:'drums', image: {avatar: true, src: 'https://media.sweetwater.com/api/i/q-85__ha-ce2db444639bd1df__hmac-82d5db78c0f90ca5fe3703aaffac501fe9f5285d/images/items/1800/DRKT45A-xlarge.jpg'}},
  {text: 'Keyboards', value:'keyboards', image: {avatar: true, src: 'http://cdn.korg.com/us/products/upload/07f508b5f9824e683525f2d6cbc087f8_pc.png'}},
  {text: 'Bass Guitars', value:'bases', image: {avatar: true, src: 'http://media.guitarcenter.com/is/image/MMGS7/Standard-Precision-Bass-Guitar-Brown-Sunburst-Rosewood-Fretboard/H76524000002001-00-500x500.jpg'}},
  {text: 'Amps', value:'amps', image: {avatar: true, src: 'https://media.sweetwater.com/images/items/750/DSL40C-large.jpg?v=130c2b3cd44c4ab0'}},
]


const ProductSelector = () => (
  <Dropdown onChange={(event, data) => console.log(data.value)} placeholder="Select Catagory" fluid selection options={instruments} />
)

export default ProductSelector
