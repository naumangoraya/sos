import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import CustomerInformation from './components/CustomerInformation';
import ItemInformation from './components/ItemInformation';
import SupplierInformation from './components/SupplierInformation';
import StoreInformation from './components/StoreInformation';
import SaleInvoice from './components/SaleInvoice';
import PurchaseInvoice from './components/PurchaseInvoice';
import { isAuthenticated, getCurrentUser, logout } from './services/api.js';

const sidebarItems = [
  { label: 'Product', page: 'product' },
  { label: 'Stock Lookup', page: 'stockLookup' },
  { label: 'Sale', page: 'saleInvoice' },
  { label: 'Purchase', page: 'purchaseInvoice' },
  { label: 'Payment', page: 'payment' },
  { label: 'Receipt', page: 'receipt' },
  { label: 'Customer', page: 'customer' },
  { label: 'Receipt Cheque', page: 'receiptCheque' },
  { label: 'Paid Cheque', page: 'paidCheque' },
  { label: 'Production', page: 'production' },
  { label: 'Due Cheque', page: 'dueCheque' },
  { label: 'Ledger Report', page: 'ledgerReport' },
  { label: 'Stock Report', page: 'stockReport' },
  { label: 'Cheque Report', page: 'chequeReport' },
];

function App() {
  const [page, setPage] = useState('customer');
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setUser(getCurrentUser());
    }
  }, []);

  const handleLogin = (userData) => {
    setAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 180, background: '#e6e6fa', padding: 8, borderRight: '1px solid #ccc', position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 1001 }}>
        {sidebarItems.map(item => (
          <button
            key={item.label}
            onClick={() => setPage(item.page)}
            style={{
              width: '100%',
              margin: '6px 0',
              padding: '10px',
              background: page === item.page ? '#b2f5ea' : '#fff',
              border: '1px solid #b0b0b0',
              borderRadius: 4,
              textAlign: 'left',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: page === item.page ? '#234e52' : 'inherit',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 180 }}>
              {/* Header */}
      <Header currentPage={page} onPageChange={setPage} user={user} onLogout={handleLogout} />
        {/* Page Content */}
        <div style={{ marginTop: 80 }}> {/* Add top margin to account for fixed header */}
          {page === 'customer' ? <CustomerInformation /> :
           page === 'item' ? <ItemInformation /> :
           page === 'supplier' ? <SupplierInformation /> :
           page === 'store' ? <StoreInformation /> :
           page === 'saleInvoice' ? <SaleInvoice /> :
           page === 'purchaseInvoice' ? <PurchaseInvoice /> :
           null}
        </div>
      </div>
    </div>
  );
}

export default App;