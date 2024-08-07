import { createContext, useContext, useEffect, useState } from "react";

const products_control = createContext();
const inatalastate = window.localStorage.getItem("cartitems")
  ? JSON.parse(window.localStorage.getItem("cartitems"))
  : [];

const Products_control_context = ({ children }) => {
  const [cartitems, setcartitems] = useState(inatalastate);
  const [open, setopen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("cartitems", JSON.stringify(cartitems));
  }, [cartitems]);

  const open_close = () => {
    setopen((prev) => !prev);
  };

  const quantity = cartitems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const get_item_quantity = (id) => {
    return cartitems.find((item) => item.id == id)?.quantity || 0;
  };

  const remove_from_cart = (id) => {
    return setcartitems((items) => items.filter((item) => item.id !== id));
  };

  const increase_quantity = (id) => {
    setcartitems((items) => {
      const item = items.find((item) => item.id === id);
      if (item == null) {
        return [...items];
      } else {
        return cartitems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item?.quantity + 1 || 0 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decrease_quantity = (id) => {
    setcartitems((items) => {
      if (items.find((item) => item.id == id)?.quantity === 1) {
        return items.filter((item) => item.id !== id);
      } else {
        return cartitems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item?.quantity - 1 };
          } else {
            return items;
          }
        });
      }
    });
  };

  return (
    <products_control.Provider
      value={{
        get_item_quantity,
        increase_quantity,
        decrease_quantity,
        quantity,
        remove_from_cart,
        open_close,
        open,
        setcartitems,
        cartitems,
      }}
    >
      {children}
    </products_control.Provider>
  );
};

export default Products_control_context;

export const useProducts_control = () => {
  return useContext(products_control);
};
