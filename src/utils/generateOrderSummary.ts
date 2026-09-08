import jsPDF from "jspdf";
import "jspdf-autotable";

type SummaryMode = "delivery" | "shop-owner";

const sanitizeFilePart = (value: any, fallback = "all") => {
  const cleaned = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return cleaned || fallback;
};

const splitList = (value: any) => `${value || ""}`.split(",");

const csvValue = (value: any) => {
  const text = value === undefined || value === null ? "" : `${value}`;
  return `"${text.replace(/"/g, '""')}"`;
};

const downloadCsv = (fileName: string, rows: any[][]) => {
  const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const normalizeUnit = (unit: any) => `${unit || ""}`.trim().toLowerCase();

const getTotalQuantity = (quantity: number, count: number, unit: string) => {
  const normalizedUnit = normalizeUnit(unit);
  const total = quantity * count;
  if (normalizedUnit === "kg") return { key: "kg", value: total };
  if (normalizedUnit === "gm" || normalizedUnit === "g" || normalizedUnit === "gram") return { key: "kg", value: total / 1000 };
  if (normalizedUnit === "piece(s)" || normalizedUnit === "piece" || normalizedUnit === "pieces") return { key: "piece(s)", value: total };
  if (normalizedUnit === "plate(s)" || normalizedUnit === "plate" || normalizedUnit === "plates") return { key: "plate(s)", value: total };
  return { key: normalizedUnit || "unit", value: total };
};

const addQuantityTotal = (totals: any, quantity: any) => {
  totals[quantity.key] = Number(totals[quantity.key] || 0) + quantity.value;
};

const formatQuantityTotals = (totals: any) => {
  return Object.keys(totals)
    .filter((key) => Number(totals[key]) > 0)
    .map((key) => `${Number(totals[key]).toFixed(key === "kg" ? 2 : 0)} ${key}`)
    .join(" + ");
};

const buildOrderRows = (order: any) => {
  const productNames = splitList(order.product_names);
  const quantities = splitList(order.quantity);
  const prices = splitList(order.price);
  const units = splitList(order.units);
  const counts = splitList(order.counts);
  const deliveryDates = splitList(order.delivery_date);

  return productNames
    .map((productName: string, index: number) => {
      const unitPrice = Number(prices[index] || 0);
      const count = Number(counts[index] || 0);
      const quantity = Number(quantities[index] || 0);
      const totalQuantity = getTotalQuantity(quantity, count, units[index] || "");
      const itemTotal = unitPrice * count;

      return {
        orderNo: order.ref_no,
        customer: order.name || "",
        phone: order.phone_number || "",
        franchise: order.franchise_name || "",
        itemName: productName,
        deliveryDate: deliveryDates[index] || "",
        quantity,
        unit: units[index] || "",
        count,
        unitPrice,
        totalQuantity,
        totalQuantityLabel: formatQuantityTotals({ [totalQuantity.key]: totalQuantity.value }),
        itemTotal,
      };
    })
    .sort((a: any, b: any) => b.itemTotal - a.itemTotal);
};

const getFranchiseNameForFile = (orderList: any[]) => {
  const names = Array.from(new Set(orderList.map((order) => `${order?.franchise_name || ""}`.trim()).filter(Boolean)));
  return sanitizeFilePart(names.length === 1 ? names[0] : "multiple_franchises", "franchise");
};

const getDeliveryDateForFile = (orderList: any[]) => {
  const dates = Array.from(
    new Set(
      orderList
        .flatMap((order) => splitList(order.delivery_date))
        .map((date) => `${date || ""}`.trim())
        .filter(Boolean)
    )
  );
  const date = dates.length === 1 ? dates[0] : "multiple_dates";
  return sanitizeFilePart(date.replace(/\//g, "-"), "delivery_date");
};

const getHeaders = (mode: SummaryMode) => {
  const common = ["Order No", "Name", "Mobile", "Franchise Name", "Item Name", "Delivery Date", "Quantity", "Unit", "Count", "Total Quantity"];
  if (mode === "shop-owner") return common;
  return [...common.slice(0, 9), "Unit Price", "Shipping Charges", common[9], "Total Money"];
};

const buildSummaryRows = (orderList: any[], mode: SummaryMode) => {
  const rows = [getHeaders(mode)];
  const grandTotalQuantity: any = {};
  let grandTotalMoney = 0;

  orderList.forEach((order: any) => {
    const orderRows = buildOrderRows(order);
    const orderTotalQuantity: any = {};
    let orderItemsTotalMoney = 0;
    const shippingCost = Number(order.shipping_cost || 0);

    orderRows.forEach((row: any) => {
      addQuantityTotal(orderTotalQuantity, row.totalQuantity);
      orderItemsTotalMoney += row.itemTotal;

      if (mode === "shop-owner") {
        rows.push([
          row.orderNo,
          row.customer,
          row.phone,
          row.franchise,
          row.itemName,
          row.deliveryDate,
          row.quantity,
          row.unit,
          row.count,
          row.totalQuantityLabel,
        ]);
        return;
      }

      rows.push([
        row.orderNo,
        row.customer,
        row.phone,
        row.franchise,
        row.itemName,
        row.deliveryDate,
        row.quantity,
        row.unit,
        row.count,
        row.unitPrice.toFixed(2),
        "",
        row.totalQuantityLabel,
        row.itemTotal.toFixed(2),
      ]);
    });

    Object.keys(orderTotalQuantity).forEach((key) => addQuantityTotal(grandTotalQuantity, { key, value: orderTotalQuantity[key] }));

    if (mode === "shop-owner") {
      rows.push([order.ref_no, "Order Total", "", "", "", "", "", "", "", formatQuantityTotals(orderTotalQuantity)]);
      return;
    }

    grandTotalMoney += orderItemsTotalMoney + shippingCost;
    rows.push([
      order.ref_no,
      "Order Total",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      shippingCost.toFixed(2),
      formatQuantityTotals(orderTotalQuantity),
      (orderItemsTotalMoney + shippingCost).toFixed(2),
    ]);
  });

  if (mode === "shop-owner") {
    rows.push(["All Orders Total", "", "", "", "", "", "", "", "", formatQuantityTotals(grandTotalQuantity)]);
  } else {
    rows.push(["All Orders Total", "", "", "", "", "", "", "", "", "", "", formatQuantityTotals(grandTotalQuantity), grandTotalMoney.toFixed(2)]);
  }

  return rows;
};

const downloadPdf = (fileName: string, rows: any[][], mode: SummaryMode) => {
  const doc = new jsPDF({ orientation: "landscape" });
  const title = mode === "shop-owner" ? "Shop Owner Order Summary" : "Delivery Order Summary";

  doc.setProperties({ title });
  doc.setFontSize(14);
  doc.text(title, 14, 14);
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 21);

  // @ts-ignore
  doc.autoTable({
    startY: 28,
    head: [rows[0]],
    body: rows.slice(1),
    styles: { fontSize: mode === "shop-owner" ? 7.5 : 6.8, cellPadding: 1.6, overflow: "linebreak" },
    headStyles: { fillColor: [219, 63, 36], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 8, right: 8 },
  });

  doc.save(fileName);
};

const generateOrderSummary = (orderList: any[], mode: SummaryMode = "delivery") => {
  const rows = buildSummaryRows(orderList, mode);
  const modeSuffix = mode === "shop-owner" ? "_shop_owner" : "_delivery";
  const filePrefix = `summary_${getFranchiseNameForFile(orderList)}_${getDeliveryDateForFile(orderList)}${modeSuffix}`;

  downloadCsv(`${filePrefix}.csv`, rows);
  downloadPdf(`${filePrefix}.pdf`, rows, mode);
};

export default generateOrderSummary;
