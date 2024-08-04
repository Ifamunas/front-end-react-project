/* eslint-disable prettier/prettier */
import { ChangeEvent, useState } from 'react'

import { FaSistrix } from 'react-icons/fa'

import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'

import { searchProduct } from '../redux/slices/products/productSlice'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function SearchBar() {
  const dispatch: AppDispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    dispatch(searchProduct(inputValue))
  }

  const handleSearch = () => {
    dispatch(searchProduct(inputValue))
  }

  return (
    <InputGroup>
      <Button
        variant="outline-secondary"
        id="button-addon1"
        aria-label="search-button"
        onClick={handleSearch}>
        <FaSistrix></FaSistrix>
      </Button>
      <Form.Control
        aria-label="search-field"
        aria-describedby="search search-field"
        placeholder="What are you looking for?"
        value={inputValue}
        onChange={handleChange}
      />
    </InputGroup>
  )
}

export default SearchBar
