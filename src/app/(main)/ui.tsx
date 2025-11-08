"use client";
import { useState } from "react";


type Item = { id: number; message: string; createdAt: string };

export default function UI({ intiItems }: { intiItems: Item[] }) {
    const [items, setItems] = useState<Item[]>(intiItems);
    const [msg, setMsg] = useState<string>("");

    async function submit() {
        const res = await fetch("/api/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: msg.trim() }),
        });
        if (res.ok) {
            const created = (await res.json()) as Item;
            setItems((x) => [created, ...x]);
            setMsg("");
        }
    }
    async function refresh() {
        const res = await fetch("/api/feedback", { cache: "no-store" });
        if (res.ok) setItems(await res.json());
    }
    return (
        <div className=' h-full w-full bg-amber-100 flex flex-col items-center justify-center'>
            <header className='text-5xl font-bold bg-amber-300 p-4 rounded-2xl'>
                Random User
                <br />
                <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} className='bg-amber-400 mt-5 pl-2 pb-2' placeholder='enter feedback here' />
                <div className="bg-amber-200 flex justify-around h-20">
                    <button onClick={submit}> submit</button>
                    <button onClick={refresh} className=""> refresh</button>
                </div>
            </header>
            <ul>
                {items.map((item) => (
                    <li key={item.id} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
                        <div>{item.message}</div>
                        <small style={{ color: "#666" }}>
                            {new Date(item.createdAt).toLocaleString()}
                        </small>
                    </li>

                ))}
                {items.length === 0 && <li>No feedback yet.</li>}
            </ul>
        </div>
    )
}
