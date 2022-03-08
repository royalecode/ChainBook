import styles from '../../styles/Home/DescriptionSection.module.css'

export default function DescriptionSection() {
    return (
        <section id='description-section' className={styles.section}>
            <div className={styles.filter}>
                <h3 className={styles.h3_info}>
                    Chainbook is a web platform that wants to bring the 
                    knowledge about Blockchain all arround the world.
                </h3>
                <h3 className={styles.h3_info}>
                    Everyone who has interest in this kind of technology can read the best books, 
                    articles and journals written by the ones who want to share they experience,
                    ideas, and knowledge.
                </h3>
            </div>
        </section>
    )
}