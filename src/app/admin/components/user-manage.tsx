"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserManage = () => {
  const router = useRouter()

  return (
    <div>
      <Button onClick={() => router.push("admin/users")}>
        Manage Users
      </Button>
    </div>
  )
}

export default UserManage