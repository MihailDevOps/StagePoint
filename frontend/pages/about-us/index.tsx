import Layout from '@/components/landing/layout'
import data from '../../utils/comand.json'
import Link from 'next/link'
export default function AboutUs(){
    return(
        <Layout >
          <div className='text-black w-full flex flex-col lg:flex-row px-4 sm:px-20 my-12 border-b border-black'>
            <div className='w-full lg:w-[40%] lg:border-r border-black font-normal text-[64px] leading-19 uppercase pt-16 lg:pb-14'>
                <p>Stage point</p>
                <p>funt</p>
                <p>llc history</p>
            </div>
            <div className='w-full lg:w-[60%] font-normal text-xl leading-[33px] pt-6 lg:pt-16 pb-14 lg:pl-5 space-y-2'>
                <div className='bg-black text-white py-1.5 px-5 font-bold text-sm leading-[23px] w-max rounded-full'>
                    ABOUT US
                </div>
                <p>Stage Point Capital LLC (“SPC”), the Fund manager, began real estate lending in Nov, 2013, and Stage Point Fund, LLC (“SPF”) was launched Oct, 2014.</p>
                <p>▪ The Fund has has grown from a ~$5mm friends-and-family business to a ~$55 mm (assets) lending operation during which time it has originated ~ $152 million spread over 630 loans.</p>
                <p>▪ The Fund has generated quarterly net returns to investors of ~ 8.3% to 10.3% on an annualized basis every quarter since inception.</p>
            </div>
          </div>
          <p className='font-normal px-4 sm:px-20 text-[64px] leading-19 uppercase'>team bios</p>
          <div className='px-4 sm:px-20 flex flex-wrap justify-between text-black gap-5'>
            {data.map(person=> 
                <div key={person.id} className='flex w-full space-y-3 md:space-y-0 flex-col md:flex-row md:w-[600px] space-x-5 items-center'>
                    <img src='./images/personImage.svg' alt='woman' className='min-w-[50%] w-[250px] h-[250px]'/>
                    <div className='w-full md:w-[50%] font-normal text-base leading-[26.4px]'>
                        <p className='font-bold text-3xl leading-9'>{person.name}</p>
                        <p className='opacity-70'>{person.title}</p>
                        <p>{person.shortdescription}</p>
                        <Link href={`/about-us/${person.id}`} className='text-[#0050F6] font-medium text-xs leading-5'>Read more</Link>
                    </div>
                </div>
            )}
          </div>
        </Layout>
    )
}