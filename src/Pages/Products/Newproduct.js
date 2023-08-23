import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios';
import './Newproduct.style.css';
import { useCreateProductMutation } from '../../Services/AppApi';
import { Alert } from 'react-bootstrap';

const Newproduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imgToRemove, setImgToRemove] = useState(null);
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const [createProduct, { isError, isLoading, isSuccess, error }] = useCreateProductMutation();

    const handleRemoveImg = (imgObj) => {
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((response) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images })
        .then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    const ShowWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'urbanhunters',
                uploadPreset: 'Upload',
            },
            (error, result) => {
                if (!error && result.event === 'success') {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    };

  return (
    <>
    <div className='New-Product-Class-for-Container-Center'>
    <div className='New-Product-Container'>
    <form onSubmit={handleSubmit}>
    <h4>Create Product</h4>
    {isSuccess && <Alert variant='success'>Product Created with success</Alert>}
    {isError && <Alert variant='danger'>{error.data}</Alert> }
    <label className='New-Product-Form-Labels'>Product Name</label>

    <input
                         type='text' 
                        placeholder='Enter Product Name' 
                        value={name}
                        name='name'
                        onChange={(e)=>setName(e.target.value)}
                        required 
                        className='New-Product-Input-Bar'
    />

      <label className='New-Product-Form-Labels'>Product Description</label>

                      <textarea
                        placeholder='Enter Product Description'
                        value={description}
                        name='description'
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='New-Product-Input-Bar'
                        rows={4}
                      />


<label className='New-Product-Form-Labels'>Product Price($)</label>

<input
                    type='number' 
                    placeholder='Price($)' 
                    value={price}
                    name='name'
                    onChange={(e)=>setPrice(e.target.value)}
                    required 
                    className='New-Product-Input-Bar'
/>


    <div onClick={(e) => setCategory(e.target.value)}>
    <label className='New-Product-Form-Labels'>
                    Category
    </label>
    <select  id='new-product-category-selection'>              
                            <option disabled selected>
                            -- Select One --
                        </option>                        
                                <option value="Iphone">Iphone</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Watch">Watch</option>    
    </select>
    </div>

   
    <button type='button' className='New-Product-Form-Button' 
                                  onClick={ShowWidget}>
       Upload Images
    </button>
    <div className='Images-Preview-Container'>
      {images.map(image => (
        <div className='Image-Preview'>
          <img src={image.url} alt='Not-Found' />
          {/* Add Icon for removing */}
          {imgToRemove !==  image.public_id && 
          <i className='fa fa-times-circle' onClick={()=>handleRemoveImg(image)}></i>}
        </div>
      ))}
    </div>

    <button type='submit' disabled={isLoading || isSuccess } className='New-Product-Form-Button'>
       Create Product
    </button>
    </form>
    </div>
    </div>
    </>
  
  )
}

export default Newproduct
