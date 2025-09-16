import { getServerSession } from 'next-auth'
import Cart from './_components/Cart';

export default async function page() {


  return (
    <Cart />
  )
}
