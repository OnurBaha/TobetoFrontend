
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/index";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/authActions";
function Navi() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <Navbar className="position-relative " expand="xxl py-5"  bg="white">
      <Container fluid >
        <Link to="/platform">
          <img
            src="/Assets/image/tobeto-logo.png"
            alt="Tobeto Logo"
            style={{
              width: "170px",
              height: "35px",
              objectFit: "cover",
              background: "transparent",
            }}
          />
        </Link>

        <button
          className="btn p-0 d-xxl-none navbar-burger"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          title="Toggle Offcanvas"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            color="gray"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fillRule="evenodd" clipRule="evenodd" fill="#828282" />
          </svg>
        </button>

        <Nav className="d-none d-xxl-flex navbar-nav fw-medium">
          <Link
            to="/platform"
            className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/platform" ? "nav-active" : ""
            }`}
          >
            Ana Sayfa
          </Link>
          <Link
              to="/profilim"
              className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/profilim" ? "nav-active" : ""
            }`}
          >
            Profilim
          </Link>
          <Link
            to="/degerlendirmeler"
            className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/degerlendirmeler"
                ? "nav-active"
                : ""
            }`}
          >
            Değerlendirmeler
          </Link>
          <Link
            to="/platform-katalog"
            className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/platform-katalog"
                ? "nav-active"
                : ""
            }`}
          >
            Katalog
          </Link>
          <Link
            to="/takvim"
            className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/takvim" ? "nav-active" : ""
            }`}
          >
            Takvim
          </Link>
          <Link
            to="/istanbul-kodluyor"
            className={`nav-link me-3 c-gray-3 ${
              window.location.pathname === "/istanbul-kodluyor"
                ? "nav-active"
                : ""
            }`}
          >
            İstanbul Kodluyor
          </Link>
        </Nav>

        <div className="d-none d-xxl-block">
          <div className="d-flex justify-space-between align-items-center">
            <Link
             to="/"
              className="mx-3 align-items-center d-flex align-items-center"
              style={{ gap: "1em" }}
            >
              <span className="tbt-gradient"></span>
            </Link>
            <div className="btn-group header-avatar">
              <button
                type="button"
                className="btn p-0 fw-normal b-r-35 text-end d-flex align-items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >{auth && auth.user && auth.user.imagePath ?
                <div className="me-2">
                  <img
                    className="cv-pp-img rounded-circle"
                    src={auth.user.imagePath}
                    alt=""
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                    }}
                  />
                </div> :
                <div className="me-2">
                <img
                  className="cv-pp-img rounded-circle"
                  src='https://tobeto.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimages.19a45d39.png&w=384&q=75'
                  alt=""
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "cover",
                  }}
                />
              </div>
                }
                <div className="me-3">
                  <p className="mb-0 name">
                    {auth.user && auth.user.firstName
                      ? `${auth.user.firstName} ${auth.user.lastName}`
                      : ""}
                  </p>
                </div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#828282"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
              <ul className={`profile dropdown-menu`}>
                <li>
                  <Link to="/profilim/profilimi-duzenle/kisisel-bilgilerim" className="dropdown-item profil-dropdown">
                    Profil Bilgileri
                  </Link>
                </li>
                <li>
                  <hr
                    className="dropdown-divider"
                    style={{
                      backgroundColor: "rgb(204, 204, 204)",
                      height: "1px",
                    }}
                  />
                </li>
                <li>
                  <hr
                    className="dropdown-divider"
                  />
                </li>
                <li>
                  <button
                    className="dropdown-item profil-dropdown"
                    onClick={handleLogout}
                  >
                    Oturumu Kapat
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navi;
