import { useState } from "react";
import OrderItem from "./OrderItem";
import Type from "./Type";
import { FaBars, FaTimes } from "react-icons/fa";

function OrderSideMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const menuStyle = {
    width: "300px",
    height: "100vh",
    backgroundColor: "red",
    position: "fixed",
    top: 0,
    left: 0, // Updated
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    transition: "transform 0.3s ease-in-out",
    transform: showMenu ? "translateX(0)" : "translateX(-100%)", // Updated
  };

  return (
    <div>
      <div style={menuStyle}>
        <div style={{ color: "white", marginBottom: "20px" }}>
          <Type orderType="options" />
        </div>
        <div
          href="#"
          style={{
            color: "white",
            textDecoration: "none",
            marginBottom: "10px",
          }}
        >
          <OrderItem orderType="options" />
        </div>
        {/* 추가적인 메뉴 항목들 */}
      </div>

      {
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50px",

            order: 1,
            zIndex: 1,
            transition: "transform 0.3s ease-in-out",
            transform: showMenu ? "translateX(230px)" : "translateX(-30%)", // Updated
          }}
          onClick={toggleMenu}
        >
          {showMenu ? (
            <FaTimes
              style={{ marginRight: "5px", width: "40px", height: "40px" }}
            />
          ) : (
            <FaBars
              style={{ marginRight: "5px", width: "40px", height: "40px" }}
            />
          )}
        </div>
      }
    </div>
  );
}

export default OrderSideMenu;
