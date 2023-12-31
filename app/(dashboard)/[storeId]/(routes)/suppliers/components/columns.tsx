"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type SupplierColumn = {
    avatar_url: string;
    id: string;
    name: string;
    address: string;
    contact: string;
    createdAt: string;
};

export const columns: ColumnDef<SupplierColumn>[] = [
    {
        accessorKey: "avatar_url",
        header: "Avatar",
        cell: ({ row }) => (
            <Avatar className="h-9 w-9">
                <AvatarImage src={row.original.avatar_url} alt="Avatar" />
                <AvatarFallback>NO</AvatarFallback>
            </Avatar>
        ),
    },
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "contact",
        header: "Contact",
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
