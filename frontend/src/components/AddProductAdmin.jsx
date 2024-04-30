import React, { useState }from 'react'
import ProductService from '../services/ProductService';
import '../styles/AddProductAdmin.css'

const AddProductAdmin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(null);
  const [errorMassage, setErrorMassage] = useState("");
  const [showProductAddedSuccessfully, setShowProductAddedSuccessfully] = useState(false);
  const [showProductAlreadyInDatabase,setShowProductAlreadyInDatabase] = useState(false);

  const handleAddNewProduct = async(e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      setErrorMassage("Please fill in all the fields");
      setTimeout(() => {
        setErrorMassage("");
      },1000)
      return;
    }

    try {
      const response = await ProductService.postProduct(image, name, price, stock);
      setShowProductAddedSuccessfully(true);
      setTimeout(() => {
        setShowProductAddedSuccessfully(false);
      },1000)
    }catch(error){
        if(error.response?.status === 409) {
          setErrorMassage("Product already is in database");
          setTimeout(() => {
            setErrorMassage("");
          },1000)
        }else{
          console.error("Error while adding new product",error);
          setErrorMassage("Error while adding new product");
        }
    }
  }

  return (
    <section className='add-product-admin'>
      <h1>Add new product</h1>
      <form onSubmit={handleAddNewProduct}>
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

        {/* <label>Image:</label>
        <input
          className='form-control'
          type='file'
          id='image'
          onChange={(e) => setImage(e.target.files[0])}
        /> */}

        <div className='add-product-admin-submit'>
          {showProductAddedSuccessfully ? 
          (
            <div className="btn btn-secondary add-product-admin-alert-submitted">Added!</div>
          ):
          (
            <button className='btn btn-secondary add-product-admin-submit-button' type='submit'>Add</button>
          )}
        </div>
      </form>
      
      {errorMassage && (
          <div className="alert alert-danger add-product-admin-alert-taken" role="alert">
            {errorMassage}
          </div>
        )}
    </section>
  )
}

export default AddProductAdmin