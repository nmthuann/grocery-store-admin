import prismadb from "@/lib/prismadb";

import { ProductValueForm } from "./components/product-value-form";

const ProductValuePage = async ({
    params,
}: {
    params: { productValueId: string; storeId: string };
}) => {
    let productValue = null;
    if (params.productValueId == "new") {
        productValue = null;
    } else {
        productValue = await prismadb.productValue.findUnique({
            where: {
                id: parseInt(params.productValueId),
            },
        });
    }

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const productAttributes = await prismadb.productAttribute.findMany({});

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductValueForm
                    products={products}
                    productAttributes={productAttributes}
                    initialData={productValue}
                />
            </div>
        </div>
    );
};

export default ProductValuePage;
