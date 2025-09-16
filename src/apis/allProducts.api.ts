
export default async function getProducts(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API}/products`,
        {cache:'no-cache'}
    );
    const {data}=await res.json();
    return data;
}