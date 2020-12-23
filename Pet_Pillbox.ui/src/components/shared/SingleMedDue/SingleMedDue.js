import React from "react";

class SingleMedDue extends React.Component {
    render() {
        const { med } = this.props;
        return (
            <div>
                <p>{med.name}</p><button className="btn btn-warning">Done</button>
            </div>
        );
    }
}

export default SingleMedDue;