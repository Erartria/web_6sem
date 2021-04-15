function htmlToObject(weatherReportList) {
    const keys = weatherReportList.getElementsByClassName('chname');
    const values = weatherReportList.getElementsByClassName('value');
    const obj = {};
    const params = {};
    for (let i = 0; i < keys.length; i += 1) {
        params[keys[i].textContent.toLowerCase()] = values[i];
    }
    obj.params = params;
    obj.temperature = weatherReportList.getElementsByClassName('temperature')[0];
    obj.weathericon = weatherReportList.getElementsByClassName('weathericon')[0];
    obj.cityname = weatherReportList.getElementsByClassName('cityname')[0];

    return obj;
}

function fill(req, params) {
    const weather = req.weather[0];
    const main = req.main;
    const report = params;
    report.weathericon.src = 'img/png/weathericons/' + weather.icon + '.png';
    report.temperature.textContent = Math.round(main.temp) + '°C';
    report.params['wind'].textContent = req['wind'].speed + ' m/s';
    report.params["cloud cover"].textContent = weather.description;
    report.params['pressure'].textContent = main.pressure + ' hpa';
    report.params['humidity'].textContent = main.humidity + ' %';
    report.params['coordinates'].textContent = `[${req.coord.lat.toFixed(2)}, ${req.coord.lon.toFixed(2)}]`;
    report.cityname.textContent = `${req.name} (${req.sys.country})`;
    report.city = req.name;
    return report;
}

async function fillCharacteristics(locationOrCity, params) {
    if (typeof locationOrCity === 'string')
        var f =function () {return requestCity(locationOrCity)};
    else
        var f =function () {return requestLocation(locationOrCity)};

    return f(locationOrCity)
        .then(req => {
            return fill(req, params);
        })
        .catch(error => {
            alert(error);
        });
}