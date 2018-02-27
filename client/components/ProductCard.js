import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const ProductCard = () => (
  <Card>
    <Image src='/images/default-product.png' />
    <Card.Content>
      <Card.Header>
        Product name
      </Card.Header>
      <Card.Meta>
        <span>
          Category
        </span>
      </Card.Meta>
      <Card.Description>
        Product info
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='dollar' />
        22.56
      </a>
    </Card.Content>
  </Card>
)

export default ProductCard
