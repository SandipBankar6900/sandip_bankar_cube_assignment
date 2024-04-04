// customerService.ts
import axios from 'axios';
import Customer from '../types/Customer';

const API_URL = 'https://660e4d316ddfa2943b3653ce.mockapi.io/customers/customer_details'; 

const fetchCustomers = async (page: number): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

export default fetchCustomers;
