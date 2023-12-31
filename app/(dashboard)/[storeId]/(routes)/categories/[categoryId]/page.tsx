import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
    params,
}: {
    params: { categoryId: string; storeId: string };
}) => {
    let category = null;
    let category_name_list: any[] = [];
    if (params.categoryId == "new") {
        category = null;
        category_name_list = await prismadb.category.findMany();
    } else {
        category = await prismadb.category.findUnique({
            where: {
                id: parseInt(params.categoryId),
            },
        });
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm
                    initialData={category}
                    categoryNameList={category_name_list}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
