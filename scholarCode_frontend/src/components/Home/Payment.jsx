import React from 'react'

const Payment = () => {
    //Function to load razorpay script for the display of razorpay payment SDK.
  function loadRazorpayScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

//function will get called when clicked on the pay button.
async function displayRazorpayPaymentSdk() {
  const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
  }

  // creating a new order and sending order ID to backend
  const result = await axios.post("http://127.0.0.1:8000/course/razorpay_order/", {
      "order_id" : "Order-5152"
  });

  if (!result) {
      alert("Server error. please check are you online?");
      return;
  }

  // Getting the order details back
   const {merchantId=null , amount=null,currency=null,orderId=null } = result.data;

  const options = {
      key: merchantId,
      amount: amount.toString(),
      currency: currency,
      name: "Razorpay Testing",
      description: "Test Transaction",
      image:'',
      order_id: orderId,
      callback_url: "http://127.0.0.1:8000/course/razorpay_callback/",
      redirect: true,
      prefill: {
        name: "Swapnil Pawar",
        email: "swapnil@example.com",
        contact: "9999999999",
    },
      notes: {
          address: "None",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
  return (
    <div>
        <img src='' className="App-logo" alt="logo" />
        <p>Razorpay Payments ! Try it Once </p>
        <button className="App-link" onClick={displayRazorpayPaymentSdk}>
            Pay Now To Test
        </button>


    </div>
  )
}

export default Payment