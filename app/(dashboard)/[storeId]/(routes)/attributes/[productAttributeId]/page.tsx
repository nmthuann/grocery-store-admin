import prismadb from "@/lib/prismadb";

import { ProductAttributeForm } from "./components/attribute-form";

const ProductAttributePage = async ({
    params,
}: {
    params: { productAttributeId: string };
}) => {
    let productAttribute = null;
    if (params.productAttributeId == "new") {
        productAttribute = null;
    } else {
        productAttribute = await prismadb.productAttribute.findUnique({
            where: {
                id: parseInt(params.productAttributeId),
            },
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductAttributeForm initialData={productAttribute} />
            </div>
        </div>
    );
};

export default ProductAttributePage;
