"use client";
import { useParams, usePathname } from "next/navigation";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "./ui/menubar";
import Link from "next/link";
export function MainNavMobile({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Menu</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href={`/${params.storeId}`}>Overview</Link>
                    </MenubarItem>
                    <MenubarSub>
                        <MenubarSubTrigger>Products</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/products`}>
                                    Products
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/attributes`}>
                                    Attributes
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/productValues`}>
                                    productValues
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/prices`}>
                                    Prices
                                </Link>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>

                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Managements</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/categories`}>
                                    Categories
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/suppliers`}>
                                    Suppliers
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={`/${params.storeId}/brands`}>
                                    Brands
                                </Link>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            {/* <MenubarItem>Email link</MenubarItem> */}
                            <MenubarSub>
                                <MenubarSubTrigger>
                                    Share F1
                                    <MenubarSubContent>
                                        <MenubarItem>Share F2</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSubTrigger>
                            </MenubarSub>

                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Setting... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
