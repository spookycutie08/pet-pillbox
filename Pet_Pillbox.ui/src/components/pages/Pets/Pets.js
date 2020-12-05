// import React from "react";
// import "./Customers.scss";
// import customerData  from "../../../helpers/data/customerData";
// import SingleCustomer from "../../shared/SingleCustomer/SingleCustomer";

// class Pets extends React.Component {
    
//     state = { pets: [] };
    
//     componentDidMount() {
//         PetsData.getAllCustomers()
//             .then(pets => { this.setState({pets})});
//     }

//     render() {
//         const {pets} = this.state;
//         const buildCustomerList = customers.map((customer) => {
//             return (<SingleCustomer key={customer.id} customer={customer}/>)
//         });
        
//         return (
//             <>
//             {buildCustomerList}
//             </>
//         );
//     }
// }

// export default Customers;