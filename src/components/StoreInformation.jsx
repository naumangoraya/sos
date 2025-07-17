import React, { useState, useEffect } from "react";
import { storeAPI } from '../services/api.js';

const StoreInformation = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [currentStore, setCurrentStore] = useState({
    storeName: "",
    description: "",
    status: "Active",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load stores on component mount
  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) {
        params.search = search;
        params.filter = searchType;
      }
      const response = await storeAPI.getAll(params);
      setStores(response.data.stores || []);
    } catch (err) {
      setError(err.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadStores();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStore(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setCurrentStore({
      storeName: "",
      description: "",
      status: "Active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await storeAPI.update(editingId, currentStore);
      } else {
        await storeAPI.create(currentStore);
      }

      resetForm();
      loadStores();
    } catch (err) {
      setError(err.message || 'Failed to save store');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (store) => {
    setCurrentStore({
      storeName: store.storeName || '',
      description: store.description || '',
      status: store.status || 'Active',
    });
    setIsEditing(true);
    setEditingId(store.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await storeAPI.delete(id);
        loadStores();
      } catch (err) {
        setError(err.message || 'Failed to delete store');
      }
    }
  };

  const handleRefresh = () => {
    resetForm();
    loadStores();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6">Store Information</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-2xl">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-4 mb-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Store</label>
            <input 
              name="storeName" 
              value={currentStore.storeName} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1"
              placeholder="Store name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input 
              name="description" 
              value={currentStore.description} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1"
              placeholder="Store description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select 
              name="status" 
              value={currentStore.status} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
      <div className="bg-white rounded shadow p-4 w-full max-w-2xl">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Look Up:</span>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="all" 
              checked={searchType === "all"} 
              onChange={handleSearchTypeChange} 
            /> All
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="store" 
              checked={searchType === "store"} 
              onChange={handleSearchTypeChange} 
            /> By Store
          </label>
          <input 
            type="text" 
            value={search} 
            onChange={handleSearchChange} 
            placeholder="Search..." 
            className="border rounded px-2 py-1 ml-2 flex-1"
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
          <div className="text-center py-4">Loading stores...</div>
        ) : (
          <div className="overflow-y-auto max-h-72">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Store</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Status</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stores.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-2">No stores found.</td></tr>
                ) : (
                  stores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{store.storeName}</td>
                      <td className="border px-2 py-1">{store.description || '-'}</td>
                      <td className="border px-2 py-1">{store.status}</td>
                      <td className="border px-2 py-1">
                        <button 
                          onClick={() => handleEdit(store)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(store.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreInformation; 