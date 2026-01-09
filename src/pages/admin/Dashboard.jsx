import React from "react";
import {
  Users,
  ShoppingCart,
  Package,
  Truck,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Shield,
  Grid,
} from "react-feather";

export default function Dashboard() {
  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Grocery Admin Dashboard</h2>
          <p style={styles.subtitle}>Manage products, orders & inventory</p>
        </div>
        <div style={styles.badge}>
          <Activity size={14} /> Live Store
        </div>
      </div>

      {/* KPI CARDS */}
      <div style={styles.grid}>
        <StatCard
          title="Total Customers"
          value="3,420"
          trend="+9%"
          helper="this month"
          icon={<Users size={26} />}
          gradient="linear-gradient(135deg, #2563eb, #1e40af)"
        />

        <StatCard
          title="Product Categories"
          value="18"
          trend="+2"
          helper="new added"
          icon={<Grid size={26} />}
          gradient="linear-gradient(135deg, #16a34a, #166534)"
        />

        <StatCard
          title="Total Products"
          value="1,245"
          trend="+36"
          helper="new items"
          icon={<Package size={26} />}
          gradient="linear-gradient(135deg, #ea580c, #9a3412)"
        />

        <StatCard
          title="Monthly Revenue"
          value="₹ 8.6L"
          trend="+21%"
          helper="sales growth"
          icon={<TrendingUp size={26} />}
          gradient="linear-gradient(135deg, #7c3aed, #4c1d95)"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actions}>
        <ActionCard
          icon={<Package size={18} />}
          title="Manage Products"
          desc="Add, update or remove grocery items"
        />
        <ActionCard
          icon={<ShoppingCart size={18} />}
          title="Orders"
          desc="View and process customer orders"
        />
        <ActionCard
          icon={<Truck size={18} />}
          title="Deliveries"
          desc="Track and manage deliveries"
        />
        <ActionCard
          icon={<Shield size={18} />}
          title="Admin Security"
          desc="Update password & permissions"
        />
      </div>

      {/* INSIGHTS */}
      <div style={styles.bottomGrid}>
        <InfoCard
          title="Recent Activity"
          items={[
            "🥬 New product added: Fresh Spinach",
            "🛒 Order #2451 placed",
            "📦 Stock updated for Rice (25kg)",
            "🚚 Order #2447 delivered successfully",
          ]}
        />
        <InfoCard
          title="Store Health"
          items={[
            "🟢 Inventory system running",
            "🟢 Payments working fine",
            "🟢 Delivery partners active",
            "🟢 No pending issues",
          ]}
        />
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <span>© 2026 Grocery Admin Panel</span>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, trend, helper, icon, gradient }) {
  return (
    <div
      style={{ ...styles.card, background: gradient }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-6px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <div style={styles.cardLeft}>
        <span style={styles.cardLabel}>{title}</span>
        <span style={styles.cardNumber}>{value}</span>

        <div style={styles.cardMeta}>
          <span style={styles.trendBadge}>
            <TrendingUp size={14} /> {trend}
          </span>
          <span style={styles.helperText}>{helper}</span>
        </div>
      </div>

      <div style={styles.cardIconBox}>
        {icon}
        <ArrowUpRight size={14} style={{ marginLeft: 6, opacity: 0.8 }} />
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc }) {
  return (
    <div style={styles.actionCard}>
      <div style={styles.actionIcon}>{icon}</div>
      <div>
        <h4 style={styles.actionTitle}>{title}</h4>
        <p style={styles.actionDesc}>{desc}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, items }) {
  return (
    <div style={styles.infoCard}>
      <h4 style={styles.infoTitle}>{title}</h4>
      <ul style={styles.list}>
        {items.map((item, i) => (
          <li key={i} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: 26 },

  header: {
    background: "#ffffff",
    padding: "18px 24px",
    borderRadius: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  title: { margin: 0, fontSize: 24, fontWeight: 700 },
  subtitle: { marginTop: 6, fontSize: 14, color: "#6b7280" },

  badge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#e5f6ed",
    color: "#047857",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 22,
  },

  card: {
    color: "#fff",
    padding: "22px 24px",
    borderRadius: 18,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  cardLeft: { display: "flex", flexDirection: "column", gap: 6 },

  cardLabel: { fontSize: 14, opacity: 0.9, fontWeight: 500 },

  cardNumber: {
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: "0.5px",
  },

  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },

  trendBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.25)",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },

  helperText: { fontSize: 12, opacity: 0.85 },

  cardIconBox: {
    background: "rgba(255,255,255,0.22)",
    padding: 18,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  actionCard: {
    background: "#ffffff",
    padding: 18,
    borderRadius: 14,
    display: "flex",
    gap: 14,
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  actionIcon: {
    background: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
  },

  actionTitle: { margin: 0, fontSize: 15, fontWeight: 600 },
  actionDesc: { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },

  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: 22,
  },

  infoCard: {
    background: "#ffffff",
    padding: 22,
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  infoTitle: { marginBottom: 12, fontSize: 16, fontWeight: 600 },

  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: {
    padding: "8px 0",
    fontSize: 14,
    borderBottom: "1px solid #f1f5f9",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#6b7280",
    padding: "8px 4px",
  },
};
