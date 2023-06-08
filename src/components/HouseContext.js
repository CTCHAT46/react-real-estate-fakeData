import React, { useState, useEffect, createContext } from 'react';
//import data
import { housesData } from '../data';

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  //return all countries 
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    })
    // console.log(allCountries); check data
    //remove duplicates
    const uniqueCountries = ['Location (any)', ...
      new Set(allCountries)];
    // console.log(uniqueCountries); check data
    setCountries(uniqueCountries);
  }, []);

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    })

    const uniqueProperties = ['Property type (any)', ...
      new Set(allProperties)];

    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    // console.log(country, property, price);
    setLoading(true);
    // create a function that checks if string includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };
    // console.log(price)
    //get first value of price and parse it to number
    const minPrice = parseInt(price.split(' ')[0]);
    const maxPrice = parseInt(price.split(' ')[2]);
    // console.log(maxPrice);
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // console.log(house.price);
      //if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      //if country is default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }
      //if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }
      //if property is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }
      //if price is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      //if country&property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      //if country&price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      //if property&price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) :
        setHouses(newHouses),
        setLoading(false)
    }, 1000)
  };

  return (
    <HouseContext.Provider value={{
      houses,
      country,
      setCountry,
      countries,
      property,
      setProperty,
      properties,
      price,
      setPrice,
      loading,
      handleClick,
      loading,
    }}>
      {children}
    </HouseContext.Provider>)
};

export default HouseContextProvider;
