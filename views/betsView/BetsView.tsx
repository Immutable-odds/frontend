import { BetHistoryList } from "@/components/betHistory";
import { betHistory as betHistoryData } from "@/mock";
import { Title } from "@/shared";
import React, { useEffect, useRef, useState } from "react";
import styles from "./BetsView.module.scss";
import { getUserBets } from "@/services/API";
import { useStore } from "@/contexts/StoreContext";

const BetsView = () => {
    const [betHistory, setBetHistory] = useState<any[]>([])
    const [userData, setUserData] = useStore()
    const effectCalled = useRef(false)

    useEffect(() => {
        if (effectCalled.current) return;
        effectCalled.current = true;

        const loadData = async () => {
            const data = await getUserBets(userData?.uuid)
            setBetHistory(data?.result ?? [])
        }
        loadData();
    }, [userData])

    return (
        <section className={styles.section}>
            <div className={styles.row}>
                <Title title="Bet History" className={styles.title} />
            </div>
            {Array.isArray(betHistory) && betHistory.length ? <BetHistoryList data={betHistory} /> : (
                <div>
                    <p>Nothing to show</p>
                </div>
            )}
        </section>
    );
};

export default BetsView;