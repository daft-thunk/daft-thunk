import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ProductCard = (props) => (
  <Card>
    <Image src={props.product.imageUrl} />
    <Card.Content>
      <Card.Header>
        {props.product.name}
      </Card.Header>
      <Card.Meta>
        <span>
          category
        </span>
      </Card.Meta>
      <Card.Description>
      {props.product.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='dollar' />
        {props.product.price}
      </a>
    </Card.Content>
  </Card>
)

export default ProductCard
