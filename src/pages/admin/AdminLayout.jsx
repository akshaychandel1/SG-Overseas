// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   Users, BarChart2, LogOut, Menu, Grid, Package, User, CreditCard, X, Layout, Table, ShoppingCart
// } from "react-feather";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Screen size check and Sidebar state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

//   // Original Logout Functionality
//   const logout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   // Responsive Handler Logic from original code
//   useEffect(() => {
//     const handler = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       if (!mobile) setIsSidebarOpen(true);
//       else setIsSidebarOpen(false);
//     };
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);

//   // Sidebar items from original list
//   const sidebarItems = [
//     { to: "/admin", label: "Dashboard", icon: <Grid size={18} /> },
//     { to: "/admin/users", label: "Users", icon: <User size={18} /> },
//     { to: "/admin/CategoryManager", label: "Add Category", icon: <Layout size={18} /> },
//     { to: "/admin/priceanalytics", label: "Analytics", icon: <BarChart2 size={18} /> },
//     { to: "/admin/pricelist", label: "Add Product", icon: <Package size={18} /> },
//     { to: "/admin/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
//     { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
//     { to: "/admin/gst", label: "GST & Discounts", icon: <CreditCard size={18} /> },
//     { to: "/admin/inventory", label: "Inventory", icon: <Table size={18} /> }
//   ];

//   return (
//     <div style={styles.container}>
//       {/* OVERLAY - Original Functionality */}
//       {isMobile && isSidebarOpen && (
//         <div onClick={() => setIsSidebarOpen(false)} style={styles.overlay} />
//       )}

//       {/* ================= SIDEBAR (TailAdmin Light Style) ================= */}
//       <aside style={{
//         ...styles.sidebar,
//         transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//         width: "280px"
//       }}>
//         <div style={styles.logoSection}>
//           <div style={styles.logoIcon}>
//             <BarChart2 color="white" size={18} />
//           </div>
//           <h1 style={styles.logoText}>Food Helper</h1>
//           {isMobile && <X size={22} onClick={() => setIsSidebarOpen(false)} style={styles.closeMobile} />0
//         </div>

//         <div style={styles.menuLabel}>MENU</div>

//         <nav style={styles.nav}>
//           <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//             {sidebarItems.map((item, i) => {
//               const active = location.pathname === item.to;
//               return (
//                 <li key={i} style={{ marginBottom: "4px" }}>
//                   <Link
//                     to={item.to}
//                     style={{
//                       ...styles.link,
//                       backgroundColor: active ? "#EFF6FF" : "transparent",
//                       color: active ? "#3C50E0" : "#64748B",
//                     }}
//                     onClick={() => isMobile && setIsSidebarOpen(false)}
//                   >
//                     <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                       <span style={{ color: active ? "#3C50E0" : "#64748B" }}>{item.icon}</span>
//                       <span style={{ fontWeight: active ? "600" : "500" }}>{item.label}</span>
//                     </span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Original Logout Logic */}
//         <div style={styles.sidebarFooter}>
//           <button onClick={logout} style={styles.logoutBtn}>
//             <LogOut size={18} /> <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* ================= MAIN CONTENT AREA ================= */}
//       <main style={{
//         ...styles.main,
//         marginLeft: !isMobile && isSidebarOpen ? "280px" : 0,
//       }}>
//         <header style={styles.header}>
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.toggleBtn}>
//             <Menu size={22} color="#64748B" />
//           </button>

//           <div style={styles.headerRight}>
//             {/* Original Password Update Functionality */}
//             <div onClick={() => navigate("/admin/update-password")} style={styles.avatar} title="Update Password">
//               <User size={20} color="#64748B" />
//             </div>
//           </div>
//         </header>

//         <div style={{
//           ...styles.content,
//           padding: isMobile ? "20px 16px" : "30px"
//         }}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ================= TAILADMIN THEME STYLES ================= */

// const styles = {
//   container: {
//     display: "flex",
//     minHeight: "100vh",
//     backgroundColor: "#F1F5F9",
//     fontFamily: "'Inter', sans-serif", // Inter font applied
//   },
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0,0,0,0.2)",
//     backdropFilter: "blur(2px)",
//     zIndex: 90,
//   },
//   sidebar: {
//     position: "fixed",
//     height: "100vh",
//     backgroundColor: "#FFFFFF",
//     zIndex: 100,
//     transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     borderRight: "1px solid #E2E8F0",
//     display: "flex",
//     flexDirection: "column",
//   },
//   logoSection: {
//     padding: "32px 24px",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },
//   logoIcon: {
//     backgroundColor: "#3C50E0",
//     padding: "6px",
//     borderRadius: "6px",
//     display: "flex",
//   },
//   logoText: {
//     fontSize: "22px",
//     fontWeight: "700",
//     color: "#1C2434",
//     margin: 0,
//     letterSpacing: "-0.5px",
//   },
//   closeMobile: {
//     marginLeft: "auto",
//     cursor: "pointer",
//     color: "#64748B"
//   },
//   menuLabel: {
//     padding: "0 24px",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#8A99AF",
//     marginBottom: "16px",
//     letterSpacing: "1px",
//   },
//   nav: {
//     flex: 1,
//     padding: "0 16px",
//   },
//   link: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "11px 12px",
//     textDecoration: "none",
//     borderRadius: "6px",
//     transition: "all 0.2s ease",
//     fontSize: "15px",
//   },
//   sidebarFooter: {
//     padding: "20px 16px",
//     borderTop: "1px solid #F1F5F9",
//   },
//   logoutBtn: {
//     width: "100%",
//     padding: "10px",
//     background: "none",
//     border: "1px solid #E2E8F0",
//     borderRadius: "6px",
//     color: "#64748B",
//     fontWeight: "600",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     cursor: "pointer",
//     transition: "0.2s",
//   },
//   main: {
//     flex: 1,
//     transition: "margin-left 0.3s ease-in-out",
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   header: {
//     height: "80px",
//     backgroundColor: "#FFFFFF",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 24px",
//     borderBottom: "1px solid #E2E8F0",
//     position: "sticky",
//     top: 0,
//     zIndex: 80,
//   },
//   toggleBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     padding: 0,
//   },
//   headerRight: {
//     display: "flex",
//     alignItems: "center",
//   },
//   avatar: {
//     width: "44px",
//     height: "44px",
//     borderRadius: "50%",
//     backgroundColor: "#EFF4FB",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     border: "1px solid #E2E8F0",
//   },
//   content: {
//     flex: 1,
//   }
// };

































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
//   CreditCard,
//   Home,
//   Truck,
//   FileText,
//   Headphones,
//   X,
// } from "react-feather";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [hoveredLink, setHoveredLink] = useState(null);

//   /* ================= LOGOUT ================= */
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

//   /* ================= SIDEBAR ITEMS ================= */
//   const sidebarItems = [
//     { to: "/admin", label: "Dashboard", icon: <BarChart2 size={18} /> },
//     { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
//     { to: "/admin/stores", label: "Stores / Warehouse", icon: <Home size={18} /> },
//     { to: "/admin/riders", label: "Delivery Partners", icon: <Truck size={18} /> },
//     { to: "/admin/CategoryManager", label: "Add Category", icon: <Grid size={18} /> },
//     { to: "/admin/priceanalytics", label: "Analytics", icon: <BarChart2 size={18} /> },
//     { to: "/admin/pricelist", label: "Add Product", icon: <Package size={18} /> },
//     { to: "/admin/orders", label: "Orders", icon: <Package size={18} /> },
//     { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
//     { to: "/admin/gst", label: "GST & Discounts", icon: <CreditCard size={18} /> },
//     { to: "/admin/inventory", label: "Inventory", icon: <Package size={18} /> },
//     { to: "/admin/reports", label: "Reports", icon: <FileText size={18} /> },
//     { to: "/admin/support", label: "Support", icon: <Headphones size={18} /> },
//   ];

//   /* ================= TAILADMIN STYLE OBJECT ================= */
//   const styles = {
//     container: {
//       display: "flex",
//       minHeight: "100vh",
//       backgroundColor: "#F1F5F9",
//       fontFamily: "'Inter', sans-serif",
//       position: "relative",
//     },
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.45)",
//       zIndex: 99,
//     },
//     sidebar: {
//       width: 280,
//       height: "100vh",
//       background: "#FFFFFF",
//       color: "#64748B",
//       position: "fixed",
//       zIndex: 100,
//       transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//       display: "flex",
//       flexDirection: "column",
//       padding: 0,
//       borderRight: "1px solid #E2E8F0",
//     },
//     logoSection: {
//       padding: "32px 24px",
//       display: "flex",
//       alignItems: "center",
//       gap: "12px",
//       borderBottom: "1px solid #F1F5F9",
//     },
//     logoIcon: {
//       backgroundColor: "#3C50E0",
//       padding: "6px",
//       borderRadius: "6px",
//       display: "flex",
//     },
//     logoText: {
//       fontSize: "22px",
//       fontWeight: "700",
//       color: "#1C2434",
//       margin: 0,
//       letterSpacing: "-0.5px",
//     },
//     closeMobile: {
//       marginLeft: "auto",
//       cursor: "pointer",
//       color: "#64748B"
//     },
//     menuLabel: {
//       padding: "24px 24px 16px 24px",
//       fontSize: "12px",
//       fontWeight: "600",
//       color: "#8A99AF",
//       letterSpacing: "1px",
//     },
//     scrollContainer: {
//       listStyle: "none",
//       padding: "0 16px",
//       margin: 0,
//       flex: 1,
//       overflowY: "auto",
//     },
//     link: (hover, active) => ({
//       display: "flex",
//       alignItems: "center",
//       gap: 12,
//       padding: "11px 12px",
//       borderRadius: "6px",
//       color: active ? "#3C50E0" : "#64748B",
//       fontSize: "15px",
//       fontWeight: active ? "600" : "500",
//       textDecoration: "none",
//       backgroundColor: active ? "#EFF6FF" : hover ? "#F8FAFC" : "transparent",
//       transition: "all 0.2s ease",
//     }),
//     logoutBtn: {
//       background: "none",
//       border: "1px solid #E2E8F0",
//       padding: "12px",
//       color: "#64748B",
//       borderRadius: "6px",
//       fontWeight: 600,
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: 8,
//       margin: "20px 16px",
//       width: "calc(100% - 32px)",
//     },
//     main: {
//       flex: 1,
//       marginLeft: 0,
//       transition: "margin-left 0.3s ease-in-out",
//       minHeight: "100vh",
//       position: "relative",
//     },
//     header: {
//       background: "#fff",
//       padding: "0 24px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       height: "80px",
//       position: "sticky",
//       top: 0,
//       zIndex: 49,
//       borderBottom: "1px solid #E2E8F0",
//     },
//     toggleBtn: {
//       background: "transparent",
//       border: "none",
//       cursor: "pointer",
//     },
//     userIcon: {
//       width: 44,
//       height: 44,
//       borderRadius: "50%",
//       background: "#EFF4FB",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       border: "1px solid #E2E8F0",
//     },
//     content: {
//       padding: 30,
//       position: "relative",
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* ================= OVERLAY (MOBILE) ================= */}
//       {isMobile && isSidebarOpen && (
//         <div
//           onClick={() => setIsSidebarOpen(false)}
//           style={styles.overlay}
//         />
//       )}

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         style={{
//           ...styles.sidebar,
//           transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
//         }}
//       >
//         {/* Logo Section */}
//         <div style={styles.logoSection}>
//           <div style={styles.logoIcon}>
//             <BarChart2 color="white" size={18} />
//           </div>
//           <h3 style={styles.logoText}>Food Helper</h3>
//           {isMobile && (
//             <X 
//               size={22} 
//               onClick={() => setIsSidebarOpen(false)} 
//               style={styles.closeMobile} 
//             />
//           )}
//         </div>

//         {/* Menu Label */}
//         <div style={styles.menuLabel}>MENU</div>

//         {/* ===== Scrollable Menu ===== */}
//         <ul
//           className="sidebar-scroll"
//           style={styles.scrollContainer}
//         >
//           {sidebarItems.map((item, i) => {
//             const active = location.pathname.startsWith(item.to);
//             return (
//               <li key={i} style={{ marginBottom: "4px" }}>
//                 <Link
//                   to={item.to}
//                   style={styles.link(hoveredLink === i, active)}
//                   onMouseEnter={() => setHoveredLink(i)}
//                   onMouseLeave={() => setHoveredLink(null)}
//                   onClick={() => isMobile && setIsSidebarOpen(false)}
//                 >
//                   <span style={{ 
//                     color: active ? "#3C50E0" : "#64748B",
//                     display: 'flex',
//                     alignItems: 'center'
//                   }}>
//                     {item.icon}
//                   </span>
//                   {item.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* ===== Logout ===== */}
//         <button
//           onClick={logout}
//           style={styles.logoutBtn}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <main
//         style={{
//           ...styles.main,
//           marginLeft: !isMobile && isSidebarOpen ? 280 : 0,
//         }}
//       >
//         {/* ================= HEADER ================= */}
//         <div style={styles.header}>
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={styles.toggleBtn}
//           >
//             <Menu size={26} color="#64748B" />
//           </button>

//           <h3 style={{ 
//             margin: 0, 
//             fontSize: "18px",
//             fontWeight: "600",
//             color: "#1C2434"
//           }}>Admin Dashboard</h3>

//           <div
//             onClick={() => navigate("/admin/update-password")}
//             style={styles.userIcon}
//             title="Update Password"
//           >
//             <User size={20} color="#64748B" />
//           </div>
//         </div>

//         {/* ================= CONTENT ================= */}
//         <div style={styles.content}>
//           <Outlet />
//         </div>
//       </main>

//       {/* ===== Scrollbar Hide CSS ===== */}
//       <style>
//         {`
//           .sidebar-scroll::-webkit-scrollbar {
//             display: none;
//           }
//           .sidebar-scroll {
//             scrollbar-width: none;
//             -ms-overflow-style: none;
//           }
          
//           /* Inter Font (optional) */
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//         `}
//       </style>
//     </div>
//   );
// }





















import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  BarChart2,
  LogOut,
  Menu,
  Grid,
  Package,
  User,
  CreditCard,
  Home,
  Truck,
  FileText,
  Headphones,
  X,
} from "react-feather";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredLink, setHoveredLink] = useState(null);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  /* ================= RESPONSIVE HANDLER ================= */
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handler);
    handler();
    return () => window.removeEventListener("resize", handler);
  }, []);

  const sidebarItems = [
    { to: "/admin", label: "Dashboard", icon: <BarChart2 size={18} /> },
    { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
    { to: "/admin/stores", label: "Stores / Warehouse", icon: <Home size={18} /> },
    { to: "/admin/riders", label: "Delivery Partners", icon: <Truck size={18} /> },
    { to: "/admin/CategoryManager", label: "Add Category", icon: <Grid size={18} /> },
    { to: "/admin/priceanalytics", label: "Analytics", icon: <BarChart2 size={18} /> },
    { to: "/admin/pricelist", label: "Add Product", icon: <Package size={18} /> },
    { to: "/admin/orders", label: "Orders", icon: <Package size={18} /> },
    { to: "/admin/payments", label: "Payments", icon: <CreditCard size={18} /> },
    { to: "/admin/gst", label: "GST & Discounts", icon: <CreditCard size={18} /> },
    { to: "/admin/inventory", label: "Inventory", icon: <Package size={18} /> },
    { to: "/admin/reports", label: "Reports", icon: <FileText size={18} /> },
    { to: "/admin/support", label: "Support", icon: <Headphones size={18} /> },
  ];

  /* ================= STYLES ================= */
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#F1F5F9",
      fontFamily: "'Inter', sans-serif",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      zIndex: 998,
      backdropFilter: "blur(2px)",
    },
    sidebar: {
      width: 280,
      height: "100vh",
      background: "#FFFFFF",
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 999,
      transition: "transform 0.3s ease-in-out",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #E2E8F0",
    },
    logoSection: {
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      height: "80px",
      borderBottom: "1px solid #F1F5F9",
      flexShrink: 0,
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      marginLeft: !isMobile && isSidebarOpen ? 280 : 0,
      transition: "margin-left 0.3s ease-in-out",
    },
    header: {
      background: "#fff",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "80px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      borderBottom: "1px solid #E2E8F0",
      width: "100%",
    },
    content: {
      padding: 0, // FIXED: Padding 30 se 0 kar di
      flex: 1,
    }
  };

  return (
    <div style={styles.container}>
      {isMobile && isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} style={styles.overlay} />
      )}

      <aside style={{ ...styles.sidebar, transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)" }}>
        <div style={styles.logoSection}>
          <div style={{ backgroundColor: "#3C50E0", padding: "6px", borderRadius: "6px", display: "flex" }}>
            <BarChart2 color="white" size={18} />
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1C2434", margin: 0 }}>Food Helper</h3>
          {isMobile && <X size={22} onClick={() => setIsSidebarOpen(false)} style={{ marginLeft: "auto", cursor: "pointer" }} />}
        </div>

        <div style={{ padding: "20px 24px 10px 24px", fontSize: "11px", fontWeight: "600", color: "#8A99AF" }}>MENU</div>

        <ul className="sidebar-scroll" style={{ listStyle: "none", padding: "0 16px", margin: 0, flex: 1, overflowY: "auto" }}>
          {sidebarItems.map((item, i) => {
            const active = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
            return (
              <li key={i} style={{ marginBottom: "2px" }}>
                <Link
                  to={item.to}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: "6px",
                    color: active ? "#3C50E0" : "#64748B",
                    fontSize: "14px",
                    fontWeight: active ? "600" : "500",
                    textDecoration: "none",
                    backgroundColor: active ? "#EFF6FF" : hoveredLink === i ? "#F8FAFC" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button onClick={logout} style={{ background: "none", border: "1px solid #E2E8F0", padding: "10px", color: "#E11D48", borderRadius: "6px", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, margin: "16px", fontSize: "14px" }}>
          <LogOut size={16} /> Logout Account
        </button>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: 'flex', padding: 0 }}>
              <Menu size={24} color="#64748B" />
            </button>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1C2434" }}>Dashboard</h3>
          </div>

          <div onClick={() => navigate("/admin/update-password")} style={{ width: 38, height: 38, borderRadius: "50%", background: "#F8FAFC", display: "flex", alignItems: "center", justifyCenter: "center", cursor: "pointer", border: "1px solid #E2E8F0", justifyContent: 'center' }}>
            <User size={18} color="#64748B" />
          </div>
        </header>

        <div style={styles.content}>
          <Outlet />
        </div>
      </main>

      <style>
        {`
          .sidebar-scroll::-webkit-scrollbar { display: none; }
          .sidebar-scroll { scrollbar-width: none; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        `}
      </style>
    </div>
  );
}