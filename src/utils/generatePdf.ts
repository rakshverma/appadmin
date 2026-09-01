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

const getOrderRows = (orderDetails: any, includePrice = true) => {
  const rows: any = [];

  if (orderDetails.itemList) {
    orderDetails.itemList.forEach((obj: any) => {
      const row = [obj.name, obj.delivery_date || "", `${obj.quantity}${obj.unit}`, obj.count];
      rows.push(includePrice ? [...row, obj.price] : row);
    });
    return rows;
  }

  const product_names = `${orderDetails.product_names || ""}`.split(",");
  const quantity = `${orderDetails.quantity || ""}`.split(",");
  const price = `${orderDetails.price || ""}`.split(",");
  const units = `${orderDetails.units || ""}`.split(",");
  const counts = `${orderDetails.counts || ""}`.split(",");
  const deliveryDates = getDeliveryDates(orderDetails);
  product_names.forEach((item: any, i: number) => {
    const row = [item, deliveryDates[i] || "", `${quantity[i]}${units[i]}`, counts[i]];
    rows.push(includePrice ? [...row, price[i]] : row);
  });

  return rows;
};

const getPrintableAddress = (orderDetails: any) => `${orderDetails.shipping_address || ""}`.split(",").map((item) => item.trim()).filter(Boolean);

const escapeHtml = (value: any) =>
  `${value || ""}`
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getThermalAddressLines = (orderDetails: any) => {
  const address = getPrintableAddress(orderDetails).join(", ").replace(/\s+/g, " ").trim();
  const words = address.split(" ").filter(Boolean);
  const lines = [""];
  const maxLineLength = 34;

  words.forEach((word) => {
    const currentLine = lines[lines.length - 1];
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length <= maxLineLength || lines.length === 2) {
      lines[lines.length - 1] = nextLine;
      return;
    }
    lines.push(word);
  });

  return lines.slice(0, 2).map((line, index) => {
    if (index === 1 && line.length > maxLineLength) return `${line.slice(0, maxLineLength - 3)}...`;
    return line || "----";
  });
};

const generatePdf = (orderDetails: any) => {
  console.log("orderDetails = ", orderDetails);
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
  const rows = getOrderRows(orderDetails);

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
  const address = getPrintableAddress(orderDetails);
  // Name, Shipping Address, Date, and Signature
  doc.setFontSize(12);
  doc.text(`Name: ${orderDetails.name}`, 10, (startY += 10));
  doc.text("Shipping Address:", 10, (startY += 5));
  address.forEach((item: any) => {
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
    const rows = getOrderRows(orderDetails);

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
    const address = getPrintableAddress(orderDetails);
    // Name, Shipping Address, Date, and Signature
    doc.setFontSize(10);
    doc.text(`Name: ${orderDetails.name}`, 10, (startY += 10));
    doc.text(`Phone Number: ${orderDetails.phone_number}`, 10, (startY += 5));
    doc.text("Shipping Address:", 10, (startY += 5));
    address.forEach((item: any) => {
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

export const printThermalInvoices = (orderArray: any[]) => {
  if (!orderArray.length) return;

  const invoiceHtml = orderArray
    .map((orderDetails: any) => {
      const rows = getOrderRows(orderDetails, false);
      const address = getThermalAddressLines(orderDetails);
      return `
        <section class="receipt">
          <h1>JhatkaByte</h1>
          <h2>Kitchen Invoice</h2>
          <p>Order: ${escapeHtml(orderDetails.ref_no)}</p>
          <p>Date: ${new Date(orderDetails.inserted_at).toLocaleDateString()}</p>
          <p>Name: ${escapeHtml(orderDetails.name)}</p>
          <p>Phone: ${escapeHtml(orderDetails.phone_number)}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Date</th>
                <th>Qty</th>
                <th>No.</th>
              </tr>
            </thead>
            <tbody>
              ${rows
                .map(
                  (row: any) => `
                    <tr>
                      <td>${escapeHtml(row[0])}</td>
                      <td>${escapeHtml(row[1])}</td>
                      <td>${escapeHtml(row[2])}</td>
                      <td>${escapeHtml(row[3])}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          <p>Address:</p>
          ${address.map((line) => `<p class="address-line">${escapeHtml(line)}</p>`).join("")}
          <p>Landmark: ${escapeHtml(orderDetails.landmark || "----")}</p>
          <p>User Notes: ${escapeHtml(orderDetails.additional_notes || "----")}</p>
          <p>Delivery Notes: ${escapeHtml(orderDetails.admin_notes || "----")}</p>
        </section>
      `;
    })
    .join("");

  const printWindow = window.open("", "_blank", "width=420,height=640");
  if (!printWindow) return;
  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Thermal Invoices</title>
        <style>
          @page { size: 80mm auto; margin: 4mm; }
          body { font-family: Arial, sans-serif; font-size: 11px; margin: 0; color: #000; }
          .receipt { break-after: page; page-break-after: always; width: 72mm; }
          .receipt:last-child { break-after: auto; page-break-after: auto; }
          h1, h2, p { margin: 0 0 5px; }
          h1 { font-size: 18px; text-align: center; }
          h2 { font-size: 13px; text-align: center; }
          .address-line { line-height: 1.25; overflow-wrap: anywhere; }
          table { width: 100%; border-collapse: collapse; margin: 8px 0; }
          th, td { border-top: 1px dashed #000; padding: 4px 2px; text-align: left; vertical-align: top; }
          th:nth-child(1), td:nth-child(1) { width: 36%; }
          th:nth-child(2), td:nth-child(2) { width: 28%; }
          th:nth-child(3), td:nth-child(3) { width: 22%; }
          th:nth-child(4), td:nth-child(4) { width: 14%; text-align: right; }
        </style>
      </head>
      <body>${invoiceHtml}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

export default generatePdf;
