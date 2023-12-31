"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ChevronDownIcon, Trash } from "lucide-react";
import { Supplier } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    contact: z.string().min(1),
    avatar_url: z.optional(z.string()),
    city: z.string().min(1),
    district: z.string().min(1),
    ward: z.string().min(1),
});

type SupplierFormValues = z.infer<typeof formSchema>;

interface SupplierFormProps {
    initialData: Supplier | null;
    location: ILocation[];
}

export const SupplierForm: React.FC<SupplierFormProps> = ({
    initialData,
    location,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [city, setCity] = useState<string>("");
    const [districtList, setDistrictList] = useState<IDistricts[]>([]);
    const [district, setDistrict] = useState<string>("");
    const [wardList, setWardList] = useState<IWards[]>([]);

    const title = initialData ? "Edit Supplier" : "Create Supplier";
    const description = initialData ? "Edit a Supplier." : "Add a new Supplier";
    const toastMessage = initialData
        ? "Supplier updated."
        : "Supplier created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<SupplierFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            address: "",
            contact: "",
            avatar_url: "",
        },
    });

    const handleCityChange = (event: any) => {
        //React.ChangeEvent<HTMLInputElement>
        const selectedCityId: string = event.target.value;
        console.log("selectedCityId:::", selectedCityId);
        setCity(selectedCityId);
        const selectedDistricts: ILocation | undefined = location.find(
            (city: ILocation) => city.Name === selectedCityId
        );
        //  location[selectedCityId] || [];
        console.log("selectedDistricts:::", selectedDistricts);
        // setDistrictList(selectedDistricts.Districts);
        if (selectedDistricts) {
            setDistrictList(selectedDistricts.Districts || []);
        } else {
            // Xử lý trường hợp không tìm thấy quận/huyện ở thành phố được chọn
            setDistrictList([]);
        }
    };

    const handleDistrictChange = (event: any) => {
        //React.ChangeEvent<HTMLInputElement>
        const selectedDistrictId: string = event.target.value;
        console.log("selectedCityId:::", selectedDistrictId);
        setDistrict(selectedDistrictId);
        const selectedWards: IDistricts | undefined = districtList.find(
            (city: IDistricts) => city.Name === selectedDistrictId
        );
        //  location[selectedCityId] || [];
        console.log("selectedWards:::", selectedWards);
        // setDistrictList(selectedDistricts.Districts);
        if (selectedWards) {
            setWardList(selectedWards.Wards || []);
        } else {
            // Xử lý trường hợp không tìm thấy quận/huyện ở thành phố được chọn
            setWardList([]);
        }
    };

    const onSubmit = async (data: SupplierFormValues) => {
        const city = data.city;
        const district = data.district;
        const ward = data.ward;
        const fullAddress = `${data.address}, ${ward}, ${district}, ${city}`;
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/suppliers/${params.supplierId}`,
                    {
                        name: data.name,
                        avatar_url: data.avatar_url,
                        contact: data.contact,
                        address: fullAddress,
                    }
                );
            } else {
                await axios.post(`/api/${params.storeId}/suppliers`, {
                    name: data.name,
                    avatar_url: data.avatar_url,
                    contact: data.contact,
                    address: fullAddress,
                });
            }

            router.push(`/${params.storeId}/suppliers`);
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
                `/api/${params.storeId}/suppliers/${params.supplierId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/suppliers`);
            toast.success("Supplier deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all categories using this Supplier first."
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
                    <FormField
                        control={form.control}
                        name="avatar_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
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
                                            placeholder="Supplier Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Supplier address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <div className="grid grid-cols-4 space-x-8"> */}
                        {/* Địa Chỉ */}
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa Chỉ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Address"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tỉnh Thành</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                onChangeCapture={
                                                    handleCityChange
                                                }
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                {location.map((city: any) => (
                                                    <option
                                                        key={city.Id}
                                                        value={city.Name}
                                                    >
                                                        {city.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quận/ Huyện</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                onChangeCapture={
                                                    handleDistrictChange
                                                }
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                {districtList.map(
                                                    (district: any) => (
                                                        <option
                                                            key={district.Id}
                                                            value={
                                                                district.Name
                                                            }
                                                        >
                                                            {district.Name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ward"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phường/ Xã</FormLabel>
                                    <div className="relative w-max">
                                        <FormControl>
                                            <select
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "outline",
                                                    }),
                                                    "w-[200px] appearance-none bg-transparent font-normal"
                                                )}
                                                {...field}
                                            >
                                                {wardList.map((ward: any) => (
                                                    <option
                                                        key={ward.Id}
                                                        value={ward.Name}
                                                    >
                                                        {ward.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={loading}
                                        placeholder="Supplier Contact"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* </div> */}
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
