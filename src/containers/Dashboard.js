import React, { useState } from "react";

import { Content, Tab, TabContent, Tabs} from "../components/Tabs";


const Dashboard = () => {
    const contents =[
        {title: "Books", elements: <h1>Contents of books go here. Awesome!</h1>},
        {title: "Members", elements: <h1>Contents of members go here. Nice!</h1>},
    ]
    
    return (
        <Tabs contents={contents} />

       
        
    );
};
 export default Dashboard;