import Layout from "@/components/landing/layout"
import data from '../../utils/comand.json'
import { useRouter } from "next/router"

export default function () {
    const router = useRouter()
    const id = router.asPath.split('/')[2]
    const user = data.find(user => user.id === id)
    console.log(user)
    return (
        <Layout>
            <div className='text-black w-full flex flex-col lg:flex-row px-4 sm:px-20 my-12 border-b border-black'>
                <div className='w-full lg:w-[40%] lg:border-r border-black font-normal text-[64px] leading-19 uppercase mt-14 md:mt-8 lg:my-auto'>
                    <img src={`/images/people/${user?.image}`} alt='loading...' className="h-[300px] w-[300px] rounded-full" />
                </div>
                <div className='w-full lg:w-[60%] font-normal text-xl leading-[33px] lg:pt-16 pb-14 pl-5 space-y-2'>
                    <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] mb-12 w-max rounded-full'>
                        TEAM BIOS
                    </div>
                    <p className="font-normal text-[64px] leading-[96px] ">{user?.name}</p>
                    <p className='opacity-70 py-3'>{user?.title}</p>
                    <p className='opacity-70'>{user?.mail}</p>
                </div>
            </div>
            <p className="px-4 sm:px-20 font-normal text-xl leading-[33px] pb-20">{user?.description}</p>
        </Layout>
    )
}