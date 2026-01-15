// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Inventory.css";

// const API = "https://grocerrybackend.onrender.com/api";

// export default function AdminInventory() {
//   const [products, setProducts] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     product: "",
//     sku: "",
//     hsnCode: "",
//     stock: "",
//     minStock: "",
//     costPrice: "",
//     sellingPrice: "",
//     gstPercent: "",
//   });

//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD ================= */

//   useEffect(() => {
//     loadProducts();
//     loadInventory();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const res = await axios.get(API + "/prices");
//       const list = [];

//       res.data.data.forEach(c =>
//         c.subcategories.forEach(s =>
//           s.products.forEach(p => list.push(p))
//         )
//       );

//       setProducts(list);
//     } catch (err) {
//       console.log("Product load error", err);
//     }
//   };

//   const loadInventory = async () => {
//     try {
//       const res = await axios.get(API + "/inventory/all");
//       setInventory(res.data.data || []);
//     } catch (err) {
//       console.log("Inventory load error", err);
//       setInventory([]);
//     }
//   };

//   /* ================= SAVE ================= */

//   const save = async () => {
//     if (!form.product || !form.stock || !form.sellingPrice) {
//       alert("Product, Stock & Selling Price required");
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post(API + "/inventory/set", {
//         product: form.product,
//         sku: form.sku,
//         hsnCode: form.hsnCode,
//         stock: Number(form.stock),
//         minStock: Number(form.minStock || 0),
//         costPrice: Number(form.costPrice || 0),
//         sellingPrice: Number(form.sellingPrice),
//         gstPercent: Number(form.gstPercent || 0),
//       });

//       alert("Inventory saved");

//       setForm({
//         product: "",
//         sku: "",
//         hsnCode: "",
//         stock: "",
//         minStock: "",
//         costPrice: "",
//         sellingPrice: "",
//         gstPercent: "",
//       });

//       setShowForm(false);
//       loadInventory();
//     } catch (err) {
//       alert("Save failed");
//     }

//     setLoading(false);
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="inv-container">
//       <div className="inv-header">
//         <h2>Inventory Manager</h2>
//         <button className="add-btn" onClick={() => setShowForm(!showForm)}>
//           {showForm ? "Close" : "+ Add Inventory"}
//         </button>
//       </div>

//       {/* ================= FORM ================= */}
//       {showForm && (
//         <div className="inv-form">
//           <select
//             value={form.product}
//             onChange={e => setForm({ ...form, product: e.target.value })}
//           >
//             <option value="">Select Product</option>
//             {products.map(p => (
//               <option key={p._id} value={p._id}>{p.name}</option>
//             ))}
//           </select>

//           <input placeholder="SKU" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
//           <input placeholder="HSN" value={form.hsnCode} onChange={e => setForm({ ...form, hsnCode: e.target.value })} />
//           <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
//           <input type="number" placeholder="Min Stock" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} />
//           <input type="number" placeholder="Cost Price" value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} />
//           <input type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} />
//           <input type="number" placeholder="GST %" value={form.gstPercent} onChange={e => setForm({ ...form, gstPercent: e.target.value })} />

//           <button onClick={save} disabled={loading}>
//             {loading ? "Saving..." : "Save Inventory"}
//           </button>
//         </div>
//       )}

//       {/* ================= TABLE ================= */}
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Stock</th>
//             <th>Min</th>
//             <th>Selling</th>
//             <th>GST</th>
//           </tr>
//         </thead>
//         <tbody>
//           {inventory.length === 0 && (
//             <tr><td colSpan="5" style={{ textAlign: "center" }}>No Inventory</td></tr>
//           )}

//           {inventory.map(i => (
//             <tr key={i._id}>
//               <td>{i.product?.name}</td>
//               <td>{i.stock}</td>
//               <td>{i.minStock}</td>
//               <td>₹{i.sellingPrice}</td>
//               <td>{i.gstPercent}%</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { 
//   Box, 
//   Plus, 
//   X, 
//   AlertTriangle, 
//   BarChart3, 
//   Tag, 
//   Layers, 
//   IndianRupee, 
//   FileText,
//   Search,
//   PackageCheck
// } from "lucide-react";

// const API = "https://grocerrybackend.onrender.com/api";

// export default function AdminInventory() {
//   const [products, setProducts] = useState([]);
//   const [inventory, setInventory] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     product: "",
//     sku: "",
//     hsnCode: "",
//     stock: "",
//     minStock: "",
//     costPrice: "",
//     sellingPrice: "",
//     gstPercent: "",
//   });

//   useEffect(() => {
//     loadProducts();
//     loadInventory();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const res = await axios.get(API + "/prices");
//       const list = [];
//       res.data.data.forEach(c =>
//         c.subcategories.forEach(s =>
//           s.products.forEach(p => list.push(p))
//         )
//       );
//       setProducts(list);
//     } catch (err) {
//       console.log("Product load error", err);
//     }
//   };

//   const loadInventory = async () => {
//     try {
//       const res = await axios.get(API + "/inventory/all");
//       setInventory(res.data.data || []);
//     } catch (err) {
//       console.log("Inventory load error", err);
//       setInventory([]);
//     }
//   };

//   const save = async () => {
//     if (!form.product || !form.stock || !form.sellingPrice) {
//       alert("Product, Stock & Selling Price required");
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.post(API + "/inventory/set", {
//         product: form.product,
//         sku: form.sku,
//         hsnCode: form.hsnCode,
//         stock: Number(form.stock),
//         minStock: Number(form.minStock || 0),
//         costPrice: Number(form.costPrice || 0),
//         sellingPrice: Number(form.sellingPrice),
//         gstPercent: Number(form.gstPercent || 0),
//       });
//       alert("Inventory saved successfully");
//       setForm({ product: "", sku: "", hsnCode: "", stock: "", minStock: "", costPrice: "", sellingPrice: "", gstPercent: "" });
//       setShowForm(false);
//       loadInventory();
//     } catch (err) {
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-[#F8FAFC] min-h-screen">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
//             <Box className="text-blue-600" size={24} /> Inventory Manager
//           </h2>
//           <p className="text-sm text-gray-500">Track stock levels and pricing efficiently</p>
//         </div>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95 ${
//             showForm ? "bg-slate-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
//           }`}
//         >
//           {showForm ? <><X size={18} /> Close Form</> : <><Plus size={18} /> Add Inventory</>}
//         </button>
//       </div>

//       {/* FORM MODAL-LIKE SECTION */}
//       {showForm && (
//         <div className="bg-white rounded-2xl p-5 md:p-6 mb-6 shadow-sm border border-blue-100 animate-in fade-in slide-in-from-top-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="lg:col-span-2">
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Select Product</label>
//               <select
//                 value={form.product}
//                 onChange={e => setForm({ ...form, product: e.target.value })}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option value="">Search & Select Product</option>
//                 {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
//               </select>
//             </div>
            
//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">SKU Code</label>
//               <input placeholder="SKU001" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">HSN Code</label>
//               <input placeholder="HSN-XXXX" value={form.hsnCode} onChange={e => setForm({ ...form, hsnCode: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1"><BarChart3 size={12}/> Current Stock</label>
//               <input type="number" placeholder="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1 text-red-400">Min. Alert Level</label>
//               <input type="number" placeholder="5" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Cost Price</label>
//               <input type="number" placeholder="₹0" value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Selling Price</label>
//               <input type="number" placeholder="₹0" value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">GST %</label>
//               <input type="number" placeholder="18%" value={form.gstPercent} onChange={e => setForm({ ...form, gstPercent: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button 
//               onClick={save} 
//               disabled={loading}
//               className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
//             >
//               {loading ? "Processing..." : <><PackageCheck size={20}/> Update Inventory</>}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* MOBILE LIST VIEW */}
//       <div className="grid grid-cols-1 gap-4 md:hidden">
//         {inventory.map(i => (
//           <div key={i._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex justify-between items-start mb-3">
//               <h3 className="font-bold text-slate-800">{i.product?.name}</h3>
//               <span className={`px-2 py-1 rounded text-[10px] font-bold ${i.stock <= i.minStock ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//                 {i.stock <= i.minStock ? 'LOW STOCK' : 'IN STOCK'}
//               </span>
//             </div>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               <div className="text-gray-500">Stock: <span className="font-bold text-slate-700">{i.stock}</span></div>
//               <div className="text-gray-500 text-right">Selling: <span className="font-bold text-blue-600">₹{i.sellingPrice}</span></div>
//               <div className="text-gray-400 text-xs italic">SKU: {i.sku || 'N/A'}</div>
//               <div className="text-gray-500 text-right text-xs">GST: {i.gstPercent}%</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DESKTOP TABLE VIEW */}
//       <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50 border-b border-gray-200">
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Product Details</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Current Stock</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Min Level</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Pricing</th>
//                 <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">GST</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {inventory.length === 0 && (
//                 <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 font-medium">No inventory records found</td></tr>
//               )}
//               {inventory.map(i => (
//                 <tr key={i._id} className="hover:bg-slate-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="font-semibold text-slate-800">{i.product?.name}</div>
//                     <div className="text-[11px] text-gray-400 mt-0.5">SKU: {i.sku || '---'} | HSN: {i.hsnCode || '---'}</div>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${
//                       i.stock <= i.minStock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
//                     }`}>
//                       {i.stock <= i.minStock && <AlertTriangle size={14}/>}
//                       {i.stock}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-center text-sm text-gray-500 font-medium">{i.minStock}</td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-bold text-slate-800">₹{i.sellingPrice}</div>
//                     <div className="text-[11px] text-gray-400 italic">Cost: ₹{i.costPrice}</div>
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{i.gstPercent}%</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

































import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, 
  Plus, 
  X, 
  AlertTriangle, 
  PackageCheck,
  LayoutGrid
} from "lucide-react";

const API = "https://grocerrybackend.onrender.com/api";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product: "", sku: "", hsnCode: "", stock: "", minStock: "", costPrice: "", sellingPrice: "", gstPercent: "",
  });

  useEffect(() => {
    loadProducts();
    loadInventory();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get(API + "/prices");
      const list = [];
      res.data.data.forEach(c =>
        c.subcategories.forEach(s =>
          s.products.forEach(p => list.push(p))
        )
      );
      setProducts(list);
    } catch (err) { console.log(err); }
  };

  const loadInventory = async () => {
    try {
      const res = await axios.get(API + "/inventory/all");
      setInventory(res.data.data || []);
    } catch (err) { setInventory([]); }
  };

  const save = async () => {
    if (!form.product || !form.stock || !form.sellingPrice) return alert("Fields missing");
    setLoading(true);
    try {
      await axios.post(API + "/inventory/set", { 
        ...form, 
        stock: Number(form.stock), 
        minStock: Number(form.minStock), 
        costPrice: Number(form.costPrice), 
        sellingPrice: Number(form.sellingPrice), 
        gstPercent: Number(form.gstPercent) 
      });
      alert("Inventory Updated!");
      setShowForm(false);
      loadInventory();
      setForm({ product: "", sku: "", hsnCode: "", stock: "", minStock: "", costPrice: "", sellingPrice: "", gstPercent: "" });
    } catch (err) { alert("Save failed"); }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-6 bg-[#F1F5F9] min-h-screen font-['Inter',sans-serif]">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-4 bg-white p-3 md:p-4 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-base md:text-xl font-bold text-[#1C2434] flex items-center gap-2">
          Inventory
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all active:scale-95 ${
            showForm ? "bg-slate-100 text-slate-600" : "bg-[#3C50E0] text-white"
          }`}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          <span>{showForm ? "Close" : "Add"}</span>
        </button>
      </div>

      {/* FORM SECTION - Compact Grid */}
      {showForm && (
        <div className="bg-white rounded-xl p-3 mb-4 shadow-sm border border-slate-200 animate-in fade-in zoom-in duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="col-span-2">
              <label className="text-[9px] font-bold text-[#64748B] uppercase mb-0.5 block">Product</label>
              <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 py-1.5 text-xs outline-none focus:border-[#3C50E0]">
                <option value="">Select...</option>
                {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[9px] font-bold text-[#64748B] uppercase mb-0.5 block">Qty</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 py-1.5 text-xs" />
            </div>
            <div>
              <label className="text-[9px] font-bold text-[#64748B] uppercase mb-0.5 block">Min</label>
              <input type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 py-1.5 text-xs" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-[9px] font-bold text-[#64748B] uppercase mb-0.5 block">Sale Price</label>
              <input type="number" value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 py-1.5 text-xs" />
            </div>
            <div className="col-span-2 md:col-span-1 flex items-end">
              <button onClick={save} disabled={loading} className="w-full bg-[#3C50E0] text-white font-bold py-2 rounded-md text-xs hover:bg-blue-700 shadow-md">
                {loading ? "..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-auto min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] border-b border-[#EEEEEE]">
                <th className="px-3 py-3 text-[10px] font-bold text-[#64748B] uppercase text-left whitespace-nowrap">Product</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#64748B] uppercase text-center whitespace-nowrap">Stock</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#64748B] uppercase text-center whitespace-nowrap">Min</th>
                <th className="px-3 py-3 text-[10px] font-bold text-[#64748B] uppercase text-left whitespace-nowrap">Price</th>
                <th className="px-2 py-3 text-[10px] font-bold text-[#64748B] uppercase text-center whitespace-nowrap">GST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE]">
              {inventory.map(i => (
                <tr key={i._id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="font-bold text-[#1C2434] text-[13px] whitespace-nowrap">
                      {i.product?.name}
                    </div>
                    {i.sku && <div className="text-[9px] text-[#64748B] leading-none uppercase tracking-tighter">SKU: {i.sku}</div>}
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <div className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      i.stock <= i.minStock ? 'bg-[#FFF0F0] text-[#D34053]' : 'bg-[#E1F9F0] text-[#10B981]'
                    }`}>
                      {i.stock <= i.minStock && <AlertTriangle size={10} className="mr-0.5" />}
                      {i.stock}
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-center text-[11px] font-medium text-[#64748B]">
                    {i.minStock}
                  </td>
                  <td className="px-3 py-2.5 text-[13px] font-extrabold text-[#1C2434] whitespace-nowrap">
                    ₹{i.sellingPrice}
                  </td>
                  <td className="px-2 py-2.5 text-center">
                    <span className="text-[10px] font-bold text-[#64748B] bg-slate-100 px-1 py-0.5 rounded">
                      {i.gstPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}