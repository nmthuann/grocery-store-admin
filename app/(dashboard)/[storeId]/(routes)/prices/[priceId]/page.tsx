import prismadb from "@/lib/prismadb";

import { PriceForm } from "./components/price-form";

const PricePage = async ({
    params,
}: {
    params: { priceId: string; storeId: string };
}) => {
    const price = await prismadb.price.findUnique({
        where: {
            id: params.priceId,
        },
    });

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PriceForm initialData={price} products={products} />
            </div>
        </div>
    );
};

export default PricePage;
