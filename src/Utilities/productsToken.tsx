// import { decode } from 'next-auth/jwt'
// import { cookies } from 'next/headers'

// export async function productsToken() {
//   const cookieName = process.env.NODE_ENV ===
//    'production' ? '__Secure-next-auth.session-token' : 
//    'next-auth.session-token'
//   const authToken = (await cookies()).get(cookieName)?.value;
//   const token = await decode({ token: authToken, secret: process.env.NEXTAUTH_SECRET! })
//   return token?.token;
// }
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function productsToken() {
  const cookieStore = cookies()
console.log("NEXTAUTH_SECRET loaded:", !!process.env.NEXTAUTH_SECRET);


  const authToken =
    (await cookieStore).get('__Secure-next-auth.session-token')?.value || // correct production cookie
    (await cookieStore).get('__secure-next-auth.session-token')?.value || // lowercase variant (some proxies)
    (await cookieStore).get('next-auth.session-token')?.value             // dev cookie

  if (!authToken) return null

  const token = await decode({
    token: authToken,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  return token?.token
}