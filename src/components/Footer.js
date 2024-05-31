import './Footer.css'
import {BsFacebook,BsTwitter,BsLinkedin,BsGithub,BsTelephoneFill} from 'react-icons/bs';
import {MdLocationOn} from 'react-icons/md';
import {HiMail} from 'react-icons/hi';

function Footer()
{
    return(
        <div>
           <footer className="footer-distributed">

<div className="footer-left">

    <h3>TO-DO LIST</h3>

    <p className="footer-links">
        <a href="/" className="link-1">Home</a>
        
<a href="/aboutus">About Us</a>

        
        
        
        
        <a href="/contact">Contact</a>
    </p>

</div>

<div className="footer-center">

    <div>
        <MdLocationOn/>
        <p><span>Hyderabad</span></p>
    </div>

    <div>
        <BsTelephoneFill/>
        <p>+91 123456789</p>
    </div>

    <div>
        <HiMail/>
        <p><a href="mailto:support@company.com">support@todolist.com</a></p>
    </div>

</div>

<div className="footer-right">

    <p className="footer-company-about">
        <span>About the company</span>
        Our website helps you list your to-do's 
Stop Procrastinating
Use TODO LIST 
    </p>

    <div className="footer-icons">
    <div style={{margin:15}}>
        <BsFacebook size={30}/>
    </div>
    <div style={{margin:15}}>
        <BsTwitter size={30}/>
    </div> 
    <div style={{margin:15}}>
        <BsLinkedin size={30}/>
    </div> 
    <div style={{margin:15}}>
        <BsGithub size={30}/>
    </div> 

    </div>

</div>

</footer>
        </div>
    )
}
export default Footer