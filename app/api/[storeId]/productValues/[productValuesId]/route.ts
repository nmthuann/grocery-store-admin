import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productValueId: string } }
) {
  try {
    if (!params.productValueId) {
      return new NextResponse("ProductValueId id is required", { status: 400 });
    }

    const productValue = await prismadb.productValue.findUnique({
      where: {
        id: parseInt(params.productValueId)
      },
      include: {
        product: true,
        productAttribute: true,
      }
    });
  
    return NextResponse.json(productValue);
  } catch (error) {
    console.log('[ProductValue_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productValueId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productValueId) {
      return new NextResponse("productValueId id is required", { status: 400 });
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

    const productValue = await prismadb.productValue.delete({
      where: {
        id: parseInt(params.productValueId),
      }
    });
  
    return NextResponse.json(productValue);
  } catch (error) {
    console.log('[ProductValue_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productValueId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { value, productId, productAttributeId } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("productId ID is required", { status: 400 });
    }
    if (!productAttributeId) {
      return new NextResponse("productAttributeId ID is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const productValue = await prismadb.productValue.update({
      where: {
        id: parseInt(params.productValueId),
      },
      data: {
        productId,
        productAttributeId: parseInt(productAttributeId),
        value
      }
    });
  
    return NextResponse.json(productValue);
  } catch (error) {
    console.log('[ProductValue_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};