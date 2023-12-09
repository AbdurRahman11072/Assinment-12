import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../components/Hooks/useAxiosSecure';



const CheckOutForm = () => {
   
    const stripe = useStripe();
    
    const elements = useElements();
    const {user} = useContext(AuthContext)
    const[userEmail,setEmail] = useState(user?.email)
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [paymentError, setPaymentError] = useState(null);   
    const navigation = useNavigate() 
    const axiosSecure = useAxiosSecure();
    const price =parseInt('200')*100
    useEffect(()=>{
       const data={price}
            axiosSecure.post('/create-payment-intent',data )
            .then(res =>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
       
    },[axiosSecure])

  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement);
  
      if (!card) {
        return;
      }
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.error(error);
        setPaymentError(error.message || "An error occurred during payment.");
      } else {
        setPaymentError(null);
        console.log('Payment Method', paymentMethod);
      }


      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if (confirmError) {
        console.log('confirm error')
    }
    else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);
            fetch(`https://server-pi-blush-73.vercel.app/user`)
            .then(res =>res.json())
            .then(data =>{
                const filteruser =data?.find(data => data.email ==user?.email)
                const id=filteruser._id
               const name= filteruser.name;
               const email= filteruser.email;
               const photo = filteruser.photo;
               const access =filteruser.access;
               const status = "Prime"
               const userAccess={
                name,email,photo,access,status}
                console.log(userAccess);

                fetch(`https://server-pi-blush-73.vercel.app/user/${id}`,{
                    method:"PUT",
                    headers:{
                        'content-type': 'application/json'
                    },
                    body : JSON.stringify(userAccess)
                   })
                    .then(res => res.json())
                
                        .then (data => {
                          toast(`Enjoy the top quility Support with Prime`)
                          navigation("/dashboard/addproduct")
                         
                        })
            })
         

        }
    }

const facku =()=>{
    console.log(user?.email);
}
    const userHandler = () =>{
       
      
   
    
    
   
            
    
     }


    }
  
    return (
    <div>
          <form onSubmit={handleSubmit} className='mt-5'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        <button
          type="submit" 
          className="w-28 h-12 border-2 border-[#a0e9ff] rounded-xl mt-5 bg-[#a0e9ff] font-bold"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
       
      </form>
      <Toaster position="top-right" reverseOrder={false}/>
    </div>
    );
  };
  

export default CheckOutForm