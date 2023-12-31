export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  brands: Brand[];
  suppliers: Supplier[];
  categories: Category[];
  products: Product[];
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  products: Product[];
  storeId: string;
  store: Store;
}

export interface Supplier {
  id: string;
  name: string;
  avatar_url: string;
  address: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  storeId: string;
  store: Store;
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  left: number;
  right: number;
  description?: string;
  products: Product[];
  storeId: string;
  store: Store;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  status: boolean;
  quantity: number;
  description: string;
  unit: string;
  brand: Brand;
  category: Category;
  images: Image[];
  ProductValue: ProductValue[];
  prices: Price[];
  store: Store;
}

export interface ProductAttribute {
  id: number;
  attribute: string;
  values: ProductValue[];
}

export interface ProductValue {
  id: number;
  value: string;
  productAttribute: ProductAttribute;
  productAttributeId: number;
  productId: string;
  product: Product;
}

export interface Price {
  id: string;
  beginDay: Date;
  unitPrice: number;
  product: Product;
}
