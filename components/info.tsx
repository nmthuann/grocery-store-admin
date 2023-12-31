"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
// import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import CustomButton from "./ui/custom-button";
import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
    const cart = useCart();

    const [quantity, setQuantity] = useState(1);

    const onAddToCart = () => {
        cart.addItem(data);
        //toast.success(`Added ${quantity} items to cart.`);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.prices[0].unitPrice} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Đơn vị:</h3>
                    <div>{data?.unit}</div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Thương hiệu:</h3>
                    {/* <div
                        className="h-6 w-6 rounded-full border border-gray-600"
                        // style={{ backgroundColor: data?.color?.value }}
                    /> */}
                    <div>{data?.brand.name}</div>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                    <Button onClick={decreaseQuantity}>-</Button>
                    <div>{quantity}</div>
                    <Button onClick={increaseQuantity}>+</Button>
                </div>
                <CustomButton
                    onClick={onAddToCart}
                    className="flex items-center gap-x-2"
                >
                    Add To Cart
                    <ShoppingCart size={20} />
                </CustomButton>
            </div>
        </div>
    );
};

export default Info;
