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

    const { name,  description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse(BrandError.NAME_MISSING, { status: 400 });
    }
    if (!description) {
      return new NextResponse(BrandError.DESCRIPTION_MISSING, { status: 400 });
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

    const brand = await prismadb.brand.create({
      data: {
        name,
       description,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(brand);
  } catch (error) {
    console.log('[brandS_POST]', error);
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

    const brands = await prismadb.brand.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(brands);
  } catch (error) {
    console.log('[brandS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};