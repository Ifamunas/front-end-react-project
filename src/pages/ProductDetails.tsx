/* eslint-disable prettier/prettier */
import { useEffect } from 'react'

import { FaArrowLeft } from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import { findProductById } from '../redux/slices/products/productSlice'

import { AppDispatch, RootState } from '../redux/store'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

function ProductDetails() {
  const { id } = useParams()
  const { singleProduct, isLoading, error } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(findProductById(Number(id)))
  }, [id])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => parseInt(category.id, 10) == categoryId)
    return category ? category.name : 'category not found'
  }

  return (
    <div className="product-details">
      <Card style={{ width: '100rem' }}>
        <Card.Img variant="top" src={singleProduct.image} alt={singleProduct.name} />
        <Card.Body>
          <Card.Title>{singleProduct.name}</Card.Title>
          <Card.Text>{singleProduct.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            {singleProduct.price}
            {' SAR'}
          </ListGroup.Item>
          <ListGroup.Item>
            {singleProduct.categories &&
              singleProduct.categories.map((categoryId: number) => (
                <span key={categoryId}>
                  {'*'}
                  {getCategoryName(categoryId)}{' '}
                </span>
              ))}
          </ListGroup.Item>
          <ListGroup.Item>
            {singleProduct.variants &&
              singleProduct.variants.map((itemVariant, index) => (
                <Button variant="light" key={index}>
                  {itemVariant}
                </Button>
              ))}
          </ListGroup.Item>
          <ListGroup.Item>
            {singleProduct.sizes &&
              singleProduct.sizes.map((itemSize, index) => (
                <Button variant="light" key={index}>
                  {itemSize}
                </Button>
              ))}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="secondary" onClick={() => navigate('/')}>
              <FaArrowLeft /> Continue Shopping
            </Button>{' '}
            <Button variant="primary">Add to Cart</Button>{' '}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default ProductDetails
