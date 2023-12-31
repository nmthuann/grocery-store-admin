"use client";

import { ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CustomButton from "@/components/ui/custom-button";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
// import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    const params = useParams();

    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Link href={`/${params.storeId}/cart`} passHref>
                <CustomButton className="flex items-center rounded-full bg-black px-4 py-2">
                    <ShoppingBag size={20} color="white" />
                    <span className="ml-2 text-sm font-medium text-white">
                        {cart.items.length}
                    </span>
                </CustomButton>
            </Link>
        </div>
    );
};

export default NavbarActions;
