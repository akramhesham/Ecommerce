import  {User} from "next-auth"
declare module "next-auth" {
  interface User{
    user:{
        email:string,
        name:string,
        role:string,
        image?:string
    },
    token:string
  }
  interface Session {
    user:User['user']
  }
}


declare module "next-auth/jwt" {

  interface JWT extends User{
    user:{
        email:string,
        name:string,
        role:string,
        image?:string
    }
  }
}