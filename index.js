// let coins = parseFloat(localStorage.getItem('coins')) || 0;
// let hashrate = 500;
// let difficulty = 5000;

// // mining mechanic
// function miner() {
//     coins += (hashrate / difficulty);
//     coins = parseFloat(coins.toFixed(8));
//     localStorage.setItem('coins', coins)
//     console.log("coins: " + coins)
// }

// const interval = setInterval(() => {
//     miner();
// }, 1000)

// exchange mechanics
let exchange_rate = 0;

async function fetch_rate() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=dogecoin&precision=8');
        const data = await res.json();
        let rate = parseFloat(data.dogecoin.usd);
        return rate;
    } catch (error) { console.log(error); }
}

setInterval(async () => { exchange_rate = await fetch_rate(); console.log("Exchange rate: " + exchange_rate) }, 5000)