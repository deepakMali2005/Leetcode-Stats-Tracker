'use client'

import Navbar from '@/components/navbar'
import PieChartComponent from '@/components/piechart';
import { ChartNoAxesColumn } from 'lucide-react';
import { Star } from 'lucide-react';
import { Sparkle, Sparkles } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import Image from 'next/image'
import { Trophy } from 'lucide-react';
import React from 'react'
import { useState, useEffect } from 'react'
import ContestRatingChart from '@/components/linechart';

const LeetcodeDetails = () => {

    // console.log(data)
    const [data, setData] = useState<any>(null)

    // Fetch data from localStorage on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('leetcodeData')
        if (storedData) {
            setData(JSON.parse(storedData))
        }
    }, [])

    if (!data) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    const totalSolved = data.questionStats.easy + data.questionStats.medium + data.questionStats.hard
    const recentAC = data.recentSubmissions
        .filter((sub: any) => sub.status === "Accepted")
        .slice(0, 5)

    return (

        <div className='w-full min-h-screen bg-red-100'>
            <Navbar />
            <div className='w-full h-[calc(100%-50px)] py-5 box-border px-5 grid grid-cols-3 grid-rows-[1fr_1fr_1fr] gap-4 '>

                <div className='w-full h-full bg-white shadow-xl row-span-2 rounded-2xl flex flex-col justify-start items-start py-10 gap-10'>
                    <div className='flex w-full gap-5 pl-4'>
                        <Image src={data.avatar} width={150} height={150} alt='avtar' className='rounded-md' />
                        <div className='flex flex-col justify-center items-start '>
                            <p className='font-extrabold text-3xl'>{data.realName}</p>
                            <p className='font-bold text-2xl text-zinc-600'>{data.leetcodeID}</p>
                            <p className='text-2xl font-bold text-zinc-600'>Rank {data.leetcodeRank}</p>
                        </div>
                    </div>

                    <div className="w-full px-10 pt-3">
                        <p className="text-3xl font-bold">General Statistics</p>
                        <hr className="w-full border-t-2 border-gray-300 mt-2" />
                    </div>

                    <div className='flex flex-col px-10 gap-4'>
                        <div className='flex gap-2 items-center'>
                            <Sparkles />
                            <p className='text-2xl font-semibold text-black'>Reputation: {data.reputation}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <ChartNoAxesCombined />
                            <p className='text-2xl font-semibold text-black'>Contest Rating: {Math.round(data.contestRating)}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <ChartNoAxesColumn />
                            <p className='text-2xl font-semibold text-black'>Contest Rank: {data.contestRank}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Trophy />
                            <p className='text-2xl font-semibold text-black'>Questions Solved: {totalSolved}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Trophy />
                            <p className='text-2xl font-semibold text-black'>Contest attended: {data.ratingGraph.length}</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Star />
                            <p className='text-2xl font-semibold text-black'>Star Rating: {data.starRating}</p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-full flex justify-center items-center rounded-md bg-white shadow-xl'>
                    <PieChartComponent questionStats={data.questionStats} />
                </div>

                {data.ratingGraph && data.ratingGraph.length > 0 ? (
                    <div className="bg-white rounded-xl p-5 shadow-xl max-h-96">
                        <h2 className="text-2xl font-bold mb-4">Contest Rating Over Time</h2>
                        <ContestRatingChart data={data.ratingGraph} />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-5 shadow-xl flex justify-start items-center flex-col gap-4">
                        <h2 className="text-2xl font-bold mb-2">Contest Rating Over Time</h2>
                        <p className="text-zinc-500 text-xl my-10">No contests given yet 💤</p>
                    </div>
                )}

                {recentAC.length > 0 ? (
                    <div className="bg-white rounded-xl p-5 shadow-xl row-span-2 col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Recent Accepted Submissions</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {recentAC.map((sub: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all block"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-sky-600 hover:underline">
                                            {sub.title}
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                                            {sub.lang}
                                        </span>
                                    </div>
                                    <div className="text-sm text-zinc-500 mt-1">
                                        {sub.time}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-5 shadow-xl text-center">
                        <h2 className="text-2xl font-bold mb-2">Recent Accepted Submissions</h2>
                        <p className="text-zinc-500 text-sm">No AC submissions yet 💤</p>
                    </div>
                )}


            </div>
        </div>

    )
}

export default LeetcodeDetails