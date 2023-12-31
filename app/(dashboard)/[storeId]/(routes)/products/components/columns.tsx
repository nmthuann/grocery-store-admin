"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
    id: string;
    barcode: string;
    name: string;
    status: boolean;
    archived: boolean; // còn hàng
    description: string;
    createdAt: string;
    unit: string;
    supplier: string;
    brand: string;
    category: string;
    unitPrice: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "barcode",
        header: "Barcode",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "archived",
        header: "Archived",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
    {
        accessorKey: "unitPrice",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "supplier",
        header: "supplier",
        // cell: ({ row }) => (
        //     <div className="flex items-center gap-x-2">
        //         {row.original.supplier}
        //         <div
        //             className="h-6 w-6 rounded-full border"
        //             style={{ backgroundColor: row.original.supplier }}
        //         />
        //     </div>
        // ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
