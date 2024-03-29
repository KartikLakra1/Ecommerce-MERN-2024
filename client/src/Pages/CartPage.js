import React from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    // remove item
    const removeItem = (pid) => {
        try {
            let mycart = [...cart];
            let index = mycart.findIndex(item => item._id === pid);
            mycart.splice(index, 1);
            setCart(mycart);
            localStorage.setItem('cart', JSON.stringify(mycart));
        } catch (error) {
            console.log(error);
        }
    }

    // total Prices
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            })
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-4 w-[100%] bg-gradient-to-tr from-slate-950 to-slate-900">
                <div className="w-[100%]">
                    <h1 className="text-center text-2xl capitalize text-white">Hello {`${auth?.token && auth?.user?.name}`}</h1>
                    <h2 className="text-center text-xl text-white">{cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your cart is empty"}</h2>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-5 gap-12 w-[100%] pr-14 pl-14">
                    <div className="lg:basis-[60%]">
                        <div className="grid justify-around items-center grid-cols-1 lg:grid-cols-2 gap-3">
                            {
                                cart?.map(p => (
                                    <div key={p._id} className="grid items-center justify-center gap-8">
                                        <div className="shadow-xl border-black hover:shadow-sm p-2 grid text-center w-[100%] h-fit bg-white">
                                            <div className="flex items-center justify-center p-3">
                                                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="flex justify-center items-center w-64 h-auto text-center" />
                                            </div>

                                            <h3 className="p-2 text-red-800">{p.name}</h3>
                                            <p>{p.description.substring(0, 30)}...</p>
                                            <p className="font-bold text-left pl-4">$ {p.price}</p>
                                            <button className="bg-red-900 text-white p-2 my-1 font-semibold" onClick={() => removeItem(p._id)}>Remove</button>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>
                    </div>
                    <div className="lg:basis-[35%] lg:mt-3 bg-slate-50">
                        <h2 className="text-center text-3xl font-bold">CART SUMMARY</h2>
                        <h3 className="text-center text-xl font-semibold pb-3">Total | Checkout | Payment</h3>
                        <hr></hr>
                        <h1 className="text-center text-xl mt-2 font-mono font-bold">Total : {totalPrice()}</h1>
                        {
                            auth?.user?.address ? (
                                <div className="flex items-center justify-center flex-col mt-2 mb-2
                                ">
                                    <h4>Current Address </h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="bg-yellow-500 p-2 font-bold rounded-lg hover:bg-yellow-400" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </div>

                            ) : (
                                <div className="flex items-center justify-center flex-col mt-2 mb-2
                                ">
                                    {auth?.token ? (
                                        <button className="bg-yellow-500 p-2 font-bold rounded-lg hover:bg-yellow-400" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    ) : (
                                        <button className="bg-yellow-500 p-2 font-bold rounded-lg hover:bg-yellow-400" onClick={() => navigate("/login", { state: '/cart' })}>Please Login to checkout</button>
                                    )
                                    }

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default CartPage;
