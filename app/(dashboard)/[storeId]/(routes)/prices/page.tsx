import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { PriceColumn } from "./components/columns";
import { PriceClient } from "./components/client";

const PricesPage = async ({ params }: { params: { storeId: string } }) => {
    const prices = await prismadb.price.findMany({
        include: {
            product: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedprices: PriceColumn[] = prices.map((item) => ({
        id: item.id,
        prouduct: item.product.name,
        unitPrice: formatter.format(item.unitPrice.toNumber()),
        beginDay: format(item.beginDay, "MMMM do, yyyy"),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PriceClient data={formattedprices} />
            </div>
        </div>
    );
};

export default PricesPage;
