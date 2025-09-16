export default async function getSubBrand(brandId:string){
    const res=await fetch(`${process.env.API}/brands/${brandId}`);
    const {data}=await res.json();
    return data;
}