import React from "react";

const Card = (props) => {
    return (
        <div className={"Card "+props.color}>
            <h2>{props.text}</h2>
        </div>
    );
}
export default Card;