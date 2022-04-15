import styles from '../styles/Home/CoverSection.module.css'

export default function Form() {

    const registerContent = async (event) => {
        event.preventDefault();
    };

    return (
        <>
        <div>
            <h3>Post new content</h3>
            <form onSubmit={registerContent}>
                <p>Type:</p>
                <div>
                    <input type="radio" id="typeChoice1"
                    name="type" value="book"/>
                    <label htmlFor="typeChoice1">Book</label>

                    <input type="radio" id="typeChoice2"
                    name="type" value="article"/>
                    <label htmlFor="typeChoice2">Article</label>

                    <input type="radio" id="typeChoice3"
                    name="type" value="journal"/>
                    <label htmlFor="typeChoice3">Journal</label>
                </div>

                <div>
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Title"/>
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Author/Nickname"/>
                    <input type="text" id="typeChoice3"
                        name="type" placeholder="Claim wallet"/>                
                </div>

                <p>Language:</p>
                <div>
                    <input type="radio" id="languageChoice1"
                    name="language" value="english"/>
                    <label htmlFor="languageChoice1">English</label>

                    <input type="radio" id="languageChoice2"
                    name="language" value="spanish"/>
                    <label htmlFor="languageChoice2">Spanish</label>

                    <input type="radio" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">French</label>
                </div>

                <p>File:</p>

                <p>Image:</p>
                <div>
                    <input type="radio" id="languageChoice1"
                    name="language" value="english"/>
                    <label htmlFor="languageChoice1">Default</label>

                    <input type="radio" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">Custom</label>
                </div>

                <p>Synopsis:</p>
                <textarea id="synopsisId" name="synopsis" rows="10" cols="50" 
                    defaultValue="Write a small synopsis describing what is about the content you are going to publish."/>
                
                <p>Category:</p>
                <div>
                    <input type="checkbox" id="languageChoice1"
                    name="language" value="english"/>
                    <label htmlFor="languageChoice1">Programming</label>

                    <input type="checkbox" id="languageChoice2"
                    name="language" value="spanish"/>
                    <label htmlFor="languageChoice2">Trading</label>

                    <input type="checkbox" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">Farming</label>

                    <input type="checkbox" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">DeFi</label>

                    <input type="checkbox" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">Solidity</label>

                    <input type="checkbox" id="languageChoice3"
                    name="language" value="french"/>
                    <label htmlFor="languageChoice3">Staking</label>
                </div>

                <p>Price:</p>
                <input type="text" id="typeChoice3"
                    name="type" placeholder="0.00 $"/>
                <input type="checkbox" id="languageChoice3"
                    name="language"/>
                    <label htmlFor="languageChoice3">FREE</label>        

                <div>
                    <button type="submit">Publish</button>
                </div>
            </form>
        </div>
        </>
    )
}