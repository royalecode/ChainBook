import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis'

import Image from "next/image";

import styles from '../styles/Publish/Form.module.css'
import polygon_icon from '../public/publish/polygon_crypto_icon.svg'
import exchange_arrow from '../public/publish/exchange_arrows.svg'

const fileTypes = ["pdf"];

export default function Form() {

    function destroyObject() {
        const Monster = Moralis.Object.extend("Content");
        const query = new Moralis.Query(Monster);

        //get monster with id xWMyZ4YEGZ
        query.get("hCNsjFswwWpUg36WqF9CAbec")
        .then((monster) => {
        // The object was retrieved successfully.
        monster.destroy().then((monster) => {
            // The object was deleted from the Moralis Cloud.
        }, (error) => {
            // The delete failed.
            // error is a Moralis.Error with an error code and message.
        });
        }, (error) => {
        // The object was not retrieved successfully.
        // error is a Moralis.Error with an error code and message.
        });
    }

    const {isAuthenticated, authenticate, authError, user} = useMoralis(); 

    let backColorBitcoin = false, backColorDeFi = false, backColorStaking = false, 
        backColorFarming = false, backColorSolidity = false, backColorTrading = false;

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

    async function uploadObjectToDatabase(title, author, claim_wallet, author_wallet, type, language, 
        price, synopsis, hashFile, isDefaultImage, hashImage, bitcoinCategory, solidityCategory, 
        stakingCategory, farmingCategory, tradingCategory, defiCategory) {

        const categories = [bitcoinCategory, solidityCategory, stakingCategory, farmingCategory, tradingCategory, defiCategory];

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
        await content.save()
    }

    function checkFields(field) {

    }

    function logEvent(event) {
        console.log(event.target.type.value);
        console.log(event.target.title.value);
        console.log(event.target.author.value);
        console.log(event.target.claim_wallet.value);
        console.log(event.target.language.value);
        console.log(pdf.name);
        //console.log(event.target.image_upload.value);
        console.log(event.target.image_choice.value);
        console.log(event.target.synopsis.value);
        console.log(event.target.price.value);
        console.log(event.target.isFree.checked);
    }

    const registerContent = async (event) => {
        //destroyObject();
        let proceed = false;
        event.preventDefault();
        if (!isAuthenticated) {
            console.log("hola");
            await authenticate().then(user => {
                console.log(user);
                if (user != undefined) proceed = !proceed;
            });
            
        } else { 
            proceed = !proceed;
        }

        if (proceed == true) {
            if (pdf.name != null) {
                let hashFile = await uploadFileToIPFS();
                console.log(hashFile);
                uploadObjectToDatabase(event.target.title.value, event.target.author.value, 
                    event.target.claim_wallet.value, user.attributes.ethAddress, event.target.type.value, event.target.language.value, 
                    event.target.price.value, event.target.synopsis.value, hashFile, true, "null", backColorBitcoin,
                    backColorSolidity, backColorStaking, backColorFarming, backColorTrading, 
                    backColorDeFi);
                logEvent(event);
            }
        }
    };

    const bitcoinButtonClicked = () => {
        if (!backColorBitcoin) {
            document.getElementById("btc_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("btc_button_id").style.background = "#EFEFEF";
        }
        backColorBitcoin = !backColorBitcoin;
    }

    const stakeButtonClicked = () => {
        if (!backColorStaking) {
            document.getElementById("stake_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("stake_button_id").style.background = "#EFEFEF";
        }
        backColorStaking = !backColorStaking;
    }

    const tradingButtonClicked = () => {
        if (!backColorTrading) {
            document.getElementById("trade_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("trade_button_id").style.background = "#EFEFEF";
        }
        backColorTrading = !backColorTrading;
    }

    const solidityButtonClicked = () => {
        if (!backColorSolidity) {
            document.getElementById("sol_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("sol_button_id").style.background = "#EFEFEF";
        }
        backColorSolidity = !backColorSolidity;
    }

    const defiButtonClicked = () => {
        if (!backColorDeFi) {
            document.getElementById("defi_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("defi_button_id").style.background = "#EFEFEF";
        }
        backColorDeFi = !backColorDeFi;
    }

    const farmingButtonClicked = () => {
        if (!backColorFarming) {
            document.getElementById("far_button_id").style.background = "#F3CEB0";
        } else {
            document.getElementById("far_button_id").style.background = "#EFEFEF";
        }
        backColorFarming = !backColorFarming;
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

                <div className={styles.div_center}>
                    <button type="submit" className={styles.submit_button}>Publish</button>
                </div>
            </form>
        </div>
        </>
    )
}