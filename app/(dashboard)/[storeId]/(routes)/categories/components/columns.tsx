"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CategoryColumn = {
    id: string;
    name: string;
    left: string;
    right: string;
    description?: string;
    createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "left",
        header: "Left",
    },
    {
        accessorKey: "right",
        header: "Right",
    },
    // {
    //     accessorKey: "description",
    //     header: "Description",
    // },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
