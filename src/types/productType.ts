import Category from "./categoryType";

interface MenuItemType {
  id: string;
  name: string;
  price: number;
  image?: string;
}
interface ProductType extends MenuItemType {
  description?: string;
  categoryId: string;
}
const mockMenuItems: ProductType[] = [
  {
    id: "1",
    name: "Beef Hotpot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "1",
    price: 10.99,
  },
  {
    id: "2",
    name: "Spicy Meat Stew",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "2",
    price: 15.99,
  },
  {
    id: "3",
    name: "Traditional Hotpot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "3",
    price: 12.99,
  },
  {
    id: "4",
    name: "Mixed Meat Hotpot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "4",
    price: 8.99,
  },
  {
    id: "5",
    name: "Classic Hotpot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "5",
    price: 9.99,
  },
  {
    id: "6",
    name: "Signature Hotpot",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dog_meat_hotpot.JPG/1200px-Dog_meat_hotpot.JPG",
    categoryId: "1",
    price: 11.99,
  },
];

const mockCategory: Category[] = [
  { id: "1", name: "All" },
  { id: "2", name: "Noodles" },
  { id: "3", name: "Rice" },
  { id: "4", name: "Salad" },
  { id: "5", name: "Snacks" },
];
export type { MenuItemType, ProductType, Category };
export { mockMenuItems, mockCategory };
