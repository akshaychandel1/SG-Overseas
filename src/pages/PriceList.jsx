// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./PriceList.css"
// const API_URL = "https://grocerrybackend.onrender.com/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

// export default function PriceList() {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     profitLoss: "",
//      gstPercent: "",
//   hsnCode: "",
//   taxType: "cgst_sgst",
//     weightValue: "",
//   weightUnit: "kg",
//     validTill: "",
//     file: null,
//     status: "inactive",
//   });

//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubcategory, setFilterSubcategory] = useState("");
//   const [filterSubs, setFilterSubs] = useState([]);

//   // Quick edit states for inline editing
//   const [quickBasePrices, setQuickBasePrices] = useState({});
//   const [quickProfitLoss, setQuickProfitLoss] = useState({});

//   // NEW: sort state
//   const [sortOrder, setSortOrder] = useState("");
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
// const [newCategoryName, setNewCategoryName] = useState("");
// const [categoryLoading, setCategoryLoading] = useState(false);
// const [alertBox, setAlertBox] = useState({
//   show: false,
//   message: "",
//   type: "success", // success | error | warning
// });


// useEffect(() => {
//   if (alertBox.show) {
//     const timer = setTimeout(() => {
//       setAlertBox((prev) => ({ ...prev, show: false }));
//     }, 2500);

//     return () => clearTimeout(timer);
//   }
// }, [alertBox.show]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) fetchItems();
//   }, [categories]);

//   useEffect(() => {
//     if (!filterCategory) {
//       setFilterSubs([]);
//       setFilterSubcategory("");
//       return;
//     }
//     const cat = categories.find((c) => c._id === filterCategory);
//     setFilterSubs(cat?.subcategories || []);
//     setFilterSubcategory("");
//   }, [filterCategory, categories]);

//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }
//     const cat = categories.find((c) => c._id === form.category);
//     setSubcategories(cat?.subcategories || []);
//   }, [form.category, categories]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data?.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       alert("Could not fetch categories");
//     }
//   }

// const fetchItems = async () => {
//   try {
//     setLoading(true);

//     const res = await axios.get(API_URL);

//     if (res.data?.success) {
//       const raw = res.data.data || [];   // 👈 backend ka grouped data

//       const flat = [];

//       // 🔥 Backend → Frontend flatten
//       raw.forEach((cat) => {
//         cat.subcategories.forEach((sub) => {
//           sub.products.forEach((p) => {
//             flat.push({
//               ...p,

//               category: {
//                 _id: cat.id,
//                 name: cat.name,
//                 image: cat.image,
//               },

//               subcategory: {
//                 _id: sub.id,
//                 name: sub.name,
//                 image: sub.image,
//               },
//             });
//           });
//         });
//       });

//       // newest first
//       flat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setItems(flat);
//     }
//   } catch (err) {
//     console.error("Fetch items error", err);
//     alert("Could not fetch items");
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files?.length) {
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   // 🛑 Duplicate product name check (PASTE HERE)
//   const nameExists = items.some(
//     (p) =>
//       p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
//       p._id !== editId
//   );

//   if (nameExists) {
//     // alert("❌ Product name already exists!");
//     setAlertBox({
//   show: true,
//   message: "❌ Product name already exists!",
//   type: "error",
// });

//     setLoading(false);
//     return;
//   }

//   try {
      

//       if (!form.name || !form.category || !form.basePrice) {
//         alert("Name, category & base price are required");
//         setLoading(false);
//         return;
//       }

//       const fd = new FormData();
//       fd.append("name", form.name.trim());
//       fd.append("category", form.category);

//       // if (form.subcategory) {
//       //   const sub = subcategories.find((s) => s._id === form.subcategory);
//       //   if (sub) {
//       //     fd.append("subcategory[id]", sub._id);
//       //     fd.append("subcategory[name]", sub.name);
//       //     fd.append("subcategory[image]", sub.image || "");
//       //   }
//       // }
// if (form.subcategory) {
//   const sub = subcategories.find((s) => s._id === form.subcategory);
//   if (sub) {
//     fd.append(
//       "subcategory",
//       JSON.stringify({
//         id: sub._id,
//         name: sub.name,
//         image: sub.image || ""
//       })
//     );
//   }
// } else {
//   fd.append("subcategory", JSON.stringify(null));
// }

//       fd.append("basePrice", form.basePrice);
//       fd.append("profitLoss", form.profitLoss || 0);
//    const weightValue =
//   form.weightValue && Number(form.weightValue) > 0
//     ? Number(form.weightValue)
//     : 1;

// fd.append(
//   "weight",
//   JSON.stringify({
//     value: weightValue,
//     unit: form.weightUnit || "kg",
//   })
// );



//       fd.append("gstPercent", form.gstPercent || 0);
// fd.append("hsnCode", form.hsnCode || "");
// fd.append("taxType", form.taxType);

//       if (form.description) fd.append("description", form.description);
//       if (form.validTill) fd.append("validTill", form.validTill);
//       fd.append("status", form.status);
//       if (form.file) fd.append("file", form.file);

//       if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//         // alert("Updated successfully");
//         setAlertBox({
//   show: true,
//   message: "✅ Product Update successfully",
//   type: "success",
// });

//       } else {
//         await axios.post(API_URL, fd);
//         // alert("Added successfully");
//         setAlertBox({
//   show: true,
//   message: "✅ Product added successfully",
//   type: "success",
// });

//       }

//       await fetchItems();
//       resetForm();
//     } catch (err) {
//       console.error("Save error", err);
//       if (err.response?.data?.message === "Product name already exists") {
//         alert("❌ Product name already exists!");
//       } else {
//         alert("Save failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       basePrice: "",
//       profitLoss: "",
//       validTill: "",
//           weightValue: "",
//     weightUnit: "kg",
//       file: null,
//       status: "inactive",
//     });
//     setEditId(null);
//     setShowModal(false);
//     setShowForm(false);
//   };
// const handleAddCategory = async () => {
//   if (!newCategoryName.trim()) {
//     return alert("Category name is required");
//   }

//   try {
//     setCategoryLoading(true);

//     const res = await axios.post(CATEGORY_URL, {
//       name: newCategoryName.trim(),
//     });

//     if (res.data?.success) {
//       // alert("✅ Category added successfully");
//       setAlertBox({
//   show: true,
//   message: "✅ Category added successfully",
//   type: "success",
// });

//       setNewCategoryName("");
//       setShowCategoryModal(false);
//       await fetchCategories(); // ✅ dropdown auto refresh
//     } else {
//       alert("❌ Category add failed");

//     }
//   } catch (err) {
//     console.error("Add category error", err);
//     alert("❌ Error while adding category");
//   } finally {
//     setCategoryLoading(false);
//   }
// };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id || "",
//       description: item.description || "",
//       basePrice: item.basePrice || "",
//       profitLoss: item.profitLoss || 0,
//       weightValue: item.weight?.value || "",
// weightUnit: item.weight?.unit || "kg",

//       gstPercent: item.gstPercent || "",
// hsnCode: item.hsnCode || "",
// taxType: item.taxType || "cgst_sgst",

//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//       status: item.status || "inactive",
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setShowModal(true);
//     setActiveMenu(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//       setActiveMenu(null);
//     } catch (err) {
//       console.error("Delete error", err);
//       // alert("Delete failed");
//       setAlertBox({
//   show: true,
//   message: "❌ Delete failed",
//   type: "error",
// });

//     }
//   };

//   const handleStatusToggle = async (item) => {
//     try {
//       const newStatus = item.status === "active" ? "inactive" : "active";
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
//     } catch (err) {
//       console.error("Status toggle error", err);
//       alert("Status update failed");
//     }
//   };

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) return alert("No items selected");

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//   //     .map((x) => ({
//   //       id: x._id,
//   //       basePrice: Number(x.basePrice),
//   //       profitLoss: Number(x.profitLoss),
//   //        hsnCode: x.hsnCode || "",
//   // taxType: x.taxType || "cgst_sgst",
//   // status: x.status,
//   //       status: x.status,
//   //     }));
//   .map((x) => ({
//   id: x._id,
//   basePrice: Number(x.basePrice),
//   profitLoss: Number(x.profitLoss),
//   gstPercent: Number(x.gstPercent || 0),
//   hsnCode: x.hsnCode || "",
//   taxType: x.taxType || "cgst_sgst",
//   status: x.status,
// }));


//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       // alert("Bulk save successful");
//       setAlertBox({
//   show: true,
//   message: "✅ Bulk Save successfully",
//   type: "success",
// });

//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       // alert("Bulk save failed");
//       setAlertBox({
//   show: true,
//   message: "❌ Bulk Save failed",
//   type: "error",
// });

//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!selectedItems.length) return alert("No items selected");
//     if (!window.confirm("Delete selected items?")) return;

//     try {
//       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
//       setSelectedItems([]);
//       fetchItems();
//       setBulkMode(false);
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       // alert("Bulk delete failed");
//       setAlertBox({
//   show: true,
//   message: "❌ Bulk Delete failed",
//   type: "error",
// });

//     }
//   };

//   // Update Base Price inline
//   const updateBasePrice = async (item) => {
//     const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
//     if (isNaN(newBase)) return alert("Invalid Base Price");

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("name", item.name);
//       fd.append("category", item.category?._id);
//       // if (item.subcategory?.id) fd.append("subcategory", item.subcategory.id);
//       if (item.subcategory) {
//   fd.append("subcategory", JSON.stringify(item.subcategory));
// }

//       fd.append("description", item.description || "");
//       fd.append("basePrice", newBase);
//       fd.append("profitLoss", item.profitLoss);
//       fd.append("status", item.status);
//       fd.append("gstPercent", item.gstPercent || 0);
// fd.append("hsnCode", item.hsnCode || "");
// fd.append("taxType", item.taxType || "cgst_sgst");
// fd.append("weight", JSON.stringify(item.weight));

//       const res = await axios.put(`${API_URL}/${item._id}`, fd);
//       if (res.data.success) {
//         await fetchItems();
//         setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
//         // alert("Base price updated");
//         setAlertBox({
//   show: true,
//   message: "✅ Baseprice updated successfully",
//   type: "success",
// });

//       }
//     } catch (err) {
//       console.error(err);
//       // alert("Update failed");
//       setAlertBox({
//   show: true,
//   message: "❌ Update failed",
//   type: "error",
// });

//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update Profit/Loss inline using updateDiff
//   const updateProfitLoss = async (item) => {
//     const diff = Number(quickProfitLoss[item._id] ?? 0);
//     if (isNaN(diff)) return alert("Invalid Profit/Loss");

//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
//       if (res.data.success) {
//         await fetchItems();
//         setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
//         // alert("Profit/Loss updated");
//         setAlertBox({
//   show: true,
//   message: "✅ Pofit/Loss Updated",
//   type: "success",
// });

//       }
//     } catch (err) {
//       console.error(err);
//       // alert("Update failed");
//       setAlertBox({
//   show: true,
//   message: "❌ Update failed",
//   type: "error",
// });

//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtering
//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     const matchText =
//       (item.name || "").toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t);

//     const matchCategory = !filterCategory || item.category?._id === filterCategory;
//     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

//     return matchText && matchCategory && matchSub;
//   });

//   // NEW: SORTING
//   let sortedItems = [...filteredItems];
//   if (sortOrder === "low") {
//     sortedItems.sort((a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0));
//   } else if (sortOrder === "high") {
//     sortedItems.sort((a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0));
//   }

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = sortedItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

//   return (
//     <div className="container" style={styles.container}>
//       <div style={styles.header}>
//         <h1 style={styles.title}>Product Management</h1>
//       </div>

//       {/* <div style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}  className="top-bar" > */}

// <div className="top-bar">

//         <input
//           type="text"
//           placeholder="Search product, category or subcategory..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           style={styles.searchInput}
//         />

//         {/* <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//           <label style={styles.smallLabel}>Sort</label>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             style={styles.sortSelect}
//           >
//             <option value="">Default</option>
//             <option value="low">Price: Low → High</option>
//             <option value="high">Price: High → Low</option>
//           </select>
//         </div> */}

//         <button
//           style={styles.addButton}
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditId(null);
//           }}
//         >
//           {showForm ? "✖ Close" : "➕ Add Product"}
//         </button>
//       </div>

//       <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
//         <button
//           style={styles.exportButton}
//           onClick={() => window.open(`${API_URL}/export`, "_blank")}
//         >
//            Export CSV
//         </button>

//         <label style={{ cursor: "pointer" }}>
//           <input
//             type="file"
//             accept=".csv"
//             style={{ display: "none" }}
//             onChange={async (e) => {
//               try {
//                 const fd = new FormData();
//                 fd.append("file", e.target.files[0]);
//                 await axios.post(`${API_URL}/import`, fd);
//                 // alert("Imported successfully");
//                 setAlertBox({
//   show: true,
//   message: "✅ Imported successfully",
//   type: "success",
// });

//                 fetchItems();
//               } catch (err) {
//                 // alert("Import failed");
//                 setAlertBox({
//   show: true,
//   message: "❌ Import failed",
//   type: "error",
// });

//               }
//             }}
//           />
//           <span style={styles.importButton}> Import CSV</span>
//         </label>
//       </div>

//       <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
//         <select
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">Filter by Category</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={filterSubcategory}
//           onChange={(e) => setFilterSubcategory(e.target.value)}
//           disabled={!filterSubs.length}
//           style={styles.select}
//         >
//           <option value="">Filter by Subcategory</option>
//           {filterSubs.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedItems.length > 0 && (
//         <div style={styles.bulkBar}>
//           {!bulkMode ? (
//             <div style={{ display: "flex", gap: 8 }}>
//               <button style={styles.btnDelete} onClick={handleBulkDelete}>
//                 🗑 Bulk Delete
//               </button>
//               <button style={styles.btnPrimary} onClick={() => setBulkMode(true)}>
//                 ✏ Bulk Edit
//               </button>
//             </div>
//           ) : (
//             <div style={styles.bulkPanel}>
//               <h3 style={styles.bulkPanelTitle}>✏ Bulk Edit Selected Items</h3>

//               {items
//                 .filter((item) => selectedItems.includes(item._id))
//                 .map((item) => (
//                   <div key={item._id} style={styles.bulkItemBox}>
//                     <h4 style={styles.bulkItemTitle}>{item.name}</h4>

//                     <div style={styles.formGrid}>
//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Base Price</label>
//                         <input
//                           type="number"
//                           value={item.basePrice}
//                           onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
//                           style={styles.input}
//                         />
//                       </div>

//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Profit/Loss</label>
//                         <input
//                           type="number"
//                           value={item.profitLoss}
//                           onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
//                           style={styles.input}
//                         />
//                       </div>

//                       <div style={styles.formGroup}>
//   <label style={styles.label}>GST %</label>
//   <input
//     type="number"
//     value={item.gstPercent || ""}
//     onChange={(e) =>
//       updateLocalItemField(item._id, "gstPercent", Number(e.target.value))
//     }
//     style={styles.input}
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>HSN Code</label>
//   <input
//     value={item.hsnCode || ""}
//     onChange={(e) =>
//       updateLocalItemField(item._id, "hsnCode", e.target.value)
//     }
//     style={styles.input}
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>Tax Type</label>
//   <select
//     value={item.taxType || "cgst_sgst"}
//     onChange={(e) =>
//       updateLocalItemField(item._id, "taxType", e.target.value)
//     }
//     style={styles.select}
//   >
//     <option value="cgst_sgst">CGST + SGST</option>
//     <option value="igst">IGST</option>
//   </select>
// </div>



//                       <div style={styles.formGroup}>
//                         <label style={styles.label}>Status</label>
//                         <select
//                           value={item.status}
//                           onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
//                           style={styles.select}
//                         >
//                           <option value="active">active</option>
//                           <option value="inactive">inactive</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
//                 <button style={styles.btnPrimary} onClick={handleBulkSave}>
//                   ✔ Save All
//                 </button>

//                 <button
//                   style={styles.btnPrimary}
//                   onClick={async () => {
//                     if (!selectedItems.length) return alert("No items selected");

//                     for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);

//                     // alert("Selected copied");
//                     setAlertBox({
//   show: true,
//   message: "✅ Selected Copied successfully",
//   type: "success",
// });

//                     fetchItems();
//                   }}
//                 >
//                   📄 Copy Selected
//                 </button>

//                 <button
//                   style={styles.btnPrimary}
//                   onClick={async () => {
//                     if (!selectedItems.length) return alert("No items selected");

//                     const res = await axios.post(
//                       `${API_URL}/export-selected`,
//                       { ids: selectedItems },
//                       { responseType: "blob" }
//                     );

//                     const url = window.URL.createObjectURL(new Blob([res.data]));
//                     const a = document.createElement("a");
//                     a.href = url;
//                     a.download = "selected.csv";
//                     a.click();
//                   }}
//                 >
//                    Export Selected
//                 </button>

//                 <button style={styles.btnCancel} onClick={() => setBulkMode(false)}>
//                   ✖ Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {showForm && (
//         <div style={styles.formCard}>
//           <h2 style={styles.formTitle}>➕ Add / Edit Product</h2>

//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGrid}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Product Name *</label>
//                 <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
//               </div>
// {/* 
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Category *</label>
//                 <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option value={c._id} key={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div> */}
// <div style={styles.formGroup}>
//   <label style={styles.label}>Category *</label>

//   <div style={{ display: "flex", gap: 8 }}>
//     <select
//       required
//       name="category"
//       value={form.category}
//       onChange={handleChange}
//       style={{ ...styles.select, flex: 1 }}
//     >
//       <option value="">Select Category</option>
//       {categories.map((c) => (
//         <option value={c._id} key={c._id}>
//           {c.name}
//         </option>
//       ))}
//     </select>

//     <button
//       type="button"
//       onClick={() => setShowCategoryModal(true)}
//       style={{
//         background: "#0b69ff",
//         color: "#fff",
//         border: "none",
//         borderRadius: 8,
//         padding: "8px 14px",
//         cursor: "pointer",
//         fontWeight: 700,
//         height: "40px",
//       }}
//     >
//       ➕
//     </button>
//   </div>
// </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                   style={styles.select}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option value={s._id} key={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Base Price *</label>
//                 <input
//                   type="number"
//                   required
//                   name="basePrice"
//                   value={form.basePrice}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//               </div>
//                 <div style={styles.formGroup}>
//   <label style={styles.label}>Weight</label>

//   <div style={{ display: "flex", gap: 8 }}>
//     <input
//       type="number"
//       name="weightValue"
//       value={form.weightValue}
//       onChange={handleChange}
//       placeholder="Value"
//       style={{ ...styles.input, flex: 1 }}
//     />

//     <select
//       name="weightUnit"
//       value={form.weightUnit}
//       onChange={handleChange}
//       style={{ ...styles.select, width: 90 }}
//     >
//     <option value="kg">Kg</option>
// <option value="gm">Gram</option>
// <option value="ltr">Litre</option>
// <option value="ml">ML</option>
// <option value="pcs">Pcs</option>

//     </select>
//   </div>
// </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Profit/Loss</label>
//                 <input
//                   type="number"
//                   name="profitLoss"
//                   value={form.profitLoss}
//                   onChange={handleChange}
//                   style={styles.input}
//                 />
//               </div>

//               <div style={styles.formGroup}>
//   <label style={styles.label}>GST %</label>
//   <input
//     type="number"
//     name="gstPercent"
//     value={form.gstPercent}
//     onChange={handleChange}
//     style={styles.input}
//     placeholder="e.g. 5, 12, 18"
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>HSN Code</label>
//   <input
//     name="hsnCode"
//     value={form.hsnCode}
//     onChange={handleChange}
//     style={styles.input}
//     placeholder="Enter HSN"
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>Tax Type</label>
//   <select
//     name="taxType"
//     value={form.taxType}
//     onChange={handleChange}
//     style={styles.select}
//   >
//     <option value="cgst_sgst">CGST + SGST</option>
//     <option value="igst">IGST</option>
//   </select>
// </div>


//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Valid Till</label>
//                 <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Image</label>
//                 <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Status</label>
//                 <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
//             </div>

//             <div style={styles.formActions}>
//               <button style={styles.btnPrimary} disabled={loading}>
//                 {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
//               </button>

//               <button type="button" style={styles.btnCancel} onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div style={styles.tableCard}>
//         <div style={styles.tableHeader}>
//           <h2 style={styles.tableTitle}>Items</h2>
//           <span style={styles.totalCount}>Total: {filteredItems.length}</span>
//         </div>

//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                     onChange={() => {
//                       if (selectedItems.length === filteredItems.length) setSelectedItems([]);
//                       else setSelectedItems(filteredItems.map((x) => x._id));
//                     }}
//                   />
//                 </th>
//                 <th style={styles.th}>Sr</th>
//                 <th style={styles.th}>Image</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Category</th>
//                 <th style={styles.th}>Subcategory</th>
//                 <th style={styles.th}>Base Price</th>
//                 <th style={styles.th}>Weight</th>
//                 <th style={styles.th}>Profit/Loss</th>
//                 <th style={styles.th}>Sale Price</th>
//                 <th style={styles.th}>HSN</th>
// <th style={styles.th}>GST</th>
//                 <th style={styles.th}>Price Lock</th>
//                 <th style={styles.th}>Teji/Maddi</th>
//                 <th style={styles.th}>Status</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentItems.map((item, i) => (
//                 <tr key={item._id} style={styles.tr}>
//                   <td style={styles.td}>
//                     <input
//                       type="checkbox"
//                       checked={selectedItems.includes(item._id)}
//                       onChange={() =>
//                         setSelectedItems((prev) =>
//                           prev.includes(item._id) ? prev.filter((x) => x !== item._id) : [...prev, item._id]
//                         )
//                       }
//                     />
//                   </td>

//                   <td style={styles.td}>{(currentPage - 1) * itemsPerPage + (i + 1)}</td>

//                   <td style={styles.td}>
//                     {item.image ? <img src={item.image} style={styles.tableImg} alt="" /> : "No Img"}
//                   </td>

//                   <td style={styles.td}>{item.name}</td>
//                   {/* <td style={styles.td}>{item.category?.name || "-"}</td>
//                   <td style={styles.td}>{item.subcategory?.name || "-"}</td> */}
//                   <td style={styles.td}>
//   {item.category ? (
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       {item.category.image && (
//         <img
//           src={item.category.image}
//           alt="cat"
//           style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }}
//         />
//       )}
//       <span>{item.category.name}</span>
//     </div>
//   ) : "-"}
// </td>

// <td style={styles.td}>
//   {item.subcategory ? (
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       {item.subcategory.image && (
//         <img
//           src={item.subcategory.image}
//           alt="subcat"
//           style={{ width: 26, height: 26, borderRadius: 4, objectFit: "cover" }}
//         />
//       )}
//       <span>{item.subcategory.name}</span>
//     </div>
//   ) : "-"}
// </td>


//                   {/* BASE PRICE - Editable */}
//                   <td style={styles.td}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <input
//                         type="number"
//                         value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
//                         onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
//                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
//                       />
//                       <button style={styles.btnSmall} onClick={() => updateBasePrice(item)}>
//                         ✔
//                       </button>
//                     </div>
//                     <small style={{ color: "#28a745", display: "block", marginTop: 4 }}>Saved: ₹{item.basePrice}</small>
//                   </td>
//                      {/* WEIGHT */}
// <td style={styles.td}>
//   {item.weight
//     ? `${item.weight.value} ${item.weight.unit}`
//     : "1 kg"}
// </td>

//                   {/* PROFIT/LOSS - Editable */}
//                   <td style={styles.td}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <input
//                         type="number"
//                         placeholder="change"
//                         value={quickProfitLoss[item._id] ?? ""}
//                         onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
//                         style={{ ...styles.input, padding: "6px 8px", width: 80 }}
//                       />
//                       <button style={styles.btnSmall} onClick={() => updateProfitLoss(item)}>
//                         ✔
//                       </button>
//                     </div>
//                     <small style={{ color: "#666", display: "block", marginTop: 4 }}>Current: {item.profitLoss}</small>
//                   </td>

//                   {/* SALE PRICE */}
//                   <td style={styles.td}>₹{item.salePrice}</td>
//                    <td style={styles.td}>{item.hsnCode || "-"}</td>
// <td style={styles.td}>{item.gstPercent ? item.gstPercent + "%" : "-"}</td>
//                   {/* PRICE LOCK */}
//                   <td style={styles.td}>₹{item.lockedPrice}</td>

//                   {/* TEJI/MADDI */}
//                   <td style={styles.td}>
//                     {item.lockedPrice === 0 ? (
//                       <span style={{ color: "#6c757d", fontWeight: "600" }}>0</span>
//                     ) : (
//                       (() => {
//                         const teji = item.salePrice - item.lockedPrice;
//                         return (
//                           <span
//                             style={{
//                               color: teji >= 0 ? "#28a745" : "#dc3545",
//                               fontWeight: "600",
//                             }}
//                           >
//                             {teji >= 0 ? "▲" : "▼"} {Math.abs(teji)}
//                           </span>
//                         );
//                       })()
//                     )}
//                   </td>

//                   {/* STATUS */}
//                   <td style={styles.td}>
//                     <button
//                       style={item.status === "active" ? styles.statusActive : styles.statusInactive}
//                       onClick={() => handleStatusToggle(item)}
//                     >
//                       {item.status === "active" ? "Active" : "Inactive"}
//                     </button>
//                   </td>

//                   {/* ACTIONS */}
//                   <td style={styles.td}>
//                     <div style={{ position: "relative" }}>
//                       <button
//                         style={styles.menuButton}
//                         onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
//                       >
//                         ⋮
//                       </button>

//                       {activeMenu === item._id && (
//                         <div style={styles.dropdown}>
//                           <button style={styles.dropdownItem} onClick={() => handleEdit(item)}>
//                             ✏ Edit
//                           </button>

//                           <button
//                             style={styles.dropdownItem}
//                             onClick={async () => {
//                               await axios.post(`${API_URL}/copy/${item._id}`);
//                               // alert("Copied successfully");
//                               setAlertBox({
//   show: true,
//   message: "✅ Copied successfully",
//   type: "success",
// });

//                               fetchItems();
//                             }}
//                           >
//                             📄 Copy
//                           </button>

//                           <button style={styles.dropdownItemDelete} onClick={() => handleDelete(item._id)}>
//                             🗑 Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div style={styles.pagination}>
//           <button style={styles.paginationBtn} disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
//             Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               style={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             style={styles.paginationBtn}
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {showModal && (
//         <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
//           <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//             <h2 style={styles.modalTitle}>✏ Edit Product</h2>

//             <form onSubmit={handleSubmit}>
//               <div style={styles.formGrid}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Product Name *</label>
//                   <input required name="name" value={form.name} onChange={handleChange} style={styles.input} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Category *</label>
//                   <select required name="category" value={form.category} onChange={handleChange} style={styles.select}>
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option value={c._id} key={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Subcategory</label>
//                   <select
//                     name="subcategory"
//                     value={form.subcategory}
//                     onChange={handleChange}
//                     disabled={!subcategories.length}
//                     style={styles.select}
//                   >
//                     <option value="">Select Subcategory</option>
//                     {subcategories.map((s) => (
//                       <option value={s._id} key={s._id}>
//                         {s.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Base Price *</label>
//                   <input
//                     type="number"
//                     required
//                     name="basePrice"
//                     value={form.basePrice}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Profit/Loss</label>
//                   <input
//                     type="number"
//                     name="profitLoss"
//                     value={form.profitLoss}
//                     onChange={handleChange}
//                     style={styles.input}
//                   />
//                 </div>
// <div style={styles.formGroup}>
//   <label style={styles.label}>GST %</label>
//   <input
//     type="number"
//     name="gstPercent"
//     value={form.gstPercent}
//     onChange={handleChange}
//     style={styles.input}
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>HSN</label>
//   <input
//     name="hsnCode"
//     value={form.hsnCode}
//     onChange={handleChange}
//     style={styles.input}
//   />
// </div>

// <div style={styles.formGroup}>
//   <label style={styles.label}>Tax Type</label>
//   <select
//     name="taxType"
//     value={form.taxType}
//     onChange={handleChange}
//     style={styles.select}
//   >
//     <option value="cgst_sgst">CGST + SGST</option>
//     <option value="igst">IGST</option>
//   </select>
// </div>
// <div style={styles.formGroup}>
//   <label style={styles.label}>Weight</label>

//   <div style={{ display: "flex", gap: 8 }}>
//     <input
//       type="number"
//       placeholder="Value"
//       value={form.weightValue}
//       onChange={(e) => setForm({ ...form, weightValue: e.target.value })}
//       style={{ ...styles.input, flex: 1 }}
//     />

//     <select
//       value={form.weightUnit}
//       onChange={(e) => setForm({ ...form, weightUnit: e.target.value })}
//       style={{ ...styles.select, width: 90 }}
//     >
//       <option value="kg">Kg</option>
// <option value="gm">Gram</option>
// <option value="ltr">Litre</option>
// <option value="ml">ML</option>
// <option value="pcs">Pcs</option>

//     </select>
//   </div>
// </div>



//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Valid Till</label>
//                   <input type="date" name="validTill" value={form.validTill} onChange={handleChange} style={styles.input} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Image</label>
//                   <input type="file" accept="image/*" onChange={handleChange} style={styles.fileInput} />
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>Status</label>
//                   <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.label}>Description</label>
//                 <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea}></textarea>
//               </div>

//               <div style={styles.formActions}>
//                 <button style={styles.btnPrimary} disabled={loading}>
//                   {loading ? "Saving..." : "Update"}
//                 </button>

//                 <button type="button" style={styles.btnCancel} onClick={resetForm}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//       )}
//       {/* ✅ ADD CATEGORY POPUP MODAL */}
// {showCategoryModal && (
//   <div style={styles.modalOverlay} onClick={() => setShowCategoryModal(false)}>
//     <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//       <h2 style={styles.modalTitle}>➕ Add New Category</h2>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Category Name *</label>
//         <input
//           type="text"
//           value={newCategoryName}
//           onChange={(e) => setNewCategoryName(e.target.value)}
//           style={styles.input}
//           placeholder="Enter category name"
//           autoFocus
//         />
//       </div>

//       <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
//         <button
//           onClick={handleAddCategory}
//           disabled={categoryLoading}
//           style={styles.btnPrimary}
//         >
//           {categoryLoading ? "Saving..." : "Save Category"}
//         </button>

//         <button
//           onClick={() => setShowCategoryModal(false)}
//           style={styles.btnCancel}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}
// {/* ✅ PREMIUM CENTER ALERT */}
// {alertBox.show && (
//   <div className="custom-alert-overlay">
//     <div className={`custom-alert-box ${alertBox.type}`}>
//       <p>{alertBox.message}</p>
//       <button onClick={() => setAlertBox({ ...alertBox, show: false })}>
//         OK
//       </button>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

// const styles = {
//   container: {  fontFamily: "Inter, Arial, sans-serif", background: "#f6f8fa", minHeight: "100vh" },
//   header: { marginBottom: 8 },
//   title: {
//     fontSize: "22px",
//     fontWeight: 800,
//     color: "#dc3545",
//     marginBottom: "8px",
//   },



// searchInput: {
//   flex: "1",
//   padding: "12px 14px",
//   borderRadius: "12px",
//   border: "1px solid #e2e8f0",
//   background: "#fff",
//   fontSize: "14px",
//   outline: "none",
//   boxShadow: "0 1px 2px rgba(16,24,40,0.03)",
// },

// searchInput: {
//   flex: "1",
//   padding: "12px 14px",
//   borderRadius: "12px",
//   border: "1px solid #e2e8f0",
//   background: "#fff",
//   fontSize: "14px",
//   outline: "none",
//   boxShadow: "0 1px 2px rgba(16,24,40,0.03)",
// },

//   // searchInput: {
//   //   flex: "1",
//   //   minWidth: "260px",
//   //   padding: "12px 14px",
//   //   borderRadius: "12px",
//   //   border: "1px solid #e2e8f0",
//   //   background: "#fff",
//   //   fontSize: "14px",
//   //   outline: "none",
//   //   boxShadow: "0 1px 2px rgba(16,24,40,0.03)",
//   // },
//   addButton: {
//     background: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     padding: "10px 16px",
//     fontSize: "14px",
//     cursor: "pointer",
//     fontWeight: 700,
//     boxShadow: "0 6px 18px rgba(11,105,255,0.12)",
//   },
//   exportButton: {
//     background: "#fff",
//     color: "#0f1724",
//     border: "1px solid #e6eefc",
//     borderRadius: 10,
//     padding: "8px 12px",
//     cursor: "pointer",
//     fontWeight: 700,
//   },
//   importButton: {
//     background: "#fff",
//     color: "#0f1724",
//     border: "1px solid #e6eefc",
//     borderRadius: 10,
//     padding: "8px 12px",
//     cursor: "pointer",
//     fontWeight: 700,
//     marginLeft: 8,
    
//   },
//   select: {
//     padding: "10px 12px",
//     borderRadius: "10px",
//     border: "1px solid #e2e8f0",
//     background: "#fff",
//     fontSize: "13px",
//     minWidth: "160px",
//   },
//   sortSelect: {
//     padding: "10px 12px",
//     borderRadius: "10px",
//     border: "1px solid #dbeafe",
//     background: "#f8fbff",
//     fontSize: "13px",
//     minWidth: "170px",
//     fontWeight: 700,
//     color: "#0f1724",
//   },
//   smallLabel: {
//     fontSize: 12,
//     color: "#475569",
//     fontWeight: 700,
//     marginRight: 6,
//   },
//   bulkBar: {
//     background: "#eef2ff",
//     border: "1px solid #dbeafe",
//     borderRadius: "10px",
//     padding: "12px",
//     marginBottom: "12px",
//   },
//   bulkPanel: {
//     width: "100%",
//     background: "#fff",
//     border: "1px solid #eef2ff",
//     padding: "12px",
//     borderRadius: "10px",
//   },
//   bulkPanelTitle: {
//     textAlign: "center",
//     fontSize: "16px",
//     fontWeight: 700,
//     marginBottom: "10px",
//     color: "#0f1724",
//   },
//   bulkItemBox: {
//     background: "#ffffff",
//     border: "1px solid #eef2ff",
//     padding: "12px",
//     borderRadius: "8px",
//     marginBottom: "10px",
//   },
//   bulkItemTitle: {
//     fontSize: "14px",
//     fontWeight: 700,
//     marginBottom: "8px",
//     color: "#0f1724",
//   },
//   formCard: {
//     borderRadius: "12px",
//     padding: "18px",
//     marginBottom: "18px",
//     background: "#fff",
//     border: "1px solid #eef2ff",
//     boxShadow: "0 4px 16px rgba(2,6,23,0.04)",
//   },
//   formTitle: {
//     fontSize: "18px",
//     fontWeight: 800,
//     marginBottom: 16,
//     color: "#0f1724",
//   },
//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "12px",
//   },
//   formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
//   label: { fontWeight: 700, fontSize: "13px", color: "#0f1724" },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #e6eef8",
//     background: "#fff",
//     fontSize: "13px",
//     outline: "none",
//   },
//   textarea: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #e6eef8",
//     background: "#fff",
//     minHeight: 80,
//     fontSize: "13px",
//     outline: "none",
//     resize: "vertical",
//   },
//   fileInput: { padding: "6px", fontSize: "13px" },
//   formActions: { marginTop: 16, display: "flex", gap: 10 },
//   btnPrimary: {
//     background: "#ff0b0bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     cursor: "pointer",
//     fontWeight: 700,
//     fontSize: "14px",
//   },
//   btnSmall: {
//     background: "#b91010ff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     padding: "6px 12px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: 700,
//   },
//   btnDelete: {
//     background: "#ef4444",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "8px 14px",
//     cursor: "pointer",
//     fontWeight: 700,
//     fontSize: "14px",
//   },
//   btnCancel: {
//     background: "#6b7280",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     cursor: "pointer",
//     fontWeight: 700,
//     fontSize: "14px",
//   },
//   tableCard: {
//     marginTop: 16,





//   },
//   tableHeader: { display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "center" },
//   tableTitle: { fontSize: "18px", fontWeight: 800, color: "#0f1724" },
//   totalCount: { fontSize: "14px", color: "#64748b", fontWeight: 700 },
//   tableWrapper: { overflowX: "auto", border: "1px solid #eef2ff", borderRadius: "8px" },
//   table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
//   th: {
//     background: "#fbfdff",
//     // padding: "12px 10px",
//     fontWeight: 800,
//     color: "#0f1724",
//     textAlign: "left",
//     // borderBottom: "2px solid #eef2ff",
//     // whiteSpace: "nowrap",
//   },
//   tr: { borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" },
//   td: { verticalAlign: "middle" },
//   tableImg: { width: "50px", height: "50px", borderRadius: "6px", objectFit: "cover" },
//   statusActive: {
//     background: "#d1fae5",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     color: "#065f46",
//     fontWeight: 700,
//     border: "1px solid #bbf7d0",
//     cursor: "pointer",
//     fontSize: "12px",
//   },
//   statusInactive: {
//     background: "#fee2e2",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     color: "#991b1b",
//     fontWeight: 700,
//     border: "1px solid #fecaca",
//     cursor: "pointer",
//     fontSize: "12px",
//   },
//   menuButton: { background: "#fff", border: "1px solid #e6eef8", borderRadius: "6px", padding: "6px 10px", fontSize: "16px", cursor: "pointer", fontWeight: 700 },
//   dropdown: { position: "absolute", right: 0, top: 36, background: "#fff", border: "1px solid #e6eef8", borderRadius: 8, zIndex: 100, minWidth: 140, boxShadow: "0 8px 30px rgba(2,6,23,0.08)" },
//   dropdownItem: { display: "block", width: "100%", padding: "10px 14px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "background 0.12s" },
//   dropdownItemDelete: { display: "block", width: "100%", padding: "10px 14px", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#ef4444", transition: "background 0.12s" },
//   pagination: { marginTop: 16, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" },
//   paginationBtn: { padding: "8px 12px", borderRadius: 8, background: "#fff", border: "1px solid #e6eef8", cursor: "pointer", fontSize: "13px", fontWeight: 700 },
//   paginationBtnActive: { padding: "8px 12px", borderRadius: 8, background: "#0b69ff", color: "white", border: "1px solid #0b69ff", cursor: "pointer", fontSize: "13px", fontWeight: 800 },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(2,6,23,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 },
//   modal: { background: "#fff", borderRadius: 12, padding: 24, maxWidth: 700, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(2,6,23,0.12)" },
//   modalTitle: { fontSize: 20, fontWeight: 800, color: "#0f1724", marginBottom: 16, textAlign: "center" },
// };


















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./PriceList.css";

// const API_URL = "https://grocerrybackend.onrender.com/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

// export default function PriceList() {
//   // All state variables remain exactly the same
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     profitLoss: "",
//     gstPercent: "",
//     hsnCode: "",
//     taxType: "cgst_sgst",
//     weightValue: "",
//     weightUnit: "kg",
//     validTill: "",
//     file: null,
//     status: "inactive",
//   });

//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 30;

//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubcategory, setFilterSubcategory] = useState("");
//   const [filterSubs, setFilterSubs] = useState([]);

//   const [quickBasePrices, setQuickBasePrices] = useState({});
//   const [quickProfitLoss, setQuickProfitLoss] = useState({});

//   const [sortOrder, setSortOrder] = useState("");
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [categoryLoading, setCategoryLoading] = useState(false);
//   const [alertBox, setAlertBox] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   // All useEffect hooks remain exactly the same
//   useEffect(() => {
//     if (alertBox.show) {
//       const timer = setTimeout(() => {
//         setAlertBox((prev) => ({ ...prev, show: false }));
//       }, 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [alertBox.show]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) fetchItems();
//   }, [categories]);

//   useEffect(() => {
//     if (!filterCategory) {
//       setFilterSubs([]);
//       setFilterSubcategory("");
//       return;
//     }
//     const cat = categories.find((c) => c._id === filterCategory);
//     setFilterSubs(cat?.subcategories || []);
//     setFilterSubcategory("");
//   }, [filterCategory, categories]);

//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }
//     const cat = categories.find((c) => c._id === form.category);
//     setSubcategories(cat?.subcategories || []);
//   }, [form.category, categories]);

//   // All function definitions remain exactly the same
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data?.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       alert("Could not fetch categories");
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);

//       if (res.data?.success) {
//         const raw = res.data.data || [];
//         const flat = [];

//         raw.forEach((cat) => {
//           cat.subcategories.forEach((sub) => {
//             sub.products.forEach((p) => {
//               flat.push({
//                 ...p,
//                 category: {
//                   _id: cat.id,
//                   name: cat.name,
//                   image: cat.image,
//                 },
//                 subcategory: {
//                   _id: sub.id,
//                   name: sub.name,
//                   image: sub.image,
//                 },
//               });
//             });
//           });
//         });

//         flat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setItems(flat);
//       }
//     } catch (err) {
//       console.error("Fetch items error", err);
//       alert("Could not fetch items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files?.length) {
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const nameExists = items.some(
//       (p) =>
//         p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
//         p._id !== editId
//     );

//     if (nameExists) {
//       setAlertBox({
//         show: true,
//         message: "❌ Product name already exists!",
//         type: "error",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       if (!form.name || !form.category || !form.basePrice) {
//         alert("Name, category & base price are required");
//         setLoading(false);
//         return;
//       }

//       const fd = new FormData();
//       fd.append("name", form.name.trim());
//       fd.append("category", form.category);

//       if (form.subcategory) {
//         const sub = subcategories.find((s) => s._id === form.subcategory);
//         if (sub) {
//           fd.append(
//             "subcategory",
//             JSON.stringify({
//               id: sub._id,
//               name: sub.name,
//               image: sub.image || ""
//             })
//           );
//         }
//       } else {
//         fd.append("subcategory", JSON.stringify(null));
//       }

//       fd.append("basePrice", form.basePrice);
//       fd.append("profitLoss", form.profitLoss || 0);
      
//       const weightValue = form.weightValue && Number(form.weightValue) > 0
//         ? Number(form.weightValue)
//         : 1;

//       fd.append(
//         "weight",
//         JSON.stringify({
//           value: weightValue,
//           unit: form.weightUnit || "kg",
//         })
//       );

//       fd.append("gstPercent", form.gstPercent || 0);
//       fd.append("hsnCode", form.hsnCode || "");
//       fd.append("taxType", form.taxType);

//       if (form.description) fd.append("description", form.description);
//       if (form.validTill) fd.append("validTill", form.validTill);
//       fd.append("status", form.status);
//       if (form.file) fd.append("file", form.file);

//       if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//         setAlertBox({
//           show: true,
//           message: "✅ Product updated successfully",
//           type: "success",
//         });
//       } else {
//         await axios.post(API_URL, fd);
//         setAlertBox({
//           show: true,
//           message: "✅ Product added successfully",
//           type: "success",
//         });
//       }

//       await fetchItems();
//       resetForm();
//     } catch (err) {
//       console.error("Save error", err);
//       if (err.response?.data?.message === "Product name already exists") {
//         alert("❌ Product name already exists!");
//       } else {
//         alert("Save failed!");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       basePrice: "",
//       profitLoss: "",
//       gstPercent: "",
//       hsnCode: "",
//       taxType: "cgst_sgst",
//       weightValue: "",
//       weightUnit: "kg",
//       validTill: "",
//       file: null,
//       status: "inactive",
//     });
//     setEditId(null);
//     setShowModal(false);
//     setShowForm(false);
//   };

//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) {
//       return alert("Category name is required");
//     }

//     try {
//       setCategoryLoading(true);
//       const res = await axios.post(CATEGORY_URL, {
//         name: newCategoryName.trim(),
//       });

//       if (res.data?.success) {
//         setAlertBox({
//           show: true,
//           message: "✅ Category added successfully",
//           type: "success",
//         });
//         setNewCategoryName("");
//         setShowCategoryModal(false);
//         await fetchCategories();
//       } else {
//         alert("❌ Category add failed");
//       }
//     } catch (err) {
//       console.error("Add category error", err);
//       alert("❌ Error while adding category");
//     } finally {
//       setCategoryLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id || "",
//       description: item.description || "",
//       basePrice: item.basePrice || "",
//       profitLoss: item.profitLoss || 0,
//       weightValue: item.weight?.value || "",
//       weightUnit: item.weight?.unit || "kg",
//       gstPercent: item.gstPercent || "",
//       hsnCode: item.hsnCode || "",
//       taxType: item.taxType || "cgst_sgst",
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//       status: item.status || "inactive",
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setShowModal(true);
//     setActiveMenu(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//       setActiveMenu(null);
//     } catch (err) {
//       console.error("Delete error", err);
//       setAlertBox({
//         show: true,
//         message: "❌ Delete failed",
//         type: "error",
//       });
//     }
//   };

//   const handleStatusToggle = async (item) => {
//     try {
//       const newStatus = item.status === "active" ? "inactive" : "active";
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
//     } catch (err) {
//       console.error("Status toggle error", err);
//       alert("Status update failed");
//     }
//   };

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) return alert("No items selected");

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//       .map((x) => ({
//         id: x._id,
//         basePrice: Number(x.basePrice),
//         profitLoss: Number(x.profitLoss),
//         gstPercent: Number(x.gstPercent || 0),
//         hsnCode: x.hsnCode || "",
//         taxType: x.taxType || "cgst_sgst",
//         status: x.status,
//       }));

//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       setAlertBox({
//         show: true,
//         message: "✅ Bulk Save successfully",
//         type: "success",
//       });
//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       setAlertBox({
//         show: true,
//         message: "❌ Bulk Save failed",
//         type: "error",
//       });
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!selectedItems.length) return alert("No items selected");
//     if (!window.confirm("Delete selected items?")) return;

//     try {
//       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
//       setSelectedItems([]);
//       fetchItems();
//       setBulkMode(false);
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       setAlertBox({
//         show: true,
//         message: "❌ Bulk Delete failed",
//         type: "error",
//       });
//     }
//   };

//   const updateBasePrice = async (item) => {
//     const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
//     if (isNaN(newBase)) return alert("Invalid Base Price");

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("name", item.name);
//       fd.append("category", item.category?._id);
      
//       if (item.subcategory) {
//         fd.append("subcategory", JSON.stringify(item.subcategory));
//       }

//       fd.append("description", item.description || "");
//       fd.append("basePrice", newBase);
//       fd.append("profitLoss", item.profitLoss);
//       fd.append("status", item.status);
//       fd.append("gstPercent", item.gstPercent || 0);
//       fd.append("hsnCode", item.hsnCode || "");
//       fd.append("taxType", item.taxType || "cgst_sgst");
//       fd.append("weight", JSON.stringify(item.weight));

//       const res = await axios.put(`${API_URL}/${item._id}`, fd);
//       if (res.data.success) {
//         await fetchItems();
//         setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
//         setAlertBox({
//           show: true,
//           message: "✅ Base price updated successfully",
//           type: "success",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setAlertBox({
//         show: true,
//         message: "❌ Update failed",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfitLoss = async (item) => {
//     const diff = Number(quickProfitLoss[item._id] ?? 0);
//     if (isNaN(diff)) return alert("Invalid Profit/Loss");

//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
//       if (res.data.success) {
//         await fetchItems();
//         setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
//         setAlertBox({
//           show: true,
//           message: "✅ Profit/Loss Updated",
//           type: "success",
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setAlertBox({
//         show: true,
//         message: "❌ Update failed",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     const matchText =
//       (item.name || "").toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t);

//     const matchCategory = !filterCategory || item.category?._id === filterCategory;
//     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

//     return matchText && matchCategory && matchSub;
//   });

//   let sortedItems = [...filteredItems];
//   if (sortOrder === "low") {
//     sortedItems.sort((a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0));
//   } else if (sortOrder === "high") {
//     sortedItems.sort((a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0));
//   }

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = sortedItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

//   return (
//     <div className="price-list-wrapper">
//       {/* Header */}
//       <div className="page-header">
//         <h1 className="page-title">Product Management</h1>
//         <p className="page-subtitle">Manage your products, prices, and inventory</p>
//       </div>

//       {/* Alert Notification */}
//       {alertBox.show && (
//         <div className={`alert-box alert-${alertBox.type}`}>
//           <div className="alert-content">
//             <span className="alert-icon">
//               {alertBox.type === 'success' ? '✓' : 
//                alertBox.type === 'error' ? '✕' : '⚠'}
//             </span>
//             <span>{alertBox.message}</span>
//           </div>
//           <button onClick={() => setAlertBox({ ...alertBox, show: false })} className="alert-close">
//             ×
//           </button>
//         </div>
//       )}

//       {/* Top Bar - Search and Actions */}
//       <div className="top-section">
//         <div className="search-bar">
//           <div className="search-input-wrapper">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="Search products, categories or subcategories..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="search-input-field"
//             />
//           </div>
//         </div>
        
//         <div className="action-buttons">
//           <button
//             className="btn btn-export"
//             onClick={() => window.open(`${API_URL}/export`, "_blank")}
//           >
//             Export CSV
//           </button>

//           <label className="btn btn-import">
//             <input
//               type="file"
//               accept=".csv"
//               className="file-input-hidden"
//               onChange={async (e) => {
//                 try {
//                   const fd = new FormData();
//                   fd.append("file", e.target.files[0]);
//                   await axios.post(`${API_URL}/import`, fd);
//                   setAlertBox({
//                     show: true,
//                     message: "✅ Imported successfully",
//                     type: "success",
//                   });
//                   fetchItems();
//                 } catch (err) {
//                   setAlertBox({
//                     show: true,
//                     message: "❌ Import failed",
//                     type: "error",
//                   });
//                 }
//               }}
//             />
//             Import CSV
//           </label>

//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               setShowForm(!showForm);
//               setEditId(null);
//             }}
//           >
//             {showForm ? "✖ Close" : "➕ Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filter-section">
//         <div className="filter-group">
//           <select
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Filter by Category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filterSubcategory}
//             onChange={(e) => setFilterSubcategory(e.target.value)}
//             disabled={!filterSubs.length}
//             className="filter-select"
//           >
//             <option value="">Filter by Subcategory</option>
//             {filterSubs.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Sort by Price</option>
//             <option value="low">Price: Low to High</option>
//             <option value="high">Price: High to Low</option>
//           </select>
//         </div>
//       </div>

//       {/* Bulk Actions */}
//       {selectedItems.length > 0 && (
//         <div className="bulk-actions-section">
//           {!bulkMode ? (
//             <div className="bulk-buttons-container">
//               <div className="selected-count">
//                 {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
//               </div>
//               <button className="btn btn-danger" onClick={handleBulkDelete}>
//                 🗑 Delete Selected
//               </button>
//               <button className="btn btn-primary" onClick={() => setBulkMode(true)}>
//                 ✏ Bulk Edit
//               </button>
//             </div>
//           ) : (
//             <div className="bulk-edit-panel">
//               <div className="bulk-header">
//                 <h3>✏ Bulk Edit Selected Items</h3>
//                 <button onClick={() => setBulkMode(false)} className="close-bulk-btn">
//                   ×
//                 </button>
//               </div>
              
//               <div className="bulk-items-list">
//                 {items
//                   .filter((item) => selectedItems.includes(item._id))
//                   .map((item) => (
//                     <div key={item._id} className="bulk-item">
//                       <h4>{item.name}</h4>
//                       <div className="bulk-form-grid">
//                         <div className="form-group">
//                           <label>Base Price</label>
//                           <input
//                             type="number"
//                             value={item.basePrice}
//                             onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="form-group">
//                           <label>Profit/Loss</label>
//                           <input
//                             type="number"
//                             value={item.profitLoss}
//                             onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="form-group">
//                           <label>GST %</label>
//                           <input
//                             type="number"
//                             value={item.gstPercent || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "gstPercent", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="form-group">
//                           <label>HSN Code</label>
//                           <input
//                             value={item.hsnCode || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "hsnCode", e.target.value)}
//                           />
//                         </div>

//                         <div className="form-group">
//                           <label>Tax Type</label>
//                           <select
//                             value={item.taxType || "cgst_sgst"}
//                             onChange={(e) => updateLocalItemField(item._id, "taxType", e.target.value)}
//                           >
//                             <option value="cgst_sgst">CGST + SGST</option>
//                             <option value="igst">IGST</option>
//                           </select>
//                         </div>

//                         <div className="form-group">
//                           <label>Status</label>
//                           <select
//                             value={item.status}
//                             onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
//                           >
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               <div className="bulk-panel-actions">
//                 <button className="btn btn-success" onClick={handleBulkSave}>
//                   ✔ Save All Changes
//                 </button>

//                 <button
//                   className="btn btn-secondary"
//                   onClick={async () => {
//                     if (!selectedItems.length) return alert("No items selected");
//                     for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);
//                     setAlertBox({
//                       show: true,
//                       message: "✅ Selected Copied successfully",
//                       type: "success",
//                     });
//                     fetchItems();
//                   }}
//                 >
//                   📄 Copy Selected
//                 </button>

//                 <button
//                   className="btn btn-secondary"
//                   onClick={async () => {
//                     if (!selectedItems.length) return alert("No items selected");
//                     const res = await axios.post(
//                       `${API_URL}/export-selected`,
//                       { ids: selectedItems },
//                       { responseType: "blob" }
//                     );
//                     const url = window.URL.createObjectURL(new Blob([res.data]));
//                     const a = document.createElement("a");
//                     a.href = url;
//                     a.download = "selected.csv";
//                     a.click();
//                   }}
//                 >
//                   Export Selected
//                 </button>

//                 <button className="btn btn-cancel" onClick={() => setBulkMode(false)}>
//                   ✖ Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="form-section">
//           <div className="form-header">
//             <h2>{editId ? "✏ Edit Product" : "➕ Add New Product"}</h2>
//             <button onClick={resetForm} className="close-form-btn">
//               ×
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Product Name <span className="required">*</span></label>
//                 <input
//                   required
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Category <span className="required">*</span></label>
//                 <div className="category-select-wrapper">
//                   <select
//                     required
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => setShowCategoryModal(true)}
//                     className="add-category-btn"
//                     title="Add New Category"
//                   >
//                     ➕
//                   </button>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Base Price <span className="required">*</span></label>
//                 <input
//                   type="number"
//                   required
//                   name="basePrice"
//                   value={form.basePrice}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Weight</label>
//                 <div className="weight-input-wrapper">
//                   <input
//                     type="number"
//                     name="weightValue"
//                     value={form.weightValue}
//                     onChange={handleChange}
//                     placeholder="Value"
//                   />
//                   <select
//                     name="weightUnit"
//                     value={form.weightUnit}
//                     onChange={handleChange}
//                   >
//                     <option value="kg">Kg</option>
//                     <option value="gm">Gram</option>
//                     <option value="ltr">Litre</option>
//                     <option value="ml">ML</option>
//                     <option value="pcs">Pcs</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Profit/Loss</label>
//                 <input
//                   type="number"
//                   name="profitLoss"
//                   value={form.profitLoss}
//                   onChange={handleChange}
//                   placeholder="0"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>GST %</label>
//                 <input
//                   type="number"
//                   name="gstPercent"
//                   value={form.gstPercent}
//                   onChange={handleChange}
//                   placeholder="e.g., 5, 12, 18"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>HSN Code</label>
//                 <input
//                   name="hsnCode"
//                   value={form.hsnCode}
//                   onChange={handleChange}
//                   placeholder="Enter HSN code"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Tax Type</label>
//                 <select
//                   name="taxType"
//                   value={form.taxType}
//                   onChange={handleChange}
//                 >
//                   <option value="cgst_sgst">CGST + SGST</option>
//                   <option value="igst">IGST</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Valid Till</label>
//                 <input
//                   type="date"
//                   name="validTill"
//                   value={form.validTill}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Product Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="file-input"
//                 />
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Enter product description"
//               ></textarea>
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="btn btn-primary" disabled={loading}>
//                 {loading ? "Saving..." : editId ? "Update Product" : "Add Product"}
//               </button>
//               <button type="button" className="btn btn-cancel" onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="table-section">
//         <div className="table-header">
//           <h2>All Products</h2>
//           <div className="table-info">
//             <span className="total-count">Total: {filteredItems.length}</span>
//             <span className="page-info">Page {currentPage} of {totalPages}</span>
//           </div>
//         </div>

//         {loading ? (
//           <div className="loading-state">
//             <div className="spinner"></div>
//             <p>Loading products...</p>
//           </div>
//         ) : (
//           <>
//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>
//                       <input
//                         type="checkbox"
//                         checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                         onChange={() => {
//                           if (selectedItems.length === filteredItems.length) {
//                             setSelectedItems([]);
//                           } else {
//                             setSelectedItems(filteredItems.map((x) => x._id));
//                           }
//                         }}
//                       />
//                     </th>
//                     <th>Sr</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Subcategory</th>
//                     <th>Base Price</th>
//                     <th>Weight</th>
//                     <th>Profit/Loss</th>
//                     <th>Sale Price</th>
//                     <th>HSN</th>
//                     <th>GST</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((item, i) => (
//                     <tr key={item._id}>
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={selectedItems.includes(item._id)}
//                           onChange={() =>
//                             setSelectedItems((prev) =>
//                               prev.includes(item._id)
//                                 ? prev.filter((x) => x !== item._id)
//                                 : [...prev, item._id]
//                             )
//                           }
//                         />
//                       </td>
//                       <td className="serial">{(currentPage - 1) * itemsPerPage + (i + 1)}</td>
//                       <td>
//                         {item.image ? (
//                           <img src={item.image} alt={item.name} className="product-image" />
//                         ) : (
//                           <div className="no-image">No Img</div>
//                         )}
//                       </td>
//                       <td>
//                         <div className="product-cell">
//                           <div className="product-name">{item.name}</div>
//                           <div className="product-weight">
//                             {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         {item.category ? (
//                           <div className="category-cell">
//                             {item.category.image && (
//                               <img src={item.category.image} alt="cat" className="category-image" />
//                             )}
//                             <span>{item.category.name}</span>
//                           </div>
//                         ) : "-"}
//                       </td>
//                       <td>
//                         {item.subcategory ? (
//                           <div className="subcategory-cell">
//                             {item.subcategory.image && (
//                               <img src={item.subcategory.image} alt="subcat" className="subcategory-image" />
//                             )}
//                             <span>{item.subcategory.name}</span>
//                           </div>
//                         ) : "-"}
//                       </td>
//                       <td>
//                         <div className="quick-edit-group">
//                           <input
//                             type="number"
//                             value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
//                             onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
//                           />
//                           <button className="btn-small" onClick={() => updateBasePrice(item)} title="Save">
//                             ✔
//                           </button>
//                         </div>
//                         <small className="saved-price">Saved: ₹{item.basePrice}</small>
//                         <small className="hsn-info">
//                           HSN: {item.hsnCode || "-"} | GST: {item.gstPercent ? `${item.gstPercent}%` : "-"}
//                         </small>
//                       </td>
//                       <td>
//                         {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
//                       </td>
//                       <td>
//                         <div className="quick-edit-group">
//                           <input
//                             type="number"
//                             placeholder="change"
//                             value={quickProfitLoss[item._id] ?? ""}
//                             onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
//                           />
//                           <button className="btn-small" onClick={() => updateProfitLoss(item)} title="Update">
//                             ✔
//                           </button>
//                         </div>
//                         <small className="current-pl">Current: {item.profitLoss}</small>
//                       </td>
//                       <td className="sale-price">
//                         <div className="price-amount">₹{item.salePrice}</div>
//                         <div className={`profit-loss ${item.profitLoss >= 0 ? 'profit' : 'loss'}`}>
//                           {item.profitLoss >= 0 ? '+' : ''}{item.profitLoss}
//                         </div>
//                       </td>
//                       <td>{item.hsnCode || "-"}</td>
//                       <td>{item.gstPercent ? item.gstPercent + "%" : "-"}</td>
//                       <td>
//                         <button
//                           className={`status-btn ${item.status}`}
//                           onClick={() => handleStatusToggle(item)}
//                         >
//                           {item.status === "active" ? "Active" : "Inactive"}
//                         </button>
//                       </td>
//                       <td>
//                         <div className="actions-cell">
//                           <button
//                             className="menu-btn"
//                             onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
//                           >
//                             ⋮
//                           </button>

//                           {activeMenu === item._id && (
//                             <div className="dropdown-menu">
//                               <button onClick={() => handleEdit(item)}>
//                                 ✏ Edit
//                               </button>
//                               <button
//                                 onClick={async () => {
//                                   await axios.post(`${API_URL}/copy/${item._id}`);
//                                   setAlertBox({
//                                     show: true,
//                                     message: "✅ Copied successfully",
//                                     type: "success",
//                                   });
//                                   fetchItems();
//                                   setActiveMenu(null);
//                                 }}
//                               >
//                                 📄 Copy
//                               </button>
//                               <button className="delete-btn" onClick={() => handleDelete(item._id)}>
//                                 🗑 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="pagination">
//                 <button
//                   className="pagination-btn"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(1)}
//                 >
//                   ««
//                 </button>
//                 <button
//                   className="pagination-btn"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                 >
//                   «
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     className={`pagination-btn ${i + 1 === currentPage ? 'active' : ''}`}
//                     onClick={() => setCurrentPage(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   className="pagination-btn"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                 >
//                   »
//                 </button>
//                 <button
//                   className="pagination-btn"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(totalPages)}
//                 >
//                   »»
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>✏ Edit Product</h2>
//               <button onClick={() => setShowModal(false)} className="modal-close">
//                 ×
//               </button>
//             </div>
//             <div className="modal-content">
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-form-grid">
//                   <div className="form-group">
//                     <label>Product Name <span className="required">*</span></label>
//                     <input required name="name" value={form.name} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <label>Category <span className="required">*</span></label>
//                     <select required name="category" value={form.category} onChange={handleChange}>
//                       <option value="">Select Category</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Subcategory</label>
//                     <select
//                       name="subcategory"
//                       value={form.subcategory}
//                       onChange={handleChange}
//                       disabled={!subcategories.length}
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Base Price <span className="required">*</span></label>
//                     <input
//                       type="number"
//                       required
//                       name="basePrice"
//                       value={form.basePrice}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Profit/Loss</label>
//                     <input
//                       type="number"
//                       name="profitLoss"
//                       value={form.profitLoss}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>GST %</label>
//                     <input
//                       type="number"
//                       name="gstPercent"
//                       value={form.gstPercent}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>HSN Code</label>
//                     <input
//                       name="hsnCode"
//                       value={form.hsnCode}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Tax Type</label>
//                     <select
//                       name="taxType"
//                       value={form.taxType}
//                       onChange={handleChange}
//                     >
//                       <option value="cgst_sgst">CGST + SGST</option>
//                       <option value="igst">IGST</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Weight</label>
//                     <div className="weight-input-wrapper">
//                       <input
//                         type="number"
//                         placeholder="Value"
//                         value={form.weightValue}
//                         onChange={(e) => setForm({ ...form, weightValue: e.target.value })}
//                       />
//                       <select
//                         value={form.weightUnit}
//                         onChange={(e) => setForm({ ...form, weightUnit: e.target.value })}
//                       >
//                         <option value="kg">Kg</option>
//                         <option value="gm">Gram</option>
//                         <option value="ltr">Litre</option>
//                         <option value="ml">ML</option>
//                         <option value="pcs">Pcs</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Valid Till</label>
//                     <input
//                       type="date"
//                       name="validTill"
//                       value={form.validTill}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Status</label>
//                     <select
//                       name="status"
//                       value={form.status}
//                       onChange={handleChange}
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-group full-width">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     rows={3}
//                   ></textarea>
//                 </div>
//                 <div className="form-actions">
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? "Updating..." : "Update Product"}
//                   </button>
//                   <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Category Modal */}
//       {showCategoryModal && (
//         <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
//           <div className="modal small-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>➕ Add New Category</h2>
//               <button onClick={() => setShowCategoryModal(false)} className="modal-close">
//                 ×
//               </button>
//             </div>
//             <div className="modal-content">
//               <div className="form-group">
//                 <label>Category Name <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   value={newCategoryName}
//                   onChange={(e) => setNewCategoryName(e.target.value)}
//                   placeholder="Enter category name"
//                   autoFocus
//                 />
//               </div>
//               <div className="form-actions">
//                 <button
//                   onClick={handleAddCategory}
//                   disabled={categoryLoading}
//                   className="btn btn-primary"
//                 >
//                   {categoryLoading ? "Saving..." : "Save Category"}
//                 </button>
//                 <button
//                   onClick={() => setShowCategoryModal(false)}
//                   className="btn btn-cancel"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./PriceList.css";

// const API_URL = "https://grocerrybackend.onrender.com/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

// export default function PriceList() {
//   // All state variables
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     profitLoss: "",
//     gstPercent: "",
//     hsnCode: "",
//     taxType: "cgst_sgst",
//     weightValue: "",
//     weightUnit: "kg",
//     validTill: "",
//     file: null,
//     status: "inactive",
//   });

//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubcategory, setFilterSubcategory] = useState("");
//   const [filterSubs, setFilterSubs] = useState([]);

//   const [quickBasePrices, setQuickBasePrices] = useState({});
//   const [quickProfitLoss, setQuickProfitLoss] = useState({});

//   const [sortOrder, setSortOrder] = useState("");
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [categoryLoading, setCategoryLoading] = useState(false);
//   const [alertBox, setAlertBox] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   // useEffect hooks
//   useEffect(() => {
//     if (alertBox.show) {
//       const timer = setTimeout(() => {
//         setAlertBox((prev) => ({ ...prev, show: false }));
//       }, 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [alertBox.show]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) fetchItems();
//   }, [categories]);

//   useEffect(() => {
//     if (!filterCategory) {
//       setFilterSubs([]);
//       setFilterSubcategory("");
//       return;
//     }
//     const cat = categories.find((c) => c._id === filterCategory);
//     setFilterSubs(cat?.subcategories || []);
//     setFilterSubcategory("");
//   }, [filterCategory, categories]);

//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }
//     const cat = categories.find((c) => c._id === form.category);
//     setSubcategories(cat?.subcategories || []);
//   }, [form.category, categories]);

//   // Functions
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data?.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       alert("Could not fetch categories");
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);

//       if (res.data?.success) {
//         const raw = res.data.data || [];
//         const flat = [];

//         raw.forEach((cat) => {
//           cat.subcategories.forEach((sub) => {
//             sub.products.forEach((p) => {
//               flat.push({
//                 ...p,
//                 category: {
//                   _id: cat.id,
//                   name: cat.name,
//                   image: cat.image,
//                 },
//                 subcategory: {
//                   _id: sub.id,
//                   name: sub.name,
//                   image: sub.image,
//                 },
//               });
//             });
//           });
//         });

//         flat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setItems(flat);
//       }
//     } catch (err) {
//       console.error("Fetch items error", err);
//       alert("Could not fetch items");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showAlert = (message, type = "success") => {
//     setAlertBox({ show: true, message, type });
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files?.length) {
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const nameExists = items.some(
//       (p) =>
//         p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
//         p._id !== editId
//     );

//     if (nameExists) {
//       showAlert("Product name already exists!", "error");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!form.name || !form.category || !form.basePrice) {
//       showAlert("Name, category & base price are required", "warning");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name.trim());
//       fd.append("category", form.category);

//       if (form.subcategory) {
//         const sub = subcategories.find((s) => s._id === form.subcategory);
//         if (sub) {
//           fd.append(
//             "subcategory",
//             JSON.stringify({
//               id: sub._id,
//               name: sub.name,
//               image: sub.image || ""
//             })
//           );
//         }
//       } else {
//         fd.append("subcategory", JSON.stringify(null));
//       }

//       fd.append("basePrice", form.basePrice);
//       fd.append("profitLoss", form.profitLoss || 0);
      
//       const weightValue = form.weightValue && Number(form.weightValue) > 0
//         ? Number(form.weightValue)
//         : 1;

//       fd.append(
//         "weight",
//         JSON.stringify({
//           value: weightValue,
//           unit: form.weightUnit || "kg",
//         })
//       );

//       fd.append("gstPercent", form.gstPercent || 0);
//       fd.append("hsnCode", form.hsnCode || "");
//       fd.append("taxType", form.taxType);

//       if (form.description) fd.append("description", form.description);
//       if (form.validTill) fd.append("validTill", form.validTill);
//       fd.append("status", form.status);
//       if (form.file) fd.append("file", form.file);

//       if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//         showAlert("Product updated successfully", "success");
//       } else {
//         await axios.post(API_URL, fd);
//         showAlert("Product added successfully", "success");
//       }

//       await fetchItems();
//       resetForm();
//     } catch (err) {
//       console.error("Save error", err);
//       if (err.response?.data?.message === "Product name already exists") {
//         showAlert("Product name already exists!", "error");
//       } else {
//         showAlert("Save failed!", "error");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       basePrice: "",
//       profitLoss: "",
//       gstPercent: "",
//       hsnCode: "",
//       taxType: "cgst_sgst",
//       weightValue: "",
//       weightUnit: "kg",
//       validTill: "",
//       file: null,
//       status: "inactive",
//     });
//     setEditId(null);
//     setShowModal(false);
//     setShowForm(false);
//   };

//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) {
//       showAlert("Category name is required", "warning");
//       return;
//     }

//     try {
//       setCategoryLoading(true);
//       const res = await axios.post(CATEGORY_URL, {
//         name: newCategoryName.trim(),
//       });

//       if (res.data?.success) {
//         showAlert("Category added successfully", "success");
//         setNewCategoryName("");
//         setShowCategoryModal(false);
//         await fetchCategories();
//       } else {
//         showAlert("Category add failed", "error");
//       }
//     } catch (err) {
//       console.error("Add category error", err);
//       showAlert("Error while adding category", "error");
//     } finally {
//       setCategoryLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id || "",
//       description: item.description || "",
//       basePrice: item.basePrice || "",
//       profitLoss: item.profitLoss || 0,
//       weightValue: item.weight?.value || "",
//       weightUnit: item.weight?.unit || "kg",
//       gstPercent: item.gstPercent || "",
//       hsnCode: item.hsnCode || "",
//       taxType: item.taxType || "cgst_sgst",
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//       status: item.status || "inactive",
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setShowModal(true);
//     setActiveMenu(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//       setActiveMenu(null);
//       showAlert("Item deleted successfully", "success");
//     } catch (err) {
//       console.error("Delete error", err);
//       showAlert("Delete failed", "error");
//     }
//   };

//   const handleStatusToggle = async (item) => {
//     try {
//       const newStatus = item.status === "active" ? "inactive" : "active";
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
//       showAlert(`Status updated to ${newStatus}`, "success");
//     } catch (err) {
//       console.error("Status toggle error", err);
//       showAlert("Status update failed", "error");
//     }
//   };

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) {
//       showAlert("No items selected", "warning");
//       return;
//     }

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//       .map((x) => ({
//         id: x._id,
//         basePrice: Number(x.basePrice),
//         profitLoss: Number(x.profitLoss),
//         gstPercent: Number(x.gstPercent || 0),
//         hsnCode: x.hsnCode || "",
//         taxType: x.taxType || "cgst_sgst",
//         status: x.status,
//       }));

//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       showAlert("Bulk save successful", "success");
//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       showAlert("Bulk save failed", "error");
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!selectedItems.length) {
//       showAlert("No items selected", "warning");
//       return;
//     }
    
//     if (!window.confirm(`Delete ${selectedItems.length} selected items?`)) return;

//     try {
//       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
//       setSelectedItems([]);
//       fetchItems();
//       setBulkMode(false);
//       showAlert("Selected items deleted", "success");
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       showAlert("Bulk delete failed", "error");
//     }
//   };

//   const updateBasePrice = async (item) => {
//     const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
//     if (isNaN(newBase)) {
//       showAlert("Invalid Base Price", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("name", item.name);
//       fd.append("category", item.category?._id);
      
//       if (item.subcategory) {
//         fd.append("subcategory", JSON.stringify(item.subcategory));
//       }

//       fd.append("description", item.description || "");
//       fd.append("basePrice", newBase);
//       fd.append("profitLoss", item.profitLoss);
//       fd.append("status", item.status);
//       fd.append("gstPercent", item.gstPercent || 0);
//       fd.append("hsnCode", item.hsnCode || "");
//       fd.append("taxType", item.taxType || "cgst_sgst");
//       fd.append("weight", JSON.stringify(item.weight));

//       const res = await axios.put(`${API_URL}/${item._id}`, fd);
//       if (res.data.success) {
//         await fetchItems();
//         setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
//         showAlert("Base price updated", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfitLoss = async (item) => {
//     const diff = Number(quickProfitLoss[item._id] ?? 0);
//     if (isNaN(diff)) {
//       showAlert("Invalid Profit/Loss", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
//       if (res.data.success) {
//         await fetchItems();
//         setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
//         showAlert("Profit/Loss updated", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     const matchText =
//       (item.name || "").toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t);

//     const matchCategory = !filterCategory || item.category?._id === filterCategory;
//     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

//     return matchText && matchCategory && matchSub;
//   });

//   let sortedItems = [...filteredItems];
//   if (sortOrder === "low") {
//     sortedItems.sort((a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0));
//   } else if (sortOrder === "high") {
//     sortedItems.sort((a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0));
//   }

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = sortedItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

//   return (
//     <div className="price-list-container">
//       {/* Header */}
//       <div className="header">
//         <h1>Product Management</h1>
//         <p>Manage your products, prices, and inventory</p>
//       </div>

//       {/* Alert */}
//       {alertBox.show && (
//         <div className={`alert alert-${alertBox.type}`}>
//           <div className="alert-content">
//             <span className="alert-icon">
//               {alertBox.type === 'success' ? '✓' : 
//                alertBox.type === 'error' ? '✕' : '⚠'}
//             </span>
//             <span>{alertBox.message}</span>
//           </div>
//           <button onClick={() => setAlertBox({ ...alertBox, show: false })} className="alert-close">
//             ×
//           </button>
//         </div>
//       )}

//       {/* Search and Actions */}
//       <div className="top-section">
//         <div className="search-container">
//           <div className="search-box">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="Search products, categories or subcategories..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="search-input"
//             />
//           </div>
//         </div>
        
//         <div className="action-buttons">
//           <button
//             className="btn btn-export"
//             onClick={() => window.open(`${API_URL}/export`, "_blank")}
//           >
//             Export CSV
//           </button>

//           <label className="btn btn-import">
//             <input
//               type="file"
//               accept=".csv"
//               className="file-input"
//               onChange={async (e) => {
//                 try {
//                   const fd = new FormData();
//                   fd.append("file", e.target.files[0]);
//                   await axios.post(`${API_URL}/import`, fd);
//                   showAlert("Imported successfully", "success");
//                   fetchItems();
//                 } catch (err) {
//                   showAlert("Import failed", "error");
//                 }
//               }}
//             />
//             Import CSV
//           </label>

//           <button
//             className="btn btn-primary"
//             onClick={() => {
//               setShowForm(!showForm);
//               setEditId(null);
//             }}
//           >
//             {showForm ? "✖ Close" : "➕ Add Product"}
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filter-section">
//         <div className="filter-row">
//           <select
//             value={filterCategory}
//             onChange={(e) => setFilterCategory(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Filter by Category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filterSubcategory}
//             onChange={(e) => setFilterSubcategory(e.target.value)}
//             disabled={!filterSubs.length}
//             className="filter-select"
//           >
//             <option value="">Filter by Subcategory</option>
//             {filterSubs.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Sort by Price</option>
//             <option value="low">Price: Low to High</option>
//             <option value="high">Price: High to Low</option>
//           </select>
//         </div>
//       </div>

//       {/* Bulk Actions */}
//       {selectedItems.length > 0 && (
//         <div className="bulk-section">
//           {!bulkMode ? (
//             <div className="bulk-bar">
//               <div className="selected-info">
//                 {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
//               </div>
//               <div className="bulk-buttons">
//                 <button className="btn btn-danger" onClick={handleBulkDelete}>
//                   🗑 Delete Selected
//                 </button>
//                 <button className="btn btn-primary" onClick={() => setBulkMode(true)}>
//                   ✏ Bulk Edit
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="bulk-edit-container">
//               <div className="bulk-header">
//                 <h3>✏ Bulk Edit Selected Items</h3>
//                 <button onClick={() => setBulkMode(false)} className="close-bulk">
//                   ×
//                 </button>
//               </div>
              
//               <div className="bulk-items">
//                 {items
//                   .filter((item) => selectedItems.includes(item._id))
//                   .map((item) => (
//                     <div key={item._id} className="bulk-item-card">
//                       <h4>{item.name}</h4>
//                       <div className="bulk-grid">
//                         <div className="input-group">
//                           <label>Base Price</label>
//                           <input
//                             type="number"
//                             value={item.basePrice}
//                             onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="input-group">
//                           <label>Profit/Loss</label>
//                           <input
//                             type="number"
//                             value={item.profitLoss}
//                             onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="input-group">
//                           <label>GST %</label>
//                           <input
//                             type="number"
//                             value={item.gstPercent || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "gstPercent", Number(e.target.value))}
//                           />
//                         </div>

//                         <div className="input-group">
//                           <label>HSN Code</label>
//                           <input
//                             value={item.hsnCode || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "hsnCode", e.target.value)}
//                           />
//                         </div>

//                         <div className="input-group">
//                           <label>Tax Type</label>
//                           <select
//                             value={item.taxType || "cgst_sgst"}
//                             onChange={(e) => updateLocalItemField(item._id, "taxType", e.target.value)}
//                           >
//                             <option value="cgst_sgst">CGST + SGST</option>
//                             <option value="igst">IGST</option>
//                           </select>
//                         </div>

//                         <div className="input-group">
//                           <label>Status</label>
//                           <select
//                             value={item.status}
//                             onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
//                           >
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               <div className="bulk-actions-row">
//                 <button className="btn btn-success" onClick={handleBulkSave}>
//                   ✔ Save All
//                 </button>

//                 <button
//                   className="btn btn-secondary"
//                   onClick={async () => {
//                     if (!selectedItems.length) {
//                       showAlert("No items selected", "warning");
//                       return;
//                     }
//                     for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);
//                     showAlert("Selected items copied", "success");
//                     fetchItems();
//                   }}
//                 >
//                   📄 Copy Selected
//                 </button>

//                 <button
//                   className="btn btn-secondary"
//                   onClick={async () => {
//                     if (!selectedItems.length) {
//                       showAlert("No items selected", "warning");
//                       return;
//                     }
//                     const res = await axios.post(
//                       `${API_URL}/export-selected`,
//                       { ids: selectedItems },
//                       { responseType: "blob" }
//                     );
//                     const url = window.URL.createObjectURL(new Blob([res.data]));
//                     const a = document.createElement("a");
//                     a.href = url;
//                     a.download = "selected.csv";
//                     a.click();
//                   }}
//                 >
//                   Export Selected
//                 </button>

//                 <button className="btn btn-cancel" onClick={() => setBulkMode(false)}>
//                   ✖ Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="form-container">
//           <div className="form-title-row">
//             <h2>{editId ? "✏ Edit Product" : "➕ Add New Product"}</h2>
//             <button onClick={resetForm} className="close-btn">
//               ×
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Product Name <span className="required">*</span></label>
//                 <input
//                   required
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Category <span className="required">*</span></label>
//                 <div className="category-select">
//                   <select
//                     required
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => setShowCategoryModal(true)}
//                     className="add-category"
//                     title="Add New Category"
//                   >
//                     ➕
//                   </button>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Subcategory</label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Base Price <span className="required">*</span></label>
//                 <input
//                   type="number"
//                   required
//                   name="basePrice"
//                   value={form.basePrice}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Weight</label>
//                 <div className="weight-input">
//                   <input
//                     type="number"
//                     name="weightValue"
//                     value={form.weightValue}
//                     onChange={handleChange}
//                     placeholder="Value"
//                   />
//                   <select
//                     name="weightUnit"
//                     value={form.weightUnit}
//                     onChange={handleChange}
//                   >
//                     <option value="kg">Kg</option>
//                     <option value="gm">Gram</option>
//                     <option value="ltr">Litre</option>
//                     <option value="ml">ML</option>
//                     <option value="pcs">Pcs</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Profit/Loss</label>
//                 <input
//                   type="number"
//                   name="profitLoss"
//                   value={form.profitLoss}
//                   onChange={handleChange}
//                   placeholder="0"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>GST %</label>
//                 <input
//                   type="number"
//                   name="gstPercent"
//                   value={form.gstPercent}
//                   onChange={handleChange}
//                   placeholder="e.g., 5, 12, 18"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>HSN Code</label>
//                 <input
//                   name="hsnCode"
//                   value={form.hsnCode}
//                   onChange={handleChange}
//                   placeholder="Enter HSN code"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Tax Type</label>
//                 <select
//                   name="taxType"
//                   value={form.taxType}
//                   onChange={handleChange}
//                 >
//                   <option value="cgst_sgst">CGST + SGST</option>
//                   <option value="igst">IGST</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Valid Till</label>
//                 <input
//                   type="date"
//                   name="validTill"
//                   value={form.validTill}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Product Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="file-upload"
//                 />
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={3}
//                 placeholder="Enter product description"
//               ></textarea>
//             </div>

//             <div className="form-buttons">
//               <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                 {isSubmitting ? "Saving..." : editId ? "Update Product" : "Add Product"}
//               </button>
//               <button type="button" className="btn btn-cancel" onClick={resetForm}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="table-wrapper">
//         <div className="table-top">
//           <h2>All Products</h2>
//           <div className="table-stats">
//             <span className="total">Total: {filteredItems.length}</span>
//             <span className="page">Page {currentPage} of {totalPages}</span>
//           </div>
//         </div>

//         {loading ? (
//           <div className="loading">
//             <div className="spinner"></div>
//             <p>Loading products...</p>
//           </div>
//         ) : (
//           <>
//             <div className="table-responsive">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>
//                       <input
//                         type="checkbox"
//                         checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                         onChange={() => {
//                           if (selectedItems.length === filteredItems.length) {
//                             setSelectedItems([]);
//                           } else {
//                             setSelectedItems(filteredItems.map((x) => x._id));
//                           }
//                         }}
//                       />
//                     </th>
//                     <th>Sr</th>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Category</th>
//                     <th>Subcategory</th>
//                     <th>Base Price</th>
//                     <th>Weight</th>
//                     <th>Profit/Loss</th>
//                     <th>Sale Price</th>
//                     <th>HSN</th>
//                     <th>GST</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((item, i) => (
//                     <tr key={item._id}>
//                       <td>
//                         <input
//                           type="checkbox"
//                           checked={selectedItems.includes(item._id)}
//                           onChange={() =>
//                             setSelectedItems((prev) =>
//                               prev.includes(item._id)
//                                 ? prev.filter((x) => x !== item._id)
//                                 : [...prev, item._id]
//                             )
//                           }
//                         />
//                       </td>
//                       <td className="serial">{(currentPage - 1) * itemsPerPage + (i + 1)}</td>
//                       <td>
//                         {item.image ? (
//                           <img src={item.image} alt={item.name} className="product-img" />
//                         ) : (
//                           <div className="no-img">No Img</div>
//                         )}
//                       </td>
//                       <td>
//                         <div className="product-info">
//                           <div className="name">{item.name}</div>
//                           <div className="weight">
//                             {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         {item.category ? (
//                           <div className="category-info">
//                             {item.category.image && (
//                               <img src={item.category.image} alt="cat" className="cat-img" />
//                             )}
//                             <span>{item.category.name}</span>
//                           </div>
//                         ) : "-"}
//                       </td>
//                       <td>
//                         {item.subcategory ? (
//                           <div className="subcategory-info">
//                             {item.subcategory.image && (
//                               <img src={item.subcategory.image} alt="subcat" className="sub-img" />
//                             )}
//                             <span>{item.subcategory.name}</span>
//                           </div>
//                         ) : "-"}
//                       </td>
//                       <td>
//                         <div className="quick-edit">
//                           <input
//                             type="number"
//                             value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
//                             onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
//                           />
//                           <button className="btn-small" onClick={() => updateBasePrice(item)} title="Save">
//                             ✔
//                           </button>
//                         </div>
//                         <small className="saved">Saved: ₹{item.basePrice}</small>
//                         <small className="hsn-gst">
//                           HSN: {item.hsnCode || "-"} | GST: {item.gstPercent ? `${item.gstPercent}%` : "-"}
//                         </small>
//                       </td>
//                       <td>
//                         {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
//                       </td>
//                       <td>
//                         <div className="quick-edit">
//                           <input
//                             type="number"
//                             placeholder="change"
//                             value={quickProfitLoss[item._id] ?? ""}
//                             onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
//                           />
//                           <button className="btn-small" onClick={() => updateProfitLoss(item)} title="Update">
//                             ✔
//                           </button>
//                         </div>
//                         <small className="current">Current: {item.profitLoss}</small>
//                       </td>
//                       <td className="price-cell">
//                         <div className="price">₹{item.salePrice}</div>
//                         <div className={`profit-loss ${item.profitLoss >= 0 ? 'profit' : 'loss'}`}>
//                           {item.profitLoss >= 0 ? '+' : ''}{item.profitLoss}
//                         </div>
//                       </td>
//                       <td>{item.hsnCode || "-"}</td>
//                       <td>{item.gstPercent ? item.gstPercent + "%" : "-"}</td>
//                       <td>
//                         <button
//                           className={`status ${item.status}`}
//                           onClick={() => handleStatusToggle(item)}
//                         >
//                           {item.status === "active" ? "Active" : "Inactive"}
//                         </button>
//                       </td>
//                       <td>
//                         <div className="action-menu">
//                           <button
//                             className="menu-btn"
//                             onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
//                           >
//                             ⋮
//                           </button>

//                           {activeMenu === item._id && (
//                             <div className="dropdown">
//                               <button onClick={() => handleEdit(item)}>
//                                 ✏ Edit
//                               </button>
//                               <button
//                                 onClick={async () => {
//                                   await axios.post(`${API_URL}/copy/${item._id}`);
//                                   showAlert("Product copied successfully", "success");
//                                   fetchItems();
//                                   setActiveMenu(null);
//                                 }}
//                               >
//                                 📄 Copy
//                               </button>
//                               <button className="delete" onClick={() => handleDelete(item._id)}>
//                                 🗑 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="pagination">
//                 <button
//                   className="page-btn"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(1)}
//                 >
//                   ««
//                 </button>
//                 <button
//                   className="page-btn"
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                 >
//                   «
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i}
//                     className={`page-btn ${i + 1 === currentPage ? 'active' : ''}`}
//                     onClick={() => setCurrentPage(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}

//                 <button
//                   className="page-btn"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                 >
//                   »
//                 </button>
//                 <button
//                   className="page-btn"
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(totalPages)}
//                 >
//                   »»
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Edit Modal - यहाँ समस्या थी */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal" style={{ maxWidth: "900px" }}>
//             <div className="modal-header">
//               <h2>✏ Edit Product</h2>
//               <button onClick={() => setShowModal(false)} className="modal-close">
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSubmit(e);
//                 setShowModal(false);
//               }}>
//                 <div className="modal-grid">
//                   <div className="form-group">
//                     <label>Product Name <span className="required">*</span></label>
//                     <input 
//                       required 
//                       name="name" 
//                       value={form.name} 
//                       onChange={handleChange} 
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Category <span className="required">*</span></label>
//                     <select 
//                       required 
//                       name="category" 
//                       value={form.category} 
//                       onChange={handleChange}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Subcategory</label>
//                     <select
//                       name="subcategory"
//                       value={form.subcategory}
//                       onChange={handleChange}
//                       disabled={!subcategories.length}
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Base Price <span className="required">*</span></label>
//                     <input
//                       type="number"
//                       required
//                       name="basePrice"
//                       value={form.basePrice}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Profit/Loss</label>
//                     <input
//                       type="number"
//                       name="profitLoss"
//                       value={form.profitLoss}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>GST %</label>
//                     <input
//                       type="number"
//                       name="gstPercent"
//                       value={form.gstPercent}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>HSN Code</label>
//                     <input
//                       name="hsnCode"
//                       value={form.hsnCode}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Tax Type</label>
//                     <select
//                       name="taxType"
//                       value={form.taxType}
//                       onChange={handleChange}
//                     >
//                       <option value="cgst_sgst">CGST + SGST</option>
//                       <option value="igst">IGST</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Weight</label>
//                     <div className="weight-input">
//                       <input
//                         type="number"
//                         placeholder="Value"
//                         name="weightValue"
//                         value={form.weightValue}
//                         onChange={handleChange}
//                       />
//                       <select
//                         name="weightUnit"
//                         value={form.weightUnit}
//                         onChange={handleChange}
//                       >
//                         <option value="kg">Kg</option>
//                         <option value="gm">Gram</option>
//                         <option value="ltr">Litre</option>
//                         <option value="ml">ML</option>
//                         <option value="pcs">Pcs</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>Valid Till</label>
//                     <input
//                       type="date"
//                       name="validTill"
//                       value={form.validTill}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Status</label>
//                     <select
//                       name="status"
//                       value={form.status}
//                       onChange={handleChange}
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="form-group full-width">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     rows={3}
//                   ></textarea>
//                 </div>
//                 <div className="form-buttons">
//                   <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? "Updating..." : "Update Product"}
//                   </button>
//                   <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Category Modal */}
//       {showCategoryModal && (
//         <div className="modal-overlay">
//           <div className="modal small-modal">
//             <div className="modal-header">
//               <h2>➕ Add New Category</h2>
//               <button onClick={() => setShowCategoryModal(false)} className="modal-close">
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label>Category Name <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   value={newCategoryName}
//                   onChange={(e) => setNewCategoryName(e.target.value)}
//                   placeholder="Enter category name"
//                   autoFocus
//                 />
//               </div>
//               <div className="form-buttons">
//                 <button
//                   onClick={handleAddCategory}
//                   disabled={categoryLoading}
//                   className="btn btn-primary"
//                 >
//                   {categoryLoading ? "Saving..." : "Save Category"}
//                 </button>
//                 <button
//                   onClick={() => setShowCategoryModal(false)}
//                   className="btn btn-cancel"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   Copy,
//   FileUp,
//   FileDown,
//   Filter,
//   MoreVertical,
//   Check,
//   X,
//   AlertCircle,
//   CheckCircle,
//   Info,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Download,
//   Upload
// } from "lucide-react";

// const API_URL = "https://grocerrybackend.onrender.com/api/prices";
// const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

// export default function PriceList() {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     subcategory: "",
//     description: "",
//     basePrice: "",
//     profitLoss: "",
//     gstPercent: "",
//     hsnCode: "",
//     taxType: "cgst_sgst",
//     weightValue: "",
//     weightUnit: "kg",
//     validTill: "",
//     file: null,
//     status: "inactive",
//   });

//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [bulkMode, setBulkMode] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   const [filterCategory, setFilterCategory] = useState("");
//   const [filterSubcategory, setFilterSubcategory] = useState("");
//   const [filterSubs, setFilterSubs] = useState([]);

//   const [quickBasePrices, setQuickBasePrices] = useState({});
//   const [quickProfitLoss, setQuickProfitLoss] = useState({});

//   const [sortOrder, setSortOrder] = useState("");
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [categoryLoading, setCategoryLoading] = useState(false);
//   const [alertBox, setAlertBox] = useState({
//     show: false,
//     message: "",
//     type: "success",
//   });

//   useEffect(() => {
//     if (alertBox.show) {
//       const timer = setTimeout(() => {
//         setAlertBox((prev) => ({ ...prev, show: false }));
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [alertBox.show]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) fetchItems();
//   }, [categories]);

//   useEffect(() => {
//     if (!filterCategory) {
//       setFilterSubs([]);
//       setFilterSubcategory("");
//       return;
//     }
//     const cat = categories.find((c) => c._id === filterCategory);
//     setFilterSubs(cat?.subcategories || []);
//     setFilterSubcategory("");
//   }, [filterCategory, categories]);

//   useEffect(() => {
//     if (!form.category) {
//       setSubcategories([]);
//       setForm((prev) => ({ ...prev, subcategory: "" }));
//       return;
//     }
//     const cat = categories.find((c) => c._id === form.category);
//     setSubcategories(cat?.subcategories || []);
//   }, [form.category, categories]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(CATEGORY_URL);
//       if (res.data?.success) setCategories(res.data.categories || []);
//     } catch (err) {
//       console.error("Fetch categories error", err);
//       showAlert("Could not fetch categories", "error");
//     }
//   };

//   const fetchItems = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
      
//       if (res.data?.success) {
//         const raw = res.data.data || [];
//         const flat = [];

//         raw.forEach((cat) => {
//           cat.subcategories.forEach((sub) => {
//             sub.products.forEach((p) => {
//               flat.push({
//                 ...p,
//                 category: {
//                   _id: cat.id,
//                   name: cat.name,
//                   image: cat.image,
//                 },
//                 subcategory: {
//                   _id: sub.id,
//                   name: sub.name,
//                   image: sub.image,
//                 },
//               });
//             });
//           });
//         });

//         flat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setItems(flat);
//       }
//     } catch (err) {
//       console.error("Fetch items error", err);
//       showAlert("Could not fetch items", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showAlert = (message, type = "success") => {
//     setAlertBox({ show: true, message, type });
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files?.length) {
//       setForm((p) => ({ ...p, file: files[0] }));
//     } else {
//       setForm((p) => ({ ...p, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const nameExists = items.some(
//       (p) =>
//         p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
//         p._id !== editId
//     );

//     if (nameExists) {
//       showAlert("Product name already exists!", "error");
//       setIsSubmitting(false);
//       return;
//     }

//     if (!form.name || !form.category || !form.basePrice) {
//       showAlert("Name, category & base price are required", "warning");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name.trim());
//       fd.append("category", form.category);

//       if (form.subcategory) {
//         const sub = subcategories.find((s) => s._id === form.subcategory);
//         if (sub) {
//           fd.append(
//             "subcategory",
//             JSON.stringify({
//               id: sub._id,
//               name: sub.name,
//               image: sub.image || ""
//             })
//           );
//         }
//       } else {
//         fd.append("subcategory", JSON.stringify(null));
//       }

//       fd.append("basePrice", form.basePrice);
//       fd.append("profitLoss", form.profitLoss || 0);
      
//       const weightValue = form.weightValue && Number(form.weightValue) > 0
//         ? Number(form.weightValue)
//         : 1;

//       fd.append(
//         "weight",
//         JSON.stringify({
//           value: weightValue,
//           unit: form.weightUnit || "kg",
//         })
//       );

//       fd.append("gstPercent", form.gstPercent || 0);
//       fd.append("hsnCode", form.hsnCode || "");
//       fd.append("taxType", form.taxType);

//       if (form.description) fd.append("description", form.description);
//       if (form.validTill) fd.append("validTill", form.validTill);
//       fd.append("status", form.status);
//       if (form.file) fd.append("file", form.file);

//       if (editId) {
//         await axios.put(`${API_URL}/${editId}`, fd);
//         showAlert("Product updated successfully", "success");
//         setShowModal(false);
//       } else {
//         await axios.post(API_URL, fd);
//         showAlert("Product added successfully", "success");
//         setShowForm(false);
//       }

//       await fetchItems();
//       resetForm();
//     } catch (err) {
//       console.error("Save error", err);
//       if (err.response?.data?.message === "Product name already exists") {
//         showAlert("Product name already exists!", "error");
//       } else {
//         showAlert("Save failed!", "error");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       category: "",
//       subcategory: "",
//       description: "",
//       basePrice: "",
//       profitLoss: "",
//       gstPercent: "",
//       hsnCode: "",
//       taxType: "cgst_sgst",
//       weightValue: "",
//       weightUnit: "kg",
//       validTill: "",
//       file: null,
//       status: "inactive",
//     });
//     setEditId(null);
//     setShowModal(false);
//     setShowForm(false);
//   };

//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) {
//       showAlert("Category name is required", "warning");
//       return;
//     }

//     try {
//       setCategoryLoading(true);
//       const res = await axios.post(CATEGORY_URL, {
//         name: newCategoryName.trim(),
//       });

//       if (res.data?.success) {
//         showAlert("Category added successfully", "success");
//         setNewCategoryName("");
//         setShowCategoryModal(false);
//         await fetchCategories();
//       } else {
//         showAlert("Category add failed", "error");
//       }
//     } catch (err) {
//       console.error("Add category error", err);
//       showAlert("Error while adding category", "error");
//     } finally {
//       setCategoryLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name || "",
//       category: item.category?._id?.toString() || "",
//       subcategory: item.subcategory?._id || "",
//       description: item.description || "",
//       basePrice: item.basePrice || "",
//       profitLoss: item.profitLoss || 0,
//       weightValue: item.weight?.value || "",
//       weightUnit: item.weight?.unit || "kg",
//       gstPercent: item.gstPercent || "",
//       hsnCode: item.hsnCode || "",
//       taxType: item.taxType || "cgst_sgst",
//       validTill: item.validTill ? item.validTill.split("T")[0] : "",
//       file: null,
//       status: item.status || "inactive",
//     });

//     const cat = categories.find((c) => c._id === item.category?._id);
//     setSubcategories(cat?.subcategories || []);

//     setEditId(item._id);
//     setShowModal(true);
//     setActiveMenu(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setItems((prev) => prev.filter((x) => x._id !== id));
//       setSelectedItems((prev) => prev.filter((x) => x !== id));
//       setActiveMenu(null);
//       showAlert("Item deleted successfully", "success");
//     } catch (err) {
//       console.error("Delete error", err);
//       showAlert("Delete failed", "error");
//     }
//   };

//   const handleStatusToggle = async (item) => {
//     try {
//       const newStatus = item.status === "active" ? "inactive" : "active";
//       await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
//       setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
//       showAlert(`Status updated to ${newStatus}`, "success");
//     } catch (err) {
//       console.error("Status toggle error", err);
//       showAlert("Status update failed", "error");
//     }
//   };

//   const updateLocalItemField = (id, key, value) => {
//     setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
//   };

//   const handleBulkSave = async () => {
//     if (!selectedItems.length) {
//       showAlert("No items selected", "warning");
//       return;
//     }

//     const updates = items
//       .filter((x) => selectedItems.includes(x._id))
//       .map((x) => ({
//         id: x._id,
//         basePrice: Number(x.basePrice),
//         profitLoss: Number(x.profitLoss),
//         gstPercent: Number(x.gstPercent || 0),
//         hsnCode: x.hsnCode || "",
//         taxType: x.taxType || "cgst_sgst",
//         status: x.status,
//       }));

//     try {
//       await axios.post(`${API_URL}/bulk-update`, { products: updates });
//       showAlert("Bulk save successful", "success");
//       setBulkMode(false);
//       setSelectedItems([]);
//       fetchItems();
//     } catch (err) {
//       console.error("Bulk save error", err);
//       showAlert("Bulk save failed", "error");
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!selectedItems.length) {
//       showAlert("No items selected", "warning");
//       return;
//     }
    
//     if (!window.confirm(`Delete ${selectedItems.length} selected items?`)) return;

//     try {
//       await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
//       setSelectedItems([]);
//       fetchItems();
//       setBulkMode(false);
//       showAlert("Selected items deleted", "success");
//     } catch (err) {
//       console.error("Bulk delete error", err);
//       showAlert("Bulk delete failed", "error");
//     }
//   };

//   const updateBasePrice = async (item) => {
//     const newBase = Number(quickBasePrices[item._id] ?? item.basePrice);
//     if (isNaN(newBase)) {
//       showAlert("Invalid Base Price", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("name", item.name);
//       fd.append("category", item.category?._id);
      
//       if (item.subcategory) {
//         fd.append("subcategory", JSON.stringify(item.subcategory));
//       }

//       fd.append("description", item.description || "");
//       fd.append("basePrice", newBase);
//       fd.append("profitLoss", item.profitLoss);
//       fd.append("status", item.status);
//       fd.append("gstPercent", item.gstPercent || 0);
//       fd.append("hsnCode", item.hsnCode || "");
//       fd.append("taxType", item.taxType || "cgst_sgst");
//       fd.append("weight", JSON.stringify(item.weight));

//       const res = await axios.put(`${API_URL}/${item._id}`, fd);
//       if (res.data.success) {
//         await fetchItems();
//         setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
//         showAlert("Base price updated", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfitLoss = async (item) => {
//     const diff = Number(quickProfitLoss[item._id] ?? 0);
//     if (isNaN(diff)) {
//       showAlert("Invalid Profit/Loss", "error");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
//       if (res.data.success) {
//         await fetchItems();
//         setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
//         showAlert("Profit/Loss updated", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredItems = items.filter((item) => {
//     const t = search.toLowerCase();
//     const matchText =
//       (item.name || "").toLowerCase().includes(t) ||
//       (item.category?.name || "").toLowerCase().includes(t) ||
//       (item.subcategory?.name || "").toLowerCase().includes(t);

//     const matchCategory = !filterCategory || item.category?._id === filterCategory;
//     const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

//     return matchText && matchCategory && matchSub;
//   });

//   let sortedItems = [...filteredItems];
//   if (sortOrder === "low") {
//     sortedItems.sort((a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0));
//   } else if (sortOrder === "high") {
//     sortedItems.sort((a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0));
//   }

//   const indexOfLast = currentPage * itemsPerPage;
//   const currentItems = sortedItems.slice(indexOfLast - itemsPerPage, indexOfLast);
//   const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

//   // Pagination helpers
//   const getPageNumbers = () => {
//     const delta = 2;
//     const range = [];
//     const rangeWithDots = [];
//     let l;

//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
//         range.push(i);
//       }
//     }

//     range.forEach((i) => {
//       if (l) {
//         if (i - l === 2) {
//           rangeWithDots.push(l + 1);
//         } else if (i - l !== 1) {
//           rangeWithDots.push('...');
//         }
//       }
//       rangeWithDots.push(i);
//       l = i;
//     });

//     return rangeWithDots;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Product Management</h1>
//       </div>

//       {/* Alert Notification */}
//       {alertBox.show && (
//         <div className="fixed top-4 right-4 z-50 animate-fade-in">
//           <div className={`rounded-lg shadow-lg p-4 ${
//             alertBox.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
//             alertBox.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
//             'bg-yellow-50 border border-yellow-200 text-yellow-800'
//           }`}>
//             <div className="flex items-center gap-3">
//               {alertBox.type === 'success' ? (
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//               ) : alertBox.type === 'error' ? (
//                 <AlertCircle className="w-5 h-5 text-red-600" />
//               ) : (
//                 <Info className="w-5 h-5 text-yellow-600" />
//               )}
//               <p className="font-medium">{alertBox.message}</p>
//               <button
//                 onClick={() => setAlertBox({ ...alertBox, show: false })}
//                 className="ml-4 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Top Bar - Search and Actions */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products, categories..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => {
//                 setShowForm(!showForm);
//                 setEditId(null);
//               }}
//               className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               {showForm ? "Close Form" : "Add Product"}
//             </button>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => window.open(`${API_URL}/export`, "_blank")}
//                 className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 <Download className="w-4 h-4" />
//                 <span className="hidden sm:inline">Export CSV</span>
//               </button>

//               <label className="cursor-pointer">
//                 <input
//                   type="file"
//                   accept=".csv"
//                   className="hidden"
//                   onChange={async (e) => {
//                     try {
//                       const fd = new FormData();
//                       fd.append("file", e.target.files[0]);
//                       await axios.post(`${API_URL}/import`, fd);
//                       showAlert("Imported successfully", "success");
//                       fetchItems();
//                     } catch (err) {
//                       showAlert("Import failed", "error");
//                     }
//                   }}
//                 />
//                 <div className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//                   <Upload className="w-4 h-4" />
//                   <span className="hidden sm:inline">Import CSV</span>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">All Categories</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Subcategory</label>
//             <select
//               value={filterSubcategory}
//               onChange={(e) => setFilterSubcategory(e.target.value)}
//               disabled={!filterSubs.length}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
//             >
//               <option value="">All Subcategories</option>
//               {filterSubs.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Price</label>
//             <select
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Default</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Bulk Actions Bar */}
//       {selectedItems.length > 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
//           {!bulkMode ? (
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <span className="font-medium text-yellow-800">
//                   {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={handleBulkDelete}
//                   className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Delete Selected
//                 </button>
//                 <button
//                   onClick={() => setBulkMode(true)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
//                 >
//                   <Edit className="w-4 h-4" />
//                   Bulk Edit
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-800">Bulk Edit Selected Items</h3>
//                 <button
//                   onClick={() => setBulkMode(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
//                 {items
//                   .filter((item) => selectedItems.includes(item._id))
//                   .map((item) => (
//                     <div key={item._id} className="bg-white rounded-lg border p-4">
//                       <h4 className="font-medium text-gray-800 mb-3">{item.name}</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">Base Price</label>
//                           <input
//                             type="number"
//                             value={item.basePrice}
//                             onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">Profit/Loss</label>
//                           <input
//                             type="number"
//                             value={item.profitLoss}
//                             onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">GST %</label>
//                           <input
//                             type="number"
//                             value={item.gstPercent || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "gstPercent", Number(e.target.value))}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">HSN Code</label>
//                           <input
//                             value={item.hsnCode || ""}
//                             onChange={(e) => updateLocalItemField(item._id, "hsnCode", e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">Tax Type</label>
//                           <select
//                             value={item.taxType || "cgst_sgst"}
//                             onChange={(e) => updateLocalItemField(item._id, "taxType", e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           >
//                             <option value="cgst_sgst">CGST + SGST</option>
//                             <option value="igst">IGST</option>
//                           </select>
//                         </div>

//                         <div>
//                           <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
//                           <select
//                             value={item.status}
//                             onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
//                           >
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               <div className="flex flex-wrap gap-3 pt-3 border-t">
//                 <button
//                   onClick={handleBulkSave}
//                   className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   <Check className="w-4 h-4" />
//                   Save All Changes
//                 </button>

//                 <button
//                   onClick={async () => {
//                     if (!selectedItems.length) {
//                       showAlert("No items selected", "warning");
//                       return;
//                     }
//                     for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);
//                     showAlert("Selected items copied", "success");
//                     fetchItems();
//                   }}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
//                 >
//                   <Copy className="w-4 h-4" />
//                   Copy Selected
//                 </button>

//                 <button
//                   onClick={async () => {
//                     if (!selectedItems.length) {
//                       showAlert("No items selected", "warning");
//                       return;
//                     }
//                     const res = await axios.post(
//                       `${API_URL}/export-selected`,
//                       { ids: selectedItems },
//                       { responseType: "blob" }
//                     );
//                     const url = window.URL.createObjectURL(new Blob([res.data]));
//                     const a = document.createElement("a");
//                     a.href = url;
//                     a.download = "selected.csv";
//                     a.click();
//                   }}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   <FileDown className="w-4 h-4" />
//                   Export Selected
//                 </button>

//                 <button
//                   onClick={() => setBulkMode(false)}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   <X className="w-4 h-4" />
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               {editId ? "Edit Product" : "Add New Product"}
//             </h2>
//             <button
//               onClick={resetForm}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Product Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   required
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter product name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2">
//                   <select
//                     required
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => setShowCategoryModal(true)}
//                     className="px-4 py-2.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
//                     title="Add New Category"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Subcategory
//                 </label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                   disabled={!subcategories.length}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((s) => (
//                     <option key={s._id} value={s._id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Base Price <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   required
//                   name="basePrice"
//                   value={form.basePrice}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="0.00"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
//                 <div className="flex gap-2">
//                   <input
//                     type="number"
//                     name="weightValue"
//                     value={form.weightValue}
//                     onChange={handleChange}
//                     placeholder="Value"
//                     className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <select
//                     name="weightUnit"
//                     value={form.weightUnit}
//                     onChange={handleChange}
//                     className="w-24 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="kg">Kg</option>
//                     <option value="gm">Gram</option>
//                     <option value="ltr">Litre</option>
//                     <option value="ml">ML</option>
//                     <option value="pcs">Pcs</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Profit/Loss</label>
//                 <input
//                   type="number"
//                   name="profitLoss"
//                   value={form.profitLoss}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="0"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">GST %</label>
//                 <input
//                   type="number"
//                   name="gstPercent"
//                   value={form.gstPercent}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., 5, 12, 18"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">HSN Code</label>
//                 <input
//                   name="hsnCode"
//                   value={form.hsnCode}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter HSN code"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Tax Type</label>
//                 <select
//                   name="taxType"
//                   value={form.taxType}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="cgst_sgst">CGST + SGST</option>
//                   <option value="igst">IGST</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Valid Till</label>
//                 <input
//                   type="date"
//                   name="validTill"
//                   value={form.validTill}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   name="status"
//                   value={form.status}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter product description"
//               />
//             </div>

//             <div className="flex gap-3 pt-4 border-t">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Saving...
//                   </>
//                 ) : editId ? (
//                   <>
//                     <Check className="w-4 h-4" />
//                     Update Product
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-4 h-4" />
//                     Add Product
//                   </>
//                 )}
//               </button>
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table - FIXED COLUMN WIDTHS */}
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <div className="px-6 py-4 border-b">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 Showing {currentItems.length} of {filteredItems.length} products
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="py-20 flex items-center justify-center">
//             <div className="text-center">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
//               <p className="text-gray-600">Loading products...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="bg-gray-50 border-b">
//                     <th className="py-3 px-3 text-left w-12">
//                       <input
//                         type="checkbox"
//                         checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                         onChange={() => {
//                           if (selectedItems.length === filteredItems.length) {
//                             setSelectedItems([]);
//                           } else {
//                             setSelectedItems(filteredItems.map((x) => x._id));
//                           }
//                         }}
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-42">
//                       Product
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
//                       Category
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-34">
//                       Base Price
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-34">
//                       Sale Price
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
//                       Status
//                     </th>
//                     <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {currentItems.map((item, i) => (
//                     <tr key={item._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="py-4 px-3 w-12">
//                         <input
//                           type="checkbox"
//                           checked={selectedItems.includes(item._id)}
//                           onChange={() =>
//                             setSelectedItems((prev) =>
//                               prev.includes(item._id)
//                                 ? prev.filter((x) => x !== item._id)
//                                 : [...prev, item._id]
//                             )
//                           }
//                           className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                         />
//                       </td>
//                       <td className="py-4 px-3 w-42">
//                         <div className="flex items-center gap-3">
//                           <div className="flex-shrink-0">
//                             {item.image ? (
//                               <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="w-10 h-10 rounded-lg object-cover"
//                               />
//                             ) : (
//                               <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-gray-400 text-xs">No img</span>
//                               </div>
//                             )}
//                           </div>
//                           <div className="min-w-0">
//                             <div className="font-medium text-gray-900 truncate">{item.name}</div>
//                             <div className="text-sm text-gray-500 truncate">
//                               {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-3 w-32">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2">
//                             {item.category?.image && (
//                               <img
//                                 src={item.category.image}
//                                 alt={item.category.name}
//                                 className="w-5 h-5 rounded-full object-cover"
//                               />
//                             )}
//                             <span className="text-sm font-medium text-gray-900 truncate">
//                               {item.category?.name || "-"}
//                             </span>
//                           </div>
//                           {item.subcategory && (
//                             <div className="flex items-center gap-2 text-xs text-gray-500">
//                               {item.subcategory.image && (
//                                 <img
//                                   src={item.subcategory.image}
//                                   alt={item.subcategory.name}
//                                   className="w-4 h-4 rounded-full object-cover"
//                                 />
//                               )}
//                               <span className="truncate">{item.subcategory.name}</span>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="py-4 px-3 w-34">
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="number"
//                               value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
//                               onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
//                               className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm"
//                             />
//                             <button
//                               onClick={() => updateBasePrice(item)}
//                               className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
//                               title="Save"
//                             >
//                               <Check className="w-3 h-3" />
//                             </button>
//                           </div>
//                           <div className="text-xs text-gray-500 truncate">
//                             HSN: {item.hsnCode || "-"} | GST: {item.gstPercent ? `${item.gstPercent}%` : "-"}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-3 w-34">
//                         <div className="space-y-2">
//                           <div className="text-lg font-semibold text-gray-900">
//                             ₹{item.salePrice}
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <div className="text-sm">
//                               <div className="flex items-center gap-2 mt-1">
//                                 <input
//                                   type="number"
//                                   placeholder="Change"
//                                   value={quickProfitLoss[item._id] ?? ""}
//                                   onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
//                                   className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
//                                 />
//                                 <button
//                                   onClick={() => updateProfitLoss(item)}
//                                   className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
//                                   title="Update"
//                                 >
//                                   <Check className="w-3 h-3" />
//                                 </button>
//                               </div>
//                               <div className={`text-xs mt-1 font-medium ${item.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                                 {item.profitLoss >= 0 ? '+' : ''}{item.profitLoss}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-3 w-24">
//                         <button
//                           onClick={() => handleStatusToggle(item)}
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             item.status === "active"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {item.status === "active" ? "Active" : "Inactive"}
//                         </button>
//                       </td>
//                       <td className="py-4 px-3 w-20">
//                         <div className="relative">
//                           <button
//                             onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
//                             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                           >
//                             <MoreVertical className="w-4 h-4 text-gray-600" />
//                           </button>
//                           {activeMenu === item._id && (
//                             <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
//                               <button
//                                 onClick={() => {
//                                   handleEdit(item);
//                                   setActiveMenu(null);
//                                 }}
//                                 className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                               >
//                                 <Edit className="w-4 h-4" />
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={async () => {
//                                   await axios.post(`${API_URL}/copy/${item._id}`);
//                                   showAlert("Product copied successfully", "success");
//                                   fetchItems();
//                                   setActiveMenu(null);
//                                 }}
//                                 className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                               >
//                                 <Copy className="w-4 h-4" />
//                                 Duplicate
//                               </button>
//                               <button
//                                 onClick={() => {
//                                   handleDelete(item._id);
//                                   setActiveMenu(null);
//                                 }}
//                                 className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-6 py-4 border-t">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div className="text-sm text-gray-600">
//                     Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                     {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{" "}
//                     {filteredItems.length} entries
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setCurrentPage(1)}
//                       disabled={currentPage === 1}
//                       className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronsLeft className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                     </button>
                    
//                     <div className="flex items-center gap-1">
//                       {getPageNumbers().map((pageNum, index) => (
//                         <button
//                           key={index}
//                           onClick={() => {
//                             if (pageNum !== '...') setCurrentPage(pageNum);
//                           }}
//                           className={`min-w-[40px] h-10 rounded-lg ${
//                             currentPage === pageNum
//                               ? 'bg-blue-600 text-white'
//                               : pageNum === '...'
//                               ? 'text-gray-400 cursor-default'
//                               : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
//                           }`}
//                           disabled={pageNum === '...'}
//                         >
//                           {pageNum}
//                         </button>
//                       ))}
//                     </div>

//                     <button
//                       onClick={() => setCurrentPage(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => setCurrentPage(totalPages)}
//                       disabled={currentPage === totalPages}
//                       className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <ChevronsRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
//           <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Product Name
//                     </label>
//                     <input
//                       required
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Category
//                     </label>
//                     <select
//                       required
//                       name="category"
//                       value={form.category}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Subcategory
//                     </label>
//                     <select
//                       name="subcategory"
//                       value={form.subcategory}
//                       onChange={handleChange}
//                       disabled={!subcategories.length}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
//                     >
//                       <option value="">Select Subcategory</option>
//                       {subcategories.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Base Price
//                     </label>
//                     <input
//                       type="number"
//                       required
//                       name="basePrice"
//                       value={form.basePrice}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Profit/Loss
//                     </label>
//                     <input
//                       type="number"
//                       name="profitLoss"
//                       value={form.profitLoss}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       GST %
//                     </label>
//                     <input
//                       type="number"
//                       name="gstPercent"
//                       value={form.gstPercent}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       HSN Code
//                     </label>
//                     <input
//                       name="hsnCode"
//                       value={form.hsnCode}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Tax Type
//                     </label>
//                     <select
//                       name="taxType"
//                       value={form.taxType}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="cgst_sgst">CGST + SGST</option>
//                       <option value="igst">IGST</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Weight
//                     </label>
//                     <div className="flex gap-2">
//                       <input
//                         type="number"
//                         placeholder="Value"
//                         name="weightValue"
//                         value={form.weightValue}
//                         onChange={handleChange}
//                         className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       <select
//                         name="weightUnit"
//                         value={form.weightUnit}
//                         onChange={handleChange}
//                         className="w-24 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="kg">Kg</option>
//                         <option value="gm">Gram</option>
//                         <option value="ltr">Litre</option>
//                         <option value="ml">ML</option>
//                         <option value="pcs">Pcs</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Valid Till
//                     </label>
//                     <input
//                       type="date"
//                       name="validTill"
//                       value={form.validTill}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Status
//                     </label>
//                     <select
//                       name="status"
//                       value={form.status}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div className="flex gap-3 pt-4 border-t">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Updating...
//                       </>
//                     ) : (
//                       "Update Product"
//                     )}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Category Modal */}
//       {showCategoryModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="px-6 py-4 border-b">
//               <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
//             </div>
//             <div className="p-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category Name
//                   </label>
//                   <input
//                     type="text"
//                     value={newCategoryName}
//                     onChange={(e) => setNewCategoryName(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter category name"
//                     autoFocus
//                   />
//                 </div>
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={handleAddCategory}
//                     disabled={categoryLoading}
//                     className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     {categoryLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save Category"
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setShowCategoryModal(false)}
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



























import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Upload,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";

const API_URL = "https://grocerrybackend.onrender.com/api/prices";
const CATEGORY_URL = "https://grocerrybackend.onrender.com/api/categories";

export default function PriceList() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    weightValue: "",
    weightUnit: "kg",
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
  const itemsPerPage = 15;

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

  const [showFilters, setShowFilters] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({
    product: true,
    category: true,
    basePrice: true,
    salePrice: true,
    status: true,
    actions: true
  });

  useEffect(() => {
    if (alertBox.show) {
      const timer = setTimeout(() => {
        setAlertBox((prev) => ({ ...prev, show: false }));
      }, 3000);
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

  const showAlert = (message, type = "success") => {
    setAlertBox({ show: true, message, type });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      setForm((p) => ({ ...p, file: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nameExists = items.some(
      (p) =>
        p.name.trim().toLowerCase() === form.name.trim().toLowerCase() &&
        p._id !== editId
    );

    if (nameExists) {
      showAlert("Product name already exists!", "error");
      setIsSubmitting(false);
      return;
    }

    if (!form.name || !form.category || !form.basePrice) {
      showAlert("Name, category & base price are required", "warning");
      setIsSubmitting(false);
      return;
    }

    try {
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
              image: sub.image || ""
            })
          );
        }
      } else {
        fd.append("subcategory", JSON.stringify(null));
      }

      fd.append("basePrice", form.basePrice);
      fd.append("profitLoss", form.profitLoss || 0);
      
      const weightValue = form.weightValue && Number(form.weightValue) > 0
        ? Number(form.weightValue)
        : 1;

      fd.append(
        "weight",
        JSON.stringify({
          value: weightValue,
          unit: form.weightUnit || "kg",
        })
      );

      fd.append("gstPercent", form.gstPercent || 0);
      fd.append("hsnCode", form.hsnCode || "");
      fd.append("taxType", form.taxType);

      if (form.description) fd.append("description", form.description);
      if (form.validTill) fd.append("validTill", form.validTill);
      fd.append("status", form.status);
      if (form.file) fd.append("file", form.file);

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, fd);
        showAlert("Product updated successfully", "success");
        setShowModal(false);
      } else {
        await axios.post(API_URL, fd);
        showAlert("Product added successfully", "success");
        setShowForm(false);
      }

      await fetchItems();
      resetForm();
    } catch (err) {
      console.error("Save error", err);
      if (err.response?.data?.message === "Product name already exists") {
        showAlert("Product name already exists!", "error");
      } else {
        showAlert("Save failed!", "error");
      }
    } finally {
      setIsSubmitting(false);
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
      gstPercent: "",
      hsnCode: "",
      taxType: "cgst_sgst",
      weightValue: "",
      weightUnit: "kg",
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
      showAlert("Category name is required", "warning");
      return;
    }

    try {
      setCategoryLoading(true);
      const res = await axios.post(CATEGORY_URL, {
        name: newCategoryName.trim(),
      });

      if (res.data?.success) {
        showAlert("Category added successfully", "success");
        setNewCategoryName("");
        setShowCategoryModal(false);
        await fetchCategories();
      } else {
        showAlert("Category add failed", "error");
      }
    } catch (err) {
      console.error("Add category error", err);
      showAlert("Error while adding category", "error");
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
      weightValue: item.weight?.value || "",
      weightUnit: item.weight?.unit || "kg",
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
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems((prev) => prev.filter((x) => x._id !== id));
      setSelectedItems((prev) => prev.filter((x) => x !== id));
      setActiveMenu(null);
      showAlert("Item deleted successfully", "success");
    } catch (err) {
      console.error("Delete error", err);
      showAlert("Delete failed", "error");
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      const newStatus = item.status === "active" ? "inactive" : "active";
      await axios.put(`${API_URL}/status/${item._id}`, { status: newStatus });
      setItems((prev) => prev.map((x) => (x._id === item._id ? { ...x, status: newStatus } : x)));
      showAlert(`Status updated to ${newStatus}`, "success");
    } catch (err) {
      console.error("Status toggle error", err);
      showAlert("Status update failed", "error");
    }
  };

  const updateLocalItemField = (id, key, value) => {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, [key]: value } : x)));
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
      showAlert("Bulk save successful", "success");
      setBulkMode(false);
      setSelectedItems([]);
      fetchItems();
    } catch (err) {
      console.error("Bulk save error", err);
      showAlert("Bulk save failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedItems.length) {
      showAlert("No items selected", "warning");
      return;
    }
    
    if (!window.confirm(`Delete ${selectedItems.length} selected items?`)) return;

    try {
      await Promise.all(selectedItems.map((id) => axios.delete(`${API_URL}/${id}`)));
      setSelectedItems([]);
      fetchItems();
      setBulkMode(false);
      showAlert("Selected items deleted", "success");
    } catch (err) {
      console.error("Bulk delete error", err);
      showAlert("Bulk delete failed", "error");
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
      fd.append("gstPercent", item.gstPercent || 0);
      fd.append("hsnCode", item.hsnCode || "");
      fd.append("taxType", item.taxType || "cgst_sgst");
      fd.append("weight", JSON.stringify(item.weight));

      const res = await axios.put(`${API_URL}/${item._id}`, fd);
      if (res.data.success) {
        await fetchItems();
        setQuickBasePrices((p) => ({ ...p, [item._id]: undefined }));
        showAlert("Base price updated", "success");
      }
    } catch (err) {
      console.error(err);
      showAlert("Update failed", "error");
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
      const res = await axios.put(`${API_URL}/updateDiff/${item._id}`, { diff });
      if (res.data.success) {
        await fetchItems();
        setQuickProfitLoss((p) => ({ ...p, [item._id]: undefined }));
        showAlert("Profit/Loss updated", "success");
      }
    } catch (err) {
      console.error(err);
      showAlert("Update failed", "error");
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

    const matchCategory = !filterCategory || item.category?._id === filterCategory;
    const matchSub = !filterSubcategory || item.subcategory?._id === filterSubcategory;

    return matchText && matchCategory && matchSub;
  });

  let sortedItems = [...filteredItems];
  if (sortOrder === "low") {
    sortedItems.sort((a, b) => (Number(a.salePrice) || 0) - (Number(b.salePrice) || 0));
  } else if (sortOrder === "high") {
    sortedItems.sort((a, b) => (Number(b.salePrice) || 0) - (Number(a.salePrice) || 0));
  }

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = sortedItems.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item._id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Product Management</h1>
            <p className="text-xs text-gray-500 mt-1">Total Products: {items.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              {showForm ? "Close" : "Add Product"}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Alert Notification */}
      {alertBox.show && (
        <div className="fixed top-3 right-3 z-50 animate-fade-in">
          <div className={`rounded-lg shadow-lg p-3 ${
            alertBox.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
            alertBox.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
            'bg-yellow-50 border border-yellow-200 text-yellow-800'
          }`}>
            <div className="flex items-center gap-2">
              {alertBox.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : alertBox.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-600" />
              ) : (
                <Info className="w-4 h-4 text-yellow-600" />
              )}
              <p className="font-medium text-sm">{alertBox.message}</p>
              <button
                onClick={() => setAlertBox({ ...alertBox, show: false })}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open(`${API_URL}/export`, "_blank")}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={async (e) => {
                  try {
                    const fd = new FormData();
                    fd.append("file", e.target.files[0]);
                    await axios.post(`${API_URL}/import`, fd);
                    showAlert("Imported successfully", "success");
                    fetchItems();
                  } catch (err) {
                    showAlert("Import failed", "error");
                  }
                }}
              />
              <div className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </div>
            </label>
          </div>
        </div>

        {/* Filters - Collapsible */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subcategory</label>
              <select
                value={filterSubcategory}
                onChange={(e) => setFilterSubcategory(e.target.value)}
                disabled={!filterSubs.length}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">All Subcategories</option>
                {filterSubs.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort by Price</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Default</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          {!bulkMode ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-medium text-yellow-800 text-sm">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
                <button
                  onClick={() => setBulkMode(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Bulk Edit
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm">Bulk Edit Selected Items</h3>
                <button
                  onClick={() => setBulkMode(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {items
                  .filter((item) => selectedItems.includes(item._id))
                  .map((item) => (
                    <div key={item._id} className="bg-white rounded border p-2">
                      <h4 className="font-medium text-gray-800 text-sm mb-2">{item.name}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Base Price</label>
                          <input
                            type="number"
                            value={item.basePrice}
                            onChange={(e) => updateLocalItemField(item._id, "basePrice", Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Profit/Loss</label>
                          <input
                            type="number"
                            value={item.profitLoss}
                            onChange={(e) => updateLocalItemField(item._id, "profitLoss", Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">GST %</label>
                          <input
                            type="number"
                            value={item.gstPercent || ""}
                            onChange={(e) => updateLocalItemField(item._id, "gstPercent", Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">HSN Code</label>
                          <input
                            value={item.hsnCode || ""}
                            onChange={(e) => updateLocalItemField(item._id, "hsnCode", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Tax Type</label>
                          <select
                            value={item.taxType || "cgst_sgst"}
                            onChange={(e) => updateLocalItemField(item._id, "taxType", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="cgst_sgst">CGST+SGST</option>
                            <option value="igst">IGST</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Status</label>
                          <select
                            value={item.status}
                            onChange={(e) => updateLocalItemField(item._id, "status", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <button
                  onClick={handleBulkSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save All
                </button>
                <button
                  onClick={async () => {
                    if (!selectedItems.length) return;
                    for (let id of selectedItems) await axios.post(`${API_URL}/copy/${id}`);
                    showAlert("Selected items copied", "success");
                    fetchItems();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Selected
                </button>
                <button
                  onClick={async () => {
                    if (!selectedItems.length) {
                      showAlert("No items selected", "warning");
                      return;
                    }
                    const res = await axios.post(
                      `${API_URL}/export-selected`,
                      { ids: selectedItems },
                      { responseType: "blob" }
                    );
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "selected.csv";
                    a.click();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Selected
                </button>
                <button
                  onClick={() => setBulkMode(false)}
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Form - COMPLETE WITH ALL INPUTS */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-lg">
              {editId ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    required
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    className="px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                    title="Add New Category"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subcategory</label>
                <select
                  name="subcategory"
                  value={form.subcategory}
                  onChange={handleChange}
                  disabled={!subcategories.length}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Base Price */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Base Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  name="basePrice"
                  value={form.basePrice}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Weight</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="weightValue"
                    value={form.weightValue}
                    onChange={handleChange}
                    placeholder="Value"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <select
                    name="weightUnit"
                    value={form.weightUnit}
                    onChange={handleChange}
                    className="w-24 border border-gray-300 rounded px-2 py-2 text-sm"
                  >
                    <option value="kg">Kg</option>
                    <option value="gm">Gram</option>
                    <option value="ltr">Litre</option>
                    <option value="ml">ML</option>
                    <option value="pcs">Pcs</option>
                  </select>
                </div>
              </div>

              {/* Profit/Loss */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Profit/Loss</label>
                <input
                  type="number"
                  name="profitLoss"
                  value={form.profitLoss}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="0"
                />
              </div>

              {/* GST % */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GST %</label>
                <input
                  type="number"
                  name="gstPercent"
                  value={form.gstPercent}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="e.g., 5, 12, 18"
                />
              </div>

              {/* HSN Code */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">HSN Code</label>
                <input
                  name="hsnCode"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="Enter HSN code"
                />
              </div>

              {/* Tax Type */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tax Type</label>
                <select
                  name="taxType"
                  value={form.taxType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="cgst_sgst">CGST + SGST</option>
                  <option value="igst">IGST</option>
                </select>
              </div>

              {/* Valid Till */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Valid Till</label>
                <input
                  type="date"
                  name="validTill"
                  value={form.validTill}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Product Image */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500"
                placeholder="Enter product description"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : editId ? (
                  <>
                    <Check className="w-4 h-4" />
                    Update Product
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table - COMPACT DESIGN */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">All Products</h2>
            <p className="text-xs text-gray-500">
              Showing {currentItems.length} of {filteredItems.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setColumnVisibility(prev => ({ ...prev, category: !prev.category }))}
              className="p-1.5 hover:bg-gray-100 rounded"
              title={columnVisibility.category ? "Hide Category" : "Show Category"}
            >
              {columnVisibility.category ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-2 px-3 text-left w-10">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="py-2 px-3 text-left font-medium text-gray-700">Product</th>
                    {columnVisibility.category && (
                      <th className="py-2 px-3 text-left font-medium text-gray-700">Category</th>
                    )}
                    <th className="py-2 px-3 text-left font-medium text-gray-700">Base Price</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-700">Sale Price</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-700">Status</th>
                    <th className="py-2 px-3 text-left font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">
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
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">N/A</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-xs">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.weight ? `${item.weight.value} ${item.weight.unit}` : "1 kg"}
                            </div>
                          </div>
                        </div>
                      </td>
                      {columnVisibility.category && (
                        <td className="py-2 px-3">
                          <div>
                            <div className="font-medium text-gray-900 text-xs">{item.category?.name || "-"}</div>
                            {item.subcategory && (
                              <div className="text-xs text-gray-500">{item.subcategory.name}</div>
                            )}
                          </div>
                        </td>
                      )}
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={quickBasePrices[item._id] !== undefined ? quickBasePrices[item._id] : item.basePrice}
                            onChange={(e) => setQuickBasePrices((p) => ({ ...p, [item._id]: e.target.value }))}
                            className="w-16 border border-gray-300 rounded px-1.5 py-1 text-xs"
                          />
                          <button
                            onClick={() => updateBasePrice(item)}
                            className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          HSN: {item.hsnCode || "-"} | GST: {item.gstPercent || 0}%
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-semibold text-gray-900">₹{item.salePrice}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <input
                            type="number"
                            placeholder="Change"
                            value={quickProfitLoss[item._id] ?? ""}
                            onChange={(e) => setQuickProfitLoss((p) => ({ ...p, [item._id]: e.target.value }))}
                            className="w-14 border border-gray-300 rounded px-1.5 py-1 text-xs"
                          />
                          <button
                            onClick={() => updateProfitLoss(item)}
                            className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                        <div className={`text-xs font-medium ${item.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.profitLoss >= 0 ? '+' : ''}{item.profitLoss}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => handleStatusToggle(item)}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status === "active" ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-2 px-3">
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          {activeMenu === item._id && (
                            <div className="absolute right-0 mt-1 w-36 bg-white rounded shadow-lg border border-gray-200 z-10">
                              <button
                                onClick={() => {
                                  handleEdit(item);
                                  setActiveMenu(null);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  await axios.post(`${API_URL}/copy/${item._id}`);
                                  showAlert("Product copied", "success");
                                  fetchItems();
                                  setActiveMenu(null);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                              >
                                <Copy className="w-3.5 h-3.5" />
                                Duplicate
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(item._id);
                                  setActiveMenu(null);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredItems.length)} of {filteredItems.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronsLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    {getPageNumbers().map((pageNum, index) => (
                      <button
                        key={index}
                        onClick={() => pageNum !== '...' && setCurrentPage(pageNum)}
                        className={`min-w-8 h-8 rounded text-sm ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : pageNum === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronsRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal - COMPLETE WITH ALL INPUTS */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-4 py-3 border-b flex items-center justify-between">
              <h2 className="font-semibold text-gray-800 text-lg">Edit Product</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Product Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      required
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Subcategory</label>
                    <select
                      name="subcategory"
                      value={form.subcategory}
                      onChange={handleChange}
                      disabled={!subcategories.length}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map((s) => (
                        <option key={s._id} value={s._id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Base Price */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Base Price *</label>
                    <input
                      type="number"
                      required
                      name="basePrice"
                      value={form.basePrice}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Profit/Loss */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Profit/Loss</label>
                    <input
                      type="number"
                      name="profitLoss"
                      value={form.profitLoss}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* GST % */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">GST %</label>
                    <input
                      type="number"
                      name="gstPercent"
                      value={form.gstPercent}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* HSN Code */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">HSN Code</label>
                    <input
                      name="hsnCode"
                      value={form.hsnCode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Tax Type */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tax Type</label>
                    <select
                      name="taxType"
                      value={form.taxType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="cgst_sgst">CGST + SGST</option>
                      <option value="igst">IGST</option>
                    </select>
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Weight</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Value"
                        name="weightValue"
                        value={form.weightValue}
                        onChange={handleChange}
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                      <select
                        name="weightUnit"
                        value={form.weightUnit}
                        onChange={handleChange}
                        className="w-24 border border-gray-300 rounded px-2 py-2 text-sm"
                      >
                        <option value="kg">Kg</option>
                        <option value="gm">Gram</option>
                        <option value="ltr">Litre</option>
                        <option value="ml">ML</option>
                        <option value="pcs">Pcs</option>
                      </select>
                    </div>
                  </div>

                  {/* Valid Till */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Valid Till</label>
                    <input
                      type="date"
                      name="validTill"
                      value={form.validTill}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Product Image */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
            <div className="px-4 py-3 border-b">
              <h2 className="font-semibold text-gray-800">Add New Category</h2>
            </div>
            <div className="p-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddCategory}
                  disabled={categoryLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  {categoryLoading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}