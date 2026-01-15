// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Search, Filter, Trash2, Edit, MoreVertical, User } from "react-feather";
// import "./Users.css";

// const API = "https://grocerrybackend.onrender.com/api/user";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchUsers = () => {
//     setLoading(true);
//     axios
//       .get(API)
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;
//     try {
//       await axios.delete(`${API}/${id}`);
//       fetchUsers();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   // Filter users based on search
//   const filteredUsers = users.filter(u =>
//     u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="tm-users-container m-4">
//       {/* Page Header */}
//       <div className="tm-users-header">
//         <div>
//           <h2 className="tm-users-title">User Management</h2>
//           <p className="tm-users-subtitle">Track and manage your platform users</p>
//         </div>
//       </div>

//       <div className="tm-table-card">
//         {/* Table Toolbar (As seen in Screenshot 2 & 5) */}
//         <div className="tm-table-toolbar">
//           <div className="tm-search-wrapper">
//             <Search size={18} className="tm-search-icon" />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="tm-filter-btn">
//             <Filter size={18} />
//             <span>Filter</span>
//           </button>
//         </div>

//         {/* TailAdmin Style Table */}
//         <div className="tm-table-wrapper">
//           <table className="tm-users-table">
//             <thead>
//               <tr>
//                 <th className="tm-col-check"><input type="checkbox" /></th>
//                 <th>User Details</th>
//                 <th>Email Address</th>
//                 <th>Role</th>
//                 <th className="tm-text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {!loading && filteredUsers.map((u) => (
//                 <tr key={u._id}>
//                   <td><input type="checkbox" /></td>
//                   <td>
//                     <div className="tm-user-info">
//                       <div className="tm-avatar">
//                         {/* Dynamic Avatar Colors like Screenshot 5 */}
//                         <span className={`tm-avatar-circle ${u.role === 'admin' ? 'bg-red' : 'bg-blue'}`}>
//                           {u.name.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div className="tm-user-text">
//                         <span className="tm-user-name">{u.name}</span>
//                         <span className="tm-user-subtext">ID: {u._id.slice(-6)}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{u.email}</td>
//                   <td>
//                     <span className={`tm-status-badge ${u.role === 'admin' ? 'status-admin' : 'status-user'}`}>
//                       {u.role}
//                     </span>
//                   </td>
//                   <td className="tm-text-right">
//                     <div className="tm-action-group">
//                       <button className="tm-icon-btn edit"><Edit size={16} /></button>
//                       <button className="tm-icon-btn delete" onClick={() => handleDelete(u._id)}>
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {loading && <div className="tm-loader">Loading records...</div>}
//           {!loading && filteredUsers.length === 0 && (
//             <div className="tm-empty">No users found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



















import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Mail, 
  ShieldCheck, 
  Clock, 
  Loader2, 
  Search,
  UserCheck,
  UserCog,
  Users as UsersIcon
} from "lucide-react";

const API = "https://grocerrybackend.onrender.com/api/user/all";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Functionality: Load Users with Token
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };
      const res = await axios.get(API, config);
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Functionality: Search logic
  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:p-4 p-4 md:p-6 bg-[#F1F5F9] min-h-screen font-['Inter',sans-serif]">
      
      {/* HEADER: Side-by-side on Mobile */}
      <div className="flex flex-row items-center justify-between gap-2 mb-2 bg-white p-2.5 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-1.5">
          <h2 className="text-xs md:text-lg font-bold text-[#1C2434] uppercase tracking-tight">
            Customers
          </h2>
        </div>

        <div className="relative w-full max-w-[140px] md:max-w-xs">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={11} />
          <input 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-md pl-7 pr-2 py-1 text-[10px] md:text-xs outline-none focus:border-[#3C50E0]"
          />
        </div>
      </div>

      {/* TABLE: Ultra Tight & Functionally Rich */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-2">
            <Loader2 className="animate-spin text-[#3C50E0]" size={24} />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Loading...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* table-fixed use kiya hai taaki spacing control mein rahe */}
            <table className="w-full text-left border-collapse table-fixed min-w-[380px]">
              <thead>
                <tr className="bg-[#F7F9FC] border-b border-[#EEEEEE]">
                  <th className="w-[10%] p-2 text-[9px] font-black text-[#64748B] uppercase text-center">#</th>
                  <th className="w-[55%] p-2 text-[9px] font-black text-[#64748B] uppercase">Details</th>
                  <th className="w-[18%] p-1 text-[9px] font-black text-[#64748B] uppercase text-center">Status</th>
                  <th className="w-[17%] p-2 text-[9px] font-black text-[#64748B] uppercase text-center">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-400 text-[10px] font-bold uppercase">No records found</td>
                  </tr>
                ) : (
                  filteredUsers.map((u, i) => (
                    <tr key={u._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-2 text-[10px] text-[#64748B] font-bold text-center italic">{i + 1}</td>
                      
                      <td className="p-2">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1C2434] text-[11px] truncate leading-none mb-0.5">
                            {u.name || "N/A"}
                          </span>
                          <span className="text-[9px] text-[#64748B] truncate flex items-center gap-0.5">
                            <Mail size={8} /> {u.email}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-1 text-center">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-black uppercase border ${
                          u.isEmailVerified 
                          ? 'bg-[#E1F9F0] text-[#10B981] border-[#10B981]/10' 
                          : 'bg-[#FFF0F0] text-[#D34053] border-[#D34053]/10'
                        }`}>
                          {u.isEmailVerified ? "VERF" : "PEND"}
                        </span>
                      </td>

                      <td className="p-2 text-center">
                        <span className={`inline-flex items-center gap-0.5 text-[8px] font-black px-1.5 py-0.5 rounded uppercase border ${
                          u.role === 'admin' 
                          ? 'text-[#3C50E0] bg-blue-50 border-blue-100' 
                          : 'text-slate-400 bg-slate-50 border-slate-100'
                        }`}>
                          {u.role === 'admin' ? <UserCog size={8}/> : <UserCheck size={8}/>}
                          {u.role === 'admin' ? "ADM" : "USR"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        ::-webkit-scrollbar { height: 3px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}