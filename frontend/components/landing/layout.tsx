import Header from "./header"
import Footer from "./footer"


export default function Layout(
{ children }: 
    {children: React.ReactNode}
) {
  return (
    <div className="font-ibm text-black">
      <Header/>
      <div className="h-px mb-32"></div>
      {children}
      <Footer />
    </div>
  )
}