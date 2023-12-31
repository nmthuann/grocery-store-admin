"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ProductValueColumn } from "./columns";

interface ProductValueClientProps {
    data: ProductValueColumn[];
}

export const ProductValueClient: React.FC<ProductValueClientProps> = ({
    data,
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`ProductValues (${data.length})`}
                    description="Manage productValues for your store"
                />
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/productValues/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="productName" columns={columns} data={data} />
            <Heading title="API" description="API Calls for productValues" />
            <Separator />
            <ApiList entityName="productValues" entityIdName="productValueId" />
        </>
    );
};
