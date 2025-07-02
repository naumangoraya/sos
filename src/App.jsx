import React, { useState } from 'react';
import './App.css';

const dummyCustomers = [
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
];

const dummyItems = [
  { item: 'BB20.75300', description: 'BOX BOARD 20.75X300', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB20.7532305', description: 'BOX BOARD 20.75X32X305', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB20.9036250', description: 'BOX BOARD 20.90X36X250', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB20.9036275', description: 'BOX BOARD 20.90X36X275', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB20.208180', description: 'BROWN BACK BOARD 20X180', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB20121350', description: 'BOX BOARD 20X12X1350', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB20220', description: 'BROWN BACK BOARD 20X220', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2023.50250', description: 'BROWN BACK BOARD 20X23.50X250', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2023210', description: 'BROWN BACK BOARD 20X23X210', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2023250', description: 'BROWN BACK BOARD 20X23X250', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2020', description: 'BOX BOARD 20X250', brand: 'PACKAGES', category: 'PACKAGES' },
  { item: 'BB2025240', description: 'BROWN BACK BOARD 20X25X240', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2025290', description: 'BROWN BACK BOARD 20X25X290', brand: 'LOCAL', category: 'LOCAL' },
  { item: 'BB2026X210', description: 'BROWN BACK BOARD 20X26X210', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
  { item: 'BB2027X300', description: 'BROWN BACK BOARD 20X27X300', brand: 'BROWN BACK BOARD', category: 'BROWN BACK BOARD' },
];

const sidebarItems = [
  'Product', 'Stock Lookup', 'Sale', 'Purchase', 'Payment', 'Receipt', 'Customer', 'Receipt Cheque', 'Paid Cheque', 'Production', 'Due Cheque', 'Ledger Report', 'Stock Report', 'Cheque Report'
];

function App() {
  const [page, setPage] = useState('customer');
  const [customers] = useState(dummyCustomers);
  const [customerSearch, setCustomerSearch] = useState('');
  const [items] = useState(dummyItems);
  const [itemSearch, setItemSearch] = useState('');

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 180, background: '#e6e6fa', padding: 8, borderRight: '1px solid #ccc' }}>
        {sidebarItems.map(item => (
          <button key={item} style={{ width: '100%', margin: '6px 0', padding: '10px', background: '#fff', border: '1px solid #b0b0b0', borderRadius: 4, textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>{item}</button>
        ))}
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: 24, background: '#f8f8f8' }}>
        {/* Page Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
          <button onClick={() => setPage('customer')} style={{ padding: '8px 24px', borderRadius: 4, border: '1px solid #b0b0b0', background: page === 'customer' ? '#e6e6fa' : '#fff', fontWeight: 'bold' }}>Customer Information</button>
          <button onClick={() => setPage('item')} style={{ padding: '8px 24px', borderRadius: 4, border: '1px solid #b0b0b0', background: page === 'item' ? '#e6e6fa' : '#fff', fontWeight: 'bold' }}>Item Information</button>
        </div>
        {page === 'customer' ? (
          <>
            <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: 36, marginBottom: 16 }}>Customer Information</h1>
            {/* Form */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #ccc', marginBottom: 24 }}>
              <div style={{ flex: '1 1 200px' }}>
                <label>Code<br /><input value="24-06-000492" readOnly style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Description<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Business<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>City<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Person<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '2 1 400px' }}>
                <label>Address<br /><textarea style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} rows={2} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Phone #<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Email<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Mobile #<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Credit Days<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label>Credit Limit<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 16, justifyContent: 'flex-end' }}>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold', marginBottom: 4 }}>Save</button>
                <button style={{ padding: '8px 24px', background: '#eee', border: '1px solid #b0b0b0', borderRadius: 4, color: '#888', marginBottom: 4 }} disabled>Edit</button>
                <button style={{ padding: '8px 24px', background: '#eee', border: '1px solid #b0b0b0', borderRadius: 4, color: '#888', marginBottom: 4 }} disabled>Remove</button>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold', marginBottom: 4 }}>Refresh</button>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold' }}>Exit</button>
              </div>
            </div>
            {/* Lookup Table */}
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #ccc' }}>
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 'bold' }}>Look Up</span>
                <span style={{ marginLeft: 16 }}>Search Filter:</span>
                <label><input type="radio" name="filter" defaultChecked /> All</label>
                <label><input type="radio" name="filter" /> Code</label>
                <label><input type="radio" name="filter" /> Description</label>
                <label><input type="radio" name="filter" /> Business</label>
                <label><input type="radio" name="filter" /> City</label>
                <input style={{ marginLeft: 16, flex: 1 }} placeholder="Search..." value={customerSearch} onChange={e => setCustomerSearch(e.target.value)} />
              </div>
              <div style={{ overflowX: 'auto', maxHeight: 320 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                  <thead>
                    <tr style={{ background: '#e6e6fa' }}>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Sr#</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Code</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Title</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Business Name</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Contact Person</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Address</th>
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
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{i + 1}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{c.code}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{c.title}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{c.business}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{c.person}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{c.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ textAlign: 'center', fontFamily: 'cursive', fontSize: 36, marginBottom: 16 }}>Item Information</h1>
            {/* Item Form */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #ccc', marginBottom: 24 }}>
              <div style={{ flex: '1 1 120px' }}>
                <label>Item<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="BC45187" /></label>
              </div>
              <div style={{ flex: '2 1 220px' }}>
                <label>Description<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="BLEACH BOARD 45X187" /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Brand<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="BLEECH" /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Sheets/Pkt<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="100" /></label>
              </div>
              <div style={{ flex: '1 1 80px' }}>
                <label>Width<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="45" /></label>
              </div>
              <div style={{ flex: '1 1 80px' }}>
                <label>Length<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="187" /></label>
              </div>
              <div style={{ flex: '1 1 80px' }}>
                <label>Grams<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Constant<br />
                  <select style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Pkt/Reem<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} defaultValue="5" /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Sale Price Qt<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Sale Price Kg<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Cost Rate Qt<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Min Stock Leve<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Max Stock Leve<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Category<br /><input style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }} /></label>
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label>Type<br />
                  <select style={{ width: '100%', border: '1px solid #b0b0b0', borderRadius: 4, padding: 4 }}>
                    <option>Reel</option>
                    <option>Sheet</option>
                  </select>
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 16, justifyContent: 'flex-end' }}>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold', marginBottom: 4 }}>Save</button>
                <button style={{ padding: '8px 24px', background: '#eee', border: '1px solid #b0b0b0', borderRadius: 4, color: '#888', marginBottom: 4 }} disabled>Edit</button>
                <button style={{ padding: '8px 24px', background: '#eee', border: '1px solid #b0b0b0', borderRadius: 4, color: '#888', marginBottom: 4 }} disabled>Remove</button>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold', marginBottom: 4 }}>Refresh</button>
                <button style={{ padding: '8px 24px', background: '#e6e6fa', border: '1px solid #b0b0b0', borderRadius: 4, fontWeight: 'bold' }}>Exit</button>
              </div>
            </div>
            {/* Lookup Table */}
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #ccc' }}>
              <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 'bold' }}>Look Up</span>
                <span style={{ marginLeft: 16 }}>Search Filter:</span>
                <label><input type="radio" name="itemfilter" defaultChecked /> All</label>
                <label><input type="radio" name="itemfilter" /> Item</label>
                <label><input type="radio" name="itemfilter" /> Description</label>
                <label><input type="radio" name="itemfilter" /> Grams</label>
                <label><input type="radio" name="itemfilter" /> Brand</label>
                <label><input type="radio" name="itemfilter" /> Category</label>
                <input style={{ marginLeft: 16, flex: 1 }} placeholder="Search..." value={itemSearch} onChange={e => setItemSearch(e.target.value)} />
              </div>
              <div style={{ overflowX: 'auto', maxHeight: 320 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                  <thead>
                    <tr style={{ background: '#e6e6fa' }}>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Sr#</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Item</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Description</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Brand</th>
                      <th style={{ border: '1px solid #ccc', padding: 4 }}>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.filter(i =>
                      i.item.toLowerCase().includes(itemSearch.toLowerCase()) ||
                      i.description.toLowerCase().includes(itemSearch.toLowerCase()) ||
                      i.brand.toLowerCase().includes(itemSearch.toLowerCase()) ||
                      i.category.toLowerCase().includes(itemSearch.toLowerCase())
                    ).map((i, idx) => (
                      <tr key={i.item}>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{300 + idx}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{i.item}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{i.description}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{i.brand}</td>
                        <td style={{ border: '1px solid #ccc', padding: 4 }}>{i.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;