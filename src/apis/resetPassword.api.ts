export async function resetPassword({email,newPassword}:{email:string,newPassword:string}){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email,newPassword})
    })
    const payload=await res.json();
    return payload;
}