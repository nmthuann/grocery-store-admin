"use client";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface CartItemProps {
    data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    // const cart = useCart();

    // const onRemove = () => {
    //     cart.removeItem(data.id);
    // };
    // const [quantityInCart, setQuantityInCart] = useState(0);
    // useEffect(() => {
    //     const itemInCart = cart.items.find(
    //         (item) => item.product.id === data.id
    //     );
    //     setQuantityInCart(itemInCart?.cartQuantity || 0);
    // }, [cart.items, data.id]);
    // console.log("quantityInCart", quantityInCart);

    // const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuantity = parseInt(e.target.value, 10) || 0;
    //     setQuantityInCart(newQuantity);
    // };

    const cart = useCart();
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const itemInCart = cart.items.find(
            (item) => item.product.id === data.id
        );
        const currentQuantityInCart = itemInCart?.cartQuantity || 0;
        setQuantityInCart(currentQuantityInCart);

        // Tính tổng giá của sản phẩm
        const currentTotalPrice =
            data.prices[0].unitPrice * currentQuantityInCart;
        setTotalPrice(currentTotalPrice);
    }, [cart.items, data.id, data.prices]);

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;
        setQuantityInCart(newQuantity);

        // Tính tổng giá khi thay đổi số lượng
        const newTotalPrice = data.prices[0].unitPrice * newQuantity;
        setTotalPrice(newTotalPrice);

        // Cập nhật số lượng trong giỏ hàng
        cart.updateQuantity(data.id, newQuantity);
    };
    return (
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt=""
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className=" text-lg font-semibold text-black">
                            {data.name}
                        </p>
                        <p className="text-gray-500">
                            Quantity: {quantityInCart}
                        </p>
                        <Input
                            type="number"
                            value={quantityInCart}
                            onChange={onQuantityChange}
                            className="border p-1 ml-2 text-center w-16"
                        />
                    </div>

                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data.category.name}</p>
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                            {data.brand.name}
                        </p>
                    </div>
                    <Currency value={data.prices[0].unitPrice} />
                    {/* <p>Tổng giá mỗi sản phẩm:</p>
                    <Currency value={totalPrice} /> */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">Tổng giá:</p>
                        <Currency value={totalPrice} />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
