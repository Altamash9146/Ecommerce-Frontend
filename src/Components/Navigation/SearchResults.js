import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../Axios';
import ProductPreview from '../../Pages/Products/ProductPreview';
import Navigation from './Header';
import FontAwesome from './FontAwesome';
import './ResNav.style.css'
import './SearchResult.css'

const SearchResults = () => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('term');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/search/${searchTerm}`)
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [searchTerm]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
       <>
        <Navigation/>
        <FontAwesome/>
        <div className='Search-product-Container'>
          {products.map((product) => (
            <div key={product._id} className='Product-Preview-Wrapper'>
              <ProductPreview {...product} />
            </div>
          ))}
        </div>
       </>
      )}
    </div>
  );
};

export default SearchResults;
