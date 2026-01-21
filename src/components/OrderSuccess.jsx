// import React, { useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../css/OrderSuccess.css";

// const OrderSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderId = location.state?.orderId || "TD-" + Math.floor(Math.random() * 1000000);

//   // Scroll to top on mount
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="success-page">
//       <div className="success-card">
//         <div className="success-icon">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
//             <polyline points="20 6 9 17 4 12"></polyline>
//           </svg>
//         </div>
        
//         <h1 className="success-title">Order Confirmed!</h1>
//         <p className="success-message">
//           Thank you for your purchase. We've received your order and are getting it ready for shipment.
//         </p>

//         <div className="order-details">
//           <span>Order Number:</span>
//           <strong>{orderId}</strong>
//         </div>

//         <div className="success-actions">
//           <Link to="/products" className="btn-continue-shopping">
//             Continue Shopping
//           </Link>
//           <button onClick={() => window.print()} className="btn-print">
//             Print Receipt
//           </button>
//         </div>

//         <p className="success-note">
//           A confirmation email has been sent to your inbox.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;


import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../css/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const receiptRef = useRef(); // This creates a "hook" to grab the HTML element
  
  const orderId = location.state?.orderId || "TD-" + Math.floor(Math.random() * 1000000);

  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    // 1. Capture the HTML as a high-quality canvas
    const canvas = await html2canvas(element, { scale: 2 }); 
    const imgData = canvas.toDataURL("image/png");

    // 2. Create a new PDF (A4 size)
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 3. Add the image to the PDF and save
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Receipt_${orderId}.pdf`);
  };

  return (
    <div className="success-page">
      {/* This ref="receiptRef" marks the area to be downloaded */}
      <div className="success-card" ref={receiptRef}>
        <div className="success-icon">✅</div>
        <h1 className="success-title">Order Confirmed!</h1>
        <p className="success-message">Thank you! Your order is being processed.</p>

        <div className="order-details-box">
          <div className="detail-row">
            <span>Order Number:</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="detail-row">
            <span>Date:</span>
            <strong>{new Date().toLocaleDateString()}</strong>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <strong style={{color: '#50cd89'}}>Paid</strong>
          </div>
        </div>

        <div className="success-actions-buttons">
          <button onClick={handleDownloadPDF} className="btn-download">
            📥 Download PDF Receipt
          </button>
          <Link to="/products" className="btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;