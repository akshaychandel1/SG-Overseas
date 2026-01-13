
// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   Users,
//   BarChart2,
//   LogOut,
//   Menu,
//   Grid,
//   Package,
//   User,
//     CreditCard, 
// } from "react-feather";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   /* ================= RESPONSIVE ================= */
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   useEffect(() => {
//     setIsSidebarOpen(!isMobile);
//   }, [isMobile]);

//   const hoverStyle = (isHover, active) => ({
//     ...styles.link,
//     background: active
//       ? "linear-gradient(135deg, #983a30 0%, #c0392b 100%)"
//       : isHover
//       ? "rgba(255,255,255,0.15)"
//       : "transparent",
//     color: "#fff",
//   });

//   const sidebarItems = [
//     { to: "/admin", label: "Dashboard", icon: <BarChart2 size={18} /> },
//     { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
//     {
//       to: "/admin/CategoryManager",
//       label: "Add Category",
//       icon: <Grid size={18} />,
//     },
//     {
//       to: "/admin/priceanalytics",
//       label: "Analytics",
//       icon: <BarChart2 size={18} />,
//     },
//     {
//       to: "/admin/pricelist",
//       label: "Add Product",
//       icon: <Package size={18} />,
//     },
//     {
//   to: "/admin/orders",
//   label: "Orders",
//   icon: <Package size={18} />,
// },
// {
//   to: "/admin/payments",
//   label: "Payments",
//   icon: <CreditCard size={18} />,
// },
//   { to: "/admin/gst", label: "GST & Discounts", icon: <CreditCard size={18} /> },
//   {
//   to: "/admin/inventory",
//   label: "Inventory",
//   icon: <Package size={18} />,
// }
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", background: "#f6f9fc" }}>
//       {/* ================= OVERLAY ================= */}
//       {isMobile && isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.45)",
//             zIndex: 90,
//           }}
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         style={{
//           width: 250,
//           background: "linear-gradient(180deg, #0f2e47 0%, #1a4d6f 100%)",
//           color: "#fff",
//           padding: "24px",
//           position: "fixed",
//           height: "100vh",
//           zIndex: 100,
//           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//           transition: "0.35s",
//         }}
//       >
//         <h3>AdminPanel</h3>

//         <ul style={{ listStyle: "none", marginTop: 30, padding: 0 }}>
//           {sidebarItems.map((item, i) => {
//             const active = location.pathname === item.to;

//             return (
//               <li key={i} style={styles.navItem}>
//                 <Link
//                   to={item.to}
//                   style={hoverStyle(hoveredLink === i, active)}
//                   onMouseEnter={() => setHoveredLink(i)}
//                   onMouseLeave={() => setHoveredLink(null)}
//                   onClick={() => isMobile && setIsSidebarOpen(false)}
//                 >
//                   {item.icon} {item.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         <button onClick={logout} style={styles.logout}>
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <main
//         style={{
//           flex: 1,
//           marginLeft: !isMobile && isSidebarOpen ? 250 : 0,
//           transition: "0.35s",
//         }}
//       >
//         {/* ================= HEADER ================= */}
//         <div
//           style={{
//             background: "#fff",
//             padding: "12px 20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             position: "sticky",
//             top: 0,
//             zIndex: 50,
//           }}
//         >
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{ background: "transparent", border: "none", cursor: "pointer" }}
//           >
//             <Menu size={26} />
//           </button>

//           <h3 style={{ margin: 0 }}>Admin Dashboard</h3>

//           {/* PROFILE */}
//           <div
//             onClick={() => navigate("/admin/update-password")}
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: "50%",
//               background: "#f1f5f9",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               border: "1px solid #e5e7eb",
//             }}
//             title="Update Password"
//           >
//             <User size={20} />
//           </div>
//         </div>

//         {/* ================= CONTENT ================= */}
//         <div style={{ padding: 24 }}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   navItem: {
//     padding: "10px 0",
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     color: "#fff",
//     textDecoration: "none",
//     fontSize: 15,
//     fontWeight: 500,
//     padding: "10px 14px",
//     borderRadius: 8,
//     transition: "0.25s",
//   },
//   logout: {
//     background: "linear-gradient(135deg, #983a30 0%, #c0392b 100%)",
//     border: "none",
//     padding: "12px",
//     color: "#fff",
//     borderRadius: 8,
//     marginTop: 20,
//     cursor: "pointer",
//     width: "100%",
//     fontWeight: 600,
//     display: "flex",
//     justifyContent: "center",
//     gap: 8,
//   },
// };
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users, BarChart2, LogOut, Menu, Grid, Package, User, CreditCard, X, Layout, Table, ShoppingCart
} from "react-feather";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Screen size check and Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Original Logout Functionality
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // Responsive Handler Logic from original code
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Sidebar items from original list
  const sidebarItems = [
    { to: "/admin", label: "Dashboard", icon: <Grid size={18} /> },
    { to: "/admin/users", label: "Users", icon: <User size={18} /> },
    { to: "/admin/CategoryManager", label: "Add Category", icon: <Layout size={18} /> },
    { to: "/admin/priceanalytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { to: "/admin/pricelist", label: "Add Product", icon: <Package size={18} /> },
    { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
    { to: "/admin/gst", label: "GST & Discounts", icon: <CreditCard size={18} /> },
    { to: "/admin/inventory", label: "Inventory", icon: <Table size={18} /> }
  ];

  return (
    <div style={styles.container}>
      {/* OVERLAY - Original Functionality */}
      {isMobile && isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} style={styles.overlay} />
      )}

      {/* ================= SIDEBAR (TailAdmin Light Style) ================= */}
      <aside style={{
        ...styles.sidebar,
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        width: "280px"
      }}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <BarChart2 color="white" size={18} />
          </div>
          <h1 style={styles.logoText}>SG Overseas</h1>
          {isMobile && <X size={22} onClick={() => setIsSidebarOpen(false)} style={styles.closeMobile} />}
        </div>

        <div style={styles.menuLabel}>MENU</div>

        <nav style={styles.nav}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sidebarItems.map((item, i) => {
              const active = location.pathname === item.to;
              return (
                <li key={i} style={{ marginBottom: "4px" }}>
                  <Link
                    to={item.to}
                    style={{
                      ...styles.link,
                      backgroundColor: active ? "#EFF6FF" : "transparent",
                      color: active ? "#3C50E0" : "#64748B",
                    }}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: active ? "#3C50E0" : "#64748B" }}>{item.icon}</span>
                      <span style={{ fontWeight: active ? "600" : "500" }}>{item.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Original Logout Logic */}
        <div style={styles.sidebarFooter}>
          <button onClick={logout} style={styles.logoutBtn}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main style={{
        ...styles.main,
        marginLeft: !isMobile && isSidebarOpen ? "280px" : 0,
      }}>
        <header style={styles.header}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleBtn}>
            <Menu size={22} color="#64748B" />
          </button>

          <div style={styles.headerRight}>
            {/* Original Password Update Functionality */}
            <div onClick={() => navigate("/admin/update-password")} style={styles.avatar} title="Update Password">
              <User size={20} color="#64748B" />
            </div>
          </div>
        </header>

        <div style={{
          ...styles.content,
          padding: isMobile ? "20px 16px" : "30px"
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ================= TAILADMIN THEME STYLES ================= */

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F1F5F9",
    fontFamily: "'Inter', sans-serif", // Inter font applied
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    backdropFilter: "blur(2px)",
    zIndex: 90,
  },
  sidebar: {
    position: "fixed",
    height: "100vh",
    backgroundColor: "#FFFFFF",
    zIndex: 100,
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRight: "1px solid #E2E8F0",
    display: "flex",
    flexDirection: "column",
  },
  logoSection: {
    padding: "32px 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    backgroundColor: "#3C50E0",
    padding: "6px",
    borderRadius: "6px",
    display: "flex",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1C2434",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  closeMobile: {
    marginLeft: "auto",
    cursor: "pointer",
    color: "#64748B"
  },
  menuLabel: {
    padding: "0 24px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#8A99AF",
    marginBottom: "16px",
    letterSpacing: "1px",
  },
  nav: {
    flex: 1,
    padding: "0 16px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 12px",
    textDecoration: "none",
    borderRadius: "6px",
    transition: "all 0.2s ease",
    fontSize: "15px",
  },
  sidebarFooter: {
    padding: "20px 16px",
    borderTop: "1px solid #F1F5F9",
  },
  logoutBtn: {
    width: "100%",
    padding: "10px",
    background: "none",
    border: "1px solid #E2E8F0",
    borderRadius: "6px",
    color: "#64748B",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "0.2s",
  },
  main: {
    flex: 1,
    transition: "margin-left 0.3s ease-in-out",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "80px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    borderBottom: "1px solid #E2E8F0",
    position: "sticky",
    top: 0,
    zIndex: 80,
  },
  toggleBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "#EFF4FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "1px solid #E2E8F0",
  },
  content: {
    flex: 1,
  }
};