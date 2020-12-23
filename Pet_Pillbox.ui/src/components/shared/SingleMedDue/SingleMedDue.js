import React from "react";

class SingleMedDue extends React.Component {
    render() {
        const { entry } = this.props;
        return (
            <div>
                <p>{entry.name}</p>
                <button className="btn btn-warning">Done</button>
            </div>
        );
    }
}

export default SingleMedDue;