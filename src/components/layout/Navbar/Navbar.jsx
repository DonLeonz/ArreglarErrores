import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { useOrders } from "../../../context/OrdersContext";
import LoginModal from "../../modals/CreationModals/LoginModal";
import coffeLogo from "../../../assets/img/coffe-user-logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, isAuth, logout, roles, loading } = useAuth();

  const { actualOrder, setIsCartOpen } = useOrders();

  const totalItems = actualOrder.orderDetails.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleOpenLogin = () => {
    setShowModal(true);
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  const handleOpenRegister = () => {
    setShowRegisterModal(true);
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  const handleCloseOffcanvas = () => {
    const offcanvas = document.getElementById("burger-menu");
    if (offcanvas && window.UIkit) window.UIkit.offcanvas(offcanvas).hide();
  };

  const currentUser = user == null ? null : user.username;

  if (!loading)
    return (
      <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; top: 0">
        <nav className="uk-navbar-container uk-navbar-transparent">
          <div className="uk-container uk-width-1-1 background-opaque">
            <div data-uk-navbar="mode: click" className="uk-flex">
              <div className="uk-navbar-left">
                <div className="uk-navbar-item uk-light">
                  <NavLink className="uk-flex uk-link-heading" to="/" end>
                    <img src={coffeLogo} alt="Logo" />
                    <button className="uk-margin-left uk-text-capitalize uk-text-left uk-text-small uk-button uk-button-link">
                      <strong>
                        Chocolate
                        <br />
                        {currentUser}
                      </strong>
                    </button>
                  </NavLink>
                </div>
              </div>
              <div className="uk-navbar-center uk-visible@l">
                <div className="uk-navbar-item uk-dark">
                  <NavLink
                    className="uk-button uk-button-secondary uk-border-rounded"
                    to="/api"
                    end
                  >
                    API
                  </NavLink>
                </div>
                <div className="uk-navbar-item uk-light">
                  <NavLink
                    className="uk-text-capitalize uk-button uk-button-text uk-light"
                    to="/menu"
                    end
                  >
                    Menú
                  </NavLink>
                </div>
                <div className="uk-navbar-item uk-light">
                  <NavLink
                    className="uk-text-capitalize uk-button uk-button-text"
                    to="/suggest"
                    end
                  >
                    Recomendado
                  </NavLink>
                </div>
                <div className="uk-navbar-item uk-light">
                  <NavLink
                    className="uk-text-capitalize uk-button uk-button-text uk-light"
                    to="/blog"
                    end
                  >
                    Blog
                  </NavLink>
                </div>
                <div className="uk-navbar-item uk-light">
                  <NavLink
                    className="uk-text-capitalize uk-button uk-button-text uk-light"
                    to="/about"
                    end
                  >
                    Nosotros
                  </NavLink>
                </div>
              </div>
              <div className="uk-navbar-right uk-visible@l">
                {isAuth && roles ? (
                  <div className="uk-navbar-item uk-light">
                    {roles.includes("CUSTOMER") && (
                      <button
                        className="uk-icon-button uk-margin-small-right"
                        uk-tooltip="Ver carrito"
                        uk-icon="cart"
                        onClick={() => setIsCartOpen(true)}
                      >
                        {totalItems > 0 && (
                          <span className="uk-badge uk-position-absolute uk-position-top-right">
                            {totalItems}
                          </span>
                        )}
                      </button>
                    )}
                    <button
                      className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded"
                      onClick={() => logout()}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="uk-navbar-item uk-light">
                      <button
                        className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded"
                        onClick={handleOpenLogin}
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                    <div className="uk-navbar-item uk-dark">
                      <button
                        className="uk-text-capitalize uk-button uk-button-secondary uk-border-rounded"
                        onClick={handleOpenRegister}
                      >
                        Registrarse
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="uk-hidden@l uk-navbar-right">
                <a
                  href="#"
                  className="uk-navbar-toggle"
                  data-uk-navbar-toggle-icon=""
                  data-uk-toggle="target: #burger-menu"
                ></a>
                <div
                  id="burger-menu"
                  data-uk-offcanvas="overlay: true; flip: true; bg-close: true"
                >
                  <div className="uk-offcanvas-bar">
                    <button
                      className="navbar-offcanvas-close"
                      type="button"
                      onClick={handleCloseOffcanvas}
                      aria-label="Cerrar menú"
                    ></button>

                    <div
                      className="uk-flex uk-flex-column uk-grid-row-small uk-margin-medium-top"
                      data-uk-grid=""
                    >
                      <div className="uk-flex-left">
                        <NavLink
                          className="uk-button uk-button-secondary uk-border-rounded"
                          to="/api"
                          end
                        >
                          <strong>API</strong>
                        </NavLink>
                      </div>
                      <div className="uk-flex-left uk-margin-small-left">
                        <NavLink
                          className="uk-text-capitalize uk-button uk-button-text uk-light"
                          to="/menu"
                          end
                        >
                          Menú
                        </NavLink>
                      </div>
                      <div className="uk-flex-left uk-margin-small-left">
                        <NavLink
                          className="uk-text-capitalize uk-button uk-button-text"
                          to="/suggest"
                          end
                        >
                          Recomendado
                        </NavLink>
                      </div>
                      <div className="uk-flex-left uk-margin-small-left">
                        <NavLink
                          className="uk-text-capitalize uk-button uk-button-text uk-light"
                          to="/blog"
                          end
                        >
                          Blog
                        </NavLink>
                      </div>
                      <div className="uk-flex-left uk-margin-small-left">
                        <NavLink
                          className="uk-text-capitalize uk-button uk-button-text uk-light"
                          to="/about"
                          end
                        >
                          Nosotros
                        </NavLink>
                      </div>
                      <hr className="uk-divider-icon" />
                      {isAuth ? (
                        <div className="uk-light">
                          <button
                            className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                            onClick={() => logout()}
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="uk-light">
                            <button
                              className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                              onClick={handleOpenLogin}
                            >
                              Iniciar Sesión
                            </button>
                          </div>
                          <div className="uk-dark">
                            <button
                              className="uk-text-capitalize uk-text-normal uk-button uk-button-secondary uk-border-rounded uk-width-1-1"
                              onClick={handleOpenRegister}
                            >
                              Registrarse
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <LoginModal
          isOpen={showModal || showRegisterModal}
          mode={showRegisterModal ? "register" : "login"}
          onClose={() => {
            setShowModal(false);
            setShowRegisterModal(false);
          }}
        />
      </div>
    );
};

export default Navbar;
