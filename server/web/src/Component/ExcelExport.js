import { Component } from "react";
import { CSVLink, CSVDownload } from "react-csv";
const ExcelExport =()=>{

    const headers = [
        { label: "Name First", key: "firstname" },
        { label: "Name Last", key: "lastname" },
        { label: "Email", key: "email" }
      ];
      
    const data = [
        { firstname: "sdf", lastname: "qwe", email: "ah@ewq.co.com" },
        { firstname: "qwe", lastname: "aaaa", email: "reel@qqq.co.com" },
        { firstname: "errrr", lastname: "qweee l3b", email: "qqq@eeewq.com" }
    ];

     
    return(
        <div>
            <CSVLink data={data} headers={headers}>
                Download me
            </CSVLink>;
        </div>
    );

}
export default ExcelExport