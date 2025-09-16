export default async function getSubCategory(categId:string){
    const res=await fetch(`${process.env.API}/categories/${categId}`);
    const {data}=await res.json();
    return data;
}