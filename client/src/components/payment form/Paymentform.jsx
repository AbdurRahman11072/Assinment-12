import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAuth from "../Hooks/useAxiosSecure";



const PaymentForm = ({employee}) => {
    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const {user} = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAuth()
    const navigate = useNavigate()
    console.log(employee.salary);
    useEffect(()=>{
        if(employee.salary > 0){
            axiosSecure.post('/create-payment-intent', {salary: employee.salary})
            .then(res =>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,employee.salary ])


    const handleSubmit = async(e) =>{
        e.preventDefault()
        const form = e.target 
        const month = form.month.value
        const year = form.year.value 
        console.log(month,year);
        
        const res = await axiosSecure.get('/payments')
          const filterPayment = res.data.filter(userPayment => userPayment.email === employee.email)
          const findMonth = filterPayment.find(paymentMonth => paymentMonth.month === month)

          if(findMonth?.month == month){
            return toast.error("Already Pay!")
          }
          else{
            if (!stripe || !elements) {
              return;
            }
            const card = elements.getElement(CardElement);
            if (card == null) {
              return;
            }
            const {error, paymentMethod} = await stripe.createPaymentMethod({
              type: 'card',
              card,
            });
  
            if (error) {
              console.log('[error]', error);
              setError(error.message)
            } else {
              console.log('[PaymentMethod]', paymentMethod);
              setError("")
            }
  
            const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: card,
                billing_details: {
                  name: employee?.name || 'Anonymous',
                  email: employee?.email || 'Anonymous'
                },
              },
            })
            if(confirmError){
              console.log('confirm Error',confirmError.message);
            }
            else{
              console.log('payment Intent ', paymentIntent);
              if(paymentIntent?.status === 'succeeded'){
                  
                  const payment = {
                      email: employee.email,
                      salary: employee.salary,
                      month: month,
                      year: year,
                      transactionId: paymentIntent.id,
                      date: new Date(), //Todo: utc date convert using moment js
                      status: 'pending'
                  }
                  const res = await axiosSecure.post('/payments', payment)
                  if(res.data?.insertedId){
                      toast.success("Payment Successful!")
                      navigate('/dashboard/hrHome')
                   }
            }
      }
          }



        
}
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <CardElement 
                    options={{
                    style: {
                        base: {
                        fontSize: '14px',
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
                </div>
                <div className=" my-4 flex gap-1">
                    <select
                        className="select select-primary w-full"
                        name="month"
                        required 
                        >
                        <option  disabled selected>
                            Month
                        </option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                    
                    <input className="input input-primary w-full"
                        type="number"
                        name="year"
                        placeholder="YYYY"
                        maxLength="4"

                    required />
                </div>
                
                <button type="submit" disabled={!stripe || !clientSecret } className="btn btn-sm btn-success text-white my-5">$Pay</button>
                <p className="text-red-600">{error}</p>
            </form>
        </div>
    );
};

export default PaymentForm;