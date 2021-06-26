import styles from './Description.module.css'



const Description = () => {
   return (
      <div className={styles.wrapper}>
         <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FNgM3E1tVeirU3eKjAIqewHaJT%26pid%3DApi&f=1" className={styles.photo} />
         <p className={styles.name}>Mark Fleming</p>
         <p>26 years old</p>
         <p>Current state: NYC</p>
         <p>Frontend Developer</p>
         <p>About me: love cats, hate haters </p>
      </div>
   )
}

export default Description;