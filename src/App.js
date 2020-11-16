import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);

  //STATE = How to write a variable in REACT

  // https://disease.sh/v3/covid-19/countries
  //USEEFFECT = Runs a piece of code based on a given condition


  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    // async => send a request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      }) 
    }
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    //console.log(countryCode);
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then(response => response.json())
      .then(data => {

        //All of the info from a certain country
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        
      });
  };

  //console.log("Country Info", countryInfo);
  //console.log(mapCenter);

  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 Tracker</h1>
          <div className="dropdown__color">
          <FormControl className="app__dropdown">
              <Select variant="outlined" 
              onChange={onCountryChange}
              value={country}>
                {/** Loop through all the countries and show a dropdown list of those options */}
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map( country => 
                  (<MenuItem value={country.value}>{country.name}</MenuItem>)  
                  )
                }
              </Select>
            </FormControl>
          </div>
        </div>


        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

         <Map 
           center={mapCenter}
           zoom={mapZoom}
           country={mapCountries}
         />
        
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>Worldwide new Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
