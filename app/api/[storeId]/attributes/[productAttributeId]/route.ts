import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { productAttributeId: string } }
) {
  try {
    if (!params.productAttributeId) {
      return new NextResponse("productAttribute id is required", { status: 400 });
    }

    const productAttribute = await prismadb.productAttribute.findUnique({
      where: {
        id: parseInt(params.productAttributeId)
      }
    });
  
    return NextResponse.json(productAttribute);
  } catch (error) {
    console.log('[productAttribute_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productAttributeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productAttributeId) {
      return new NextResponse("productAttribute id is required", { status: 400 });
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

    const productAttribute = await prismadb.productAttribute.delete({
      where: {
        id: parseInt(params.productAttributeId),
      }
    });
  
    return NextResponse.json(productAttribute);
  } catch (error) {
    console.log('[productAttribute_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productAttributeId: string, storeId: string } }
) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { attribute } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!attribute) {
      return new NextResponse("Attribute id is required", { status: 400 });
    }
    
   

    if (!params.productAttributeId) {
      return new NextResponse("productAttribute id is required", { status: 400 });
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

    const productAttribute = await prismadb.productAttribute.update({
      where: {
        id: parseInt(params.productAttributeId),
      },
       data: {
        attribute,
       
      }
    });
  
    return NextResponse.json(productAttribute);
  } catch (error) {
    console.log('[productAttribute_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};