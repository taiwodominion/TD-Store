import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import gsap from "gsap";
import {
  CheckCircle2,
  Download,
  ShoppingBag,
  ArrowRight,
  Printer,
} from "lucide-react";
import "../css/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const receiptRef = useRef();
  const cardRef = useRef();

  const orderId =
    location.state?.orderId || "TD-" + Math.floor(Math.random() * 1000000);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)",
      });

      gsap.from(".success-icon-anim", {
        rotate: -45,
        scale: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(2)",
      });

      gsap.from(".receipt-row", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.5,
        duration: 0.5,
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`TD_Receipt_${orderId}.pdf`);
  };

  return (
    <div className="success-page-container">
      <div className="success-card-wrapper" ref={cardRef}>
        <div className="receipt-content" ref={receiptRef}>
          <div className="success-icon-anim">
            <div className="icon-circle">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="success-title">Payment Received</h1>
          <p className="success-subtitle">
            Your order has been placed successfully and is now being prepared
            for shipment.
          </p>

          <div className="order-receipt-box">
            <div className="receipt-header">
              <span className="receipt-label">Official Receipt</span>
              <div className="receipt-dots"></div>
            </div>

            <div className="receipt-body">
              <div className="receipt-row">
                <span>Order ID</span>
                <span className="row-value">#{orderId}</span>
              </div>
              <div className="receipt-row">
                <span>Date</span>
                <span className="row-value">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="receipt-row">
                <span>Payment Status</span>
                <span className="row-value status-paid">Confirmed</span>
              </div>
              <div className="receipt-row">
                <span>Merchant</span>
                <span className="row-value">TD Store Intl.</span>
              </div>
            </div>

            <div className="receipt-footer-cut"></div>
          </div>
        </div>

        <div className="success-action-group">
          <button onClick={handleDownloadPDF} className="btn-action-primary">
            <Download size={18} />
            <span>Save Receipt (PDF)</span>
          </button>

          <Link to="/products" className="btn-action-outline">
            <ShoppingBag size={18} />
            <span>Continue Shopping</span>
            <ArrowRight size={16} className="arrow-hover" />
          </Link>
        </div>

        <p className="confirmation-email-note">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
