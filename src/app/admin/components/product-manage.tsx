"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductManage = () => {
  const router = useRouter()

  return (
    <div>
      <Button onClick={() => router.push("admin/products")}>
        Manage Products
      </Button>
      

    </div>
  )
}

export default ProductManage