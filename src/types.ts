export interface Product {
  id: string
  name: string
  description: string
  price: string
  stock: number
  isFeature: boolean
  images: Image[]
}

export interface Image {
  id: string
  url: string
  productId: string
}