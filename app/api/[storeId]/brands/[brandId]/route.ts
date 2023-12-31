import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { BrandError } from "@/constants/errors";

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
    }

    const brand = await prismadb.brand.findUnique({
      where: {
        id: params.brandId
      }
    });
  
    return NextResponse.json(brand);
  } catch (error) {
    console.log('[brand_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
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

    const brand = await prismadb.brand.delete({
      where: {
        id: params.brandId,
      }
    });
  
    return NextResponse.json(brand);
  } catch (error) {
    console.log('[brand_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { name, description } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse(BrandError.NAME_MISSING, { status: 400 });
    }
    if (!description) {
      return new NextResponse(BrandError.DESCRIPTION_MISSING, { status: 400 });
    }
   

    if (!params.brandId) {
      return new NextResponse("brand id is required", { status: 400 });
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

    const brand = await prismadb.brand.update({
      where: {
        id: params.brandId,
      },
       data: {
        name,
        description,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(brand);
  } catch (error) {
    console.log('[brand_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};