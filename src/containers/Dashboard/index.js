import React, { useEffect, useState } from "react";

import Tabs from "../../components/Tabs";
import Spinner from "../../components/Spinner";

import { getBooks } from "../../api/bookAPI";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getBooks()
      .then((response) => {
        if (!response.error) {
          setBooks(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const contents = [
    {
      title: "Books",
      elements: <books catalog={books} />,
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
