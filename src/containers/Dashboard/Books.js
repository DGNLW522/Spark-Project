import React from "react"; 

import Table from "../../components/Table"; 
import { FluidContainer } from "../../components/CommonComponents"; 

const Books = ({ catalog }) => { 
    const updatedCatalog = [
        ...catalog,
        {
            author: "Naveen Lakshan",
            burrowedDate: "",
            burrowedMemberId: "",
            id: "3",
            isAvailable: true,
            title: "React Hooks",
        },
    ];
   
    const handleTableRowClick = (id) => {
        console.log(id);
    };
    return ( 
        <FluidContainer> 
            <Table data={updatedCatalog} handleRowClick={handleTableRowClick} instruction="Click row to view book"/>
        </FluidContainer> 
    );
};

export default Books;