import styles from './Description.module.css';
import FriendsContainer from './Friends/FriendsContainer';
import defaultPhoto from '../../../../assets/nophoto.png';

// "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.FNgM3E1tVeirU3eKjAIqewHaJT%26pid%3DApi&f=1"
const Description = (props) => {
   return (
      <div className={styles.wrapper}>
         <img src={props.profileInfo.photos.large ?? defaultPhoto} className={styles.photo} />
         <p className={styles.name}>{props.profileInfo.fullName}</p>
         <FriendsContainer />
      </div>
   )
}

export default Description;