import styles from '../../styles/Home/ValuesSection.module.css'
import Values from './Values'

export default function ValuesSection() {
    return (
        <section className={styles.section}>
            <div className={styles.center}>
                <h2 className={styles.title}>Our Core Values</h2>
                <Values/>
            </div>
        </section>
    )
}