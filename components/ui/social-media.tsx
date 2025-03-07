import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
interface SocialMediaHeader {
    linkdin: string,
    instagram: string,
    facebook: string,
    twitter: string
}
export default function SocialMedia({ facebook = "#", instagram = "#", linkdin = "#", twitter = "#" }: SocialMediaHeader) {
    return <div className="flex gap-8">
        <a href={linkdin}><FaLinkedinIn size={24} /></a>
        <a href={instagram}><RiInstagramFill size={24} /></a>
        <a href={facebook}><FaFacebookF size={24} /></a>
        <a href={twitter}><FaXTwitter size={24} /></a>
    </div>
}