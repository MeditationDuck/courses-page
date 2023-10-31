export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  isArchived: boolean
  images: Image[]
}


export interface Content {
  id: string
  productId: string
  content: string
}
export interface Image {
  id: string
  url: string
  productId: string
}

export interface User {
  id: string
  email: string
}

export interface Order {
  id: string
  userId: string
  isPaid: string
  createdAt: string
  paidAt: string
  Product: Product
}
