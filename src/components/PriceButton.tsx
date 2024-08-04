/* eslint-disable prettier/prettier */
import { useDispatch } from 'react-redux'

import { AppDispatch} from '../redux/store'
import { sortProductsByPrice } from '../redux/slices/products/productSlice'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function PriceButton() {
  const dispatch: AppDispatch = useDispatch()

  const handleSort = (value: string) => {
    dispatch(sortProductsByPrice(value))
  }

  return (
    <DropdownButton id="dropdown-item-button" title="Sort by Price" variant="secondary">
      <Dropdown.Item as="button" onClick={() => handleSort('high')}>
        Highest to lowest
      </Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleSort('low')}>
        Lowest to highest
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default PriceButton
