import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});


  //STATE = How to write a variable in REACT

  // https://disease.sh/v3/covid-19/countries
  //USEEFFECT = Runs a piece of code based on a given condition

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

        setCountries(countries);
      }) 
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    console.log(countryCode);
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then(response => response.json())
      .then(data => {

        //All of the info from a certain country
        setCountryInfo(data);
      });
  };

  console.log("Country Info", countryInfo);

  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
        <h1>COVID-19 Tracker</h1>
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

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          {/* Graph */}
          <h3>Worldwide new Cases</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
