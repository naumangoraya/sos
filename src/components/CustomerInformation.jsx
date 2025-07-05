import React, { useState } from 'react';

const CustomerInformation = () => {
  const [customers] = useState([
    { code: '24-06-000188', title: 'A.D OLD', business: 'A.D OLD', person: '', address: 'LHR' },
    { code: '24-06-000438', title: 'A.D NAYA BAZAR', business: 'A.D NAYA BAZAR', person: '', address: 'LHR' },
    { code: '24-06-000342', title: 'A.D PRESS', business: 'A.D PRESS', person: '', address: 'LHR' },
    { code: '24-06-000321', title: 'ABASS PAPER MART', business: 'ABASS PAPER MART', person: '', address: 'LHR' },
    { code: '24-06-000356', title: 'ABBAS CARD', business: 'ABBAS CARD', person: '', address: 'FSD' },
    { code: '24-06-000001', title: 'ABDUL MAJ OLD', business: 'ABDUL MAJ OLD', person: '', address: 'LAHRE' },
    { code: '24-06-000002', title: 'ABDUL RAZAQ', business: 'ABDUL RAZAQ', person: '', address: 'LAHORE' },
    { code: '24-06-000003', title: 'ABDUL MAJID', business: 'ABDUL MAJID', person: '', address: 'LHR' },
    { code: '24-06-000029', title: 'ABDUL MAJID 2', business: 'ABDUL MAJID 2', person: '', address: 'LHR' },
    { code: '24-06-000035', title: 'ABID SB', business: 'ABID SB', person: '', address: 'LHR' },
    { code: '24-06-000036', title: 'ABID SB URDU BAZAR', business: 'ABID SB URDU BAZAR', person: '', address: 'LHR' },
    { code: '24-06-000037', title: 'ABUBAKER', business: 'ABUBAKER', person: '', address: 'LHR' },
    { code: '24-06-000038', title: 'A.D PRESS OLD', business: 'A.D PRESS OLD', person: '', address: 'LHR' },
    { code: '24-06-000039', title: 'ADEEL BUND ROAD', business: 'ADEEL BUND ROAD', person: '', address: 'LHR' },
    { code: '24-06-000040', title: 'ADEEL COPY', business: 'ADEEL COPY', person: '', address: 'LAHORE' },
  ]);
  const [customerSearch, setCustomerSearch] = useState('');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Information</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input value="24-06-000492" readOnly className="w-full border rounded px-2 py-1 bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Business</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Person</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Address</label>
            <textarea className="w-full border rounded px-2 py-1" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone #</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile #</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Credit Days</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Credit Limit</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
          <button className="bg-gray-400 text-white px-4 py-1 rounded">Edit</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded">Remove</button>
          <button className="bg-green-500 text-white px-4 py-1 rounded">Refresh</button>
          <button className="bg-gray-700 text-white px-4 py-1 rounded">Exit</button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Look Up</span>
          <span className="mr-2">Search Filter:</span>
          <label className="mr-2"><input type="radio" name="filter" defaultChecked /> All</label>
          <label className="mr-2"><input type="radio" name="filter" /> Code</label>
          <label className="mr-2"><input type="radio" name="filter" /> Description</label>
          <label className="mr-2"><input type="radio" name="filter" /> Business</label>
          <label className="mr-2"><input type="radio" name="filter" /> City</label>
          <input className="border rounded px-2 py-1 ml-2 flex-1" placeholder="Search..." value={customerSearch} onChange={e => setCustomerSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto max-h-80">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Sr#</th>
                <th className="border px-2 py-1">Code</th>
                <th className="border px-2 py-1">Title</th>
                <th className="border px-2 py-1">Business Name</th>
                <th className="border px-2 py-1">Contact Person</th>
                <th className="border px-2 py-1">Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.filter(c =>
                c.code.includes(customerSearch) ||
                c.title.toLowerCase().includes(customerSearch.toLowerCase()) ||
                c.business.toLowerCase().includes(customerSearch.toLowerCase()) ||
                c.address.toLowerCase().includes(customerSearch.toLowerCase())
              ).map((c, i) => (
                <tr key={c.code}>
                  <td className="border px-2 py-1">{i + 1}</td>
                  <td className="border px-2 py-1">{c.code}</td>
                  <td className="border px-2 py-1">{c.title}</td>
                  <td className="border px-2 py-1">{c.business}</td>
                  <td className="border px-2 py-1">{c.person}</td>
                  <td className="border px-2 py-1">{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation; 