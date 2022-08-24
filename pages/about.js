import Introduction from '../components/about/introduction';
import Hobbies from '../components/about/hobbies';
import Education from '../components/about/education';
import styles from '../styles/about.module.css';

const timesOfDay = {
    morning: { begin: 5, end: 12, phrase: 'Good morning! 🏞️' },
    afternoon: { begin: 12, end: 18, phrase: 'Good afternoon! 🌆' },
    evening: { begin: 18, end: 5, phrase: 'Good evening! 🌌' }
};

export function getWelcomingPhrase(hour) {
    for (const time in timesOfDay) {
        if (hour >= timesOfDay[time].begin && hour < timesOfDay[time].end)
            return timesOfDay[time].phrase;
        if (time === 'evening') return timesOfDay[time].phrase;
    }
}

export default function About() {
    const date = new Date();
    return (
        <>
            <div className={styles.container}>
                <h1>{ getWelcomingPhrase(new Date(date).getHours()) }</h1>
                <Introduction />
                <Education />
                <Hobbies />
            </div>
        </>
    );
}
