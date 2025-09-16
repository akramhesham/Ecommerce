export async function resetCode(resetCode:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({resetCode})
    })
    const payload=await res.json();
    return payload;
}