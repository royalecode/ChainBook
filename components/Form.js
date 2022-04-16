import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import Image from "next/image";

import styles from '../styles/Publish/Form.module.css'
import polygon_icon from '../public/publish/polygon_crypto_icon.svg'
import exchange_arrow from '../public/publish/exchange_arrows.svg'

const fileTypes = ["pdf"];

export default function Form() {

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const registerContent = async (event) => {
        event.preventDefault();
    };

    return (
        <>
        <div className={styles.publish_page}>
            <h3>Post new content</h3>
            <form onSubmit={registerContent}>
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
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Title" className={styles.textfield}/>
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Author / Nickname" className={styles.textfield}/>
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Claim wallet" className={styles.textfield}/>                
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
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                />
                <p className={styles.file_info}>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>

                <p className={styles.paragraph}>Image:</p>
                <div className={styles.radio_group}>
                    <div className={styles.image_selection_alignment}>
                        <div className={styles.custom_image}>
                            <label className={styles.icon} htmlFor="image_upload"></label>
                            <input type="file" id="image_upload" name="image_upload" 
                            accept=".jpg, .jpeg, .png" />
                        </div>

                        <div>
                            <input type="radio" id="languageChoice1"
                            name="image" value="english"/>
                            <label htmlFor="languageChoice1">Custom</label>
                        </div>
                    </div>

                    <div className={styles.image_selection_alignment}>
                        <div className={styles.default_image}></div>
                        <div>
                            <input type="radio" id="languageChoice3"
                            name="image" value="french"/>
                            <label htmlFor="languageChoice3">Default</label>
                        </div>
                    </div>
                </div>

                <p className={styles.paragraph}>Synopsis:</p>
                <textarea id="synopsisId" name="synopsis" rows="10" className={styles.textarea} 
                    defaultValue="Write a small synopsis describing what is about the content you are going to publish."/>
                
                <p className={styles.paragraph}>Category:</p>
                <div className={styles.checkbox_group}>
                    <button>Bitcoin</button>
                    <button>Staking</button>
                    <button>Trading</button>
                    <button>Solidity</button>
                    <button>DeFi</button>
                    <button>Farming</button>
                </div>

                <p className={styles.paragraph}>Price:</p>
                <div className={styles.div_center}>
                    <div className={styles.price_selection}>
                        <input type="text" id="typeChoice3" className={styles.textfield}
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
                    <input type="checkbox" id="languageChoice3"
                        name="price"/>
                    <label htmlFor="languageChoice3">FREE</label>        
                </div>

                <div className={styles.div_center}>
                    <button type="submit" className={styles.submit_button}>Publish</button>
                </div>
            </form>
        </div>
        </>
    )
}