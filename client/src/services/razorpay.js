import toast from "react-hot-toast"
import { createRazorpayOrder, verifyRazorpayPayment } from "./payment";

import { clearBuy, clearCart } from "../features/cartSlice";
// import { createOrder, removeOrder } from "../features/orderSlice";
import {createCheckout, removeCheckout} from "./checkout"

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


const displayRazorpay = async (loadingg, setLoadingg, products, inputData, subTotal, shipping, totalPrice, tax, paymentMethod, navigate, dispatch, location) => {

  try {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      setLoadingg(false);
      toast.error("Failed to load Razorpay.");
      return;
    }

    const checkoutData = await createCheckout({products, inputData, subTotal, shipping, totalPrice, tax, paymentMethod});

    // console.log("checkoutData", checkoutData);
    

    const razorpayOrderData = await createRazorpayOrder(checkoutData._id);

    // console.log("razorpayOrderData", razorpayOrderData);

    const options = {
      "key": import.meta.env.VITE_BASE_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      "amount": razorpayOrderData.amount, // Amount is in currency subunits. 
      "currency": razorpayOrderData.currency,
      "name": "STYQLO",
      "description": "Order Transaction",
      "image": "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
      "order_id": razorpayOrderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": async (response) => {
        try {
          const verify = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })

          // console.log(verify);
          
          if (verify.success) {

            if (location.state?.from === "cart")
              await dispatch(clearCart());
            
            await dispatch(clearBuy());
            
            navigate("/payment/success", {
              state: {
                from: "checkout"
              }
            });
          } else {
            navigate("/payment/pending", {
              state: {
                from: "checkout"
              } 
            });
          }

        } catch (error) {
          console.error(error);
          navigate("/payment/pending", {
            state: {
              from: "checkout"
            }
          });
        } finally {
          setLoadingg(false);
        }

      },
      "modal": {
        ondismiss() {
          const callRemove = async () => {
            await removeCheckout(checkoutData._id);
          }
          setLoadingg(false);
          callRemove();
          toast.error("Payment cancelled.");
        }
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#E7A9A2"
      }
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", async (response) =>  {
      setLoadingg(false);

      // const res = 
      
      toast.error(response.error.description);

      console.error(response.error);
    });

    paymentObject.open();
    //   console.log(paymentObject);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
    setLoadingg(false);
  }

}

export { displayRazorpay }