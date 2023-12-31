import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { priceId: string } }
) {
  try {
    if (!params.priceId) {
      return new NextResponse("price id is required", { status: 400 });
    }

    const price = await prismadb.price.findUnique({
      where: {
        id: params.priceId
      }
    });
  
    return NextResponse.json(price);
  } catch (error) {
    console.log('[Price_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { priceId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.priceId) {
      return new NextResponse("price id is required", { status: 400 });
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

    const price = await prismadb.price.delete({
      where: {
        id: params.priceId,
      }
    });
  
    return NextResponse.json(price);
  } catch (error) {
    console.log('[price_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { priceId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { productId, beginDay } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("productId id is required", { status: 400 });
    }

    if (!beginDay) {
      return new NextResponse("beginDay id is required", { status: 400 });
    }
   

    if (!params.priceId) {
      return new NextResponse("price id is required", { status: 400 });
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

    const price = await prismadb.price.update({
      where: {
        id: params.priceId,
      },
       data: {
        productId,
        beginDay,
        
      }
    });
  
    return NextResponse.json(price);
  } catch (error) {
    console.log('[price_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};