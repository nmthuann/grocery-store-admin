import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
// import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            category: true,
            brand: true,
            supplier: true,
            images: true,
            prices: {
                orderBy: {
                    beginDay: "desc", // Sắp xếp theo beginDay giảm dần để lấy giá gần nhất
                },
                take: 1, // Chỉ lấy một bản ghi (giá) gần nhất
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        barcode: item.barcode,
        name: item.name,
        status: item.status,
        archived: item.quantity > 1 ? true : false,
        unitPrice: formatter.format(item.prices[0]?.unitPrice.toNumber()),
        description: item.description,
        unit: item.unit,
        category: item.category.name,
        supplier: item.supplier.name,
        brand: item.brand.name,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;
