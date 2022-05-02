import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import hamburguer_icon from '../public/navbar/hamburguer.svg'
import wallet_icon from '../public/navbar/wallet_icon.svg'

export default function Navbar(){
    const [style,setStyle]= useState("navbar1")

    const changeClass = async(e)=>{
        if(style=="navbar1"){
            let height = document.getElementsByClassName("mobile-navbar")[0].offsetHeight;
            setStyle("navbar_change");
            await new Promise(r => setTimeout(r, 10));
            let elements = document.getElementsByClassName("navbar_change");
            let prop = height + "px 0";
            elements[0].style.margin = prop;
            
        }else if(style=="navbar_change"){
            setStyle("navbar1");
        }   
    }

    const goToDescriptionSection = () => {
        console.log("hola");
    }

    return(
        <div className="navbar">
            <div className={style}>
                <div className="navbar2">
                    <h4 className='navbar-title'>ChainBook</h4>
                </div>
                <div className="navbar4">
                    <Link href="/"><a className="navbar3">Home</a></Link>
                    <Link href="/catalogue"><a className="navbar3">Catalogue</a></Link>
                    <Link href="/publish"><a className="navbar3">Publish content</a></Link>
                    <Link href="/myBooks"><a className="navbar3">My books</a></Link>
                    <div className="wallet-connect-button" onClick={goToDescriptionSection}>
                        <Image
                        src={wallet_icon}
                        alt='Wallet Logo'
                        width={20}
                        height={20}  
                        priority
                        />
                    </div>
                </div>
                
            </div>
            <div className='mobile-navbar'>
                <div className="menu-navbar-icon" onClick={changeClass}>
                    <Image
                        src={hamburguer_icon}
                        alt='Hamburguer Logo'
                        width={20}
                        height={20}  
                        priority
                    />
                </div>
                <h4 className='navbar-title'>ChainBook</h4>
                <div className="wallet-connect-button-mobile" onClick={goToDescriptionSection}>
                    <Image
                    src={wallet_icon}
                    alt='Wallet Logo'
                    width={20}
                    height={20}  
                    priority
                    />
                </div>
            </div>
        </div>
    )
}