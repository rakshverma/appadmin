import React from "react";

export interface BreadcrumbProps {
  pageHeading: string;
  breadCrumb: Array<{ to: string; name: string }>;
}
export interface ListingCardHeadingProps {
  heading: string;
  button: { to?: string; text: string; type: "button" | "link" };
  onClick?: () => void;
}
export interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  onClick?: () => void;
  className?: string;
}
export interface InputProps {
  label: string;
  name: string;
  type?: string;
  register?: any;
  error?: any;
  placeholder?: string;
  className: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationObj?: any;
  multiple?: boolean;
  value?: any;
  readOnly?: boolean;
  maxLength?: any;
}
export interface CustomModalProps {
  handleModalCloseRequest: () => void;
  handleSaveClicked: (e: any) => void;
  modalTitle: string;
  isOpen: boolean;
  footerButtonText: string;
  children: React.ReactNode;
  closeModal: () => void;
}
export interface AddCategoryProps {
  isOpen: boolean;
  closeModal: () => void;
  editInfo?: {
    id: number | null;
    name: string;
  };
}
export interface ProductListProps {
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  productList: any;
  activeTab: string;
  handleNavClick: any;
  tabs: any;
}

export interface FranchiseListProps {
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  franchiseList: any;
  activeTab: string;
  handleNavClick: any;
  tabs: any;
}

export interface DeleveryBoyListProps {
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  deleveryBoyList: any;
}
export interface AddProductProps {
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  formData: {
    name: string;
    category: string;
    description: string;
    images: string[];
  };
  categoryList: any[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  errors: any;
  reset: any;
  imagePreviews: any;
}

export interface AddFranchiseProps {
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  formData: {};
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  errors: any;
  reset: any;
  districtList: any[];
  handleDistrictChange: any;
  pinCodeList: any[];
}

export interface ProductFormData {
  formState: any;
  name: string;
  category: string;
  description: string;
  images: any;
}

export interface FranchiseFormData {
  formState: any;
  name: string;
  phone: string;
  email: string;
  franchiseName: string;
  status: boolean;
  state: string;
  district: string;
  zipCodes: any[];
}

export interface SelectProps {
  label: string;
  name: string;
  className: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  register: any;
  validationObj?: any;
  options: any[];
  error: any;
  disabled?: boolean;
  multiple?: boolean;
  selectDisabled?: boolean;
  defaultValue?: any;
}

export interface TextareaProps {
  label: string;
  name: string;
  className: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: any;
  validationObj?: any;
  rows: number;
  error: any;
}

export interface EditPriceFormProps {
  formState: any;
  name: string | null;
  franchise: string | number | null;
  is_available: boolean | null;
  delevery_days: any;
  quantity_wise_price: any;
}

export interface EditPriceProps {
  editInfo: any;
  franchiseInfo: any;
  pageHeading: string;
  breadCrumb: { to: string; name: string }[];
  heading: string;
  buttonText: string;
  onButtonClick: () => void;
  formData: {};
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  errors: any;
  reset: any;
  handleRemoveRow: any;
  handleAddRow: any;
  fields: any;
}
