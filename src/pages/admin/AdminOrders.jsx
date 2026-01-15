// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://grocerrybackend.onrender.com/api/orders";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");

//   const token = localStorage.getItem("token");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         setOrders(res.data.data);
//       }
//     } catch (err) {
//       alert("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `${API}/${id}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchOrders();
//     } catch (err) {
//       alert("Status update failed");
//     }
//   };

//   const filtered = orders.filter(
//     (o) => filter === "all" || o.status === filter
//   );

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>📦 Orders </h1>

//       {/* FILTER */}
//       <div style={styles.filterRow}>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           style={styles.select}
//         >
//           <option value="all">All Orders</option>
//           <option value="placed">Placed</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="shipped">Shipped</option>
//           <option value="delivered">Delivered</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div style={styles.grid}>
//           {filtered.map((o) => (
//             <div key={o._id} style={styles.card}>
//               <div style={styles.row}>
//                 <strong>👤 {o.user?.name || o.userName}</strong>
//                 <span style={styles.status(o.status)}>{o.status}</span>
//               </div>

//               <p>📦 {o.product?.name || o.productName}</p>
//               <p>💰 ₹{o.price} × {o.quantity}</p>

//               <div style={styles.address}>
//                 <b>Address:</b><br />
//                 {o.address?.name}<br />
//                 {o.address?.phone}<br />
//                 {o.address?.street}, {o.address?.city}<br />
//                 {o.address?.state} - {o.address?.pincode}
//               </div>

//               <select
//                 value={o.status}
//                 onChange={(e) => updateStatus(o._id, e.target.value)}
//                 style={styles.statusSelect}
//               >
//                 <option value="placed">Placed</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: 20,
//     background: "#f6f8fa",
//     minHeight: "100vh",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 800,
//     marginBottom: 20,
//     color: "#0f172a",
//   },
//   filterRow: {
//     marginBottom: 20,
//   },
//   select: {
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     fontWeight: 700,
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
//     gap: 16,
//   },
//   card: {
//     background: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
//   },
//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   address: {
//     fontSize: 13,
//     marginTop: 10,
//     color: "#334155",
//   },
//   statusSelect: {
//     marginTop: 12,
//     width: "100%",
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     fontWeight: 700,
//   },
//   status: (s) => ({
//     padding: "4px 10px",
//     borderRadius: 20,
//     fontSize: 12,
//     fontWeight: 700,
//     color: "#fff",
//     background:
//       s === "placed"
//         ? "#64748b"
//         : s === "confirmed"
//         ? "#0ea5e9"
//         : s === "shipped"
//         ? "#f59e0b"
//         : s === "delivered"
//         ? "#22c55e"
//         : "#ef4444",
//   }),
// };




















import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Package, 
  User, 
  Phone, 
  MapPin, 
  Filter, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  ChevronDown 
} from "lucide-react";

const API = "https://grocerrybackend.onrender.com/api/orders";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API}/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const filtered = orders.filter(
    (o) => filter === "all" || o.status === filter
  );

  // Status Badge Colors Logic
  const getStatusStyle = (s) => {
    switch (s) {
      case "placed": return "bg-slate-100 text-slate-600 border-slate-200";
      case "confirmed": return "bg-blue-100 text-blue-600 border-blue-200";
      case "shipped": return "bg-amber-100 text-amber-600 border-amber-200";
      case "delivered": return "bg-green-100 text-green-600 border-green-200";
      case "cancelled": return "bg-red-100 text-red-600 border-red-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#F8FAFC] min-h-screen">
      {/* HEADER & FILTER */}
      <div className="flex flex-row items-center justify-between gap-2 mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
  {/* Title Box - Left Side */}
  <div>
    <h2 className="text-[13px] md:text-xl font-bold text-slate-800 uppercase tracking-tighter shrink-0">
      Order Management
    </h2>
  </div>

  {/* Select Box - Right Side (Amne-Samne) */}
  <div className="relative w-36 md:w-64">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <Filter size={14} />
    </div>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-8 py-1.5 md:py-2.5 text-[10px] md:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm transition-all"
    >
      <option value="all">All Orders</option>
      <option value="placed">Placed</option>
      <option value="confirmed">Confirmed</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <ChevronDown size={14} />
    </div>
  </div>
</div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-blue-600 space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="font-medium animate-pulse">Fetching orders...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((o) => (
            <div key={o._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
              
              {/* Card Header */}
              <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm leading-tight truncate w-32 md:w-auto">
                        {o.user?.name || o.userName}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {o._id.slice(-6)}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(o.status)}`}>
                    {o.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 space-y-4">
                {/* Product Info */}
                <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-blue-500" />
                    <span className="text-sm font-semibold text-slate-700 truncate max-w-[120px]">
                      {o.product?.name || o.productName}
                    </span>
                  </div>
                  <div className="text-right font-bold text-blue-700 text-sm">
                    ₹{o.price} <span className="text-[10px] text-blue-400">×{o.quantity}</span>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={12} /> Shipping Address
                  </p>
                  <div className="text-xs text-slate-600 leading-relaxed pl-1">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      {o.address?.name} <span className="text-gray-300">|</span> <Phone size={10} /> {o.address?.phone}
                    </p>
                    <p className="mt-1">{o.address?.street}, {o.address?.city}</p>
                    <p>{o.address?.state} - {o.address?.pincode}</p>
                  </div>
                </div>
              </div>

              {/* Status Update Footer */}
              <div className="p-4 pt-0">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500">
                    <Clock size={14} />
                  </div>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Package size={48} className="text-gray-200 mb-2" />
          <p className="text-gray-400 font-medium">No orders found in this category</p>
        </div>
      )}
    </div>
  );
}