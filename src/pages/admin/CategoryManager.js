// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./CategoryManager.css";

// const API_BASE = "https://grocerrybackend.onrender.com/api/categories";

// const emptyCategoryForm = { name: "", image: null };
// const emptySubForm = { name: "", image: null };

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [catForm, setCatForm] = useState(emptyCategoryForm);
//   const [editCatId, setEditCatId] = useState(null);
//   const [showCatForm, setShowCatForm] = useState(false);

//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [expandedCat, setExpandedCat] = useState(null);

//   const [subForm, setSubForm] = useState(emptySubForm);
//   const [editSubInfo, setEditSubInfo] = useState({ catId: null, subId: null });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const [searchText, setSearchText] = useState("");

//   // Modal Edit Popup
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("category");
//   const [modalTarget, setModalTarget] = useState({ catId: null, subId: null });
//   const [modalPreview, setModalPreview] = useState(null);
//   const fileInputRef = useRef(null);

//   /* ------------------- Fetch Categories -------------------- */
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       const cats = res.data.categories || res.data.data || [];

//       setCategories(
//         cats.map((c) => ({
//           ...c,
//           subcategories: Array.isArray(c.subcategories)
//             ? c.subcategories
//             : [],
//         }))
//       );
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   /* ------------------- SEARCH FILTER FIX -------------------- */
//   const filterCategories = (cats, q) => {
//     if (!q || !q.trim()) return cats;

//     const t = q.toLowerCase();

//     return cats
//       .map((c) => {
//         const matchedSubs = c.subcategories.filter((s) =>
//           s.name.toLowerCase().includes(t)
//         );

//         const categoryMatches = c.name.toLowerCase().includes(t);

//         if (categoryMatches) return c;

//         if (matchedSubs.length) {
//           return { ...c, subcategories: matchedSubs };
//         }

//         return null;
//       })
//       .filter(Boolean);
//   };

//   /* ------------------- CATEGORY INPUT -------------------- */
//   const onCatInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setCatForm((p) => ({ ...p, image: files[0] }));
//     else setCatForm((p) => ({ ...p, [name]: value }));
//   };

//   /* ------------------- SUB INPUT -------------------- */
//   const onSubInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setSubForm((p) => ({ ...p, image: files[0] }));
//     else setSubForm((p) => ({ ...p, [name]: value }));
//   };

//   /* ------------------- SAVE CATEGORY -------------------- */
//   const submitCategory = async (e) => {
//     e.preventDefault();

//     if (!catForm.name.trim()) return toast.warn("Enter category name");

//     const fd = new FormData();
//     fd.append("name", catForm.name);
//     if (catForm.image) fd.append("image", catForm.image);

//     try {
//       if (editCatId) {
//         await axios.put(`${API_BASE}/${editCatId}`, fd);
//         toast.success("Category updated");
//       } else {
//         await axios.post(API_BASE, fd);
//         toast.success("Category added");
//       }

//       setCatForm(emptyCategoryForm);
//       setEditCatId(null);
//       fetchCategories();
//     } catch (err) {
//       toast.error("Failed to save category");
//     }
//   };

//   /* ------------------- DELETE CATEGORY -------------------- */
//   const deleteCategory = async (id) => {
//     if (!window.confirm("Delete this category?")) return;

//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       toast.success("Category deleted");
//       fetchCategories();
//     } catch {
//       toast.error("Failed to delete category");
//     }
//   };

//   /* ------------------- SAVE SUBCATEGORY -------------------- */
//   const submitSub = async (e, catId) => {
//     e.preventDefault();
//     if (!subForm.name.trim()) return toast.warn("Enter subcategory name");

//     const fd = new FormData();
//     fd.append("name", subForm.name);
//     if (subForm.image) fd.append("image", subForm.image);

//     try {
//       if (editSubInfo.subId) {
//         await axios.put(
//           `${API_BASE}/${editSubInfo.catId}/sub/${editSubInfo.subId}`,
//           fd
//         );
//         toast.success("Subcategory updated");
//       } else {
//         await axios.post(`${API_BASE}/${catId}/sub`, fd);
//         toast.success("Subcategory added");
//       }

//       setSubForm(emptySubForm);
//       setEditSubInfo({ catId: null, subId: null });
//       fetchCategories();
//     } catch {
//       toast.error("Failed to save subcategory");
//     }
//   };

//   /* ------------------- DELETE SUBCATEGORY -------------------- */
//   const deleteSub = async (catId, subId) => {
//     if (!window.confirm("Delete this subcategory?")) return;

//     try {
//       await axios.delete(`${API_BASE}/${catId}/sub/${subId}`);
//       toast.success("Subcategory deleted");
//       fetchCategories();
//     } catch {
//       toast.error("Failed to delete subcategory");
//     }
//   };

//   /* ------------------- MODAL HANDLERS -------------------- */
//   const openCategoryModal = (cat) => {
//     setModalMode("category");
//     setModalTarget({ catId: cat._id, subId: null });
//     setModalPreview(cat.image);
//     setCatForm({ name: cat.name, image: null });
//     setIsModalOpen(true);
//   };

//   const openSubModal = (cat, sub) => {
//     setModalMode("subcategory");
//     setModalTarget({ catId: cat._id, subId: sub._id });
//     setModalPreview(sub.image);
//     setSubForm({ name: sub.name, image: null });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalPreview(null);
//     setModalTarget({ catId: null, subId: null });
//     setCatForm(emptyCategoryForm);
//     setSubForm(emptySubForm);
//   };

//   const handleModalImageChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setModalPreview(URL.createObjectURL(file));
//       if (modalMode === "category")
//         setCatForm((p) => ({ ...p, image: file }));
//       else setSubForm((p) => ({ ...p, image: file }));
//     }
//   };

//   const saveModal = async (e) => {
//     e.preventDefault();

//     try {
//       const fd = new FormData();

//       if (modalMode === "category") {
//         fd.append("name", catForm.name);
//         if (catForm.image) fd.append("image", catForm.image);

//         await axios.put(`${API_BASE}/${modalTarget.catId}`, fd);
//         toast.success("Category updated");
//       } else {
//         fd.append("name", subForm.name);
//         if (subForm.image) fd.append("image", subForm.image);

//         await axios.put(
//           `${API_BASE}/${modalTarget.catId}/sub/${modalTarget.subId}`,
//           fd
//         );
//         toast.success("Subcategory updated");
//       }

//       closeModal();
//       fetchCategories();
//     } catch {
//       toast.error("Update failed");
//     }
//   };

//   /* ------------------- PAGINATION -------------------- */
//   const filtered = filterCategories(categories, searchText);
//   const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

//   useEffect(() => {
//     if (currentPage > totalPages) setCurrentPage(1);
//   }, [filtered.length, totalPages]);

//   const lastIndex = currentPage * itemsPerPage;
//   const firstIndex = lastIndex - itemsPerPage;
//   const currentCats = filtered.slice(firstIndex, lastIndex);

//   /* ------------------- UI -------------------- */
//   return (
//     <div className="category-container">
//       <ToastContainer />

//       <div className="header">
//         <h2> Category Manager</h2>
//         {/* <p>Add categories & subcategories (mobile-friendly)</p> */}

//         {/* <input
//           className="search-input"
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         <button
//           className="add-cat-btn"
//           onClick={() => setShowCatForm(!showCatForm)}
//         >
//           {showCatForm ? "Close" : "Add Category"}
//         </button> */}
// {/*
//         <div className="header-row">
//   <input
//     className="search-input"
//     placeholder="Search..."
//     value={searchText}
//     onChange={(e) => {
//       setSearchText(e.target.value);
//       setCurrentPage(1);
//     }}
//   />

//   <button
//     className="add-cat-btn"
//     onClick={() => setShowCatForm(!showCatForm)}
//   >
//     {showCatForm ? "Close" : "Add Category"}
//   </button>
// </div> */}
// <div className="header-row-fixed">
//   <input
//     className="search-input-fixed"
//     placeholder="Search..."
//     value={searchText}
//     onChange={(e) => {
//       setSearchText(e.target.value);
//       setCurrentPage(1);
//     }}
//   />

//   <button
//     className="add-cat-btn-fixed"
//     onClick={() => setShowCatForm(!showCatForm)}
//   >
//     {showCatForm ? "Close" : "Add Category"}
//   </button>
// </div>

//       </div>

//       {/* CATEGORY FORM TOGGLE */}
//       {showCatForm && (
//         <div className="top-row slide-down">
//           <form className="category-form" onSubmit={submitCategory}>
//             <div className="form-row">
//               <input
//                 name="name"
//                 type="text"
//                 placeholder="Enter category name"
//                 value={catForm.name}
//                 onChange={onCatInputChange}
//               />

//               <input
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={onCatInputChange}
//               />

//               <button type="submit">
//                 {editCatId ? "Update Category" : "Add Category"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* CATEGORY TABLE */}
//       <div className="category-list">
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Subcategories</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentCats.map((cat, i) => (
//               <React.Fragment key={cat._id}>
//                 <tr>
//                   <td>{firstIndex + i + 1}</td>
//                   <td>
//                     {cat.image ? (
//                       <img src={cat.image} className="table-img" alt="" />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>

//                   <td>{cat.name}</td>

//                   <td>
//                     {cat.subcategories.length}{" "}
//                     <button
//                       className="small-btn"
//                       onClick={() =>
//                         setExpandedCat(
//                           expandedCat === cat._id ? null : cat._id
//                         )
//                       }
//                     >
//                       {expandedCat === cat._id ? "Hide" : "Manage"}
//                     </button>
//                   </td>

//                   <td>
//                     <div className="dots-wrap">
//                       <button
//                         className="dots-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenMenuId(
//                             openMenuId === cat._id ? null : cat._id
//                           );
//                         }}
//                       >
//                         ⋯
//                       </button>

//                       {openMenuId === cat._id && (
//                         <div className="dots-menu">
//                           <button
//                             className="menu-item"
//                             onClick={() => {
//                               openCategoryModal(cat);
//                               setOpenMenuId(null);
//                             }}
//                           >
//                             Edit
//                           </button>

//                           <button
//                             className="menu-item"
//                             onClick={() => {
//                               deleteCategory(cat._id);
//                               setOpenMenuId(null);
//                             }}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>

//                 {/* SUBCATEGORY SECTION */}
//                 {expandedCat === cat._id && (
//                   <tr>
//                     <td colSpan="5">
//                       <div className="sub-section">
//                         <h4>{cat.name} - Subcategories</h4>

//                         <div className="sub-list">
//                           {cat.subcategories.map((sub) => (
//                             <div className="sub-item" key={sub._id}>
//                               <div className="sub-left">
//                                 {sub.image ? (
//                                   <img
//                                     src={sub.image}
//                                     className="sub-thumb"
//                                     alt=""
//                                   />
//                                 ) : (
//                                   <div className="sub-thumb no-img">No</div>
//                                 )}

//                                 <div className="sub-name">{sub.name}</div>
//                               </div>

//                               <div className="dots-wrap">
//                                 <button
//                                   className="dots-btn small-dots"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     setOpenMenuId(
//                                       openMenuId === sub._id
//                                         ? null
//                                         : sub._id
//                                     );
//                                   }}
//                                 >
//                                   ⋯
//                                 </button>

//                                 {openMenuId === sub._id && (
//                                   <div className="dots-menu">
//                                     <button
//                                       className="menu-item"
//                                       onClick={() => {
//                                         openSubModal(cat, sub);
//                                         setOpenMenuId(null);
//                                       }}
//                                     >
//                                       Edit
//                                     </button>

//                                     <button
//                                       className="menu-item"
//                                       onClick={() => {
//                                         deleteSub(cat._id, sub._id);
//                                         setOpenMenuId(null);
//                                       }}
//                                     >
//                                       Delete
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {/* SUB FORM */}
//                         <form
//                           className="sub-form"
//                           onSubmit={(e) => submitSub(e, cat._id)}
//                         >
//                           <input
//                             name="name"
//                             type="text"
//                             placeholder="Subcategory name"
//                             value={subForm.name}
//                             onChange={onSubInputChange}
//                           />

//                           <input
//                             name="image"
//                             type="file"
//                             accept="image/*"
//                             onChange={onSubInputChange}
//                           />

//                           <button type="submit">
//                             {editSubInfo.subId ? "Update Sub" : "Add Sub"}
//                           </button>
//                         </form>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((p) => p - 1)}
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             className={currentPage === i + 1 ? "active-page" : ""}
//             onClick={() => setCurrentPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((p) => p + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* EDIT POPUP */}
//       {isModalOpen && (
//         <div className="cm-modal-overlay" onMouseDown={closeModal}>
//           <div className="cm-modal" onMouseDown={(e) => e.stopPropagation()}>
//             <h3>
//               {modalMode === "category"
//                 ? "Edit Category"
//                 : "Edit Subcategory"}
//             </h3>

//             <form onSubmit={saveModal} className="cm-modal-form">
//               {modalMode === "category" ? (
//                 <>
//                   <label className="modal-label">Name</label>
//                   <input
//                     name="name"
//                     value={catForm.name}
//                     onChange={(e) =>
//                       setCatForm((p) => ({ ...p, name: e.target.value }))
//                     }
//                   />

//                   <label className="modal-label">Image</label>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleModalImageChange}
//                   />

//                   {modalPreview && (
//                     <div className="modal-preview">
//                       <img src={modalPreview} alt="preview" />
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   <label className="modal-label">Subcategory Name</label>
//                   <input
//                     name="name"
//                     value={subForm.name}
//                     onChange={(e) =>
//                       setSubForm((p) => ({ ...p, name: e.target.value }))
//                     }
//                   />

//                   <label className="modal-label">Image</label>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleModalImageChange}
//                   />

//                   {modalPreview && (
//                     <div className="modal-preview">
//                       <img src={modalPreview} alt="preview" />
//                     </div>
//                   )}
//                 </>
//               )}

//               <div className="modal-actions">
//                 <button type="submit" className="btn-primary">
//                   Update
//                 </button>

//                 <button type="button" className="btn-cancel" onClick={closeModal}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// export default CategoryManager;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Search, Filter, MoreHorizontal, Edit, Trash2,
//   ChevronDown, ChevronUp, Plus, X, Image as ImageIcon
// } from "react-feather";
// import "./CategoryManager.css";

// const API_BASE = "https://grocerrybackend.onrender.com/api/categories";

// const emptyCategoryForm = { name: "", image: null };
// const emptySubForm = { name: "", image: null };

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [catForm, setCatForm] = useState(emptyCategoryForm);
//   const [editCatId, setEditCatId] = useState(null);
//   const [showCatForm, setShowCatForm] = useState(false);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [expandedCat, setExpandedCat] = useState(null);
//   const [subForm, setSubForm] = useState(emptySubForm);
//   const [editSubInfo, setEditSubInfo] = useState({ catId: null, subId: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const [searchText, setSearchText] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("category");
//   const [modalTarget, setModalTarget] = useState({ catId: null, subId: null });
//   const [modalPreview, setModalPreview] = useState(null);

//   // --- Functions ---
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       const cats = res.data.categories || res.data.data || [];
//       setCategories(cats.map((c) => ({
//         ...c,
//         subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
//       })));
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   const filterCategories = (cats, q) => {
//     if (!q || !q.trim()) return cats;
//     const t = q.toLowerCase();
//     return cats.map((c) => {
//       const matchedSubs = c.subcategories.filter((s) => s.name.toLowerCase().includes(t));
//       const categoryMatches = c.name.toLowerCase().includes(t);
//       if (categoryMatches) return c;
//       if (matchedSubs.length) return { ...c, subcategories: matchedSubs };
//       return null;
//     }).filter(Boolean);
//   };

//   const onCatInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setCatForm((p) => ({ ...p, image: files[0] }));
//     else setCatForm((p) => ({ ...p, [name]: value }));
//   };

//   const submitCategory = async (e) => {
//     e.preventDefault();
//     if (!catForm.name.trim()) return toast.warn("Enter category name");
//     const fd = new FormData();
//     fd.append("name", catForm.name);
//     if (catForm.image) fd.append("image", catForm.image);
//     try {
//       await axios.post(API_BASE, fd);
//       toast.success("Category added successfully");
//       setCatForm(emptyCategoryForm);
//       setShowCatForm(false);
//       fetchCategories();
//     } catch (err) { toast.error("Failed to save"); }
//   };

//   const deleteCategory = async (id) => {
//     if (!window.confirm("Delete this category?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       toast.success("Category deleted");
//       fetchCategories();
//     } catch { toast.error("Delete failed"); }
//   };

//   const submitSub = async (e, catId) => {
//     e.preventDefault();
//     if (!subForm.name.trim()) return toast.warn("Enter sub name");
//     const fd = new FormData();
//     fd.append("name", subForm.name);
//     if (subForm.image) fd.append("image", subForm.image);
//     try {
//       await axios.post(`${API_BASE}/${catId}/sub`, fd);
//       toast.success("Subcategory added");
//       setSubForm(emptySubForm);
//       fetchCategories();
//     } catch { toast.error("Failed to add subcategory"); }
//   };

//   const deleteSub = async (catId, subId) => {
//     if (!window.confirm("Delete subcategory?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${catId}/sub/${subId}`);
//       toast.success("Deleted successfully");
//       fetchCategories();
//     } catch { toast.error("Delete failed"); }
//   };

//   // --- Modal Logic ---
//   const openEditModal = (type, cat, sub = null) => {
//     setModalMode(type);
//     if (type === "category") {
//       setModalTarget({ catId: cat._id, subId: null });
//       setCatForm({ name: cat.name, image: null });
//       setModalPreview(cat.image);
//     } else {
//       setModalTarget({ catId: cat._id, subId: sub._id });
//       setSubForm({ name: sub.name, image: null });
//       setModalPreview(sub.image);
//     }
//     setIsModalOpen(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     try {
//       if (modalMode === "category") {
//         fd.append("name", catForm.name);
//         if (catForm.image) fd.append("image", catForm.image);
//         await axios.put(`${API_BASE}/${modalTarget.catId}`, fd);
//       } else {
//         fd.append("name", subForm.name);
//         if (subForm.image) fd.append("image", subForm.image);
//         await axios.put(`${API_BASE}/${modalTarget.catId}/sub/${modalTarget.subId}`, fd);
//       }
//       toast.success("Updated successfully");
//       setIsModalOpen(false);
//       fetchCategories();
//     } catch { toast.error("Update failed"); }
//   };

//   const filtered = filterCategories(categories, searchText);
//   const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
//   const currentCats = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="tm-wrapper">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Header Area */}
//       <div className="tm-header-main">
//         <div>
//           <h2 className="tm-page-title">Category Management</h2>
//           <p className="tm-page-subtitle">Add and organize your store categories</p>
//         </div>
//         <button className="tm-btn-primary" onClick={() => setShowCatForm(!showCatForm)}>
//           {showCatForm ? <X size={18} /> : <Plus size={18} />}
//           <span>{showCatForm ? "Close" : "Add Category"}</span>
//         </button>
//       </div>

//       {/* Inline Form */}
//       {showCatForm && (
//         <div className="tm-form-card animate-slide">
//           <form onSubmit={submitCategory} className="tm-grid-form">
//             <div className="tm-input-group">
//               <label>Category Name</label>
//               <input name="name" placeholder="Ex: Electronics" value={catForm.name} onChange={onCatInputChange} />
//             </div>
//             <div className="tm-input-group">
//               <label>Icon / Image</label>
//               <input type="file" name="image" onChange={onCatInputChange} />
//             </div>
//             <button type="submit" className="tm-btn-save">Save Category</button>
//           </form>
//         </div>
//       )}

//       {/* Table Section */}
//       <div className="tm-table-card">
//         <div className="tm-table-controls">
//           <div className="tm-search-box">
//             <Search size={18} />
//             <input type="text" placeholder="Search categories..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
//           </div>
//           <button className="tm-btn-outline"><Filter size={16} /> Filter</button>
//         </div>

//         <div className="tm-responsive-container">
//           <table className="tm-main-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Sub-Items</th>
//                 <th>Status</th>
//                 <th className="text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCats.map((cat) => (
//                 <React.Fragment key={cat._id}>
//                   <tr>
//                     <td>
//                       <div className="tm-user-info">
//                         <div className="tm-avatar">
//                           {cat.image ? <img src={cat.image} alt="" /> : <ImageIcon size={20} />}
//                         </div>
//                         <span className="tm-user-name">{cat.name}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <button className="tm-status-pill blue" onClick={() => setExpandedCat(expandedCat === cat._id ? null : cat._id)}>
//                         {cat.subcategories.length} Subcategories
//                         {expandedCat === cat._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                       </button>
//                     </td>
//                     <td><span className="tm-active-dot">Active</span></td>
//                     <td className="text-right">
//                       <div className="tm-dropdown-wrapper">
//                         <MoreHorizontal className="tm-dots" onClick={() => setOpenMenuId(openMenuId === cat._id ? null : cat._id)} />
//                         {openMenuId === cat._id && (
//                           <div className="tm-action-menu">
//                             <button onClick={() => openEditModal("category", cat)}><Edit size={14} /> Edit</button>
//                             <button className="red" onClick={() => deleteCategory(cat._id)}><Trash2 size={14} /> Delete</button>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>

//                   {/* Expanded Subcategories */}
//                   {expandedCat === cat._id && (
//                     <tr className="tm-expanded-bg">
//                       <td colSpan="4">
//                         <div className="tm-sub-grid">
//                           <div className="tm-sub-header">Manage Subcategories for {cat.name}</div>
//                           <div className="tm-sub-list">
//                             {cat.subcategories.map(sub => (
//                               <div key={sub._id} className="tm-sub-row">
//                                 <img src={sub.image || "https://via.placeholder.com/30"} alt="" />
//                                 <span>{sub.name}</span>
//                                 <div className="tm-sub-actions">
//                                   <Edit size={14} onClick={() => openEditModal("subcategory", cat, sub)} />
//                                   <Trash2 size={14} className="red" onClick={() => deleteSub(cat._id, sub._id)} />
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                           <form className="tm-sub-add-form" onSubmit={(e) => submitSub(e, cat._id)}>
//                             <input placeholder="New sub-category..." name="name" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} />
//                             <button type="submit">Add</button>
//                           </form>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="tm-pagination-footer">
//           <p>Showing {currentCats.length} of {filtered.length} categories</p>
//           <div className="tm-page-btns">
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="tm-modal-backdrop">
//           <div className="tm-modal-content">
//             <div className="tm-modal-header">
//               <h3>Edit {modalMode}</h3>
//               <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
//             </div>
//             <form onSubmit={handleUpdate} className="tm-modal-form">
//               <label>Name</label>
//               <input
//                 value={modalMode === "category" ? catForm.name : subForm.name}
//                 onChange={(e) => modalMode === "category" ? setCatForm({ ...catForm, name: e.target.value }) : setSubForm({ ...subForm, name: e.target.value })}
//               />
//               <label>Change Image</label>
//               <input type="file" onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   setModalPreview(URL.createObjectURL(file));
//                   modalMode === "category" ? setCatForm({ ...catForm, image: file }) : setSubForm({ ...subForm, image: file });
//                 }
//               }} />
//               {modalPreview && <img src={modalPreview} className="tm-preview-img" alt="" />}
//               <div className="tm-modal-footer">
//                 <button type="button" className="tm-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="tm-btn-save">Update Now</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryManager;



















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Search, Filter, MoreHorizontal, Edit, Trash2,
//   ChevronDown, ChevronUp, Plus, X, Image as ImageIcon
// } from "react-feather";
// import "./CategoryManager.css";

// const API_BASE = "https://grocerrybackend.onrender.com/api/categories";

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [catForm, setCatForm] = useState({ name: "", image: null });
//   const [subForm, setSubForm] = useState({ name: "", image: null });
//   const [showCatForm, setShowCatForm] = useState(false);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [expandedCat, setExpandedCat] = useState(null);
//   const [searchText, setSearchText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState("category"); // 'category' or 'subcategory'
//   const [modalTarget, setModalTarget] = useState({ catId: null, subId: null });
//   const [modalPreview, setModalPreview] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       const cats = res.data.categories || res.data.data || [];
//       setCategories(cats.map(c => ({
//         ...c,
//         subcategories: Array.isArray(c.subcategories) ? c.subcategories : []
//       })));
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   // Handlers
//   const submitCategory = async (e) => {
//     e.preventDefault();
//     if (!catForm.name.trim()) return toast.warn("Category name is required");
//     const fd = new FormData();
//     fd.append("name", catForm.name);
//     if (catForm.image) fd.append("image", catForm.image);
//     try {
//       await axios.post(API_BASE, fd);
//       toast.success("Category added!");
//       setCatForm({ name: "", image: null });
//       setShowCatForm(false);
//       fetchCategories();
//     } catch { toast.error("Error adding category"); }
//   };

//   const deleteCategory = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       toast.success("Category deleted");
//       fetchCategories();
//     } catch { toast.error("Delete failed"); }
//   };

//   const submitSub = async (e, catId) => {
//     e.preventDefault();
//     if (!subForm.name.trim()) return toast.warn("Subcategory name is required");
//     const fd = new FormData();
//     fd.append("name", subForm.name);
//     if (subForm.image) fd.append("image", subForm.image);
//     try {
//       await axios.post(`${API_BASE}/${catId}/sub`, fd);
//       toast.success("Subcategory added!");
//       setSubForm({ name: "", image: null });
//       fetchCategories();
//     } catch { toast.error("Error adding subcategory"); }
//   };

//   const deleteSub = async (catId, subId) => {
//     if (!window.confirm("Delete subcategory?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${catId}/sub/${subId}`);
//       toast.success("Deleted!");
//       fetchCategories();
//     } catch { toast.error("Delete failed"); }
//   };

//   const openEditModal = (type, cat, sub = null) => {
//     setModalMode(type);
//     if (type === "category") {
//       setModalTarget({ catId: cat._id, subId: null });
//       setCatForm({ name: cat.name, image: null });
//       setModalPreview(cat.image);
//     } else {
//       setModalTarget({ catId: cat._id, subId: sub._id });
//       setSubForm({ name: sub.name, image: null });
//       setModalPreview(sub.image);
//     }
//     setIsModalOpen(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     try {
//       if (modalMode === "category") {
//         fd.append("name", catForm.name);
//         if (catForm.image) fd.append("image", catForm.image);
//         await axios.put(`${API_BASE}/${modalTarget.catId}`, fd);
//       } else {
//         fd.append("name", subForm.name);
//         if (subForm.image) fd.append("image", subForm.image);
//         await axios.put(`${API_BASE}/${modalTarget.catId}/sub/${modalTarget.subId}`, fd);
//       }
//       toast.success("Updated Successfully");
//       setIsModalOpen(false);
//       fetchCategories();
//     } catch { toast.error("Update failed"); }
//   };

//   // Filter & Pagination
//   const filtered = categories.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()));
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="tm-container">
//       <ToastContainer position="top-right" />

//       {/* Header */}
//       <div className="tm-header">
//         <div className="tm-title-box">
//           <h1>Categories</h1>
//           <p>Manage your store inventory</p>
//         </div>
//         <button className="tm-btn-primary" onClick={() => setShowCatForm(!showCatForm)}>
//           {showCatForm ? <X size={18} /> : <Plus size={18} />} Add Category
//         </button>
//       </div>

//       {/* Inline Form */}
//       {showCatForm && (
//         <div className="tm-card tm-form-animate">
//           <form className="tm-inline-form" onSubmit={submitCategory}>
//             <div className="tm-form-group">
//               <label>Category Name</label>
//               <input value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} placeholder="Enter name" />
//             </div>
//             <div className="tm-form-group">
//               <label>Image</label>
//               <input type="file" onChange={e => setCatForm({ ...catForm, image: e.target.files[0] })} />
//             </div>
//             <button type="submit" className="tm-btn-save">Save</button>
//           </form>
//         </div>
//       )}

//       {/* Toolbar */}
//       <div className="tm-toolbar">
//         <div className="tm-search-wrapper">
//           <Search size={18} />
//           <input placeholder="Search categories..." value={searchText} onChange={e => setSearchText(e.target.value)} />
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="tm-card tm-table-wrapper">
//         <div className="tm-scroll-container">
//           <table className="tm-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Sub-Items</th>
//                 <th>Status</th>
//                 <th className="tm-action-header">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((cat) => (
//                 <React.Fragment key={cat._id}>
//                   <tr>
//                     <td>
//                       <div className="tm-item-cell">
//                         <div className="tm-img-box">
//                           {cat.image ? <img src={cat.image} alt="" /> : <ImageIcon size={20} />}
//                         </div>
//                         <span className="tm-name">{cat.name}</span>
//                       </div>
//                     </td>
//                     <td>
//                       <button className="tm-pill-btn" onClick={() => setExpandedCat(expandedCat === cat._id ? null : cat._id)}>
//                         {cat.subcategories.length} Items {expandedCat === cat._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                       </button>
//                     </td>
//                     <td><span className="tm-status-active">Active</span></td>
//                     <td className="tm-action-cell">
//                       <div className="tm-menu-container">
//                         <MoreHorizontal className="tm-dots" onClick={() => setOpenMenuId(openMenuId === cat._id ? null : cat._id)} />
//                         {openMenuId === cat._id && (
//                           <div className="tm-dropdown">
//                             <button onClick={() => openEditModal("category", cat)}><Edit size={14} /> Edit</button>
//                             <button className="text-red" onClick={() => deleteCategory(cat._id)}><Trash2 size={14} /> Delete</button>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>

//                   {/* Expanded Sub-Categories */}
//                   {expandedCat === cat._id && (
//                     <tr className="tm-expand-row">
//                       <td colSpan="4">
//                         <div className="tm-sub-section">
//                           <div className="tm-sub-list">
//                             {cat.subcategories.map(sub => (
//                               <div key={sub._id} className="tm-sub-item">
//                                 <span>{sub.name}</span>
//                                 <div className="tm-sub-btns">
//                                   <Edit size={14} onClick={() => openEditModal("subcategory", cat, sub)} />
//                                   <Trash2 size={14} className="text-red" onClick={() => deleteSub(cat._id, sub._id)} />
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                           <form className="tm-sub-form" onSubmit={(e) => submitSub(e, cat._id)}>
//                             <input placeholder="New subcategory..." value={subForm.name} onChange={e => setSubForm({ ...subForm, name: e.target.value })} />
//                             <button type="submit">Add</button>
//                           </form>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="tm-pagination">
//           <span>Page {currentPage} of {totalPages || 1}</span>
//           <div className="tm-page-btns">
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && (
//         <div className="tm-modal-overlay">
//           <div className="tm-modal">
//             <div className="tm-modal-head">
//               <h3>Edit {modalMode}</h3>
//               <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
//             </div>
//             <form className="tm-modal-body" onSubmit={handleUpdate}>
//               <div className="tm-form-group">
//                 <label>Name</label>
//                 <input
//                   value={modalMode === "category" ? catForm.name : subForm.name}
//                   onChange={e => modalMode === "category" ? setCatForm({ ...catForm, name: e.target.value }) : setSubForm({ ...subForm, name: e.target.value })}
//                 />
//               </div>
//               <div className="tm-form-group">
//                 <label>New Image</label>
//                 <input type="file" onChange={e => {
//                   const file = e.target.files[0];
//                   setModalPreview(URL.createObjectURL(file));
//                   modalMode === "category" ? setCatForm({ ...catForm, image: file }) : setSubForm({ ...subForm, image: file });
//                 }} />
//               </div>
//               {modalPreview && <img src={modalPreview} className="tm-preview" alt="preview" />}
//               <div className="tm-modal-foot">
//                 <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="tm-btn-save">Update</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryManager;






























import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search, MoreHorizontal, Edit, Trash2,
  ChevronDown, ChevronUp, Plus, X, Image as ImageIcon
} from "react-feather";
import "./CategoryManager.css";

const API_BASE = "https://grocerrybackend.onrender.com/api/categories";

const emptyCategoryForm = { name: "", image: null };
const emptySubForm = { name: "", image: null };

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [catForm, setCatForm] = useState(emptyCategoryForm);
  const [editCatId, setEditCatId] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [expandedCat, setExpandedCat] = useState(null);

  const [subForm, setSubForm] = useState(emptySubForm);
  const [editSubInfo, setEditSubInfo] = useState({ catId: null, subId: null });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchText, setSearchText] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("category");
  const [modalTarget, setModalTarget] = useState({ catId: null, subId: null });
  const [modalPreview, setModalPreview] = useState(null);
  const fileInputRef = useRef(null);

  /* ------------------- API Logic (Retained from Original) -------------------- */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_BASE);
      const cats = res.data.categories || res.data.data || [];
      setCategories(cats.map((c) => ({
        ...c,
        subcategories: Array.isArray(c.subcategories) ? c.subcategories : [],
      })));
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const filterCategories = (cats, q) => {
    if (!q || !q.trim()) return cats;
    const t = q.toLowerCase();
    return cats.map((c) => {
      const matchedSubs = c.subcategories.filter((s) => s.name.toLowerCase().includes(t));
      const categoryMatches = c.name.toLowerCase().includes(t);
      if (categoryMatches) return c;
      if (matchedSubs.length) return { ...c, subcategories: matchedSubs };
      return null;
    }).filter(Boolean);
  };

  const onCatInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setCatForm((p) => ({ ...p, image: files[0] }));
    else setCatForm((p) => ({ ...p, [name]: value }));
  };

  const onSubInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setSubForm((p) => ({ ...p, image: files[0] }));
    else setSubForm((p) => ({ ...p, [name]: value }));
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) return toast.warn("Enter category name");
    const fd = new FormData();
    fd.append("name", catForm.name);
    if (catForm.image) fd.append("image", catForm.image);

    try {
      if (editCatId) {
        await axios.put(`${API_BASE}/${editCatId}`, fd);
        toast.success("Category updated");
      } else {
        await axios.post(API_BASE, fd);
        toast.success("Category added");
      }
      setCatForm(emptyCategoryForm);
      setEditCatId(null);
      setShowCatForm(false);
      fetchCategories();
    } catch { toast.error("Failed to save category"); }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch { toast.error("Delete failed"); }
  };

  const submitSub = async (e, catId) => {
    e.preventDefault();
    if (!subForm.name.trim()) return toast.warn("Enter subcategory name");
    const fd = new FormData();
    fd.append("name", subForm.name);
    if (subForm.image) fd.append("image", subForm.image);

    try {
      await axios.post(`${API_BASE}/${catId}/sub`, fd);
      toast.success("Subcategory added");
      setSubForm(emptySubForm);
      fetchCategories();
    } catch { toast.error("Failed to save subcategory"); }
  };

  const deleteSub = async (catId, subId) => {
    if (!window.confirm("Delete subcategory?")) return;
    try {
      await axios.delete(`${API_BASE}/${catId}/sub/${subId}`);
      toast.success("Subcategory deleted");
      fetchCategories();
    } catch { toast.error("Delete failed"); }
  };

  /* ------------------- Modal Handlers -------------------- */
  const openCategoryModal = (cat) => {
    setModalMode("category");
    setModalTarget({ catId: cat._id, subId: null });
    setModalPreview(cat.image);
    setCatForm({ name: cat.name, image: null });
    setIsModalOpen(true);
  };

  const openSubModal = (cat, sub) => {
    setModalMode("subcategory");
    setModalTarget({ catId: cat._id, subId: sub._id });
    setModalPreview(sub.image);
    setSubForm({ name: sub.name, image: null });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPreview(null);
    setCatForm(emptyCategoryForm);
    setSubForm(emptySubForm);
  };

  const saveModal = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    try {
      if (modalMode === "category") {
        fd.append("name", catForm.name);
        if (catForm.image) fd.append("image", catForm.image);
        await axios.put(`${API_BASE}/${modalTarget.catId}`, fd);
      } else {
        fd.append("name", subForm.name);
        if (subForm.image) fd.append("image", subForm.image);
        await axios.put(`${API_BASE}/${modalTarget.catId}/sub/${modalTarget.subId}`, fd);
      }
      toast.success("Updated successfully");
      closeModal();
      fetchCategories();
    } catch { toast.error("Update failed"); }
  };

  const filtered = filterCategories(categories, searchText);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentCats = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="tm-wrapper">
      <ToastContainer position="top-right" />

      {/* Header Section */}
      <div className="tm-header">
        <div className="tm-title-box">
          <h2>Category Manager</h2>
          <p>Organize and manage your product hierarchy</p>
        </div>
        <button className="tm-btn-primary" onClick={() => setShowCatForm(!showCatForm)}>
          {showCatForm ? <X size={18} /> : <Plus size={18} />}
          <span>{showCatForm ? "Close" : "Add Category"}</span>
        </button>
      </div>

      {/* Add Category Form (Inline) */}
      {showCatForm && (
        <div className="tm-card tm-form-card">
          <form className="tm-grid-form" onSubmit={submitCategory}>
            <div className="tm-input-group">
              <label>Category Name</label>
              <input name="name" placeholder="Ex: Groceries" value={catForm.name} onChange={onCatInputChange} />
            </div>
            <div className="tm-input-group">
              <label>Icon/Image</label>
              <input type="file" onChange={onCatInputChange} />
            </div>
            <button type="submit" className="tm-btn-save">
              {editCatId ? "Update" : "Save Category"}
            </button>
          </form>
        </div>
      )}

      {/* Table Container */}
      <div className="tm-card tm-table-card">
        <div className="tm-table-toolbar">
          <div className="tm-search-wrapper">
            <Search size={18} />
            <input
              placeholder="Search category or sub..."
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="tm-responsive-table">
          <table className="tm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Items</th>
                <th>Status</th>
                <th className="tm-action-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCats.map((cat, i) => (
                <React.Fragment key={cat._id}>
                  <tr>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>
                      <div className="tm-item-info">
                        <div className="tm-img-container">
                          {cat.image ? <img src={cat.image} alt="" /> : <ImageIcon size={20} />}
                        </div>
                        <span className="tm-item-name">{cat.name}</span>
                      </div>
                    </td>
                    <td>
                      <button className="tm-pill-btn" onClick={() => setExpandedCat(expandedCat === cat._id ? null : cat._id)}>
                        {cat.subcategories.length} Sub
                        {expandedCat === cat._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </td>
                    <td><span className="tm-badge-active">Active</span></td>
                    <td className="tm-action-cell">
                      <div className="tm-dots-container">
                        <MoreHorizontal className="tm-dots-icon" onClick={() => setOpenMenuId(openMenuId === cat._id ? null : cat._id)} />
                        {openMenuId === cat._id && (
                          <div className="tm-dropdown-menu">
                            <button onClick={() => { openCategoryModal(cat); setOpenMenuId(null); }}><Edit size={14} /> Edit</button>
                            <button className="text-red" onClick={() => { deleteCategory(cat._id); setOpenMenuId(null); }}><Trash2 size={14} /> Delete</button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Subcategory Expansion */}
                  {expandedCat === cat._id && (
                    <tr className="tm-expand-row">
                      <td colSpan="5">
                        <div className="tm-sub-container">
                          <h4 className="tm-sub-title">Manage Subcategories for {cat.name}</h4>
                          <div className="tm-sub-list">
                            {cat.subcategories.map(sub => (
                              <div key={sub._id} className="tm-sub-item">
                                <div className="tm-sub-left">
                                  {sub.image && <img src={sub.image} alt="" />}
                                  <span>{sub.name}</span>
                                </div>
                                <div className="tm-sub-right">
                                  <Edit size={14} onClick={() => openSubModal(cat, sub)} />
                                  <Trash2 size={14} className="text-red" onClick={() => deleteSub(cat._id, sub._id)} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <form className="tm-sub-add-form" onSubmit={(e) => submitSub(e, cat._id)}>
                            <input placeholder="New sub name..." value={subForm.name} onChange={onSubInputChange} name="name" />
                            <button type="submit">Add Sub</button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="tm-pagination">
          <p>Page {currentPage} of {totalPages}</p>
          <div className="tm-pagination-btns">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>

      {/* Edit Modal (Popup) */}
      {isModalOpen && (
        <div className="tm-modal-overlay" onClick={closeModal}>
          <div className="tm-modal" onClick={e => e.stopPropagation()}>
            <div className="tm-modal-header">
              <h3>Edit {modalMode}</h3>
              <X className="cursor-pointer" onClick={closeModal} />
            </div>
            <form className="tm-modal-body" onSubmit={saveModal}>
              <div className="tm-form-group">
                <label>Name</label>
                <input
                  value={modalMode === "category" ? catForm.name : subForm.name}
                  onChange={e => modalMode === "category" ? setCatForm({ ...catForm, name: e.target.value }) : setSubForm({ ...subForm, name: e.target.value })}
                />
              </div>
              <div className="tm-form-group">
                <label>Update Image</label>
                <input type="file" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setModalPreview(URL.createObjectURL(file));
                    modalMode === "category" ? setCatForm({ ...catForm, image: file }) : setSubForm({ ...subForm, image: file });
                  }
                }} />
              </div>
              {modalPreview && <img src={modalPreview} className="tm-modal-preview" alt="" />}
              <div className="tm-modal-footer">
                <button type="button" className="tm-btn-cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="tm-btn-save">Update Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;