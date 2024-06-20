import { useRouter } from "next/router";
import Header from "./header"
import SideBar from "./sideBar"


export default function AdminLayout(
  { children }:
    { children: React.ReactNode }
) {
  const router = useRouter();
  const activeLink = router.asPath
  return (
    <div className="font-ibm text-black flex flex-row">
      <SideBar activeLink={activeLink} />
      <div className="w-full">
        <Header activeLink={activeLink} />
        <div className="w-full h-4"></div>
        <div className="bg-[#F3F4F6] w-full p-4">{children}</div>
      </div>
    </div>
  )
}