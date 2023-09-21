import getUserOwnedProducts from "@/actions/get-user-owned-products";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProductList from "@/components/ProductList";
import { Heading } from "@/components/ui/heading";
import { getServerSession } from "next-auth";

interface UserPageProps {
  params: { userId: string }
}

const UserPage = async ({
  params,
}: UserPageProps) => {
  const session = await getServerSession(authOptions)
  if(!session || !session.user?.userId) {
    return (
      <div>
        This is protected and  you do not have access
      </div>
    )
  }

  const products = await getUserOwnedProducts(params.userId)

  return (
    <div className='flex flex-col'>
    <Heading title="User's Orders." description="View your orders." />
    <div>
      {/* <h1>Your Orders</h1> */}
      <div>
        <ProductList products={products} />
      </div>
    </div>
    
  </div>
    
  )
}
 
export default UserPage