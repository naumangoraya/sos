import React from 'react';

const Header = ({ currentPage, onPageChange }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'customer':
        return 'Customer Information';
      case 'item':
        return 'Item Information';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header style={{
      background: '#2c3e50',
      color: 'white',
      padding: '16px 24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #34495e',
      position: 'fixed',
      top: 0,
      left: 180, // Account for sidebar width
      right: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'cursive'
          }}>
            Amir Traders
          </h1>
          
          <nav style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => onPageChange('customer')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'customer' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Customer Information
            </button>
            <button
              onClick={() => onPageChange('item')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'item' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Item Information
            </button>
            <button
              onClick={() => onPageChange('supplier')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'supplier' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Supplier Information
            </button>
            <button
              onClick={() => onPageChange('store')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'store' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Store Information
            </button>
            <button
              onClick={() => onPageChange('saleInvoice')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'saleInvoice' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Sale Invoice
            </button>
            <button
              onClick={() => onPageChange('purchaseInvoice')}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                background: currentPage === 'purchaseInvoice' ? '#3498db' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Purchase Invoice
            </button>
          </nav>
        </div>
        
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          opacity: 0.9
        }}>
          {/* No page title here, just highlight active nav button */}
        </div>
      </div>
    </header>
  );
};

export default Header; 