import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users, ShoppingCart, Package, TrendingUp,
  ArrowUp, ArrowDown, Box, AlertTriangle,
  DollarSign, List, Layers, PieChart
} from "react-feather";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const API = "https://grocerrybackend.onrender.com/api";

export default function Dashboard() {
  const [data, setData] = useState({
    products: [],
    inventory: [],
    categories: [],
    users: [],
    loading: true
  });

  const [stats, setStats] = useState({
    totalRev: 0,
    lowStockCount: 0,
    totalProds: 0,
    userCount: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Sabhi APIs ko ek saath fetch kar rahe hain
      const [priceRes, catRes, userRes, invRes] = await Promise.all([
        axios.get(`${API}/prices`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API}/categories`).catch(() => ({ data: { categories: [] } })),
        axios.get(`${API}/user`).catch(() => ({ data: [] })),
        axios.get(`${API}/inventory/all`).catch(() => ({ data: { data: [] } }))
      ]);

      const invItems = invRes.data.data || [];
      const cats = catRes.data.categories || [];
      const users = userRes.data || [];

      // Calculate real stats from APIs
      const rev = invItems.reduce((acc, curr) => acc + (Number(curr.sellingPrice) || 0), 0);
      const low = invItems.filter(i => i.stock <= (i.minStock || 5)).length;

      setData({
        products: priceRes.data.data || [],
        inventory: invItems,
        categories: cats,
        users: users,
        loading: false
      });

      setStats({
        totalRev: rev,
        lowStockCount: low,
        totalProds: invItems.length,
        userCount: users.length
      });

    } catch (err) {
      console.error("Dashboard Load Error", err);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  if (data.loading) return <div className="tm-loader">Updating Dashboard...</div>;

  return (
    <div className="tm-wrapper">
      {/* HEADER */}
      <div className="tm-header">
        <div className="tm-title-box">
          <h2>Dashboard</h2>
          <p>Real-time analytics from all modules</p>
        </div>
        <button className="tm-btn-primary" onClick={fetchAllData}>Refresh Data</button>
      </div>

      {/* 1. TOP STATS (Dynamic) */}
      <div className="tm-metrics-grid">
        <StatCard title="Total Revenue" val={`₹${stats.totalRev}`} icon={<DollarSign />} color="#3c50e0" trend="+12%" />
        <StatCard title="Total Users" val={stats.userCount} icon={<Users />} color="#10b981" trend="+4%" />
        <StatCard title="Inventory Items" val={stats.totalProds} icon={<Box />} color="#ff9c07" trend="Live" />
        <StatCard title="Low Stock" val={stats.lowStockCount} icon={<AlertTriangle />} color="#e11d48" trend="Critical" />
      </div>

      <div className="tm-main-grid">
        {/* 2. INVENTORY SUMMARY (Small slice of Inventory API) */}
        <div className="tm-card">
          <div className="tm-card-header">
            <h3><Package size={18} /> Stock Alerts</h3>
            <span className="tm-link">View All</span>
          </div>
          <div className="tm-small-list">
            {data.inventory.filter(i => i.stock < 10).slice(0, 4).map(item => (
              <div key={item._id} className="tm-list-item">
                <span>{item.product?.name}</span>
                <span className="text-red-bold">{item.stock} left</span>
              </div>
            ))}
            {stats.lowStockCount === 0 && <p className="tm-empty">All stock levels normal</p>}
          </div>
        </div>

        {/* 3. CATEGORY OVERVIEW (Small slice of Categories API) */}
        <div className="tm-card">
          <div className="tm-card-header">
            <h3><Layers size={18} /> Categories</h3>
            <span className="tm-link">Manage</span>
          </div>
          <div className="tm-small-list">
            {data.categories.slice(0, 4).map(cat => (
              <div key={cat._id} className="tm-list-item">
                <span>{cat.name}</span>
                <span className="tm-badge-blue">{cat.subcategories?.length} Sub</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. RECENT USERS (Small slice of Users API) */}
        <div className="tm-card">
          <div className="tm-card-header">
            <h3><Users size={18} /> New Users</h3>
          </div>
          <div className="tm-user-grid">
            {data.users.slice(0, 4).map(u => (
              <div key={u._id} className="tm-user-mini">
                <div className="tm-avatar">{u.name?.charAt(0)}</div>
                <div className="tm-u-info">
                  <p>{u.name}</p>
                  <small>{u.email?.slice(0, 15)}...</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. PRICE ANALYTICS TREND (Small slice of Price API) */}
      <div className="tm-card tm-full-card">
        <div className="tm-card-header">
          <h3><TrendingUp size={18} /> Value Trend (Inventory)</h3>
        </div>
        <div className="tm-chart-box">
          <Line
            data={getChartConfig(stats.totalRev)}
            options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats
function StatCard({ title, val, icon, color, trend }) {
  return (
    <div className="tm-stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="tm-stat-icon" style={{ color: color }}>{icon}</div>
      <div className="tm-stat-info">
        <h3>{val}</h3>
        <p>{title}</p>
      </div>
      <div className="tm-stat-trend">{trend}</div>
    </div>
  );
}

// Chart Logic
const getChartConfig = (total) => ({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    data: [total * 0.5, total * 0.7, total * 0.6, total * 0.9, total * 0.8, total],
    borderColor: "#3c50e0",
    backgroundColor: "rgba(60, 80, 224, 0.1)",
    fill: true,
    tension: 0.4
  }]
});