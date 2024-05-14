"use client";
import React from "react";

function Loading() {
    return (
        <div className="flex justify-center items-center h-screen fixed inset-0 z-[999999]">
            <div className="border-3 h-8 w-8 border-secondary dark:border-dark-secondary border-solid border-t-0 rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading;