"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Brand, Category, Image, Product, Supplier } from "@prisma/client";
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
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    images: z.object({ url: z.string() }).array(),
    barcode: z.string().min(1),
    name: z.string().min(1),

    status: z.boolean().default(false).optional(),
    quantity: z.coerce.number().min(1),
    description: z.string().min(1),
    unit: z.string().min(1),

    categoryId: z.coerce.number().min(1),
    supplierId: z.string().min(1),
    brandId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData:
        | (Product & {
              images: Image[];
          })
        | null;
    categories: Category[];
    suppliers: Supplier[];
    brands: Brand[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    suppliers,
    brands,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product." : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const defaultValues = initialData
        ? {
              ...initialData,
              //   categoryId: initialData.categoryId.toString(),
              //   price: parseFloat(String(initialData?.price)),
          }
        : {
              name: "",
              barcode: "",
              images: [],
              categoryId: 0,
              supplierId: "",
              description: "",
              unit: "",
              brandId: "",
              status: false,
              quality: 0,
          };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/products/${params.productId}`,
                    data
                );
            } else {
                console.log(`Submit ${JSON.stringify(data, null, 2)} `);
                await axios.post(`/api/${params.storeId}/products`, data);
            }

            router.push(`/${params.storeId}/products`);
            router.refresh();
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
                `/api/${params.storeId}/products/${params.productId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted.");
        } catch (error: any) {
            toast.error("Something went wrong.");
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
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map(
                                            (image) => image.url
                                        )}
                                        disabled={loading}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                { url },
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter(
                                                    (current) =>
                                                        current.url !== url
                                                ),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="barcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Barcode</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product barcode"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value.toString()}
                                        defaultValue={field.value.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="supplierId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supplier</FormLabel>
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
                                                    placeholder="Select a size"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {suppliers.map((supplier) => (
                                                <SelectItem
                                                    key={supplier.id}
                                                    value={supplier.id}
                                                >
                                                    {supplier.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="brandId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
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
                                                    placeholder="Select a Brand"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem
                                                    key={brand.id}
                                                    value={brand.id}
                                                >
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Satus</FormLabel>
                                        <FormDescription>
                                            This product will appear on the home
                                            page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* QUANTITY */}
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số lượng sản phẩm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Nhập Số lượng sản phẩm ..."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product unit"
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
