import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useMoralis } from "react-moralis";

import Image from "next/image";
import Router from 'next/router'

import styles from '../styles/Publish/Form.module.css'
import polygon_icon from '../public/publish/polygon_crypto_icon.svg'
import exchange_arrow from '../public/publish/exchange_arrows.svg'

const fileTypes = ["pdf"];

export default function Form() {

    const {Moralis, isAuthenticated, authenticate, authError, user} = useMoralis(); 

    let categories = [false, false, false, false, false, false];

    const [pdf, setFile] = useState(null);
    const handleChange = (pdf) => {
        setFile(pdf);
    };

    async function uploadFileToIPFS() {
        // Save file input to IPFS
        const file = new Moralis.File(pdf.name, pdf)
        await file.saveIPFS();
        return file.hash();
    }

    async function uploadImageToIPFS(image) {
        // Save file recieved by parameter to IPFS
        const file = new Moralis.File('cover_photo', image)
        await file.saveIPFS();
        return file.hash();
    }

    async function uploadObjectToDatabase(title, author, claim_wallet, author_wallet, type, language, 
        price, synopsis, hashFile, isDefaultImage, hashImage, isFree) {

        const content = new Moralis.Object('Book');
        content.set('title', title);
        content.set('author', author);
        content.set('claim_wallet', claim_wallet);
        content.set('author_wallet', author_wallet);
        content.set('type', type);
        content.set('language', language);
        content.set('price', price);
        content.set('synopsis', synopsis);
        content.set('isDefaultImage', isDefaultImage);
        content.set('hashFile', hashFile);
        content.set('hashImage', hashImage);
        content.set('categories', categories);
        content.set('isFree', isFree);
        await content.save()
    }

    function checkFields(event) {
        let isCorrect = true;

        if (event.target.type.value == '') {
            document.getElementById("errorType").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorType").className = styles.hidden;

        if (event.target.title.value == '') {
            document.getElementById("errorTitle").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorTitle").className = styles.hidden;

        if (event.target.author.value == '') {
            document.getElementById("errorAuthor").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorAuthor").className = styles.hidden;

        if (event.target.claim_wallet.value === '') {
            document.getElementById("errorWallet").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorWallet").className = styles.hidden;

        if (event.target.language.value === '') {
            document.getElementById("errorLanguage").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorLanguage").className = styles.hidden;

        if (event.target.synopsis.value === '') {
            document.getElementById("errorSynopsis").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorSynopsis").className = styles.hidden;

        if (pdf == null) {
            document.getElementById("errorFile").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorFile").className = styles.hidden;

        if (event.target.image_choice.value === 'custom' && event.target.image_upload.value == '') {
            document.getElementById("errorImage").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorImage").className = styles.hidden;

        if (event.target.price.value === '' & event.target.isFree.checked == false) {
            document.getElementById("errorPrice").className = styles.show;
            isCorrect = isCorrect && false;
        }
        else document.getElementById("errorPrice").className = styles.hidden;
    
        return isCorrect;
    }

    function logEvent(event) {
        console.log(event.target.type.value);
        console.log(event.target.title.value);
        console.log(event.target.author.value);
        console.log(event.target.claim_wallet.value);
        console.log(event.target.language.value);
        console.log(pdf);
        console.log(event.target.image_upload.value);
        console.log(event.target.image_choice.value);
        console.log(event.target.synopsis.value);
        console.log(event.target.price.value);
        console.log(event.target.isFree.checked);
    }

    const registerContent = async (event) => {
        let proceed = false;
        let hashImage = "null";
        event.preventDefault();

        //console.log(event.target.isFree.checked);

        if (!isAuthenticated) {
            // console.log("hola");
            await authenticate().then(user => {
                console.log(user);
                if (user != undefined) proceed = !proceed;
            });
        } else { 
            proceed = !proceed;
        }

        //proceed == false
        if (proceed == true && checkFields(event)) {
            let hashFile = await uploadFileToIPFS();

            let isDefaultImage = (event.target.image_choice.value == 'default');
            if (!isDefaultImage) {
                let image = document.getElementById('image_upload');
                hashImage = await uploadImageToIPFS(image.files[0]);
                console.log(hashImage);
            }

            uploadObjectToDatabase(event.target.title.value, event.target.author.value, 
                event.target.claim_wallet.value, user.attributes.ethAddress, event.target.type.value, event.target.language.value, 
                event.target.price.value, event.target.synopsis.value, hashFile, isDefaultImage, 
                hashImage, event.target.isFree.checked);
            
            Router.push('/catalogue')
            //console.log(categories)
            //logEvent(event); 
        }
    };

    const bitcoinButtonClicked = () => {
        if (!categories[0]) {
            document.getElementById("btc_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("btc_button_id").style.background = "#EFEFEF";
        }
        categories[0] = !categories[0];
    }

    const stakeButtonClicked = () => {
        if (!categories[1]) {
            document.getElementById("stake_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("stake_button_id").style.background = "#EFEFEF";
        }
        categories[1] = !categories[1];
    }

    const tradingButtonClicked = () => {
        if (!categories[2]) {
            document.getElementById("trade_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("trade_button_id").style.background = "#EFEFEF";
        }
        categories[2] = !categories[2];
    }

    const solidityButtonClicked = () => {
        if (!categories[3]) {
            document.getElementById("sol_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("sol_button_id").style.background = "#EFEFEF";
        }
        categories[3] = !categories[3];
    }

    const defiButtonClicked = () => {
        if (!categories[4]) {
            document.getElementById("defi_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("defi_button_id").style.background = "#EFEFEF";
        }
        categories[4] = !categories[4];
    }

    const farmingButtonClicked = () => {
        if (!categories[5]) {
            document.getElementById("far_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("far_button_id").style.background = "#EFEFEF";
        }
        categories[5] = !categories[5];
    }

    return (
        <>
        <div className={styles.publish_page}>
            <h3>Post new content</h3>
            <form onSubmit={registerContent} id="publish_content">
                <p className={styles.paragraph}>Type:</p>
                <div className={styles.radio_group}>
                    <div>
                        <input type="radio" id="typeChoice1"
                        name="type" value="book"/>
                        <label htmlFor="typeChoice1">Book</label>
                    </div>

                    <div>
                        <input type="radio" id="typeChoice2"
                        name="type" value="article"/>
                        <label htmlFor="typeChoice2">Article</label>
                    </div>

                    <div>
                        <input type="radio" id="typeChoice3"
                        name="type" value="journal"/>
                        <label htmlFor="typeChoice3">Journal</label>
                    </div>
                </div>

                <div className={styles.written_data}>
                    <input type="text" id="titlefield"
                        name="title" placeholder="Title" className={styles.textfield}/>
                    <input type="text" id="authorfield"
                        name="author" placeholder="Author / Nickname" className={styles.textfield}/>
                    <input type="text" id="walletfield"
                        name="claim_wallet" placeholder="Claim wallet" className={styles.textfield}/>                
                </div>

                <p className={styles.paragraph}>Language:</p>
                <div className={styles.radio_group}>
                    <div>
                        <input type="radio" id="languageChoice1"
                        name="language" value="english"/>
                        <label htmlFor="languageChoice1">English</label>
                    </div>

                    <div>
                        <input type="radio" id="languageChoice2"
                        name="language" value="spanish"/>
                        <label htmlFor="languageChoice2">Spanish</label>
                    </div>

                    <div>
                        <input type="radio" id="languageChoice3"
                        name="language" value="french"/>
                        <label htmlFor="languageChoice3">French</label>
                    </div>
                </div>

                <p className={styles.paragraph}>File:</p>
                <FileUploader
                    className={styles.fileUploader}
                    handleChange={handleChange}
                    name="pdf"
                    types={fileTypes}
                />
                <p className={styles.file_info}>{pdf ? `File name: ${pdf.name}` : "No files uploaded yet"}</p>

                <p className={styles.paragraph}>Image:</p>
                <div className={styles.radio_group}>
                    <div className={styles.image_selection_alignment}>
                        <div className={styles.custom_image}>
                            <label className={styles.icon} htmlFor="image_upload"></label>
                            <input type="file" id="image_upload" name="image_upload" 
                            accept=".jpg, .jpeg, .png" />
                        </div>

                        <div>
                            <input type="radio" id="imageChoice1"
                            name="image_choice" value="custom"/>
                            <label htmlFor="imageChoice1">Custom</label>
                        </div>
                    </div>

                    <div className={styles.image_selection_alignment}>
                        <div className={styles.default_image}></div>
                        <div>
                            <input type="radio" id="imageChoice2"
                            name="image_choice" value="default" defaultChecked/>
                            <label htmlFor="imageChoice2">Default</label>
                        </div>
                    </div>
                </div>

                <p className={styles.paragraph}>Synopsis:</p>
                <textarea id="synopsisId" name="synopsis" rows="10" className={styles.textarea} 
                    defaultValue="Write a small abstract here..."/>
                
                <p className={styles.paragraph}>Category:</p>
                <div className={styles.checkbox_group}>
                    <div id="btc_button_id" onClick={bitcoinButtonClicked}>Bitcoin</div>
                    <div id="stake_button_id" onClick={stakeButtonClicked}>Staking</div>
                    <div id="trade_button_id" onClick={tradingButtonClicked}>Trading</div>
                    <div id="sol_button_id" onClick={solidityButtonClicked}>Solidity</div>
                    <div id="defi_button_id" onClick={defiButtonClicked}>DeFi</div>
                    <div id="far_button_id" onClick={farmingButtonClicked}>Farming</div>
                </div>

                <p className={styles.paragraph}>Price:</p>
                <div className={styles.div_center}>
                    <div className={styles.price_selection}>
                        <input type="text" id="priceChoice1" className={styles.textfield}
                            name="price" placeholder="0.00" />
                        <p className={styles.dollar_text_icon}>$</p>
                        <div>
                            <Image
                                src={exchange_arrow}
                                alt='Arrows exchange'
                                width={30}
                                height={30}  
                            />
                        </div>
                        <div className={styles.crypto_convertor}>
                            <p className={styles.crypto_price_text}>3.22</p>
                            <Image
                                className={styles.polygon_icon}
                                src={polygon_icon}
                                alt='Polygon Logo'
                                width={26}
                                height={26}  
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.free_check}>
                    <input type="checkbox" id="freeChoice1"
                        name="isFree"/>
                    <label htmlFor="freeChoice1">FREE</label>        
                </div>

                <div className={styles.error_messages}>
                    <p id='errorType' className={styles.hidden}>You must choose a type</p>
                    <p id='errorTitle' className={styles.hidden}>Title field missing</p>
                    <p id='errorAuthor' className={styles.hidden}>Author / Nickname field missing</p>
                    <p id='errorWallet' className={styles.hidden}>Claim Wall field missing</p>
                    <p id='errorLanguage' className={styles.hidden}>You must choose a language</p>
                    <p id='errorFile' className={styles.hidden}>An uploaded PDF is mandatory</p>
                    <p id='errorImage' className={styles.hidden}>You forgot to upload the cover image</p>
                    <p id='errorSynopsis' className={styles.hidden}>Synopsis text is missing</p>
                    <p id='errorPrice' className={styles.hidden}>You must set up a price</p>
                </div>

                <div className={styles.div_center}>
                    <button type="submit" className={styles.submit_button}>Publish</button>
                </div>
            </form>
        </div>
        </>
    )
}