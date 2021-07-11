import React, { useState, useEffect } from "react";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const useFetch = (urlParams) => {
 
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovies = async (url) => {
    setisLoading(true);
    try {
      const response = await fetch(url);
      const datas = await response.json();

      if (datas.Response === "True") {
        setData(datas.Search || datas);
        setError({ show: false, msg: "" });
      } else {
     

        setError({ show: true, msg: datas.Error });
      }
      setisLoading(false);
    } catch (err) {

    }
  };
  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return {
    isLoading,
    error,
    data,
  };
};

export default useFetch;
