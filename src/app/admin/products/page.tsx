import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const AdminProductsPage = async () => {

  const products = await prisma.product.findMany()

  return (
    <div className='flex flex-col'>
      AdminProductsPage

      <div>
        <h2>Products</h2>
      </div>
      <div className='p-4  '>
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/admin/products/${product.id}`}>
              {product.name}
            </Link>
          </div>
        ))}
      </div>

      <Link href="/admin/products/new" className='bg-slate-400 p-4 rounded-md'>
          Create Product
      </Link>
    </div>
  )
}

export default AdminProductsPage