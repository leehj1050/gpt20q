import React from 'react'
import { Loader2 } from "lucide-react";

export default function Pending({ message = "로딩 중입니다..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <p className="text-sm">{message}</p>
        </div>
    );
}