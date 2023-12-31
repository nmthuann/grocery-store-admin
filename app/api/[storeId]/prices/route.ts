import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { BrandError } from '@/constants/errors';

 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { productId,  beginDay, unitPrice } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("productId is required", { status: 400 });
    }
    if (!unitPrice) {
      return new NextResponse("unitPrice is required", { status: 400 });
    }
    
    

    if (!params.storeId) {
      return new NextResponse(BrandError.STORE_ID_MISSING, { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const price = await prismadb.price.create({
      data: {
        productId,
        beginDay,
        unitPrice,
      }
    });
  
    return NextResponse.json(price);
  } catch (error) {
    console.log('[PriceS_POST]', error);
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

    const prices = await prismadb.price.findMany();
  
    return NextResponse.json(prices);
  } catch (error) {
    console.log('[priceS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};