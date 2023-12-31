import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ProductAttributeColumn } from "./components/columns";
import { ProductAttributeClient } from "./components/client";

const ProductAttributesPage = async ({
    params,
}: {
    params: { storeId: string };
}) => {
    const productAttributes = await prismadb.productAttribute.findMany({});

    const formattedProductAttributes: ProductAttributeColumn[] =
        productAttributes.map((item) => ({
            id: item.id.toString(),
            attribute: item.attribute,
        }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductAttributeClient data={formattedProductAttributes} />
            </div>
        </div>
    );
};

export default ProductAttributesPage;
