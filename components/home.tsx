'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from './ui/input'
import { Button } from './ui/button'
import Logo from "@/components/logo"
import Footer from './footer'
import { getLeetcodeData } from '@/lib/leetcode'

const MainPage = () => {
    const [username, setUsername] = useState("")
    const [platform, setPlatform] = useState("leetcode")
    const router = useRouter()

    const handleSearch = async () => {
        if (username.trim() === '') {
            toast("Please enter a username to search!", {
                style: {
                    backgroundColor: '#f44336',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 'bold',
                    fontSize: '15px'
                }
            })
            return
        }

        toast("Searching for the username...", {
            style: {
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: 'bold',
                fontSize: '15px'
            }
        })

        // Fetch data from our API route
        const data = await getLeetcodeData(username.trim())

        if (data) {
              console.log("✅ Data found:", data)
              console.log(data)
            // Navigate to the user's profile page
            //   router.push(`/leetcode/${username.trim()}`)
            localStorage.setItem('leetcodeData', JSON.stringify(data))

            // Navigate to the Leetcode details page
            router.push(`/leetcode/${username.trim()}`)

            // Optional: if you want to pass data via query
            // router.push(`/leetcode/${username.trim()}?data=${encodeURIComponent(JSON.stringify(data))}`)
        }
        else {
            toast("User not found. Redirecting to home page...", {
                style: {
                    backgroundColor: '#f44336',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 'bold',
                    fontSize: '15px'
                }
            })

            setTimeout(() => {
                router.push('/')
            }, 3000)
        }
    }

    return (
        <div className="w-full min-h-screen bg-red-100 flex justify-start py-15 items-center flex-col gap-15 text-center">
            <div className="flex flex-col gap-5">
                <h1 className="font-extrabold text-6xl flex items-center justify-center gap-5">
                    <Logo />
                    AlgoBoard
                </h1>
                <h3 className="font-bold text-xl text-zinc-500">
                    Know your friends. Watch your enemies. Track them all.
                    <br />
                    Leetcode. Codeforces. Codechef.
                    <br />
                    Your prep strategy starts with a little stalking 😏
                </h3>
            </div>

            <div className="w-[600px] min-h-[120px] rounded-3xl bg-blue-50 shadow-2xl py-7 px-10 flex flex-col justify-between items-center gap-7">
                <p className="font-bold text-xl">Enter the leetcode ID you want to stalk</p>
                {/* <Tabs defaultValue="leetcode" className="w-full" onValueChange={(val) => { setPlatform(val); setUsername(""); }}>
                    <TabsList className="flex justify-center w-full gap-1">
                        <TabsTrigger className='text-xl bg-zinc-200' value="leetcode">Leetcode</TabsTrigger>
                        <TabsTrigger className='text-xl bg-zinc-200' value="codeforces">Codeforces</TabsTrigger>
                        <TabsTrigger className='text-xl bg-zinc-200' value="codechef">Codechef</TabsTrigger>
                    </TabsList>
                </Tabs> */}

                <Input
                    value={username}
                    placeholder={`Enter ${platform} username`}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Button
                    variant="default"
                    className='text-xl py-5 px-5 cursor-pointer'
                    onClick={handleSearch}
                >
                    Submit
                </Button>
            </div>

            <Footer />
        </div>
    )
}

export default MainPage
