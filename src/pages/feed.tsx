import { Feed } from "../components/feed/feed";
import styles from './pages.module.css'
import { FeedStatistics } from "../components/feed-statistics/feed-statistics";
import { useDispatch } from "../services/types";
import { useEffect } from "react";

export const FeedPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'WS_CONNECTION_START',
            protected: false
        });
        return () => {
            dispatch({ type: 'WS_DISCONNECT' })
        }
    }, [])

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