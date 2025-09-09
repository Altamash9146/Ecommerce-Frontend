import React from 'react'
import { Button, Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Dashboardproduct.css'
import { useDeleteProductMutation } from '../../../Services/AppApi'

const DashboardProducts = () => {
    const products = useSelector((state) => state.products)
    const user = useSelector((state) => state.user)
    const [deleteProduct, {isLoading}]  = useDeleteProductMutation()
    // for removing the product
    
    const handleDelete = (id)=>{
        if(window.confirm('Are you sure')) deleteProduct({product_id: id, user_id: user._id})
    }



  return (
    <Table striped bordered hover responsive >
        <thead>
            <tr>
                <th></th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Actions</th>
            </tr>
        </thead>
        <tbody>
  {products.map((product) => (
    <tr key={product._id}>
      <td>
        {product.pictures && product.pictures.length > 0 && product.pictures[0].url && (
          <img
            alt='Not-Found'
            src={product.pictures[0].url}
            className='dashboard-product-preview'
          />
        )}
      </td>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <Button onClick={() => handleDelete(product._id, user._id)} disabled={isLoading} >Delete</Button>
        <Link to={`/product/${product._id}/edit`} className='btn btn-warning'>
          Edit
        </Link>
      </td>
    </tr>
  ))}
</tbody>

    </Table>
  )
}

export default DashboardProducts
