const dayE1 = document.getElementById("days");
const hourE1 = document.getElementById("hours");
const minuteE1 =  document.getElementById("minutes");
const secondE1 = document.getElementById("seconds");

const newYearTime = new Date("Jan 1, 2026 00:00:00").getTime();



const updateCountdown = () =>{
    const now = new Date().getTime();
    const gap = newYearTime - now;


    const second = 1000;
    const minute = second*60;
    const hour = minute*60;
    const day = hour*24;

    const d = Math.floor(gap/day);
    const h = Math.floor((gap%day)/hour);
    const m = Math.floor((gap%hour)/minute);
    const s = Math.floor((gap%minute)/second);
    console.log(d);

    dayE1.innerText = d;
    hourE1.innerText = h;
    minuteE1.innerText = m;
    secondE1.innerText = s;

    setTimeout(updateCountdown,1000);
    
}

updateCountdown();