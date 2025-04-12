import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export default function ReportScreen() {
  const navigate = useNavigate();

  const summary = `Patient reports persistent headache for the past 2 days, accompanied by sensitivity to light. Blood pressure is elevated. Patient has a known history of migraines.`;
  const diagnosis = ["Migraine", "Subarachnoid Hemorrhage (SAH) - suspected"];
  const prescriptions = ["Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)", "Sumatriptan (as needed)"];
  const treatments = ["Order a CT scan to rule out hemorrhage", "Refer to Neurology for evaluation"];

  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginLeft = 40;
    let y = 60;

    doc.setFontSize(24);
    doc.setTextColor("#4B0082");
    doc.setFont("helvetica", "bold");
    doc.text("🧠 AI Medical Report", marginLeft, y);

    y += 40;
    doc.setFontSize(14);
    doc.setTextColor("#111111");

    doc.text("📝 Patient Summary", marginLeft, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(summary, 500), marginLeft, y);

    y += 60;
    doc.setFont("helvetica", "bold");
    doc.text("🧠 Diagnosis", marginLeft, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    diagnosis.forEach((item) => {
      doc.text(`• ${item}`, marginLeft + 10, y);
      y += 20;
    });

    y += 30;
    doc.setFont("helvetica", "bold");
    doc.text("💊 Prescription", marginLeft, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    prescriptions.forEach((item) => {
      doc.text(`• ${item}`, marginLeft + 10, y);
      y += 20;
    });

    y += 30;
    doc.setFont("helvetica", "bold");
    doc.text("📈 Treatment Plan", marginLeft, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    treatments.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, marginLeft + 10, y);
      y += 20;
    });

    // Generate QR and embed
    const qrText = "https://diagnoso.vercel.app/";
    const qrImage = await QRCode.toDataURL(qrText);
    doc.addImage(qrImage, "PNG", doc.internal.pageSize.getWidth() - 100, 40, 60, 60);

    doc.save("AI_Medical_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-10 text-sm text-gray-400 mb-10 border-b border-white/10 pb-2 w-full max-w-3xl mx-auto z-10"
      >
        <button onClick={() => navigate("/chat")} className="hover:text-white transition">Chat</button>
        <button className="border-b-2 border-white text-white pb-1">Report</button>
        <button
          onClick={() => {
            Swal.fire({
              title: "Log out?",
              text: "Are you sure you want to log out?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#ef4444",
              cancelButtonColor: "#6b7280",
              confirmButtonText: "Yes, log out",
              background: "#1f1f1f",
              color: "#fff",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("user");
                navigate("/login");
              }
            });
          }}
          className="text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10"
      >
        🧠 AI Medical Report
      </motion.h1>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-300 mb-2">📝 Patient Summary</h2>
        <p className="text-gray-300 italic leading-relaxed">{summary}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">🧠 Diagnosis</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {diagnosis.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/10 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">💊 Prescription</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {prescriptions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 rounded-xl p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-300 mb-3">📈 Treatment Plan</h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-1">
          {treatments.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-10">
        <button onClick={handleDownloadPDF} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition text-sm">
          <FiDownload /> Download PDF
        </button>
        <p className="text-xs text-gray-500 mt-2 italic">Generated by HimalAI. AI reports are suggestive. Please verify clinically.</p>
      </motion.div>
    </div>
  );
}