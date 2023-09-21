export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  isArchived: boolean
  images: Image[]
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
