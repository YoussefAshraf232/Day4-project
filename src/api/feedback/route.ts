import { NextResponse }from "next/server";
import {prisma} from "../../../lib/prisma";

export async function GET(){
    const feedbacks = await prisma.feedback.findMany({
        orderBy: {createdAt : "desc"},
    });
    return NextResponse.json(feedbacks);
}

export async function POST(req: Request){
    const {message} = await req.json();
    const item = await prisma.feedback.create({ data: {message} });
    return NextResponse.json(item);

}