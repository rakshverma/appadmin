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

const generateOrderSummary = (orderList: any[]) => {
  const rows = [
    [
      "Order No",
      "Name",
      "Mobile",
      "Franchise Name",
      "Item Name",
      "Delivery Date",
      "Quantity",
      "Unit",
      "Count",
      "Unit Price",
      "Shipping Charges",
      "Total Quantity",
      "Total Money",
    ],
  ];

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

  rows.push([
    "All Orders Total",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    formatQuantityTotals(grandTotalQuantity),
    grandTotalMoney.toFixed(2),
  ]);

  downloadCsv(`order-summary-${new Date().toISOString().slice(0, 10)}.csv`, rows);
};

export default generateOrderSummary;
