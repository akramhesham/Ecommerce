import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    const res = await fetch(`${process.env.API}/orders`, {
        cache: 'no-store'
    });
    const payload = await res.json();
    return NextResponse.json(payload);
}