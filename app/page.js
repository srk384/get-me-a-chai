"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()  

  const handleLogin = ()=>{
    if (session === undefined) return;

    if (session) {
      router.push(`/${session.user.name}`);
    }

    if (!session) {
      router.push("/login");
    }
  }

  // if (session === undefined) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  //     </div>
  //   );
  // }
    return (
      <>
        <div className="min-h-[87.4vh] text-white">
          <div className="flex flex-col justify-center items-center h-[45vh] gap-4">
            <div className="font-bold text-4xl flex items-center">Buy Me a Chai
              <span><img src="https://i.giphy.com/i1T0cqIGtwHdH7EYif.webp" alt="" width={70} /></span>
            </div>
            <p className="text-center">A crowdfunding website to support your favorite creators and help them achieve their goals. Your contribution helps to keep the creativity flowing.</p>
            <div className="buttons">
              <button onClick={handleLogin}  type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center me-2 mb-2">Start here</button>
              <Link href="/about"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-3 py-2 md:px-5 md:py-2.5 text-center me-2 mb-2">Read more</button></Link>
            </div>
          </div>
          <div className="h-[1px] bg-slate-700"></div>
          <div>
            <div className="flex flex-col justify-center h-[45vh] container mx-auto gap-6 p-2 text-center">
              <div className="text-xl md:text-2xl font-bold text-center">Your fans can buy you a Chai</div>
              <div className="flex justify-around gap-1.5">
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-slate-500 rounded-full p-3"><img src="/man.gif" alt="" width={60} /></div>
                  <div className="font-bold text-sm md:text-base">Fans want to help</div>
                  <div className="text-sm md:text-base">Your fans are available to support you</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-slate-500 rounded-full p-3"><img src="/coin.gif" alt="" width={60} /></div>
                  <div className="font-bold text-sm md:text-base">Fans want to contribute</div>
                  <div className="text-sm md:text-base">Your fans are willing to contribute financially</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-slate-500 rounded-full p-3"><img src="/group.gif" alt="" width={60} /></div>
                  <div className="font-bold text-sm md:text-base">Fans want to collaborate</div>
                  <div className="text-sm md:text-base">Your fans are ready to collaborate with you</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-slate-700"></div>
          <div className="mb-6 md:mb-2">
            <div className="text-xl md:text-2xl font-bold text-center mt-10 md:mt-20">Learn more about the Platform</div>
            <div className="flex justify-center items-center h-[45vh] p-1">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/rwvUjAv6pxg?si=KWIwXgj0lFEOC0M4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
          {/* <div className="h-[1px] bg-slate-700"></div> */}
        </div>
      </>
    );
  }
