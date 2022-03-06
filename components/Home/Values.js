import styles from '../../styles/Home/ValuesSection.module.css'

const values = [
    {
        id: 1,
        title: "Anonimity",
        description: "We don’t believe in keeping user personal\
        information, our platform can be used 100% anonymously. You don’t need an \
        account for reading, neither for publish content."
    },
    {
        id: 2,
        title: "Education",
        description: "We want the people to get the information \
        about every piece of knowledge in the blockchain world. And bring with us the\
         creators that are motivated to share tehir experiences."
    }, 
    {
        id: 3,
        title: "Community",
        description: "We want to build a great community of writers\
        and readers. Blockchain defines itself as a technology of the people, and so will \
        be the chainbook platform. "
    }
]

export default function Values() {
    const values_components = values.map(value => {
        return (
            <div className={styles.value} key={value.id}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
            </div>
        )
    });
    return <div className={styles.values_block}>{values_components}</div>
}