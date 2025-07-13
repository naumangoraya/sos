import React, { useState, useEffect } from 'react';
import { customerAPI } from '../services/api.js';

const CustomerInformation = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [currentCustomer, setCurrentCustomer] = useState({
    code: '',
    title: '',
    businessName: '',
    contactPerson: '',
    city: '',
    address: '',
    phoneNumber: '',
    email: '',
    mobileNumber: '',
    creditDays: 0,
    creditLimit: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load customers on component mount
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (customerSearch) {
        params.search = customerSearch;
        params.filter = searchFilter;
      }
      const response = await customerAPI.getAll(params);
      setCustomers(response.data.customers || []);
    } catch (err) {
      setError(err.message || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadCustomers();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setCurrentCustomer({
      code: '',
      title: '',
      businessName: '',
      contactPerson: '',
      city: '',
      address: '',
      phoneNumber: '',
      email: '',
      mobileNumber: '',
      creditDays: 0,
      creditLimit: 0
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await customerAPI.update(editingId, currentCustomer);
      } else {
        await customerAPI.create(currentCustomer);
      }

      resetForm();
      loadCustomers();
    } catch (err) {
      setError(err.message || 'Failed to save customer');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (customer) => {
    setCurrentCustomer({
      code: customer.code,
      title: customer.title || '',
      businessName: customer.businessName || '',
      contactPerson: customer.contactPerson || '',
      city: customer.city || '',
      address: customer.address || '',
      phoneNumber: customer.phoneNumber || '',
      email: customer.email || '',
      mobileNumber: customer.mobileNumber || '',
      creditDays: customer.creditDays || 0,
      creditLimit: customer.creditLimit || 0
    });
    setIsEditing(true);
    setEditingId(customer.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerAPI.delete(id);
        loadCustomers();
      } catch (err) {
        setError(err.message || 'Failed to delete customer');
      }
    }
  };

  const handleRefresh = () => {
    resetForm();
    loadCustomers();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Information</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input 
              name="code"
              value={currentCustomer.code}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="e.g., 24-06-000492"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input 
              name="title"
              value={currentCustomer.title}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Customer title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <input 
              name="businessName"
              value={currentCustomer.businessName}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Business name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input 
              name="city"
              value={currentCustomer.city}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Person</label>
            <input 
              name="contactPerson"
              value={currentCustomer.contactPerson}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Contact person"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Address</label>
            <textarea 
              name="address"
              value={currentCustomer.address}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1" 
              rows={2}
              placeholder="Full address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone #</label>
            <input 
              name="phoneNumber"
              value={currentCustomer.phoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              name="email"
              type="email"
              value={currentCustomer.email}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile #</label>
            <input 
              name="mobileNumber"
              value={currentCustomer.mobileNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Credit Days</label>
            <input 
              name="creditDays"
              type="number"
              value={currentCustomer.creditDays}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Credit Limit</label>
            <input 
              name="creditLimit"
              type="number"
              step="0.01"
              value={currentCustomer.creditLimit}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
          </button>
          <button 
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
          >
            New
          </button>
          <button 
            onClick={handleRefresh}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Look Up</span>
          <span className="mr-2">Search Filter:</span>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="all"
              checked={searchFilter === 'all'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> All
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="code"
              checked={searchFilter === 'code'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Code
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="description"
              checked={searchFilter === 'description'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Title
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="business"
              checked={searchFilter === 'business'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Business
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="city"
              checked={searchFilter === 'city'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> City
          </label>
          <input 
            className="border rounded px-2 py-1 ml-2 flex-1" 
            placeholder="Search..." 
            value={customerSearch} 
            onChange={(e) => setCustomerSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading customers...</div>
        ) : (
          <div className="overflow-x-auto max-h-80">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Sr#</th>
                  <th className="border px-2 py-1">Code</th>
                  <th className="border px-2 py-1">Title</th>
                  <th className="border px-2 py-1">Business Name</th>
                  <th className="border px-2 py-1">Contact Person</th>
                  <th className="border px-2 py-1">City</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, i) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{i + 1}</td>
                    <td className="border px-2 py-1">{customer.code}</td>
                    <td className="border px-2 py-1">{customer.title || '-'}</td>
                    <td className="border px-2 py-1">{customer.businessName || '-'}</td>
                    <td className="border px-2 py-1">{customer.contactPerson || '-'}</td>
                    <td className="border px-2 py-1">{customer.city || '-'}</td>
                    <td className="border px-2 py-1">
                      <button 
                        onClick={() => handleEdit(customer)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {customers.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500">
                No customers found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInformation; 