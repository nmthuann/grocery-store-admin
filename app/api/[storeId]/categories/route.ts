import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, categoryParent } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryParent) {
      return new NextResponse("Category Parent is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Lấy thông tin của node cha
    const parentInformation = await prismadb.category.findUnique({
      where: {
       id: parseInt(categoryParent),
        storeId: params.storeId,
      },
    });

    if (!parentInformation) {
      return new NextResponse("Parent category not found", { status: 400 });
    }

    // Tăng giá trị right của tất cả các node lớn hơn hoặc bằng right của cha hiện tại
    await prismadb.category.updateMany({
      where: { right: { gte: parentInformation.right } },
      data: { right: { increment: 2 } },
    });

    // Tăng giá trị left của tất cả các node lớn hơn hoặc bằng left của cha hiện tại
    await prismadb.category.updateMany({
      where: { left: { gt: parentInformation.right } },
      data: { left: { increment: 2 } },
    });



    // Thêm node con mới giữa left và right của cha
  const category = await prismadb.category.create({
    data: {
      name: name,
      left: parentInformation.right ,
      right: parentInformation.right + 1,
      storeId: params.storeId, // Đảm bảo gán storeId cho node mới
    },
  });
    

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};



    // // const leftParent = parentInformation.left;
    // const rightParent = parentInformation.right;

    // // Tính toán giá trị left và right cho node mới
    // const left = rightParent;
    // const right = rightParent + 1;



    // // Dịch chuyển các node bên phải của node cha để mở rộng không gian
    // await prismadb.category.updateMany({
    //   where: {
    //     storeId: params.storeId,
    //     //left: { gt: 1 },
    //     right: { gte: rightParent },
    //   },
    //   data: {
    //     left: { increment: 2 },
    //     right: { increment: 2 },
    //   },
    // });

    // // Cập nhật giá trị right của node gốc
    // const rootCategory = await prismadb.category.findFirst({
    //   where: {
    //     storeId: params.storeId,
    //     left: 3,
    //   },
    // });

    // if (rootCategory) {
    //   const rootRight = rootCategory.right;
    //   await prismadb.category.update({
    //     where: {
    //       id: rootCategory.id,
    //     },
    //     data: {
    //       left: 1,
    //       right: rootRight,
    //     },
    //   });
    // }

    // // Thêm node mới
    // const category = await prismadb.category.create({
    //   data: {
    //     name,
    //     storeId: params.storeId,
    //     left,
    //     right,
    //   },
    // });