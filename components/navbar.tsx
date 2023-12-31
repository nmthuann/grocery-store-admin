import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
// import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";
import { MainNavMobile } from "./main-nav-mobile";
import NavbarActions from "./navbar-action";
// import { useMediaQuery } from "react-responsive";

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });
    // const isDesktopOrLaptop = useMediaQuery({
    //     query: "(min-device-width: 1224px)",
    // });

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                {/* <MainNav className="mx-6" /> */}
                <div className="px-2">
                    <MainNavMobile />
                </div>
                {/* {isDesktopOrLaptop ? (
                    <MainNav className="mx-6" />
                ) : (
                    <div className="px-6">
                        <MainNavMobile />
                    </div>
                )} */}

                <div className="ml-auto flex items-center space-x-2">
                    <NavbarActions />
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
