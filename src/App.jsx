import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CustomerInformation from './components/CustomerInformation';
import ItemInformation from './components/ItemInformation';
import SupplierInformation from './components/SupplierInformation';
import StoreInformation from './components/StoreInformation';

const sidebarItems = [
  'Product', 'Stock Lookup', 'Sale', 'Purchase', 'Payment', 'Receipt', 'Customer', 'Receipt Cheque', 'Paid Cheque', 'Production', 'Due Cheque', 'Ledger Report', 'Stock Report', 'Cheque Report'
];

function App() {
  const [page, setPage] = useState('customer');

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 180, background: '#e6e6fa', padding: 8, borderRight: '1px solid #ccc', position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 1001 }}>
        {sidebarItems.map(item => (
          <button key={item} style={{ width: '100%', margin: '6px 0', padding: '10px', background: '#fff', border: '1px solid #b0b0b0', borderRadius: 4, textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>{item}</button>
        ))}
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 180 }}>
        {/* Header */}
        <Header currentPage={page} onPageChange={setPage} />
        
        {/* Page Content */}
        <div style={{ marginTop: 80 }}> {/* Add top margin to account for fixed header */}
          {page === 'customer' ? <CustomerInformation /> : page === 'item' ? <ItemInformation /> : page === 'supplier' ? <SupplierInformation /> : <StoreInformation />}
        </div>
      </div>
    </div>
  );
}

export default App;