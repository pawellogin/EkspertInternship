import React, { useState }from 'react'
import AuthService from '../services/AuthService';
import ProductService from '../services/ProductService';

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);

  const handleAddNewProduct = async(e) => {
    e.preventDefault();
    try {
      const response = await ProductService.PostProduct(image, name, price, stock);
      console.log(response.data);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <>
    <section>
      <h1>Add new product</h1>
      <form on onSubmit={handleAddNewProduct}>
        <label>Name:</label>
        <input
          className='form-control'
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Price</label>
        <input
          className='form-control'
          type='number'
          step='0.01'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Stock</label>
        <input
          className='form-control'
          type='number'
          step='0.01'
          id='stock'
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <label>Image:</label>
        <input
          className='form-control'
          type='file'
          id='image'
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className='btn btn-secondary' type='submit'>Add</button>
      </form>
    </section>
    </>
  )
}

export default AddProductPage