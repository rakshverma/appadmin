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
      const totalQuantity = quantity * count;
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
      "Total Quantity",
      "Total Money",
    ],
  ];

  let grandTotalQuantity = 0;
  let grandTotalMoney = 0;

  orderList.forEach((order: any) => {
    const orderRows = buildOrderRows(order);
    let orderTotalQuantity = 0;
    let orderTotalMoney = 0;

    orderRows.forEach((row: any) => {
      orderTotalQuantity += row.totalQuantity;
      orderTotalMoney += row.itemTotal;
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
        row.totalQuantity.toFixed(2),
        row.itemTotal.toFixed(2),
      ]);
    });

    grandTotalQuantity += orderTotalQuantity;
    grandTotalMoney += orderTotalMoney;
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
      orderTotalQuantity.toFixed(2),
      orderTotalMoney.toFixed(2),
    ]);
  });

  rows.push(["All Orders Total", "", "", "", "", "", "", "", "", "", grandTotalQuantity.toFixed(2), grandTotalMoney.toFixed(2)]);

  downloadCsv(`order-summary-${new Date().toISOString().slice(0, 10)}.csv`, rows);
};

export default generateOrderSummary;
