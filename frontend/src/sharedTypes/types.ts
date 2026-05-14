export type ProductType = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type ProductFormType = {
  name: string;
  price: number | "";
  image: string | File;
  description: string;
};

export type ProductUpdateType = {
  _id: string;
  name: string;
  price: number | "";
  image: string | File;
  description: string;
};
