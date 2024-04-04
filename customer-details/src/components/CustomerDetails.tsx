
import React from 'react';
import Customer from '../types/Customer';


const CustomerDetails: React.FC<{ customer: Customer | null }> = ({ customer }) => {
  return (
    <div className="customer-details">
      {customer ? (
        <>
          <h2>{customer.name}</h2>
          <p>{customer.title}</p>
          <p>{customer.address}</p>
          
        </>
      ) : (
        <p>Select a customer to view details</p>
      )}
    </div>
  );
};

export default CustomerDetails;
