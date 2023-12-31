import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SupplierColumn } from "./components/columns";
import { SupplierClient } from "./components/client";

const SuppliersPage = async ({ params }: { params: { storeId: string } }) => {
    const Suppliers = await prismadb.supplier.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formattedSuppliers: SupplierColumn[] = Suppliers.map((item) => ({
        avatar_url: item.avatar_url,
        id: item.id,
        name: item.name,
        address: item.address,
        contact: item.contact,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SupplierClient data={formattedSuppliers} />
            </div>
        </div>
    );
};

export default SuppliersPage;
