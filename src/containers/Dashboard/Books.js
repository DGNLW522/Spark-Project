import React, { useState } from "react";

import Table from "../../components/Table";
import { FluidContainer } from "../../components/CommonComponents";

import Book from "./Book";

const Books = ({ catalog }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleTableRowClick = (id) => {
    console.log(id);
    selectedBookId(id);
  };

  const hanleBookViewBackClick = () => {
    setSelectedBookId(null);
  };

  return selectedBookId === null ? (
    <FluidContainer>
      <Table
        data={catalog}
        handleRowClick={handleTableRowClick}
        instruction="Click row to view book"
      />
    </FluidContainer>
  ) : (
    <Book id={selectedBookId} handleBackClick={handleBookViewBackClick} />
  );
};

export default Books;
