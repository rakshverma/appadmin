export const constants = {
  categoryListHeading: "List of Categories",
  addCategory: "Add Category",
  productListheading: "List of Products",
  addProducts: "Add Products",
  product: "PRODUCT",
  addProduct: "Add Product",
  productList: "Product List",
  franchiseListHeading: "List of Franchises",
  addFranchise: "Add Franchise",
  deleveryBoyListHeading: "List of Delivery Boys",
  addDeleveryBoy: "Add Delivery Boy",
  deleveryBoy: "Delivery Boy",
  deleveryBoyList: "Delivery Boy List",
  productPriceheading: "PRODUCT PRICE",
  setProductPrice: "Set Product Price",
  franchise: "FRANCHISE",
  franchiseList: "Franchise List",
  profile: "Profile",
  editProfile: "Edit Profile",
  chnagePassword: "Change Password",
  dashboard: "Dashboard",
  reviewListHeading: "List of Reviews",
  reviewHeading: "PRODUCT REVIEWS",
  customerListHeading: "List of Customers",
  customerHeading: "CUSTOMERS",
  downloadCsv: "Download CSV",
  orderPageheading: "ORDERS",
  orderListHeading: "List of Orders",
  assignDeleveyBoy: "Assign Delivery Boy",
  downloadInvoiceText: "Download Invoice",
  orderDetails: "Order Details",
  dashboardHeading: "DASHBOARD",
};

interface OrderStatus {
  [key: number]: string;
}
export const ORDER_STATUS: OrderStatus = {
  1: "Confirmed",
  2: "Completed",
  3: "Canceled",
};

export const DELIVERY_STATUS: any = ["Processing", "On The Way", "Delivered", "Canceled"];

export const ORDER_STATUS_BADGE_CLASS: OrderStatus = {
  1: "bg-warning",
  2: "bg-primary",
  3: "bg-success",
  4: "bg-danger",
};
