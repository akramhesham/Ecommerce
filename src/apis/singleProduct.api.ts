
export default async function getSingleProduct(prodId:string){
    const res=await fetch(`${process.env.API}/products/${prodId}`);
    const {data}=await res.json();
    return data;
}