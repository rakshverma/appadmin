import { convertDateToLocal } from "./common";
import { DELIVERY_STATUS, ORDER_STATUS } from "./constants";

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

const buildSummaryRows = (orderList: any[]) => {
  const rows: any[] = [];

  orderList.forEach((order: any) => {
    const productNames = splitList(order.product_names);
    const quantities = splitList(order.quantity);
    const prices = splitList(order.price);
    const units = splitList(order.units);
    const counts = splitList(order.counts);
    const deliveryDates = splitList(order.delivery_date);
    const deliveryStatuses = splitList(order.delivery_status);
    const deliveryBoyNames = splitList(order.delivery_boy_names);
    const deliveryBoyIds = splitList(order.delivery_boy_ids);

    productNames.forEach((productName: string, index: number) => {
      const unitPrice = Number(prices[index] || 0);
      const count = Number(counts[index] || 0);
      const itemTotal = unitPrice * count;
      const deliveryStatusIndex = Number(deliveryStatuses[index] || 0) - 1;

      rows.push({
        orderNo: order.ref_no,
        orderStatus: ORDER_STATUS[order.status] || order.status || "",
        orderDate: order.inserted_at ? convertDateToLocal(order.inserted_at) : "",
        customer: order.name || "",
        phone: order.phone_number || "",
        email: order.email || "",
        franchise: order.franchise_name || "",
        itemName: productName,
        deliveryDate: deliveryDates[index] || "",
        deliveryStatus: DELIVERY_STATUS[deliveryStatusIndex] || "",
        deliveryBoy: deliveryBoyNames[index] || (deliveryBoyIds[index] ? `ID ${deliveryBoyIds[index]}` : "Not assigned"),
        quantity: quantities[index] || "",
        unit: units[index] || "",
        count,
        unitPrice,
        itemTotal,
        shippingCost: Number(order.shipping_cost || 0),
        orderTotal: Number(order.total_price || 0),
        address: order.shipping_address || "",
        landmark: order.landmark || "",
        customerNotes: order.additional_notes || "",
      });
    });
  });

  return rows.sort((a, b) => b.itemTotal - a.itemTotal);
};

const generateOrderSummary = (orderList: any[]) => {
  const summaryRows = buildSummaryRows(orderList);
  const rows = [
    [
      "Order No",
      "Order Status",
      "Order Date",
      "Customer",
      "Phone",
      "Email",
      "Franchise",
      "Item Name",
      "Delivery Date",
      "Delivery Status",
      "Delivery Boy",
      "Quantity",
      "Unit",
      "Count",
      "Unit Price",
      "Item Total",
      "Shipping Cost",
      "Order Total",
      "Address",
      "Landmark",
      "Customer Notes",
    ],
    ...summaryRows.map((row) => [
      row.orderNo,
      row.orderStatus,
      row.orderDate,
      row.customer,
      row.phone,
      row.email,
      row.franchise,
      row.itemName,
      row.deliveryDate,
      row.deliveryStatus,
      row.deliveryBoy,
      row.quantity,
      row.unit,
      row.count,
      row.unitPrice.toFixed(2),
      row.itemTotal.toFixed(2),
      row.shippingCost.toFixed(2),
      row.orderTotal.toFixed(2),
      row.address,
      row.landmark,
      row.customerNotes,
    ]),
  ];

  downloadCsv(`order-summary-${new Date().toISOString().slice(0, 10)}.csv`, rows);
};

export default generateOrderSummary;
