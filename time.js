function main() {
    getTime();
    getCityInfos();

    let cityName = document.querySelector('#cityName');
    cityName.addEventListener('keydown', handelChooseCity);
}

main();

function handelChooseCity(event) {
    if (event.key === 'Enter') {
        fetch(`https://api.teleport.org/api/cities/?search=${event.target.value}`)
            .then((response) => response.json())
            .then((data) => {
                let cityList = [];
                for (let element of data._embedded['city:search-results']) {
                    let name = element.matching_full_name.split(",");
                    cityList.push(name[0]);
                }
                console.log(cityList);
                $("#cityName").autocomplete({
                    source: cityList
                });
            });
    }
}


function getTime() {
    let btnTime = document.querySelector('button');
    let container = document.querySelector('p');

    btnTime.addEventListener('click', function () {
        fetch('http://worldtimeapi.org/api/timezone/Europe/Bucharest')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                container.innerHTML = `Time is: ${data.datetime}`;

            });

    });
}


function getCityInfos() {
    let dropdown = document.querySelector('#cities');

    dropdown.addEventListener('change', function (event) {
        fetch(`https://api.aerisapi.com/observations/search?query=name:${event.target['value']}&client_id=CfvfYZTmlsBNP9UHdusaC&client_secret=9TjDLnEUPG9I7PSOiFtTblrwWpGhtaVxg5Y7Lj4g`)
            .then((response) => response.json())
            .then((data) => {
                const tbody = document.createElement("tbody");
                tbody.innerHTML = `<tr><td>${data.response[0].place.city}</td>
                             <td>${data.response[0].ob.tempC}</td>
                             <td>${data.response[0].ob.weather}</td>
                             <td>${data.response[0].ob.humidity}</td></tr>`;
                document.querySelector('.table').appendChild(tbody);
            });
    });
}
