import { useSelector } from "react-redux";
import "./loader.css";
export default function LoadingIndicator() {
  const { isLoading } = useSelector((state: any) => state.loader);
  if (!isLoading) return null;
  return (
    <div className="spinner-container">
      <div className="mask-loader"></div>
      <div className="loading-spinner"></div>
    </div>
  );
}
