
import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import PhotoGrid from './components/PhotoGrid';
import Customer from './types/Customer';

const App: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showImages, setShowImages] = useState<boolean>(false);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowImages(true);
  };

  return (
    <div className='container'>
     
        <h1>Customer Portal</h1>
      
    <div className="App">
      
      <div className="left-panel">
        <CustomerList onSelectCustomer={handleSelectCustomer} />
      </div>
      <div className="right-panel">
        <CustomerDetails customer={selectedCustomer} />
        <PhotoGrid  showImages={showImages}/>
      </div>
    </div>
    </div>
  );
};

export default App;
