import React, { useState } from 'react';

const ItemInformation = () => {
  const [items] = useState([
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
  ]);
  const [itemSearch, setItemSearch] = useState('');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Item Information</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Item</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="BC45187" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="BLEACH BOARD 45X187" />
          </div>
          <div>
            <label className="block text-sm font-medium">Brand</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="BLEECH" />
          </div>
          <div>
            <label className="block text-sm font-medium">Sheets/Pkt</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="100" />
          </div>
          <div>
            <label className="block text-sm font-medium">Width</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="45" />
          </div>
          <div>
            <label className="block text-sm font-medium">Length</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="187" />
          </div>
          <div>
            <label className="block text-sm font-medium">Grams</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Constant</label>
            <select className="w-full border rounded px-2 py-1">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Pkt/Reem</label>
            <input className="w-full border rounded px-2 py-1" defaultValue="5" />
          </div>
          <div>
            <label className="block text-sm font-medium">Sale Price Qt</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Sale Price Kg</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Cost Rate Qt</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Min Stock Level</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Max Stock Level</label>
            <input className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Reel</option>
              <option>Sheet</option>
            </select>
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
          <label className="mr-2"><input type="radio" name="itemfilter" defaultChecked /> All</label>
          <label className="mr-2"><input type="radio" name="itemfilter" /> Item</label>
          <label className="mr-2"><input type="radio" name="itemfilter" /> Description</label>
          <label className="mr-2"><input type="radio" name="itemfilter" /> Grams</label>
          <label className="mr-2"><input type="radio" name="itemfilter" /> Brand</label>
          <label className="mr-2"><input type="radio" name="itemfilter" /> Category</label>
          <input className="border rounded px-2 py-1 ml-2 flex-1" placeholder="Search..." value={itemSearch} onChange={e => setItemSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto max-h-80">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Sr#</th>
                <th className="border px-2 py-1">Item</th>
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Brand</th>
                <th className="border px-2 py-1">Category</th>
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
                  <td className="border px-2 py-1">{300 + idx}</td>
                  <td className="border px-2 py-1">{i.item}</td>
                  <td className="border px-2 py-1">{i.description}</td>
                  <td className="border px-2 py-1">{i.brand}</td>
                  <td className="border px-2 py-1">{i.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemInformation; 