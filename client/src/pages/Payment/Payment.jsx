import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './Checkoutform';



const stripePromise = loadStripe('pk_test_51OJ23dBHGqDOqm4OWe4ToXLczLjDE0jHsEni69TDD5efvJcGN1xuN3DLtXA766HnqAfYTXL321xwFWzQD9yfBMHT00etzbewY0');
const Payment = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold'>Payment</h1>
            <div>
                <Elements stripe={stripePromise}>
                   <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
            
        </div>
    )
}

export default Payment