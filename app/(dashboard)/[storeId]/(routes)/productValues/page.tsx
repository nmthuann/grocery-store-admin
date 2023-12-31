import prismadb from "@/lib/prismadb";

import { ProductValueColumn } from "./components/columns";
import { ProductValueClient } from "./components/client";

const ProductValuesPage = async ({
    params,
}: {
    params: { storeId: string };
}) => {
    const productValues = await prismadb.productValue.findMany({
        include: {
            product: true,
            productAttribute: true,
        },
    });

    const formattedproductValues: ProductValueColumn[] = productValues.map(
        (item) => ({
            id: item.id.toString(),
            productName: item.product.name,
            productAttribute: item.productAttribute.attribute,
            productValue: item.value,
        })
    );

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductValueClient data={formattedproductValues} />
            </div>
        </div>
    );
};

export default ProductValuesPage;
