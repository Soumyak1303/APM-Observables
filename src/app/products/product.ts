/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  category?: string; // ? indicates that prop will be defined later.
  quantityInStock?: number;
  searchKey?: string[];
  supplierIds?: number[];
}
