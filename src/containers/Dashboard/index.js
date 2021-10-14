import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tabs from "../../components/Tabs";
import Spinner from "../../components/Spinner";

import Books from "./Books/Book";
 
import { setBooks } from "../../store/bookSlice";
import { getBooks } from "../../api/bookAPI";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const books  = useSelector((state) => state.books.value)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then((response) => {
        if (!response.error) { 
          dispatch(setBooks(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const contents = [
    {
      title: "Books",
      elements: <books catalog={books } />,
    },
    {
      title: "Members",
      elements: <h1>Contents of members go here. Nice!</h1>,
    },
  ];

  return isLoading ? (
    <Spinner />
  ) : (
    books.length > 0 && <Tabs contents={contents} />
  );
};

export default Dashboard;
