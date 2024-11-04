import Image from "next/image"
import Logo from "../../public/filogo.png"
export function BrandLogo(){
  return (
    <span className="flex items-center gap-2 font-semibold flex-shrink-0 mr-auto text-lg">
      <Image src={Logo} alt = "Fiverr Logo" className="size-8"/>
      <span>FairFi</span>
    </span>
  )
}