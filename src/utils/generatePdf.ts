import React, { useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
const baseUrl = window.location.origin;
console.log("Base URL:", baseUrl);

const getDeliveryDates = (orderDetails: any) => {
  if (orderDetails.itemList) {
    return orderDetails.itemList.map((item: any) => item.delivery_date || "");
  }
  return `${orderDetails.delivery_date || ""}`.split(",");
};

const generatePdf = (orderDetails: any) => {
  console.log("orderDetails = ", orderDetails);
  const options = {
    orientation: "portrait", // or 'landscape'
    unit: "mm",
    format: "a4",
  };

  const doc = new jsPDF();

  // Set the document properties (optional)
  doc.setProperties({
    title: "Invoice",
  });

  // Define the data for your invoice (product details and shipping cost)

  // Define the table column widths and row heights (optional)
  const columnWidths = [60, 30, 20, 25, 30];
  const rowHeights = 10;

  const companyLogo = `${baseUrl}/assets/imgs/jhatkabyte-logo.png`;
  // Add company logo to the PDF (adjust the coordinates and dimensions as needed)
  //@ts-ignore
  doc.addImage(companyLogo, "PNG", 5, 5, 30, 25);

  // Set font size for the invoice title
  doc.setFontSize(14);
  doc.text("Invoice", 105, 10, { align: "center" });
  let startY = 50;
  // Order Number and Date
  doc.setFontSize(12);
  doc.text(`Order Number: ${orderDetails.ref_no}`, 10, startY);
  // startY = startY+10;
  doc.text(`Order Date: ${new Date(orderDetails.inserted_at).toLocaleDateString()}`, 10, (startY += 10));
  const rows: any = [];

  if (orderDetails.itemList) {
    orderDetails.itemList.forEach((obj: any) => {
      let arr = [obj.name, obj.delivery_date || "", `${obj.quantity}${obj.unit}`, obj.count, obj.price];
      rows.push(arr);
    });
  } else {
    const product_names = orderDetails.product_names.split(",");
    const quantity = orderDetails.quantity.split(",");
    const price = orderDetails.price.split(",");
    const units = orderDetails.units.split(",");
    const counts = orderDetails.counts.split(",");
    const deliveryDates = getDeliveryDates(orderDetails);
    product_names.forEach((item: any, i: number) => {
      let arr = [item, deliveryDates[i] || "", `${quantity[i]}${units[i]}`, counts[i], price[i]];
      rows.push(arr);
    });
  }

  const invoiceData = [["Product Name", "Delivery Date", "Quantity", "Units", "Price"], ...rows];
  // Calculate the total amount
  //@ts-ignore
  const totalAmount = orderDetails.total_price;
  const shippingCost = orderDetails.shipping_cost;

  // Shipping Cost and Total

  // Product Table
  //@ts-ignore
  doc.autoTable({
    startY: startY + 10, // Adjust this value to align the table with other content
    margin: { left: 10 },
    head: [invoiceData[0]],
    body: invoiceData.slice(1),
    columnWidths,
    rowHeights,
  });
  //@ts-ignore
  startY = doc.autoTable.previous.finalY;
  doc.text(`Sub Total: ${totalAmount - shippingCost}`, 140, (startY += 10));
  doc.text(`Shipping Cost: ${shippingCost}`, 140, (startY += 5));
  doc.text(`Total: ${totalAmount}`, 140, (startY += 5));
  const address = orderDetails.shipping_address.split(",");
  // Name, Shipping Address, Date, and Signature
  doc.setFontSize(12);
  doc.text(`Name: ${orderDetails.name}`, 10, (startY += 10));
  doc.text("Shipping Address:", 10, (startY += 5));
  address.map((item: any) => {
    doc.text(item ? item.trim() : "", 10, (startY += 5));
  });
  doc.text(`Landmark: ${orderDetails.landmark}`, 10, (startY += 5));
  doc.text(`User Notes: ${orderDetails.additional_notes || "----"}`, 10, (startY += 5));
  doc.text(`Delivery Notes: ${orderDetails.admin_notes || "----"}`, 10, (startY += 5));
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, (startY += 15));
  doc.text("Signature: ____________", 10, (startY += 10));
  // Add copyright notice to the footer center
  const footerText = `© JhatkaBytes ${new Date().getFullYear()}`;
  const footerX = doc.internal.pageSize.getWidth() / 2;
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.text(footerText, footerX, footerY, { align: "center" });

  // Save or display the PDF
  doc.save(`invoice_${orderDetails.ref_no}.pdf`);
};

export const generateMultiplePdf = (orderAray: any) => {
  console.log("orderAray = ", orderAray);
  const options = {
    orientation: "portrait", // or 'landscape'
    unit: "mm",
    format: "a4",
  };

  const doc = new jsPDF();

  orderAray.forEach((orderDetails: any, index: number) => {
    if (index > 0) {
      doc.addPage();
    }
    // Set the document properties (optional)
    doc.setProperties({
      title: "Invoice",
    });

    // Define the data for your invoice (product details and shipping cost)

    // Define the table column widths and row heights (optional)
    const columnWidths = [60, 30, 20, 25, 30];
    const rowHeights = 10;

    const companyLogo = `${baseUrl}/assets/imgs/jhatkabyte-logo.png`;
    // Add company logo to the PDF (adjust the coordinates and dimensions as needed)
    //@ts-ignore
    doc.addImage(companyLogo, "PNG", 5, 5, 30, 25);

    // Set font size for the invoice title
    doc.setFontSize(10);
    doc.text("Invoice", 105, 10, { align: "center" });
    let startY = 50;
    // Order Number and Date
    doc.setFontSize(10);
    doc.text(`Order Number: ${orderDetails.ref_no}`, 10, startY);
    // startY = startY+10;
    doc.text(`Order Date: ${new Date(orderDetails.inserted_at).toLocaleDateString()}`, 10, (startY += 5));
    const rows: any = [];

    if (orderDetails.itemList) {
      orderDetails.itemList.forEach((obj: any) => {
        let arr = [obj.name, obj.delivery_date || "", `${obj.quantity}${obj.unit}`, obj.count, obj.price];
        rows.push(arr);
      });
    } else {
      const product_names = orderDetails.product_names.split(",");
      const quantity = orderDetails.quantity.split(",");
      const price = orderDetails.price.split(",");
      const units = orderDetails.units.split(",");
      const counts = orderDetails.counts.split(",");
      const deliveryDates = getDeliveryDates(orderDetails);
      product_names.forEach((item: any, i: number) => {
        let arr = [item, deliveryDates[i] || "", `${quantity[i]}${units[i]}`, counts[i], price[i]];
        rows.push(arr);
      });
    }

    const invoiceData = [["Product Name", "Delivery Date", "Quantity", "Units", "Price"], ...rows];
    // Calculate the total amount
    //@ts-ignore
    const totalAmount = orderDetails.total_price;
    const shippingCost = orderDetails.shipping_cost;

    // Shipping Cost and Total

    // Product Table
    //@ts-ignore
    doc.autoTable({
      startY: startY + 10, // Adjust this value to align the table with other content
      margin: { left: 10 },
      head: [invoiceData[0]],
      body: invoiceData.slice(1),
      columnWidths,
      rowHeights,
    });
    //@ts-ignore
    startY = doc.autoTable.previous.finalY;
    doc.text(`Sub Total: ${totalAmount - shippingCost}`, 140, (startY += 10));
    doc.text(`Shipping Cost: ${shippingCost}`, 140, (startY += 5));
    doc.text(`Total: ${totalAmount}`, 140, (startY += 5));
    const address = orderDetails.shipping_address.split(",");
    // Name, Shipping Address, Date, and Signature
    doc.setFontSize(10);
    doc.text(`Name: ${orderDetails.name}`, 10, (startY += 10));
    doc.text(`Phone Number: ${orderDetails.phone_number}`, 10, (startY += 5));
    doc.text("Shipping Address:", 10, (startY += 5));
    address.map((item: any) => {
      doc.text(item ? item.trim() : "", 10, (startY += 5));
    });
    doc.text(`Landmark: ${orderDetails.landmark}`, 10, (startY += 5));
    doc.text(`User Notes: ${orderDetails.additional_notes || "----"}`, 10, (startY += 5));
    doc.text(`Delivery Notes: ${orderDetails.admin_notes || "----"}`, 10, (startY += 5));
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, (startY += 15));
    doc.text("Signature: ____________", 10, (startY += 10));
    // Add copyright notice to the footer center
    const footerText = `© JhatkaBytes ${new Date().getFullYear()}`;
    const footerX = doc.internal.pageSize.getWidth() / 2;
    const footerY = doc.internal.pageSize.getHeight() - 10;
    doc.text(footerText, footerX, footerY, { align: "center" });
  });

  // Save or display the PDF
  doc.save(`invoices.pdf`);
};

export default generatePdf;
