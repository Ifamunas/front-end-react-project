/* eslint-disable prettier/prettier */
import Carousel from 'react-bootstrap/Carousel'

function CarouselComponent() {
  return (
    <section>
      <Carousel data-bs-theme="light">
        <Carousel.Item>
          <img className="d-block w-100" src="src\images\slide1.avif" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="src\images\slide2.avif" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="src\images\slide3.avif" alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </section>
  )
}

export default CarouselComponent
