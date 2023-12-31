import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BrandColumn } from "./components/columns";
import { BrandClient } from "./components/client";

const brandsPage = async ({ params }: { params: { storeId: string } }) => {
    const brands = await prismadb.brand.findMany({
        where: {
            storeId: params.storeId,
        },
    });

    const formattedbrands: BrandColumn[] = brands.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BrandClient data={formattedbrands} />
            </div>
        </div>
    );
};

export default brandsPage;
