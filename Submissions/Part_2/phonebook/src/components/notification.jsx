import { useState } from "react";

const Notification = ({message, type}) => {
    let notifStyle = {
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
    };
    if(type === "add" || type === "change") {
        notifStyle["color"] = "green" ;
  
    } else {
        notifStyle["color"] = "red";
      
    };

    if(message === null){
        return null;
    }else{
        return(
        <div style={notifStyle}>
            {message}
        </div>
        );
    }
}

export default Notification;