import React, { useEffect, useState } from "react";
import axios from "axios";

const Achievements = ({ userId }) => {
    const [achievements, setAchievements] = useState([]);
    const [tier, setTier] = useState("");

    useEffect(() => {
        axios.get(`/api/achievements/${userId}`).then((res) => {
            setAchievements(res.data.achievements);
            setTier(res.data.tier);
        });
    }, [userId]);

    return (
        <div className="achievements">
            <h2>🏆 Your Achievements</h2>
            <p><strong>Rank:</strong> {tier}</p>
            {achievements.length > 0 ? (
                achievements.map((ach, index) => <p key={index}>{ach.achievementName}</p>)
            ) : (
                <p>No achievements yet. Keep engaging!</p>
            )}
        </div>
    );
};

export default Achievements;
