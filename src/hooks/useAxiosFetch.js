import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataURL) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // define source to cancel request if component is unmounted
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token, //set up cancel to be sent with the request
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000); //replicate GET request waiting time
      }
    };

    fetchData(dataURL);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataURL]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
