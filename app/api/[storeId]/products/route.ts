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



    
    const { 
        name, 
        barcode, 
        categoryId, 
        supplierId, 
        brandId, 
        images, 
        status, 
        unit,
        description,
        quantity 
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!barcode) {
      return new NextResponse("barcode is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!supplierId) {
      return new NextResponse("supplierId id is required", { status: 400 });
    }

    if (!brandId) {
      return new NextResponse("brandId id is required", { status: 400 });
    }
    if (!unit) {
      return new NextResponse("unit id is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("description id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        barcode,
        status,
        quantity,
        categoryId,
        supplierId,
        brandId,
        unit,
        description,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } },
// ) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const categoryId = searchParams.get('categoryId') || undefined;
//     const supplierId = searchParams.get('supplierId') || undefined;
//     const brandId = searchParams.get('brandId') || undefined;
//     const status = searchParams.get('status');

//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const products = await prismadb.product.findMany({
//       where: {
//         storeId: params.storeId,
//         categoryId: parseInt(categoryId) ,
//         supplierId,
//         brandId,
//         status: status ? true : undefined,
//         // isArchived: false,
//       },
//       include: {
//         images: true,
//         category: true,
//         color: true,
//         size: true,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       }
//     });
  
//     return NextResponse.json(products);
//   } catch (error) {
//     console.log('[PRODUCTS_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };