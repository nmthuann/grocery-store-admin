"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductValueColumn = {
    id: string;
    productName: string;
    productAttribute: string;
    productValue: string;
};

export const columns: ColumnDef<ProductValueColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "productName",
        header: "Name",
    },
    {
        accessorKey: "productAttribute",
        header: "Attribute",
    },
    {
        accessorKey: "productValue",
        header: "Value",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
