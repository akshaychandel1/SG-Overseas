// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Reports.css";

// const API = "https://grocerrybackend.onrender.com/api/reports";

// export default function Reports() {
//   const [reports, setReports] = useState([]);
//   const [file, setFile] = useState(null);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     fileType: "pdf",
//   });

//   const loadReports = async () => {
//     const res = await axios.get(API);
//     setReports(res.data.data || []);
//   };

//   useEffect(() => {
//     loadReports();
//   }, []);

//   const submit = async () => {
//     if (!file || !form.title) return alert("Title & file required");

//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     fd.append("fileType", form.fileType);
//     fd.append("file", file);

//     await axios.post(API, fd);
//     setForm({ title: "", description: "", fileType: "pdf" });
//     setFile(null);
//     loadReports();
//   };

//   const remove = async (id) => {
//     if (!window.confirm("Delete this report?")) return;
//     await axios.delete(`${API}/${id}`);
//     loadReports();
//   };

//   return (
//     <div className="reports-page">
//       <h2>📊 Reports</h2>

//       <div className="report-form">
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <select
//           value={form.fileType}
//           onChange={(e) => setForm({ ...form, fileType: e.target.value })}
//         >
//           <option value="pdf">PDF</option>
//           <option value="image">Image</option>
//           <option value="text">Text</option>
//         </select>

//         <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//         <button className="upload-btn" onClick={submit}>
//           Upload Report
//         </button>
//       </div>

//       <div className="reports-list">
//         {reports.map((r) => (
//           <div key={r._id} className="report-card">
//             <div className="report-info">
//               <b>{r.title}</b>
//               <span className="report-type">{r.fileType.toUpperCase()}</span>
//             </div>

//             <div className="report-actions">
//               <a
//                 href={r.fileUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="view-btn"
//               >
//                 View
//               </a>
//               <button className="delete-btn" onClick={() => remove(r._id)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart3, 
  FileText, 
  CloudUpload, 
  Trash2, 
  Eye, 
  X, 
  Plus,
  FileCheck,
  Type,
  Loader2
} from "lucide-react";

const API = "https://grocerrybackend.onrender.com/api/reports";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    fileType: "pdf",
  });

  const loadReports = async () => {
    try {
      const res = await axios.get(API);
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Load failed");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const submit = async () => {
    if (!file || !form.title) return alert("Title & file required");

    setIsUploading(true); // Start Loader
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("fileType", form.fileType);
    fd.append("file", file);

    try {
      await axios.post(API, fd);
      alert("Report Uploaded Successfully");
      setForm({ title: "", description: "", fileType: "pdf" });
      setFile(null);
      setShowForm(false);
      loadReports();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploading(false); // Stop Loader
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      loadReports();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-3 md:p-6 bg-[#F1F5F9] min-h-screen font-['Inter',sans-serif]">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-5 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-[#1C2434] flex items-center gap-2">
            Reports & Docs
          </h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={isUploading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all active:scale-95 shadow-lg ${
            showForm ? "bg-slate-100 text-slate-600" : "bg-[#3C50E0] text-white hover:bg-blue-700 disabled:opacity-50"
          }`}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showForm ? "Cancel" : "New Report"}</span>
        </button>
      </div>

      {/* COMPACT UPLOAD FORM */}
      {showForm && (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-200 animate-in fade-in zoom-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-[#64748B] uppercase mb-1 block">Report Title</label>
                <input
                  placeholder="e.g. Monthly Sales Jan"
                  value={form.title}
                  disabled={isUploading}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs focus:border-[#3C50E0] outline-none transition-all disabled:opacity-70"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#64748B] uppercase mb-1 block">Description</label>
                <textarea
                  placeholder="Details about the report..."
                  value={form.description}
                  rows="2"
                  disabled={isUploading}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs focus:border-[#3C50E0] outline-none transition-all resize-none disabled:opacity-70"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-[#64748B] uppercase mb-1 block">File Type</label>
                <select
                  value={form.fileType}
                  disabled={isUploading}
                  onChange={(e) => setForm({ ...form, fileType: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs appearance-none outline-none focus:border-[#3C50E0] disabled:opacity-70"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="image">Image File</option>
                  <option value="text">Text Report</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#64748B] uppercase mb-1 block">Choose File</label>
                <div className="flex items-center justify-center w-full">
                  <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-[#E2E8F0] border-dashed rounded-lg cursor-pointer bg-[#F8FAFC] hover:bg-slate-100 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload className="w-8 h-8 mb-2 text-[#64748B]" />
                      <p className="text-[10px] text-[#64748B] px-2 text-center">
                        <span className="font-bold truncate block max-w-[200px]">{file ? file.name : "Click to upload"}</span>
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      disabled={isUploading}
                      onChange={(e) => setFile(e.target.files[0])} 
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end border-t pt-4">
            <button 
              onClick={submit} 
              disabled={isUploading}
              className="w-full md:w-auto bg-[#3C50E0] text-white font-bold py-2.5 px-8 rounded-lg text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <><Loader2 size={16} className="animate-spin" /> Uploading...</>
              ) : (
                <><FileCheck size={16}/> Upload & Save Report</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* REPORTS LIST - Compact Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-xl border border-dashed border-slate-300">
             <BarChart3 className="mx-auto text-slate-200 mb-2" size={40} />
             <p className="text-slate-400 font-medium">No reports available</p>
          </div>
        ) : (
          reports.map((r) => (
            <div key={r._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-[#F1F5F9] p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                  {r.fileType === 'pdf' ? <FileText className="text-red-500" size={20}/> : 
                   r.fileType === 'image' ? <CloudUpload className="text-blue-500" size={20}/> : 
                   <Type className="text-slate-500" size={20}/>}
                </div>
                <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
                  {r.fileType}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#1C2434] truncate mb-1">{r.title}</h3>
                <p className="text-[11px] text-[#64748B] line-clamp-2 h-8 leading-relaxed">
                  {r.description || "No description provided for this report."}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#1C2434] py-2 rounded-lg text-[11px] font-bold transition-all border border-slate-200"
                >
                  <Eye size={14} /> View
                </a>
                <button 
                  className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-[11px] font-bold transition-all border border-red-100 disabled:opacity-50"
                  onClick={() => remove(r._id)}
                  disabled={isUploading}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}