import React, { useState, useEffect } from 'react';
import { itemAPI } from '../services/api.js';

const ItemInformation = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [currentItem, setCurrentItem] = useState({
    itemId: '',
    description: '',
    brand: '',
    sheetsPerPacket: 100,
    width: '',
    length: '',
    grams: '',
    isConstant: false,
    type: 'Reel',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load items on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (itemSearch) {
        params.search = itemSearch;
        params.filter = searchFilter;
      }
      const response = await itemAPI.getAll(params);
      setItems(response.data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadItems();
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'isConstant') {
      setCurrentItem(prev => ({
        ...prev,
        isConstant: value === 'Yes'
      }));
    } else if (name === 'sheetsPerPacket' || name === 'grams') {
      setCurrentItem(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseInt(value, 10)
      }));
    } else if (name === 'width' || name === 'length') {
      setCurrentItem(prev => ({
        ...prev,
        [name]: value === '' ? '' : parseFloat(value)
      }));
    } else {
      setCurrentItem(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setCurrentItem({
      itemId: '',
      description: '',
      brand: '',
      sheetsPerPacket: 100,
      width: '',
      length: '',
      grams: '',
      isConstant: false,
      type: 'Reel',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      // Prepare payload for backend
      const payload = {
        itemId: currentItem.itemId,
        description: currentItem.description,
        brand: currentItem.brand,
        sheetsPerPacket: currentItem.sheetsPerPacket === '' ? null : Number(currentItem.sheetsPerPacket),
        width: currentItem.width === '' ? null : Number(currentItem.width),
        length: currentItem.length === '' ? null : Number(currentItem.length),
        grams: currentItem.grams === '' ? null : Number(currentItem.grams),
        isConstant: !!currentItem.isConstant,
        type: currentItem.type,
      };
      if (isEditing) {
        await itemAPI.update(editingId, payload);
      } else {
        await itemAPI.create(payload);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setError(err.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem({
      itemId: item.itemId || '',
      description: item.description || '',
      brand: item.brand || '',
      sheetsPerPacket: item.sheetsPerPacket || 100,
      width: item.width || '',
      length: item.length || '',
      grams: item.grams || '',
      isConstant: !!item.isConstant,
      type: item.type || 'Reel',
    });
    setIsEditing(true);
    setEditingId(item.itemId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemAPI.delete(id);
        loadItems();
      } catch (err) {
        setError(err.message || 'Failed to delete item');
      }
    }
  };

  const handleRefresh = () => {
    resetForm();
    loadItems();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Item Information</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Item</label>
            <input 
              name="itemId"
              value={currentItem.itemId}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="e.g., BC45187"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <input 
              name="description"
              value={currentItem.description}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="e.g., BLEACH BOARD 45X187"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Brand</label>
            <input 
              name="brand"
              value={currentItem.brand}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="e.g., BLEECH"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sheets/Pkt</label>
            <input 
              name="sheetsPerPacket"
              type="number"
              value={currentItem.sheetsPerPacket}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Width</label>
            <input 
              name="width"
              type="number"
              value={currentItem.width}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="45"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Length</label>
            <input 
              name="length"
              type="number"
              value={currentItem.length}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="187"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Grams</label>
            <input 
              name="grams"
              type="number"
              value={currentItem.grams}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
              placeholder="Grams"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Constant</label>
            <select 
              name="isConstant"
              value={currentItem.isConstant ? 'Yes' : 'No'}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select 
              name="type"
              value={currentItem.type}
              onChange={handleInputChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="Reel">Reel</option>
              <option value="Sheet">Sheet</option>
            </select>
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
              value="itemId"
              checked={searchFilter === 'itemId'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Item
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="description"
              checked={searchFilter === 'description'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Description
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="grams"
              checked={searchFilter === 'grams'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Grams
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="filter" 
              value="brand"
              checked={searchFilter === 'brand'}
              onChange={(e) => setSearchFilter(e.target.value)}
            /> Brand
          </label>
          <input 
            className="border rounded px-2 py-1 ml-2 flex-1" 
            placeholder="Search..." 
            value={itemSearch} 
            onChange={(e) => setItemSearch(e.target.value)}
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
          <div className="text-center py-4">Loading items...</div>
        ) : (
          <div className="overflow-x-auto max-h-80">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Sr#</th>
                  <th className="border px-2 py-1">Item</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Brand</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.itemId} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{i + 1}</td>
                    <td className="border px-2 py-1">{item.itemId}</td>
                    <td className="border px-2 py-1">{item.description || '-'}</td>
                    <td className="border px-2 py-1">{item.brand || '-'}</td>
                    <td className="border px-2 py-1">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.itemId)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && !loading && (
              <div className="text-center py-4 text-gray-500">
                No items found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemInformation; 