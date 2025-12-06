let saveData = {
    "gpu": [
        {"hashrate":1000,"power_consumption":120}
    ]
}
let dogecoins = parseFloat(localStorage.getItem('dogecoins')) || 0;
let exchange_rate = 0;
let difficulty = 5000;

// mining mechanic
function miner() {
    let hashrate = 0;
    let power_consumption = 0;
    let gpus = saveData.gpu;

    for (let i = 0; i < gpus.length; i++) {
        hashrate += gpus[i].hashrate;
        power_consumption += gpus[i].power_consumption;
    }

    dogecoins += parseFloat((hashrate / difficulty).toFixed(8));
    localStorage.setItem('dogecoins', dogecoins);
    console.log("Mining rate: " + hashrate);
    console.log("Power consumption: " + power_consumption);
    console.log("Dogecoins: " + dogecoins.toFixed(8) + " ($" + (dogecoins * exchange_rate).toFixed(8) + ")")
}

const miningInterval = setInterval(() => { miner(); }, 1000)

// get exchange rate
async function fetch_rate() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=dogecoin&precision=8');
        const data = await res.json();
        let rate = parseFloat(data.dogecoin.usd);
        return rate;
    } catch (error) {
        console.log(error);
        if (exchange_rate == 0 || exchange_rate == undefined || exchange_rate == null) { return 0.18766667 } else { return exchange_rate; }
    }
}

const exchangeInterval = setInterval(async () => { exchange_rate = await fetch_rate(); console.log("Exchange rate: " + exchange_rate) }, 10000)