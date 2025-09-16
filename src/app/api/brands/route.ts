import { NextRequest, NextResponse } from "next/server";

export async function GET() {
        const res = await fetch(`${process.env.API}/brands`, {
            headers: {
                'cache-Control':'no-cache'
            }
        });
        const payload=await res.json();
        return NextResponse.json(payload);
    }