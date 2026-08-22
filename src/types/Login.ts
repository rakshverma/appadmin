export interface LoginFormData {
  email: String;
  password: String;
}

export interface LoginViewProps {
  formData: LoginFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  errors: any;
  isLoading: Boolean;
}
export interface ForgotPassFormData {
  email: String;
}

export interface ForgotPassViewProps {
  formData: ForgotPassFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  errors: any;
  isLoading: Boolean;
}

export interface ResetPassFormData {
  password: String;
  confirmPassword: String;
}

export interface ResetPassViewProps {
  formData: ResetPassFormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: any) => void;
  handleSubmit: any;
  register: any;
  watch: any;
  errors: any;
  isLoading: Boolean;
}
