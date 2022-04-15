import Image from "next/image"
import back_arrow_icon from "../public/publish/back_arrow_icon.svg"

import { useRouter } from "next/router"

export default function BackButton () {
    const router = useRouter();

    const backToCatalogue = () => {
        router.push('./catalogue');
    }

    return (
        <div className="backButton" onClick={backToCatalogue}>
            <Image
                src={back_arrow_icon}
                alt='Back arrow'
                width={20}
                height={20}  
                priority
            />
            <p>Back to catalogue</p>
            <style jsx>{`
                .backButton {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-content: center;
                    text-decoration: underline;
                    margin: 25px 10px;
                }

                .backButton:hover {
                    cursor: pointer;
                }

                p {
                    margin: 0;
                    margin-left: 5px;
                }

                @media (min-width: 768px) {
                    .backButton {
                        display: none;
                    }
                }
            `}</style>
        </div>
    )
}