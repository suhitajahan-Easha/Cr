import React, {createContext, useEffect, useState} from "react";


export const ShopContext = createContext(null);
   
const getDefultCart=()=>{
        let cart ={};
        for (let index = 0; index < 300+1; index++) {
             cart[index]=0;  
        }
        return cart;
      }


const ShopContextProvider = (props) =>{

    const [all_product,setAll_products]=useState([]);
    const [cartItems,setcartItems]=useState(getDefultCart())

    useEffect(()=>{
        fetch('http://crimson-backend-anwo.onrender.com/allproducts')
        .then((response)=>response.json()).then((data)=>setAll_products(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://crimson-backend-anwo.onrender.com/getdata',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
             })
             .then((response)=>response.json())
             .then((data)=>setcartItems(data));
        }
    },[])

    
    const addToCart=(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        
        if(localStorage.getItem('auth-token')){
            fetch('http://crimson-backend-anwo.onrender.com/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
             })
             .then((response)=>response.json())
             .then((data)=>console.log(data));
        }
    }

    const removefromCart=(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-prev[itemId]}));
        if(localStorage.getItem('auth-token')){
            fetch('http://crimson-backend-anwo.onrender.com/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
             })
             .then((response)=>response.json())
             .then((data)=>console.log(data));
        }
    }
    const decresefromCart=(itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }

    const getTotalamount=()=>{
        let totalamount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo= all_product.find((product)=>product.id===Number(item));
                totalamount =totalamount+itemInfo.new_price * cartItems[item];
            } 
        }
        return totalamount;
    }

    const getTotalitem=()=>{
        let totalitem=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalitem =totalitem+cartItems[item];
            }
        }
        return totalitem;
    }
    
    const ContextValue={all_product,cartItems,addToCart,removefromCart,getTotalamount,getTotalitem,decresefromCart};
    return(
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
