
import React, { useState, useEffect } from 'react';
import Customer from '../types/Customer';
import fetchCustomers from '../services/customerService';

const CustomerList: React.FC<{ onSelectCustomer: (customer: Customer) => void }> = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    fetchData();
  }, []);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    onSelectCustomer(customer);
  };

  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
          onClick={() => handleCustomerClick(customer)}
        >
          <h3>{customer.name}</h3>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
