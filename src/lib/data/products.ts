import { supabase } from "../supabase";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  description: string;
}

// These are now empty as we fetch from Supabase
export const products: Product[] = [];
export const collections: Collection[] = [];

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map(item => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    category: item.category,
    image: item.image,
    images: item.images || [],
    description: item.description,
    sizes: item.sizes,
    isNew: item.is_new,
    isFeatured: item.is_featured
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    price: Number(data.price),
    category: data.category,
    image: data.image,
    images: data.images || [],
    description: data.description,
    sizes: data.sizes,
    isNew: data.is_new,
    isFeatured: data.is_featured
  };
}

export async function getCollections(): Promise<Collection[]> {
  const { data, error } = await supabase
    .from('collections')
    .select('*');

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return data;
}

export interface HeroImage {
  id: string;
  url: string;
  created_at: string;
}

export async function getHeroImages(): Promise<HeroImage[]> {
  const { data, error } = await supabase
    .from('hero_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }

  return data;
}
