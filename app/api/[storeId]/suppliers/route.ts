import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { SupplierError } from '@/constants/errors';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, avatar_url, address, contact } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse(SupplierError.NAME_MISSING, { status: 400 });
    }
    if (!avatar_url) {
      return new NextResponse(SupplierError.AVATAR_URL_MISSING, { status: 400 });
    }
    if (!contact) {
      return new NextResponse(SupplierError.CONTACT_MISSING, { status: 400 });
    }
    if (!address) {
      return new NextResponse(SupplierError.ADDRESS_MISSING, { status: 400 });
    }
    

    if (!params.storeId) {
      return new NextResponse(SupplierError.STORE_ID_MISSING, { status: 400 });
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

    const supplier = await prismadb.supplier.create({
      data: {
        name,
        address,
        avatar_url,
        contact,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(supplier);
  } catch (error) {
    console.log('[SUPPLIERS_POST]', error);
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

    const suppliers = await prismadb.supplier.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(suppliers);
  } catch (error) {
    console.log('[SUPPLIERS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};