
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Users.css";

// const API = "https://grocerrybackend.onrender.com/api/user";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     // password: "",
//     role: "user",
//   });

//   const [editId, setEditId] = useState(null);
//   const [openMenu, setOpenMenu] = useState(null); // 3 dots dropdown

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         await axios.put(`${API}/${editId}`, form);
//         alert("User updated");
//       } else {
//         await axios.post(API, form);
//         alert("User created");
//       }

//       setForm({ name: "", email: "", password: "", role: "user" });
//       setEditId(null);
//       fetchUsers();
//     } catch (err) {
//       alert("Save failed");
//     }
//   };

//   const handleEdit = (usr) => {
//     setForm({
//       name: usr.name,
//       email: usr.email,
//       password: "",
//       role: usr.role,
//     });
//     setEditId(usr._id);
//     setOpenMenu(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;

//     try {
//       await axios.delete(`${API}/${id}`);
//       setOpenMenu(null);
//       fetchUsers();
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="users-container">
//       <div className="users-header">
//         <h2> User Management</h2>


//       </div>
// <br/>
// <br/>
//       {/* Form */}
//       {/* <form className="user-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="text"
//           placeholder="Password (encrypted)"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <select
//           value={form.role}
//           onChange={(e) => setForm({ ...form, role: e.target.value })}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button type="submit">{editId ? "Update User" : "Add User"}</button>

//         {editId && (
//           <button
//             type="button"
//             className="cancel-btn"
//             onClick={() => {
//               setEditId(null);
//               setForm({ name: "", email: "", password: "", role: "user" });
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </form> */}

//       {/* TABLE WITH SCROLL */}
//       {!loading && (
//         <div className="table-wrapper">
//           <table className="users-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 {/* <th>Password</th> */}
//                 <th>Role</th>
//                 {/* <th>Actions</th> */}
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((u, i) => (
//                 <tr key={u._id}>
//                   <td>{i + 1}</td>
//                   <td>{u.name}</td>
//                   <td>{u.email}</td>

//                   {/* <td className="password-col">{u.password}</td> */}

//                   <td>
//                     <span className={`role-badge ${u.role}`}>{u.role}</span>
//                   </td>

//                   {/* 3 DOTS MENU */}
//                   {/* <td className="action-cell">
//                     <div className="action-menu">
//                       <button
//                         className="dots-btn"
//                         onClick={() =>
//                           setOpenMenu(openMenu === u._id ? null : u._id)
//                         }
//                       >
//                         ⋮
//                       </button>

//                       {openMenu === u._id && (
//                         <div className="dropdown-menu">
//                           <button onClick={() => handleEdit(u)}>Edit</button>
//                           <button onClick={() => handleDelete(u._id)}>
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {loading && <div className="loader">Loading users...</div>}
//     </div>
//   );
// }
























import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Trash2, Edit, MoreVertical, User } from "react-feather";
import "./Users.css";

const API = "https://grocerrybackend.onrender.com/api/user";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tm-users-container">
      {/* Page Header */}
      <div className="tm-users-header">
        <div>
          <h2 className="tm-users-title">User Management</h2>
          <p className="tm-users-subtitle">Track and manage your platform users</p>
        </div>
      </div>

      <div className="tm-table-card">
        {/* Table Toolbar (As seen in Screenshot 2 & 5) */}
        <div className="tm-table-toolbar">
          <div className="tm-search-wrapper">
            <Search size={18} className="tm-search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="tm-filter-btn">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>

        {/* TailAdmin Style Table */}
        <div className="tm-table-wrapper">
          <table className="tm-users-table">
            <thead>
              <tr>
                <th className="tm-col-check"><input type="checkbox" /></th>
                <th>User Details</th>
                <th>Email Address</th>
                <th>Role</th>
                <th className="tm-text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading && filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="tm-user-info">
                      <div className="tm-avatar">
                        {/* Dynamic Avatar Colors like Screenshot 5 */}
                        <span className={`tm-avatar-circle ${u.role === 'admin' ? 'bg-red' : 'bg-blue'}`}>
                          {u.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="tm-user-text">
                        <span className="tm-user-name">{u.name}</span>
                        <span className="tm-user-subtext">ID: {u._id.slice(-6)}</span>
                      </div>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`tm-status-badge ${u.role === 'admin' ? 'status-admin' : 'status-user'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="tm-text-right">
                    <div className="tm-action-group">
                      <button className="tm-icon-btn edit"><Edit size={16} /></button>
                      <button className="tm-icon-btn delete" onClick={() => handleDelete(u._id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <div className="tm-loader">Loading records...</div>}
          {!loading && filteredUsers.length === 0 && (
            <div className="tm-empty">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}