import prismadb from "@/lib/prismadb";
import { promises as fs } from "fs";
import path from "path";
import { SupplierForm } from "./components/supplier-form";

const SupplierPage = async ({ params }: { params: { supplierId: string } }) => {
    const supplier = await prismadb.supplier.findUnique({
        where: {
            id: params.supplierId,
        },
    });

    const location = await getTasks();
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SupplierForm initialData={supplier} location={location} />
            </div>
        </div>
    );
};

export default SupplierPage;
async function getTasks(): Promise<ILocation[]> {
    const data = await fs.readFile(
        path.join(
            process.cwd(),
            "app/(dashboard)/[storeId]/(routes)/suppliers/[supplierId]/(data)/VN-location-data.json"
        )
    );

    const location = JSON.parse(data.toString());

    return await location; // z.array(taskSchema).parse(tasks);
}
