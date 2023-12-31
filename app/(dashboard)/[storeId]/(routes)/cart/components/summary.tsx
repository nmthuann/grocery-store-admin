// "use client";

// import axios from "axios";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// import CustomButton from "@/components/ui/custom-button";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
// import { toast } from "react-hot-toast";

// const Summary = () => {
//     const searchParams = useSearchParams();
//     const items = useCart((state) => state.items);
//     const removeAll = useCart((state) => state.removeAll);

//     useEffect(() => {
//         if (searchParams.get("success")) {
//             toast.success("Payment completed.");
//             removeAll();
//         }

//         if (searchParams.get("canceled")) {
//             toast.error("Something went wrong.");
//         }
//     }, [searchParams, removeAll]);

//     const totalPrice = items.reduce((total, item) => {
//         return (
//             total + Number(item.product.prices[0].unitPrice) * item.cartQuantity
//         );
//     }, 0);

//     const onCheckout = async () => {
//         toast.success("Payment completed.");
//     };

//     return (
//         <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//             <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
//             <div className="mt-6 space-y-4">
//                 <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                     <div className="text-base font-medium text-gray-900">
//                         Tổng tiền
//                     </div>
//                     <Currency value={totalPrice} />
//                 </div>
//             </div>
//             <CustomButton
//                 onClick={onCheckout}
//                 disabled={items.length === 0}
//                 className="w-full mt-6"
//             >
//                 Thanh Toán
//             </CustomButton>
//         </div>
//     );
// };

// export default Summary;
import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CustomButton from "@/components/ui/custom-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

const Summary = () => {
    // const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const updateQuantity = useCart((state) => state.updateQuantity);

    // useEffect(() => {
    //     if (searchParams.get("success")) {
    //         toast.success("Payment completed.");
    //         removeAll();
    //     }

    //     if (searchParams.get("canceled")) {
    //         toast.error("Something went wrong.");
    //     }
    // }, [searchParams, removeAll]);

    const onQuantityChange = (productId: string, newQuantity: number) => {
        updateQuantity(productId, newQuantity);
    };

    // const totalPrice = items.reduce((total, item) => {
    //     return (
    //         total + Number(item.product.prices[0].unitPrice) * item.cartQuantity
    //     );
    // }, 0);
    const totalPrice = useMemo(() => {
        return items.reduce(
            (total, item) =>
                total +
                Number(item.product.prices[0].unitPrice) * item.cartQuantity,
            0
        );
    }, [items]);

    const onCheckout = async () => {
        removeAll();
        toast.success("Payment completed.");
    };

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Giá trị đơn hàng
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Tổng tiền
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <CustomButton
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full mt-6"
            >
                Thanh Toán
            </CustomButton>
        </div>
    );
};

export default Summary;
