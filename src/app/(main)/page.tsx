import React from 'react'
import { prisma } from "../../../lib/prisma";
import UI from './ui'
export default async function page() {
    const initial = await prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
    });
    return (
        <UI intiItems={initial} />
    )
}
