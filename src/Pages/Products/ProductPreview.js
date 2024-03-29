import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ProductPreview = ({_id,category,name,pictures}) => {
  return (
    <div>
        <LinkContainer  to={`/product/${_id}`} style={{
                        cursor:'pointer', width:'13rem' , margin:'10px'}}> 

            <Card style={{
                            width:'20rem', margin:'10px' ,
            }}>
            {pictures && pictures.length > 0 && pictures[0].url &&(
         <Card.Img
                        variant='top'
                        className='product-preview-img'
                        src={pictures[0].url}
                        style={{
                          height: '150px',
                          objectFit: 'cover'
                        }}
          />
)}

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Badge bg='warning' text='dark' >
                                    {category}
                </Badge>
            </Card.Body>
            </Card>

        
        </LinkContainer>
    </div>
  )
}

export default ProductPreview
