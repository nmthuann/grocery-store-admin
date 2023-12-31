"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PriceColumn = {
    id: string;
    unitPrice: string;
    prouduct: string;
    beginDay: string;
    createdAt: string;
};

export const columns: ColumnDef<PriceColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "beginDay",
        header: "Begin",
    },
    {
        accessorKey: "prouduct",
        header: "Name",
    },
    {
        accessorKey: "unitPrice",
        header: "Price",
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
