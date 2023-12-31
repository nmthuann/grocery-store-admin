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

    const { attribute } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!attribute) {
      return new NextResponse("Attribute is required", { status: 400 });

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

    const productAttribute = await prismadb.productAttribute.create({
      data: {
        attribute
      }
    });
  
    return NextResponse.json(productAttribute);
  } catch (error) {
    console.log('[productAttributeS_POST]', error);
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

    const productAttributes = await prismadb.productAttribute.findMany();
  
    return NextResponse.json(productAttributes);
  } catch (error) {
    console.log('[productAttributeS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};