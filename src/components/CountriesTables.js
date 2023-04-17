import axios from "axios";
import React, { useEffect, useState } from "react";
import "../assets/scss/main.scss";
import DataTable from "react-data-table-component";

const CountriesTables = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);
  const columns = [
    {
      name: "Country's name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country's name",
      selector: (row) => row.name,
    },
    {
      name: "Country's Native name",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country's Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country's Flag",
      selector: (row) => <img src={row.flag} width={50} height={50} />,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => prompt("PKMKB?")}>
          Action
        </button>
      ),
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={filteredCountries}
      pagination
      fixedHeader
      title="Country list"
      fixedHeaderScrollHeight="500px"
      selectableRows
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="search here"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default CountriesTables;
