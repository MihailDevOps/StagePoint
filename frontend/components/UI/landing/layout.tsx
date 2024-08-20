import Header from "./header"
import Footer from "./footer"


export default function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className="font-ibm text-black">
      <Header />
      <div className="mx-auto md:max-w-5xl overflow-hidden px-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}