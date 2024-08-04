/* eslint-disable prettier/prettier */

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategory } from '../redux/slices/categories/categoriesSlice'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import PaginationComponent from './PaginationComponent'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PriceButton from './PriceButton'

function GridLayout() {
  const { items, isLoading, error, searchTerm } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  const handleCheckedCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prevCategories) => prevCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories((prevCategories) => [...prevCategories, categoryId])
    }
  }

  const filteredProducts = items.filter((product) => {
    const productName = product.name.toLowerCase()
    const isSearched = searchTerm === '' || productName.includes(searchTerm.toLowerCase())
    const isFilteredByCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((id) => product.categories.includes(id))

    return isSearched && isFilteredByCategory
  })

  return (
    <section className="render">
      <Container>
        <Row>
          <h2>Best Sellers</h2>
          <Col className="col1">
            <PriceButton />
          </Col>
          <Col className="col2">
            <p>{`${items.length} Products Available`}</p>
          </Col>
        </Row>
        <Row className="row2">
          <Col className="category-section">
            <Form className="category">
              {categories.length > 0 &&
                categories.map((category) => (
                  <div key={category.id} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={category.id}
                      label={category.name}
                      onChange={() => {
                        handleCheckedCategory(parseInt(category.id, 10))
                      }}
                    />
                  </div>
                ))}
            </Form>
          </Col>
          <Col className="products-section">
            {filteredProducts.length > 0 &&
              filteredProducts.map((item) => {
                return (
                  <div key={item.id}>
                    <Card style={{ width: '15rem' }}>
                      <Card.Img variant="top" src={item.image} alt={item.name} />
                      <Card.Body>
                        <Card.Title className="h5" as={Link} to={`products/${item.id}`}>
                          {item.name}
                        </Card.Title>
                        <Card.Text> {item.description}</Card.Text>
                        <p>
                          <strong>
                            {item.price}
                            {' SAR'}
                          </strong>
                        </p>
                        <Button variant="primary">Add to Cart</Button>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}
          </Col>
        </Row>
        <Row className="row3">
          <PaginationComponent />
        </Row>
      </Container>
    </section>
  )
}

export default GridLayout
