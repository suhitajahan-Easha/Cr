import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
    const [image,setImage]=useState(false);
    const [productDetails,setproductDetails]=useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:""
    })

    const imagehandler=(e)=>{
         setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
        setproductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_product=async()=>{
        let responseData;
        let product=productDetails;

        let formData=new FormData();
        formData.append('product',image);

        await fetch('http://crimson-backend-anwo.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',

            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if (responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch('http://crimson-backend-anwo.onrender.com/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("product added"):alert("failed")
            })
        }
    
    }

  return (
    <div className='AddProduct'>
        <div className="addProduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here'/>
        </div>
        <div className="addproduct-price">
            <div className="addProduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
            </div>
            <div className="addProduct-itemfield">
                <p> Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
            </div>
        </div>   
        <div className="addProduct-itemfield">
            <p> Product Category</p>
            <select onChange={changeHandler} value={productDetails.category} name="category" className='add-product-selector' id="">
                 <option value="women">Women</option>
                 <option value="men">Men</option>
                 <option value="kid">Kids</option>
            </select>
        </div>
        <div className="addProduct-itemfield">
            <label htmlFor="file-input">
                <img src={image? URL.createObjectURL(image):upload_area} alt="" className='addproduct-image' />
            </label>
            <input onChange={imagehandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={Add_product} className='addproduct-button'>ADD</button>
    </div>
  )
}

export default AddProduct
