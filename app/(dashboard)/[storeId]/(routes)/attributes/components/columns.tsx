"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductAttributeColumn = {
    id: string;
    attribute: string;
};

export const columns: ColumnDef<ProductAttributeColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "attribute",
        header: "Attribute",
    },

    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
