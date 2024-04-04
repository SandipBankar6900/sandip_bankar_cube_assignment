import React, { useState, useEffect, useRef } from 'react';
import Customer from '../types/Customer';
import fetchCustomers from '../services/customerService';

const CustomerList: React.FC<{ onSelectCustomer: (customer: Customer) => void }> = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [page, setPage] = useState<number>(1); // Track the current page of data
  const [loading, setLoading] = useState<boolean>(false); // Track if data is being fetched
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data whenever page changes

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchCustomers(page);
    setCustomers((prevCustomers) => [...prevCustomers, ...data]); // Append new data to existing data
    setLoading(false);
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    onSelectCustomer(customer);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current!;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1); // Fetch next page when scrolled to bottom
    }
  };

  return (
    <div className="customer-list" onScroll={handleScroll} ref={containerRef}>
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
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CustomerList;
