import "server-only";

import {
  findCategory,
  findProduct,
  findProductById,
  getPrimaryCategory as primaryCategory,
  getRelatedProducts as relatedProducts,
} from "@/lib/catalog";
import { loadStorefrontContent } from "@/lib/storefront";
import type { Product } from "@/types";

export async function getAllProducts() {
  return (await loadStorefrontContent()).products;
}

export async function getCategories() {
  return (await loadStorefrontContent()).categories;
}

export async function getProduct(slug: string) {
  return findProduct(await getAllProducts(), slug);
}

export async function getProductById(id: string) {
  return findProductById(await getAllProducts(), id);
}

export async function getCategory(slug: string) {
  return findCategory(await getCategories(), slug);
}

export async function getPrimaryCategory(product: Product) {
  return primaryCategory(await getCategories(), product);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  return relatedProducts(await getAllProducts(), product, limit);
}
