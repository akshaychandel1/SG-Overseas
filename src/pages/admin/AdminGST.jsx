
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminGST.css";

// const API = "https://grocerrybackend.onrender.com/api";

// export default function AdminGST() {
//   const [products, setProducts] = useState([]);
//   const [productId, setProductId] = useState("");

//   const [gst, setGst] = useState("");
//   const [hsn, setHsn] = useState("");
//   const [taxType, setTaxType] = useState("cgst_sgst");

//   const [minQty, setMinQty] = useState("");
//   const [maxQty, setMaxQty] = useState("");
//   const [discount, setDiscount] = useState("");

//   const [gstList, setGstList] = useState([]);
//   const [discountList, setDiscountList] = useState([]);

//   const [loading, setLoading] = useState(false);

//   /* ================= LOAD PRODUCTS ================= */
//   const loadProducts = async () => {
//     const res = await axios.get(API + "/prices");
//     const list = [];

//     res.data.data.forEach(c => {
//       c.subcategories.forEach(s => {
//         s.products.forEach(p => list.push(p));
//       });
//     });

//     setProducts(list);
//   };

//   /* ================= LOAD GST ================= */
//   const loadGST = async () => {
//     const res = await axios.get(API + "/gst/all");
//     setGstList(res.data);
//   };

//   /* ================= LOAD DISCOUNTS ================= */
//   const loadDiscount = async () => {
//     const res = await axios.get(API + "/discount/all");
//     setDiscountList(res.data);
//   };

//   useEffect(() => {
//     loadProducts();
//     loadGST();
//     loadDiscount();
//   }, []);

//   /* ================= SAVE GST ================= */
//   const saveGST = async () => {
//     if (!productId || gst === "" || hsn === "") {
//       alert("Select product, GST & HSN");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(API + "/gst/set", {
//         productId,
//         gstPercent: Number(gst),
//         hsnCode: hsn,
//         taxType,
//       });

//       alert("GST Saved");
//       setGst("");
//       setHsn("");
//       loadGST();
//     } catch {
//       alert("GST save failed");
//     }
//     setLoading(false);
//   };

//   /* ================= SAVE DISCOUNT ================= */
//   const saveDiscount = async () => {
//     if (!productId || minQty === "" || maxQty === "" || discount === "") {
//       alert("Fill all discount fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(API + "/discount/add", {
//         product: productId,
//         minQty: Number(minQty),
//         maxQty: Number(maxQty),
//         discountPercent: Number(discount),
//       });

//       alert("Discount Added");
//       setMinQty("");
//       setMaxQty("");
//       setDiscount("");
//       loadDiscount();
//     } catch {
//       alert("Discount save failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="gst-container">
//       <h2 className="gst-title">GST & Discount Manager</h2>

//       {/* ================= PRODUCT ================= */}
//       <div className="section">
//         <label className="field-label">Select Product</label>
//         <select value={productId} onChange={e => setProductId(e.target.value)}>
//           <option value="">Select Product</option>
//           {products.map(p => (
//             <option key={p._id} value={p._id}>{p.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* ================= GST ================= */}
//       <div className="section">
//         <h3>GST Setup</h3>
//         <div className="grid">
//           <div>
//             <label className="field-label">GST %</label>
//             <input type="number" value={gst} onChange={e => setGst(e.target.value)} />
//           </div>

//           <div>
//             <label className="field-label">HSN Code</label>
//             <input value={hsn} onChange={e => setHsn(e.target.value)} />
//           </div>

//           <div>
//             <label className="field-label">Tax Type</label>
//             <select value={taxType} onChange={e => setTaxType(e.target.value)}>
//               <option value="cgst_sgst">CGST + SGST</option>
//               <option value="igst">IGST</option>
//             </select>
//           </div>
//         </div>

//         <button onClick={saveGST} disabled={loading}>Save GST</button>
//       </div>

//       {/* ================= DISCOUNT ================= */}
//       <div className="section">
//         <h3>Quantity Discount</h3>
//         <div className="grid">
//           <div>
//             <label className="field-label">Min Qty</label>
//             <input type="number" value={minQty} onChange={e => setMinQty(e.target.value)} />
//           </div>

//           <div>
//             <label className="field-label">Max Qty</label>
//             <input type="number" value={maxQty} onChange={e => setMaxQty(e.target.value)} />
//           </div>

//           <div>
//             <label className="field-label">Discount %</label>
//             <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//           </div>
//         </div>

//         <button onClick={saveDiscount} disabled={loading}>Add Discount</button>
//       </div>

//       {/* ================= GST TABLE ================= */}
//       <div className="section">
//         <h3>Saved GST</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>HSN</th>
//               <th>GST %</th>
//               <th>Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {gstList.map(g => (
//               <tr key={g._id}>
//                 <td>{g.product?.name}</td>
//                 <td>{g.hsnCode}</td>
//                 <td>{g.gstPercent}%</td>
//                 <td>{g.taxType === "cgst_sgst" ? "CGST + SGST" : "IGST"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= DISCOUNT TABLE ================= */}
//       <div className="section">
//         <h3>Quantity Discounts</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Min</th>
//               <th>Max</th>
//               <th>%</th>
//             </tr>
//           </thead>
//           <tbody>
//             {discountList.map(d => (
//               <tr key={d._id}>
//                 <td>{d.product?.name}</td>
//                 <td>{d.minQty}</td>
//                 <td>{d.maxQty}</td>
//                 <td>{d.discountPercent}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
























import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Percent, Hash, Layers, Save, Plus } from "react-feather";
import "./AdminGST.css";

const API = "https://grocerrybackend.onrender.com/api";

export default function AdminGST() {
  // --- Original State Variables (Functionality intact) ---
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [gst, setGst] = useState("");
  const [hsn, setHsn] = useState("");
  const [taxType, setTaxType] = useState("cgst_sgst");
  const [minQty, setMinQty] = useState("");
  const [maxQty, setMaxQty] = useState("");
  const [discount, setDiscount] = useState("");
  const [gstList, setGstList] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA (Same as your original code) ================= */
  const loadProducts = async () => {
    try {
      const res = await axios.get(API + "/prices");
      const list = [];
      res.data.data.forEach(c => {
        c.subcategories.forEach(s => {
          s.products.forEach(p => list.push(p));
        });
      });
      setProducts(list);
    } catch (err) { console.error("Product load error"); }
  };

  const loadGST = async () => {
    try {
      const res = await axios.get(API + "/gst/all");
      setGstList(res.data);
    } catch (err) { console.error("GST load error"); }
  };

  const loadDiscount = async () => {
    try {
      const res = await axios.get(API + "/discount/all");
      setDiscountList(res.data);
    } catch (err) { console.error("Discount load error"); }
  };

  useEffect(() => {
    loadProducts();
    loadGST();
    loadDiscount();
  }, []);

  /* ================= ACTION HANDLERS (Original Logic) ================= */
  const saveGST = async () => {
    if (!productId || gst === "" || hsn === "") {
      alert("Select product, GST & HSN");
      return;
    }
    setLoading(true);
    try {
      await axios.post(API + "/gst/set", {
        productId,
        gstPercent: Number(gst),
        hsnCode: hsn,
        taxType,
      });
      alert("GST Saved");
      setGst(""); setHsn("");
      loadGST();
    } catch { alert("GST save failed"); }
    setLoading(false);
  };

  const saveDiscount = async () => {
    if (!productId || minQty === "" || maxQty === "" || discount === "") {
      alert("Fill all discount fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(API + "/discount/add", {
        product: productId,
        minQty: Number(minQty),
        maxQty: Number(maxQty),
        discountPercent: Number(discount),
      });
      alert("Discount Added");
      setMinQty(""); setMaxQty(""); setDiscount("");
      loadDiscount();
    } catch { alert("Discount save failed"); }
    setLoading(false);
  };

  return (
    <div className="tm-gst-wrapper">
      {/* Page Header Like TailAdmin */}
      <div className="tm-gst-header">
        <h2 className="tm-gst-title">GST & Discount Manager</h2>
        <p className="tm-gst-subtitle">Configure tax rules and quantity-based discounts</p>
      </div>

      <div className="tm-gst-grid">
        {/* LEFT SIDE: FORM CONTROLS */}
        <div className="tm-gst-form-col">

          {/* 1. Product Select Card */}
          <div className="tm-gst-card">
            <div className="tm-gst-card-head"><h3>1. Target Selection</h3></div>
            <div className="tm-gst-card-body">
              <div className="tm-gst-field">
                <label>Select Product</label>
                <div className="tm-gst-input-box">
                  <Package className="tm-gst-icon" size={18} />
                  <select value={productId} onChange={e => setProductId(e.target.value)}>
                    <option value="">Choose a product</option>
                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 2. GST Setup Card */}
          <div className="tm-gst-card">
            <div className="tm-gst-card-head"><h3>2. GST Setup</h3></div>
            <div className="tm-gst-card-body">
              <div className="tm-gst-row">
                <div className="tm-gst-field">
                  <label>GST %</label>
                  <div className="tm-gst-input-box">
                    <Percent className="tm-gst-icon" size={18} />
                    <input type="number" placeholder="18" value={gst} onChange={e => setGst(e.target.value)} />
                  </div>
                </div>
                <div className="tm-gst-field">
                  <label>HSN Code</label>
                  <div className="tm-gst-input-box">
                    <Hash className="tm-gst-icon" size={18} />
                    <input placeholder="HSN" value={hsn} onChange={e => setHsn(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="tm-gst-field">
                <label>Tax Type</label>
                <div className="tm-gst-input-box">
                  <Layers className="tm-gst-icon" size={18} />
                  <select value={taxType} onChange={e => setTaxType(e.target.value)}>
                    <option value="cgst_sgst">CGST + SGST</option>
                    <option value="igst">IGST</option>
                  </select>
                </div>
              </div>
              <button className="tm-gst-btn-blue" onClick={saveGST} disabled={loading}>
                <Save size={18} /> {loading ? "Saving..." : "Save GST Configuration"}
              </button>
            </div>
          </div>

          {/* 3. Discount Setup Card */}
          <div className="tm-gst-card">
            <div className="tm-gst-card-head"><h3>3. Bulk Discount</h3></div>
            <div className="tm-gst-card-body">
              <div className="tm-gst-row">
                <div className="tm-gst-field">
                  <label>Min Qty</label>
                  <input className="tm-gst-basic-input" type="number" placeholder="1" value={minQty} onChange={e => setMinQty(e.target.value)} />
                </div>
                <div className="tm-gst-field">
                  <label>Max Qty</label>
                  <input className="tm-gst-basic-input" type="number" placeholder="10" value={maxQty} onChange={e => setMaxQty(e.target.value)} />
                </div>
              </div>
              <div className="tm-gst-field">
                <label>Discount %</label>
                <div className="tm-gst-input-box">
                  <Percent className="tm-gst-icon" size={18} />
                  <input type="number" placeholder="5" value={discount} onChange={e => setDiscount(e.target.value)} />
                </div>
              </div>
              <button className="tm-gst-btn-green" onClick={saveDiscount} disabled={loading}>
                <Plus size={18} /> Add Discount Rule
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: DATA TABLES */}
        <div className="tm-gst-table-col">

          <div className="tm-gst-card">
            <div className="tm-gst-card-head"><h3>Current GST Rules</h3></div>
            <div className="tm-gst-scroll">
              <table className="tm-gst-table">
                <thead>
                  <tr><th>Product</th><th>HSN</th><th>GST</th><th>Type</th></tr>
                </thead>
                <tbody>
                  {gstList.map(g => (
                    <tr key={g._id}>
                      <td className="tm-gst-bold">{g.product?.name}</td>
                      <td><span className="tm-gst-badge-gray">{g.hsnCode}</span></td>
                      <td className="tm-gst-bold tm-gst-blue">{g.gstPercent}%</td>
                      <td>{g.taxType === "cgst_sgst" ? "CGST+SGST" : "IGST"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tm-gst-card">
            <div className="tm-gst-card-head"><h3>Bulk Discount Rules</h3></div>
            <div className="tm-gst-scroll">
              <table className="tm-gst-table">
                <thead>
                  <tr><th>Product</th><th>Quantity Range</th><th>Discount</th></tr>
                </thead>
                <tbody>
                  {discountList.map(d => (
                    <tr key={d._id}>
                      <td className="tm-gst-bold">{d.product?.name}</td>
                      <td>{d.minQty} - {d.maxQty} Qty</td>
                      <td><span className="tm-gst-badge-green">{d.discountPercent}% OFF</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}