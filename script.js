document.querySelector('.busca').addEventListener('submit', async (event)=>{
     event.preventDefault();

     //Variável local referente ao input do usuário e busca da informação
      let input=document.querySelector('#searchInput').value;

      if(input){
          clearInfo();
          showWarnning('Buscando...');
        
          // api de consulta e retorno do resultado do input
          let url=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=3c8b465bd8f53806fc84560fa9cd73ef&&units=metric&lang=pt_br`;
          let results=await fetch(url);
          let json=await results.json();

          // detalhes do retorno em arquivo json
          if(json.cod===200){
             showInfo({
                 name:json.name,
                 country:json.sys.country,
                 temp:json.main.temp,
                 tempIcon:json.weather[0].icon,
                 windSpeed:json.wind.speed,
                 windAngle:json.wind.deg
             });
             
             // Condição para aviso se não encontrar a cidade informada
          }else{
             
              showWarnning('Cidade não localizada. Tente novamente!');
              clearInfo();
          }
      }else{
          clearInfo();
      }

});

//função para mostrar as informações
function showInfo(json) {
    document.querySelector('.titulo').innerHTML=`${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML=`${json.temp}<span>ºC</span>`;
    document.querySelector('.ventoInfo').innerHTML=`${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.temp img').setAttribute(`src`,`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform=`rotate(${json.windAngle-90}deg)`;        
    document.querySelector('.resultado').style.display='block';
}
//função para mensagem de aviso
function showWarnning(msg) {
    document.querySelector('.aviso').innerHTML=msg;
}
//função para limpar as informações
function clearInfo(params) {
    showWarnning('');
    document.querySelector('.resultado').style.display='none';
}
