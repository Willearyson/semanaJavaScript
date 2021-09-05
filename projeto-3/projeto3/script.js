document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input != ''){
        clearInfo();
        showWarning('carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fa8770c51451c7efb9032ff161627b2d&units=metric&lang=pt_br`

        let result = await fetch(url);
        let json = await result.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempicon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo()
            showWarning('Cidade não encontrada.')
        }

    } 
});

function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempicon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}