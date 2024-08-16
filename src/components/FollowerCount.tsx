"use client"

import useFollowerInfo from "@/hooks/useFollowerInfo"
import { FollowerInfo } from "@/lib/types"
import { formaNumber } from "@/lib/utils"

interface FollowerCountProps {
    userId:string
    initialState:FollowerInfo
}

export default function  FollowerCount({userId,initialState}:FollowerCountProps){
    const {data} = useFollowerInfo(userId,initialState)

    return <span>
        Seguidores:{" "}
        <span className="font-semibold">
            {formaNumber(data.followers)}
        </span>
    </span>
}