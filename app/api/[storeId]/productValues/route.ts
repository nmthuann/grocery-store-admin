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

    const { productId, productAttributeId, value, } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("productName is required", { status: 400 });
    }
    
    if (!productAttributeId) {
      return new NextResponse("productAttribute ID is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    // const product = await prismadb.product.findUnique({
    //   where: {
    //     name: productId,  
    //   }
    // });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const productValue = await prismadb.productValue.create({
      data: {
        productId,
        productAttributeId: parseInt(productAttributeId) ,
        value,
      }
    });
  
    return NextResponse.json(productValue);
  } catch (error) {
    console.log('[PRODUCTVALUES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

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
    console.log('[PRODUCTVALUES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};