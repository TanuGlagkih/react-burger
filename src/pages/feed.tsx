import { Feed } from "../components/feed/feed";
import styles from './pages.module.css'
import { FeedStatistics } from "../components/feed-statistics/feed-statistics";

export const FeedPage = () => {

    return (
        <>
            <h1 className={`${styles.h} text text_type_main-large mb-3`}>Лента заказов</h1>
            <div className={styles.feed}>
                <Feed />
                <FeedStatistics />
            </div>
        </>

    )
}