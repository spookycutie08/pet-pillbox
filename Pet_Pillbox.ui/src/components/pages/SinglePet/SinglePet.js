import React from "react";
import { Link } from "react-router-dom";
import "./SinglePet.scss";

class SinglePet extends React.Component {
    render() {
        const { pet } = this.props;
        return (
            <div>
                <a>{pet.name}</a>
            </div>
        );
    }
}

export default SinglePet;