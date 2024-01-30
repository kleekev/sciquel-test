import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest){
    // fill here in
    try {
        const recentComments = await prisma.comment.findMany({
            take: 50,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json({ comments: recentComments }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }    
}

export async function POST(req: NextRequest){
    // fill here in
    const { email, name, comment } = await req.json();
    
    try {
        const comm = await prisma.comment.create({
            data: {
                email: email,
                name: name,
                comment: comment
            },
        })
    } catch (error) {
        return NextResponse.json({ error : error, }, { status: 400 })
    }
    return NextResponse.json({ test: "success", }, { status: 200 })
}