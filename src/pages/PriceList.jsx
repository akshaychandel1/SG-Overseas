import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PriceList.css";

const API_URL = "https://grocerrybackend.onrender.com/api/prices";
const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

export default function PriceList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    basePrice: "",
    profitLoss: "",
    gstPercent: "",
    hsnCode: "",
    taxType: "cgst_sgst",
    validTill: "",
    file: null,
    status: "inactive",
  });

  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [filterSubs, setFilterSubs] = useState([]);

  const [quickBasePrices, setQuickBasePrices] = useState({});
  const [quickProfitLoss, setQuickProfitLoss] = useState({});

  const [sortOrder, setSortOrder] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [alertBox, setAlertBox] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (alertBox.show) {
      const timer = setTimeout(() => {
        setAlertBox((prev) => ({ ...prev, show: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [alertBox.show]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) fetchItems();
  }, [categories]);

  useEffect(() => {
    if (!filterCategory) {
      setFilterSubs([]);
      setFilterSubcategory("");
      return;
    }
    const cat = categories.find((c) => c._id === filterCategory);
    setFilterSubs(cat?.subcategories || []);
    setFilterSubcategory("");
  }, [filterCategory, categories]);

  useEffect(() => {
    if (!form.category) {
      setSubcategories([]);
      setForm((prev) => ({ ...prev, subcategory: "" }));
      return;
    }
    const cat = categories.find((c) => c._id === form.category);
    setSubcategories(cat?.subcategories || []);
  }, [form.category, categories]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      if (res.data?.success) setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch categories error", err);
      showAlert("Could not fetch categories", "error");
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      if (res.data?.success) {
        const raw = res.data.data || [];
        const flat = [];
        raw.forEach((cat) => {
          cat.subcategories.forEach((sub) => {
            sub.products.forEach((p) => {
              flat.push({
                ...p,
                category: {
                  _id: cat.id,
                  name: cat.name,
                  image: cat.image,
                },
                subcategory: {
                  _id: sub.id,
                  name: sub.name,
                  image: sub.image,
                },
              });
            });
          });
        });
        flat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItems(flat);
      }
    } catch (err) {
      console.error("Fetch items error", err);
      showAlert("Could not fetch items", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setForm((p) => ({ ...p, file: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const showAlert = (message, type = "success") => {
    setAlertBox({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nameExists = items.some(
      (p) =>
        p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
        p._id !== editId
    );

    if (nameExists) {
      showAlert("❌ Product name already exists!", "error");
      setLoading(false);
      return;
    }

    try {
      if (!form.name || !form.category || !form.basePrice) {
        showAlert("Name, category & base price are required", "error");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("category", form.category);
      if (form.subcategory) {
        const sub = subcategories.find((s) => s._id === form.subcategory);
        if (sub) {
          fd.append(
            "subcategory",
            JSON.stringify({
              id: sub._id,
              name: sub.name,
              image: sub.image || "",
            })
          );
        }
      } else {
        fd.append("subcategory", JSON.stringify(null));
      }

      fd.append("basePrice", form.basePrice);
      fd.append("profitLoss", form.profitLoss || 0);
      fd.append("gstPercent", form.gstPercent || 0);
      fd.append("hsnCode", form.hsnCode || "");
      fd.append("taxType", form.taxType);
      if (form.description) fd.append("description", form.description);
      if (form.validTill) fd.append("validTill", form.validTill);
      fd.append("status", form.status);
      if (form.file) fd.append("file", form.file);

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, fd);
        showAlert("✅ Product updated successfully", "success");
      } else {
        await axios.post(API_URL, fd);
        showAlert("✅ Product added successfully", "success");
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      console.error("Save error", err);
      if (err.response?.data?.message === "Product name already exists") {
        showAlert("❌ Product name already exists!", "error");
      } else {
        showAlert("❌ Save failed!", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      subcategory: "",
      description: "",
      basePrice: "",
      profitLoss: "",
      validTill: "",
      file: null,
      status: "inactive",
    });
    setEditId(null);
    setShowModal(false);
    setShowForm(false);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      showAlert("Category name is required", "error");
      return;
    }

    try {
      setCategoryLoading(true);
      const res = await axios.post(CATEGORY_URL, {
        name: newCategoryName.trim(),
      });

      if (res.data?.success) {
        showAlert("✅ Category added successfully", "success");
        setNewCategoryName("");
        setShowCategoryModal(false);
        await fetchCategories();
      } else {
        showAlert("❌ Category add failed", "error");
      }
    } catch (err) {
      console.error("Add category error", err);
      showAlert("❌ Error while adding category", "error");
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      category: item.category?._id?.toString() || "",
      subcategory: item.subcategory?._id || "",
      description: item.description || "",
      basePrice: item.basePrice || "",
      profitLoss: item.profitLoss || 0,
      gstPercent: item.gstPercent || "",
      hsnCode: item.hsnCode || "",
      taxType: item.taxType || "cgst_sgst",
      validTill: item.validTill ? item.validTill.split("T")[0] : "",
      file: null,
      status: item.status || "inactive",
    });

    const cat = categories.find((c) => c._id === item.category?._id);
    setSubcategories(cat?.subcategories || []);
    setEditId(item._id);
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((x) => x._id !== id));
      setSelectedItems((prev) => prev.filter((x) => x !== id));
      setActiveMenu(null);
      showAlert("✅ Product deleted successfully", "success");
    } catch (err) {
      console.error("Delete error", err);
      showAlert("❌ Delete failed", "error");
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      const newStatus = item.status === "active" ? "inactive" : "active";
      await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
      setItems((prev) =>
        prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x))
      );
      showAlert(`✅ Status updated to ${newStatus}`, "success");
    } catch (err) {
      console.error("Status toggle error", err);
      showAlert("❌ Status update failed", "error");
    }
  };

  const updateLocalItemField = (id, key, value) => {
    setItems((prev) =>
      prev.map((x) => (x._id === id ? { ...x, [key]: value } : x))
    );
  };

  const handleBulkSave = async () => {
    if (!selectedItems.length) {
      showAlert("No items selected", "warning");
      return;
    }

    const updates = items
      .filter((x) => selectedItems.includes(x._id))
      .map((x) => ({
        id: x._id,
        basePrice: Number(x.basePrice),
        profitLoss: Number(x.profitLoss),
        gstPercent: Number(x.gstPercent || 0),
        hsnCode: x.hsnCode || "",
        taxType: x.taxType || "cgst_sgst",
        status: x.status,
      }));

    try {
      await axios.post(`${API_URL}/bulk-update`, { products: updates });
      showAlert("✅ Bulk save successful", "success");
      setBulkMode(false);
      setSelectedItems([]);
      fetchItems();
    } catch (err) {
      console.error("Bulk save error", err);
      showAlert("❌ Bulk save failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedItems.length) {
      showAlert("No items selected", "warning");
      return;
    }
    if (!window.confirm("Delete selected items?")) return;

    try {
      await Promise.all(
        selectedItems.map((id) => axios.delete(`${API_URL}/${id}`))
      );
      setSelectedItems([]);
      fetchItems();
      setBulkMode(false);
      showAlert("✅ Bulk delete successful", "success");
    } catch (err) {
      console.error("Bulk delete error", err);
      showAlert("❌ Bulk delete failed", "error");
    }
  };

  const updateBasePrice = async (item) => {
    const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
    if (isNaN(newBase)) {
      showAlert("Invalid Base Price", "error");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("name", item.name);
      fd.append("category", item.category?._id);
      if (item.subcategory) {
        fd.append("subcategory", JSON.stringify(item.subcategory));
      }
      fd.append("description", item.description || "");
      fd.append("basePrice", newBase);
      fd.append("profitLoss", item.profitLoss);
      fd.append("status", item.status);

      const res = await axios.put(`${API_URL}/${item._id}`, fd);
      if (res.data.success) {
        await fetchItems();
        setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
        showAlert("✅ Base price updated", "success");
      }
    } catch (err) {
      console.error(err);
      showAlert("❌ Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateProfitLoss = async (item) => {
    const diff = Number(quickProfitLoss[item._id] ?? 0);
    if (isNaN(diff)) {
      showAlert("Invalid Profit/Loss", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, {
        diff,
      });
      if (res.data.success) {
        await fetchItems();
        setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
        showAlert("✅ Profit/Loss updated", "success");
      }
    } catch (err) {
      console.error(err);
      showAlert("❌ Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const t = search.toLowerCase();
    const matchText =
      (item.name || "").toLowerCase().includes(t) ||
      (item.category?.name || "").toLowerCase().includes(t) ||
      (item.subcategory?.name || "").toLowerCase().includes(t);

    const matchCategory =
      !filterCategory || item.category?._id === filterCategory;
    const matchSub =
      !filterSubcategory || item.subcategory?._id === filterSubcategory;

    return matchText && matchCategory && matchSub;
  });

  let sortedItems = [...filteredItems];
  if (sortOrder === "low") {
    sortedItems.sort(
      (a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0)
    );
  } else if (sortOrder === "high") {
    sortedItems.sort(
      (a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0)
    );
  }

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = sortedItems.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Product Management</h1>
          <p className="header-subtitle">
            Manage your products, categories, and inventory
          </p>
        </div>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
            }}
          >
            <i className="icon-plus"></i>
            {showForm ? "Close Form" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <i className="icon-package"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{items.length}</h3>
            <p className="stat-label">Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <i className="icon-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">
              {items.filter((x) => x.status === "active").length}
            </h3>
            <p className="stat-label">Active Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <i className="icon-tag"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{categories.length}</h3>
            <p className="stat-label">Categories</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <i className="icon-filter"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{filteredItems.length}</h3>
            <p className="stat-label">Filtered Items</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-card">
        <div className="search-section">
          <div className="search-box">
            <i className="icon-search"></i>
            <input
              type="text"
              placeholder="Search products, categories..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
          <div className="filters-row">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Subcategory</label>
              <select
                value={filterSubcategory}
                onChange={(e) => setFilterSubcategory(e.target.value)}
                disabled={!filterSubs.length}
                className="filter-select"
              >
                <option value="">All Subcategories</option>
                {filterSubs.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
              >
                <option value="">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Actions</label>
              <div className="action-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => window.open(`${API_URL}/export`, "_blank")}
                >
                  <i className="icon-download"></i> Export CSV
                </button>
                <label className="btn btn-secondary">
                  <input
                    type="file"
                    accept=".csv"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      try {
                        const fd = new FormData();
                        fd.append("file", e.target.files[0]);
                        await axios.post(`${API_URL}/import`, fd);
                        showAlert("✅ Imported successfully", "success");
                        fetchItems();
                      } catch (err) {
                        showAlert("❌ Import failed", "error");
                      }
                    }}
                  />
                  <i className="icon-upload"></i> Import CSV
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bulk-actions-card">
          <div className="bulk-header">
            <h3>
              <i className="icon-check-square"></i>
              {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}{" "}
              selected
            </h3>
            <div className="bulk-buttons">
              {!bulkMode ? (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={handleBulkDelete}
                  >
                    <i className="icon-trash-2"></i> Bulk Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setBulkMode(true)}
                  >
                    <i className="icon-edit"></i> Bulk Edit
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => setBulkMode(false)}
                >
                  <i className="icon-x"></i> Cancel
                </button>
              )}
            </div>
          </div>

          {bulkMode && (
            <div className="bulk-edit-panel">
              <h4>Bulk Edit Products</h4>
              <div className="bulk-grid">
                {items
                  .filter((item) => selectedItems.includes(item._id))
                  .map((item) => (
                    <div key={item._id} className="bulk-item-card">
                      <h5>{item.name}</h5>
                      <div className="bulk-fields">
                        <div className="form-group">
                          <label>Base Price</label>
                          <input
                            type="number"
                            value={item.basePrice}
                            onChange={(e) =>
                              updateLocalItemField(
                                item._id,
                                "basePrice",
                                Number(e.target.value)
                              )
                            }
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Profit/Loss</label>
                          <input
                            type="number"
                            value={item.profitLoss}
                            onChange={(e) =>
                              updateLocalItemField(
                                item._id,
                                "profitLoss",
                                Number(e.target.value)
                              )
                            }
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>GST %</label>
                          <input
                            type="number"
                            value={item.gstPercent || ""}
                            onChange={(e) =>
                              updateLocalItemField(
                                item._id,
                                "gstPercent",
                                Number(e.target.value)
                              )
                            }
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateLocalItemField(
                                item._id,
                                "status",
                                e.target.value
                              )
                            }
                            className="form-select"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="bulk-actions">
                <button className="btn btn-primary" onClick={handleBulkSave}>
                  <i className="icon-save"></i> Save All Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={async () => {
                    if (!selectedItems.length) return;
                    for (let id of selectedItems)
                      await axios.post(`${API_URL}/copy/${id}`);
                    showAlert("✅ Selected items copied", "success");
                    fetchItems();
                  }}
                >
                  <i className="icon-copy"></i> Copy Selected
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h3>
              <i className="icon-edit-2"></i>
              {editId ? "Edit Product" : "Add New Product"}
            </h3>
            <button className="btn-icon" onClick={resetForm}>
              <i className="icon-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <div className="input-with-button">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="btn-icon-primary"
                  >
                    <i className="icon-plus"></i>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Subcategory</label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  disabled={!subcategories.length}
                  className="form-select"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Base Price *</label>
                <input
                  type="number"
                  name="basePrice"
                  value={form.basePrice}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label>Profit/Loss</label>
                <input
                  type="number"
                  name="profitLoss"
                  value={form.profitLoss}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label>GST %</label>
                <input
                  type="number"
                  name="gstPercent"
                  value={form.gstPercent}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="18"
                />
              </div>
              <div className="form-group">
                <label>HSN Code</label>
                <input
                  type="text"
                  name="hsnCode"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter HSN code"
                />
              </div>
              <div className="form-group">
                <label>Tax Type</label>
                <select
                  name="taxType"
                  value={form.taxType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="cgst_sgst">CGST + SGST</option>
                  <option value="igst">IGST</option>
                </select>
              </div>
              <div className="form-group">
                <label>Valid Till</label>
                <input
                  type="date"
                  name="validTill"
                  value={form.validTill}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                placeholder="Product description..."
              ></textarea>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="icon-loader spinner"></i>
                    Saving...
                  </>
                ) : editId ? (
                  <>
                    <i className="icon-save"></i>
                    Update Product
                  </>
                ) : (
                  <>
                    <i className="icon-plus"></i>
                    Add Product
                  </>
                )}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h3>Products List</h3>
            <p className="table-subtitle">
              Showing {currentItems.length} of {filteredItems.length} products
            </p>
          </div>
          <div className="table-actions">
            <div className="table-checkbox">
              <input
                type="checkbox"
                checked={
                  selectedItems.length === filteredItems.length &&
                  filteredItems.length > 0
                }
                onChange={() => {
                  if (selectedItems.length === filteredItems.length)
                    setSelectedItems([]);
                  else setSelectedItems(filteredItems.map((x) => x._id));
                }}
              />
              <span>Select All</span>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Base Price</th>
                <th>Profit/Loss</th>
                <th>Sale Price</th>
                <th>GST</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() =>
                        setSelectedItems((prev) =>
                          prev.includes(item._id)
                            ? prev.filter((x) => x !== item._id)
                            : [...prev, item._id]
                        )
                      }
                    />
                  </td>
                  <td>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>
                  <td>
                    <div className="table-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="image-placeholder">
                          <i className="icon-image"></i>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <strong>{item.name}</strong>
                      {item.description && (
                        <small>{item.description.substring(0, 50)}...</small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="category-info">
                      <span className="category-badge">
                        {item.category?.name || "-"}
                      </span>
                      {item.subcategory?.name && (
                        <small>{item.subcategory.name}</small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="editable-field">
                      <input
                        type="number"
                        value={
                          quickBasePrices[item._id] !== undefined
                            ? quickBasePrices[item._id]
                            : item.basePrice
                        }
                        onChange={(e) =>
                          setQuickBasePrices((p) => ({
                            ...p,
                            [item._id]: e.target.value,
                          }))
                        }
                        className="quick-input"
                      />
                      <button
                        className="btn-icon-small"
                        onClick={() => updateBasePrice(item)}
                        title="Save"
                      >
                        <i className="icon-check"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="editable-field">
                      <input
                        type="number"
                        placeholder="Change"
                        value={quickProfitLoss[item._id] ?? ""}
                        onChange={(e) =>
                          setQuickProfitLoss((p) => ({
                            ...p,
                            [item._id]: e.target.value,
                          }))
                        }
                        className="quick-input"
                      />
                      <button
                        className="btn-icon-small"
                        onClick={() => updateProfitLoss(item)}
                        title="Save"
                      >
                        <i className="icon-check"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="price-badge">
                      ₹{item.salePrice || "0.00"}
                    </span>
                  </td>
                  <td>
                    {item.gstPercent ? (
                      <span className="gst-badge">{item.gstPercent}%</span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <button
                      className={`status-badge ${item.status === "active" ? "active" : "inactive"
                        }`}
                      onClick={() => handleStatusToggle(item)}
                    >
                      {item.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon-small"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <i className="icon-edit"></i>
                      </button>
                      <button
                        className="btn-icon-small"
                        onClick={async () => {
                          await axios.post(`${API_URL}/copy/${item._id}`);
                          showAlert("✅ Product copied", "success");
                          fetchItems();
                        }}
                        title="Duplicate"
                      >
                        <i className="icon-copy"></i>
                      </button>
                      <button
                        className="btn-icon-small danger"
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >
                        <i className="icon-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <i className="icon-chevron-left"></i> Previous
            </button>
            <div className="pagination-pages">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                if (pageNum < 1 || pageNum > totalPages) return null;

                return (
                  <button
                    key={i}
                    className={`pagination-btn ${currentPage === pageNum ? "active" : ""
                      }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="pagination-dots">...</span>}
            </div>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next <i className="icon-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Category</h3>
              <button
                className="btn-icon"
                onClick={() => setShowCategoryModal(false)}
              >
                <i className="icon-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="form-input"
                  placeholder="Enter category name"
                  autoFocus
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddCategory}
                disabled={categoryLoading || !newCategoryName.trim()}
              >
                {categoryLoading ? (
                  <>
                    <i className="icon-loader spinner"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="icon-plus"></i>
                    Add Category
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {alertBox.show && (
        <div className={`alert alert-${alertBox.type}`}>
          <div className="alert-content">
            <i className={`alert-icon icon-${alertBox.type === "success" ? "check-circle" :
                alertBox.type === "error" ? "alert-circle" :
                  "info"
              }`}></i>
            <span>{alertBox.message}</span>
          </div>
          <button
            className="alert-close"
            onClick={() => setAlertBox({ ...alertBox, show: false })}
          >
            <i className="icon-x"></i>
          </button>
        </div>
      )}
    </div>
  );
}