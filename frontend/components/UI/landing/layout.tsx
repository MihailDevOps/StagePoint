import Header from "./header"
import Footer from "./footer"


export default function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <div className="font-ibm text-black">
      <Header />
      <div className="mx-auto max-w-5xl">
        {children}
      </div>
      <Footer />
    </div>
  )
}