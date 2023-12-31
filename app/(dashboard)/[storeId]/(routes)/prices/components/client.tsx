"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, PriceColumn } from "./columns";

interface PriceClientProps {
    data: PriceColumn[];
}

export const PriceClient: React.FC<PriceClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`prices (${data.length})`}
                    description="Manage prices for your store"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/prices/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="prouduct" columns={columns} data={data} />
            <Heading title="API" description="API Calls for prices" />
            <Separator />
            <ApiList entityName="prices" entityIdName="priceId" />
        </>
    );
};
