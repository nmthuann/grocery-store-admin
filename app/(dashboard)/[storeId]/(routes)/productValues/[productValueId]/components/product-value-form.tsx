"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Check, ChevronsUpDown, Trash } from "lucide-react";
import { Product, ProductAttribute, ProductValue } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

const formSchema = z.object({
    productId: z.string().min(1),
    productAttributeId: z.string().min(1),
    value: z.string().min(1),
});

type ProductValueFormValues = z.infer<typeof formSchema>;

interface ProductValueFormProps {
    initialData: ProductValue | null;
    products: Product[];
    productAttributes: ProductAttribute[];
}

export const ProductValueForm: React.FC<ProductValueFormProps> = ({
    initialData,
    products,
    productAttributes,
}) => {
    const params = useParams();
    const router = useRouter();
    const [openComboBox, setOpenComboBox] = React.useState(false);
    const [valueComboBox, setValueComboBox] = React.useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit productValue" : "Create productValue";
    const description = initialData
        ? "Edit a productValue."
        : "Add a new productValue";
    const toastMessage = initialData
        ? "productValue updated."
        : "productValue created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductValueFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...initialData,
            productAttributeId: initialData?.productAttributeId.toString(),
        } || {
            productId: "",
            productAttributeId: "",
            value: "",
        },
    });

    const onSubmit = async (data: ProductValueFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/productValues/${params.productValueId}`,
                    data
                );
            } else {
                console.log(`Submit ${JSON.stringify(data, null, 2)} `);
                await axios.post(`/api/${params.storeId}/productValues`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/productValues`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/${params.storeId}/productValues/${params.productValueId}`
            );

            router.push(`/${params.storeId}/productValues`);
            router.refresh();
            toast.success("productValue deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all categories using this productValue first."
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="productId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Product Name</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? products.find(
                                                              (product) =>
                                                                  product.id ===
                                                                  field.value
                                                          )?.name
                                                        : "Select Product Name"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..." />
                                                <CommandEmpty>
                                                    No Product Name found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {products.map((product) => (
                                                        <CommandItem
                                                            value={product.name}
                                                            key={product.id}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "productId",
                                                                    product.id
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    product.id ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {product.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        This is the language that will be used
                                        in the dashboard.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* ATTRIBUTE */}
                        <FormField
                            control={form.control}
                            name="productAttributeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attribute</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Attribute"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {productAttributes.map(
                                                (productAttribute) => (
                                                    <SelectItem
                                                        key={
                                                            productAttribute.id
                                                        }
                                                        value={productAttribute.id.toString()}
                                                    >
                                                        {
                                                            productAttribute.attribute
                                                        }
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* VALUE */}
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="ProductValue value ..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
