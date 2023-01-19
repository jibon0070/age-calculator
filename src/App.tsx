import React, {useRef, useState} from "react";
import './app.scss'

function App() {

    const ref = useRef<HTMLInputElement>(null);
    const [date, set_date] = useState<{ seconds: number, minutes: number, hours: number, days: number, months: number, years: number }>();

    let interval: any;
    function calculate_age(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        function calculate(birthday: Date) {
            let current_date = new Date();
            let seconds = current_date.getSeconds() - birthday.getSeconds();
            let minutes = current_date.getMinutes() - birthday.getMinutes();
            let hours = current_date.getHours() - birthday.getHours();
            let days = current_date.getDate() - birthday.getDate();
            let months = current_date.getMonth() - birthday.getMonth();
            let years = current_date.getFullYear() - birthday.getFullYear();
            if (seconds < 0) {
                seconds = seconds + 60
                minutes--;
            }
            if (minutes < 0) {
                minutes = minutes + 60
                hours--;
            }
            if (hours < 0) {
                hours = hours + 24;
                days--;
            }
            if (days < 0) {
                let date1 = new Date(current_date.getFullYear(), current_date.getMonth(), 0);
                days = days + date1.getDate();
                months--;
            }
            if (months < 0) {
                months = months + 12;
                years--;
            }
            set_date({seconds, minutes, hours, days, months, years});

        }
        if (ref.current) {
            const birthday = new Date(ref.current.value);
            if (isNaN(birthday.getTime())) return
            calculate(birthday);
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                calculate(birthday);
            }, 1000);
        }
    }


    function padding(number: number) {
        if (number < 10) return `0${number}`
        return `${number}`
    }

    return <div id="app">
        <h1>Age Calculator</h1>
        {!date ? <form onSubmit={calculate_age} className="form-group">
                <label htmlFor="in">Date</label>
                <input type="datetime-local" ref={ref}/>
                <button>Calculate</button>
            </form> :
            <div>{padding(date.years)}y {padding(date.months)}m {padding(date.days)}d {padding(date.hours)}h {padding(date.minutes)}m {padding(date.seconds)}s</div>}
    </div>;
}

export default App
