const store = function (){
    let exchanges = [];
    return {
        setData: newData => exchanges = newData,
        getData: () => exchanges
    }
}();

function setListeners(){
    document.getElementById('search').onkeyup = e => {
        let search = e.currentTarget.value;
        search = search.trim().toLowerCase();
        let exchanges = store.getData();
        let filteredMoney = exchanges.filter(money => {
            return money.r030.toLowerCase().indexOf(search) > -1 ||
                money.txt.toLowerCase().indexOf(search) > -1 ||
                money.rate.toLowerCase().indexOf(search) > -1 ||
                money.cc.toLowerCase().indexOf(search) > -1 ||
                money.exchangedate.toLowerCase().indexOf(search) > -1
        });
        renderMoneyExchanges(filteredMoney);
        }
}
function renderMoneyExchanges(exchanges){
    let htmlStr = '';
    for(let money of exchanges){
        htmlStr += `<tr>
                <td>${money.r030}</td>
                <td>${money.txt}</td>
                <td>${money.rate.toFixed(2)}</td>
                <td>${money.cc}</td>
                <td>${money.exchangedate}</td>
            </tr>`
    }
    document.querySelector('.table tbody').innerHTML = htmlStr;
}

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20220323&json)")
    .then(res => res.json())
    .then(data => {
        let mappedMoney = data.map(money => ({
            r030: money.r030,
            txt: money.txt,
            rate: money.rate,
            cc: money.cc,
            exchangedate: money.exchangedate
        }));
        localStorage.setItem('exchanges', JSON.stringify(mappedMoney.exchangedate));
        store.setData(mappedMoney);
        renderMoneyExchanges(mappedMoney);
        setListeners(mappedMoney);
    })

