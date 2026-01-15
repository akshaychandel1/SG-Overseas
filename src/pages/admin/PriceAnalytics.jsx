
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { Line } from "react-chartjs-2";
// import "./PriceAnalytics.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// const API_BASE = "https://grocerrybackend.onrender.com/api";

// export default function PriceAnalytics() {
//   const [loading, setLoading] = useState(true);
//   const [productList, setProductList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [chartData, setChartData] = useState(null);

//   /* ================= LOAD DROPDOWNS ================= */
//   useEffect(() => {
//     Promise.all([
//       axios.get(`${API_BASE}/prices`),
//       axios.get(`${API_BASE}/categories`),
//     ]).then(([priceRes, catRes]) => {
//       // 🔥 Extract ONLY PRODUCTS from nested structure
//       const products = [];

//       // priceRes.data.data.forEach(category => {
//       //   category.subcategories.forEach(sub => {
//       //     sub.products.forEach(prod => {
//       //       products.push(prod);
//       //     });
//       //   });
//       // });
//       priceRes.data.data.forEach(category => {
//         category.subcategories.forEach(sub => {
//           sub.products.forEach(prod => {
//             products.push({
//               ...prod,
//               categoryName: category.name   // 🔥 attach category
//             });
//           });
//         });
//       });
//       setProductList(products);
//       setCategoryList(catRes.data.categories || []);
//     });
//   }, []);

//   //     setLoading(true);

//   //     try {
//   //       const res = await axios.get(`${API_BASE}/prices`);

//   //       let data = [];

//   //       // 🔥 Flatten Category → Sub → Products
//   //       // res.data.data.forEach(category => {
//   //       //   category.subcategories.forEach(sub => {
//   //       //     sub.products.forEach(prod => {
//   //       //       data.push(prod);
//   //       //     });
//   //       //   });
//   //       // });

//   //       priceRes.data.data.forEach(category => {
//   //   category.subcategories.forEach(sub => {
//   //     sub.products.forEach(prod => {
//   //       products.push({
//   //         ...prod,
//   //         categoryName: category.name   // 🔥 attach category
//   //       });
//   //     });
//   //   });
//   // });

//   //       // 🔥 Filters
//   //       if (selectedProduct) {
//   //         data = data.filter(p => p.name === selectedProduct);
//   //       }

//   //       // if (selectedCategory) {
//   //       //   data = data.filter(p => p.category?.name === selectedCategory);
//   //       // }



//   //       // 🔥 Sort by time
//   //       data.sort(
//   //         (a, b) =>
//   //           new Date(a.createdAt || a.validTill) -
//   //           new Date(b.createdAt || b.validTill)
//   //       );

//   //       const labels = data.map(item =>
//   //         new Date(item.createdAt || item.validTill).toLocaleString("en-IN")
//   //       );

//   //       const prices = data.map(item => {
//   //         const base = Number(item.basePrice) || 0;
//   //         const diff = Number(item.difference) || 0;
//   //         return base + diff;
//   //       });

//   //       // Single point fix
//   //       if (labels.length === 1) {
//   //         labels.unshift("Earlier");
//   //         prices.unshift(prices[0]);
//   //       }

//   //       setChartData({
//   //         labels,
//   //         datasets: [
//   //           {
//   //             label: "Final Price (₹)",
//   //             data: prices,
//   //             borderColor: "#dc3545",
//   //             backgroundColor: "rgba(220,53,69,0.15)",
//   //             tension: 0,
//   //             fill: true,
//   //             pointRadius: 5,
//   //             pointHoverRadius: 7,
//   //           },
//   //         ],
//   //       });

//   //     } catch (err) {
//   //       console.error("Chart error:", err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   const fetchChart = async () => {
//     setLoading(true);

//     try {
//       const res = await axios.get(`${API_BASE}/prices`);

//       let data = [];

//       // ✅ Proper flatten with category name
//       res.data.data.forEach(category => {
//         category.subcategories.forEach(sub => {
//           sub.products.forEach(prod => {
//             data.push({
//               ...prod,
//               categoryName: category.name   // 🔥 important
//             });
//           });
//         });
//       });

//       // ✅ Product filter
//       if (selectedProduct) {
//         data = data.filter(p => p.name === selectedProduct);
//       }

//       // ✅ Category filter
//       if (selectedCategory) {
//         data = data.filter(p => p.categoryName === selectedCategory);
//       }

//       // ❗ If nothing found, clear chart
//       if (data.length === 0) {
//         setChartData(null);
//         setLoading(false);
//         return;
//       }

//       // ✅ Sort by time
//       data.sort(
//         (a, b) =>
//           new Date(a.createdAt || a.validTill) -
//           new Date(b.createdAt || b.validTill)
//       );

//       const labels = data.map(item =>
//         new Date(item.createdAt || item.validTill).toLocaleString("en-IN")
//       );

//       const prices = data.map(item => {
//         const base = Number(item.basePrice) || 0;
//         const diff = Number(item.difference) || 0;
//         return base + diff;
//       });

//       // Single point zigzag fix
//       if (labels.length === 1) {
//         labels.unshift("Earlier");
//         prices.unshift(prices[0]);
//       }

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Final Price (₹)",
//             data: prices,
//             borderColor: "#dc3545",
//             backgroundColor: "rgba(220,53,69,0.15)",
//             tension: 0,
//             fill: true,
//             pointRadius: 5,
//             pointHoverRadius: 7,
//           },
//         ],
//       });

//     } catch (err) {
//       console.error("Chart error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchChart();
//   }, [selectedProduct, selectedCategory]);

//   /* ================= UI ================= */
//   return (
//     <div className="analytics-container">
//       <h2 className="analytics-title">Price Analytics (Zig-Zag)</h2>

//       <div className="filter-section">
//         <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
//           <option value="">All Products</option>
//           {productList.map(p => (
//             <option key={p._id} value={p.name}>{p.name}</option>
//           ))}
//         </select>

//         <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
//           <option value="">All Categories</option>
//           {categoryList.map(c => (
//             <option key={c._id} value={c.name}>{c.name}</option>
//           ))}
//         </select>
//       </div>

//       <div className="chart-wrapper">
//         {loading ? (
//           <div className="loading">Loading...</div>
//         ) : chartData ? (
//           <Line
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: {
//                 y: { beginAtZero: false },
//               },
//               plugins: {
//                 legend: { position: "bottom" },
//                 datalabels: {
//                   display: true,
//                   align: "top",
//                   formatter: v => `₹${v}`,
//                   font: { weight: "bold" },
//                 },
//               },
//             }}
//           />
//         ) : (
//           <div className="no-data">No data available</div>
//         )}
//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler, // 🔥 For the area background gradient
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import "./PriceAnalytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

const API_BASE = "https://grocerrybackend.onrender.com/api";

export default function PriceAnalytics() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [chartData, setChartData] = useState(null);

  /* ================= LOAD DROPDOWNS (Same Logic) ================= */
  useEffect(() => {
    Promise.all([
      axios.get(`${API_BASE}/prices`),
      axios.get(`${API_BASE}/categories`),
    ]).then(([priceRes, catRes]) => {
      const products = [];
      priceRes.data.data.forEach(category => {
        category.subcategories.forEach(sub => {
          sub.products.forEach(prod => {
            products.push({
              ...prod,
              categoryName: category.name
            });
          });
        });
      });
      setProductList(products);
      setCategoryList(catRes.data.categories || []);
    });
  }, []);

  const fetchChart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/prices`);
      let data = [];

      res.data.data.forEach(category => {
        category.subcategories.forEach(sub => {
          sub.products.forEach(prod => {
            data.push({ ...prod, categoryName: category.name });
          });
        });
      });

      if (selectedProduct) data = data.filter(p => p.name === selectedProduct);
      if (selectedCategory) data = data.filter(p => p.categoryName === selectedCategory);

      if (data.length === 0) {
        setChartData(null);
        setLoading(false);
        return;
      }

      data.sort((a, b) => new Date(a.createdAt || a.validTill) - new Date(b.createdAt || b.validTill));

      const labels = data.map(item =>
        new Date(item.createdAt || item.validTill).toLocaleDateString("en-IN", { month: 'short', day: 'numeric' })
      );

      const prices = data.map(item => (Number(item.basePrice) || 0) + (Number(item.difference) || 0));

      if (labels.length === 1) {
        labels.unshift("Earlier");
        prices.unshift(prices[0]);
      }

      // 🔥 TailAdmin Blue Gradient Theme
      setChartData({
        labels,
        datasets: [
          {
            label: "Price",
            data: prices,
            borderColor: "#3C50E0", // Blue color like TailAdmin
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(60, 80, 224, 0.2)");
              gradient.addColorStop(1, "rgba(60, 80, 224, 0)");
              return gradient;
            },
            tension: 0.4, // Smooth curve like screenshot 3
            fill: true,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#3C50E0",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      });
    } catch (err) {
      console.error("Chart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [selectedProduct, selectedCategory]);

  return (
    <div className="tm-analytics-wrapper m-4">
      {/* Title Bar like TailAdmin Card Header */}
      <div className="tm-card-header">
        <div className="tm-header-left">
          <h2 className="tm-card-title">Price Analytics</h2>
          <p className="tm-card-subtitle">Jun 1, 2024 - Dec 1, 2025</p>
        </div>

        {/* Filter Section - Optimized One Line */}
        <div className="tm-filter-section">
          <div className="tm-select-wrapper">
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              <option value="">All Products</option>
              {productList.map(p => (
                <option key={p._id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="tm-select-wrapper">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categoryList.map(c => (
                <option key={c._id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="tm-chart-container">
        {loading ? (
          <div className="tm-loading-state">
            <div className="spinner"></div>
            <span>Loading Analytics...</span>
          </div>
        ) : chartData ? (
          <div className="tm-canvas-wrapper">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: { color: "#F1F5F9", drawBorder: false },
                    ticks: { color: "#64748B", font: { size: 12 } }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: "#64748B", font: { size: 12 } }
                  },
                },
                plugins: {
                  legend: { display: false }, // Hide legend to match screenshot
                  datalabels: {
                    display: true,
                    align: "top",
                    color: "#3C50E0",
                    formatter: v => `₹${v}`,
                    font: { weight: "600", size: 11 },
                  },
                  tooltip: {
                    backgroundColor: "#1C2434",
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 14 },
                    displayColors: false,
                  }
                },
              }}
            />
          </div>
        ) : (
          <div className="tm-no-data">No price history found</div>
        )}
      </div>
    </div>
  );
}