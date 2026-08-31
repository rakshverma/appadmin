import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, userLogoutAction } from "../../store/actions/userAction";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, isError, logoutError } = useSelector((state: any) => state.user);
  const token = localStorage.getItem("token");
  const logoPath = `${process.env.PUBLIC_URL}/assets/imgs/jhatkabyte-logo.png`;
  const avatarPath = `${process.env.PUBLIC_URL}/assets/imgs/avatar.png`;
  console.log("userInfo = ", userInfo);
  useEffect(() => {
    if (!Object.keys(userInfo).length && token) {
      dispatch(getUserInfo());
    }
  }, [userInfo, token, dispatch]);

  useEffect(() => {
    if (isError) {
      // navigate("/");
    }
  }, [isError, navigate]);

  const userLogout = (e: any) => {
    dispatch(userLogoutAction());
    navigate("/");
  };

  const toggleSidebar = () => {
    if (window.innerWidth >= 993) {
      document.body.classList.remove("sidebar-enable");
      document.body.classList.remove("vertical-collpsed");
      return;
    }
    document.body.classList.toggle("sidebar-enable");
    document.body.classList.remove("vertical-collpsed");
  };

  return (
    <>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-light admin-brand-link">
                <span className="logo-sm admin-logo-sm">
                  <img src={logoPath} alt="JhatkaByte" height="40" />
                </span>
                <span className="logo-lg admin-logo-lg">
                  <img src={logoPath} alt="JhatkaByte" height="50" />
                  <strong>Admin</strong>
                </span>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 header-item waves-effect admin-menu-toggle"
              aria-label="Toggle menu"
              onClick={toggleSidebar}
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="Search Order ID..." />
                <span className="bx bx-search-alt"></span>
              </div>
            </form>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img className="rounded-circle header-profile-user" src={avatarPath} alt="Header Avatar" />
                <span className="d-none d-xl-inline-block ms-1" key="t-henry">
                  {userInfo?.name}
                </span>
                <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to={"user-profile"}>
                  <i className="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span>
                </Link>
                <div className="dropdown-divider"></div>

                <button type="button" className="dropdown-item text-danger" onClick={userLogout}>
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
