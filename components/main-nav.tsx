"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
    Candy,
    Package,
    PieChart,
    Settings,
    Shuffle,
    Store,
} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`,
            icon: PieChart,
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`,
            icon: Shuffle,
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`,
            icon: Candy,
        },
        {
            href: `/${params.storeId}/suppliers`,
            label: "Supplier",
            active: pathname === `/${params.storeId}/suppliers`,
            icon: Package,
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
            icon: Settings,
        },
        {
            href: `/${params.storeId}/store`,
            label: "Stores",
            active: pathname === `/stall-store/`,
            icon: Store,
        },
    ];

    const managements = [
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`,
            description:
                "For sighted users to preview content available behind a link.",
            icon: Shuffle,
        },

        {
            href: `/${params.storeId}/suppliers`,
            label: "Supplier",
            active: pathname === `/${params.storeId}/suppliers`,
            description:
                "For sighted users to preview content available behind a link.",
            icon: Package,
        },
        {
            href: `/${params.storeId}/brands`,
            label: "Brands",
            active: pathname === `/${params.storeId}/suppliers`,
            description:
                "For sighted users to preview content available behind a link.",
            icon: Package,
        },
    ];

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link
                        href={`/${params.storeId}/store`}
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Overview
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href={`/${params.storeId}/products`}
                                    >
                                        {/* <Icons.logo className="h-6 w-6" /> */}
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Products
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that
                                            you can copy and paste into your
                                            apps. Accessible. Customizable. Open
                                            Source.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem
                                href={`/${params.storeId}/prices`}
                                title="Prices"
                            >
                                Re-usable components built using Radix UI and
                                Tailwind CSS.
                            </ListItem>
                            <ListItem
                                href={`/${params.storeId}/attributes`}
                                title="Attributes"
                            >
                                How to install dependencies and structure your
                                app.
                            </ListItem>
                            <ListItem
                                href={`/${params.storeId}/productValues`}
                                title="Values"
                            >
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Management</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {managements.map((management) => (
                                <ListItem
                                    key={management.label}
                                    title={management.label}
                                    href={management.href}
                                >
                                    {management.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link
                        href={`/${params.storeId}/settings`}
                        legacyBehavior
                        passHref
                    >
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Settings
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

//  <nav
//             className={cn(
//                 "flex items-center space-x-4 lg:space-x-6",
//                 className
//             )}
//             {...props}
//         >
//             {routes.map((route) => (
//                 <Link
//                     key={route.href}
//                     href={route.href}
//                     className={cn(
//                         "flex text-sm font-medium transition-colors hover:text-primary",
//                         route.active
//                             ? "text-black dark:text-white"
//                             : "text-muted-foreground"
//                     )}
//                 >
//                     <route.icon className="mr-2 h-4 w-4 " />
//                     {route.label}
//                 </Link>
//             ))}
//         </nav>

// const components: { title: string; href: string; description: string }[] = [
//     {
//         title: "Alert Dialog",
//         href: "/docs/primitives/alert-dialog",
//         description:
//             "A modal dialog that interrupts the user with important content and expects a response.",
//     },
//     {
//         title: "Hover Card",
//         href: "/docs/primitives/hover-card",
//         description:
//             "For sighted users to preview content available behind a link.",
//     },
//     {
//         title: "Progress",
//         href: "/docs/primitives/progress",
//         description:
//             "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//     },
//     {
//         title: "Scroll-area",
//         href: "/docs/primitives/scroll-area",
//         description: "Visually or semantically separates content.",
//     },
//     {
//         title: "Tabs",
//         href: "/docs/primitives/tabs",
//         description:
//             "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//     },
//     {
//         title: "Tooltip",
//         href: "/docs/primitives/tooltip",
//         description:
//             "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//     },
// ];
