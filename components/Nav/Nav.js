import { useContext } from "react";
import CartContext from "../../lib/Cart";
import { formatNumber } from "../../lib/generic";
import { useRouter } from "next/router";
import Link from "next/link";

import { FaShoppingCart } from "react-icons/fa";

import Container from "../Container/Container";
import styles from "./Nav.module.css";

const Nav = () => {
  const { total } = useContext(CartContext);
  return (
    <Container>
      <nav className={styles.nav}>
        <NavLink path="/">
          <h1 className={styles.title}>Qiwi Store</h1>
        </NavLink>

        <div className={styles.menus}>
          <ul>
            <li>Account</li>
          </ul>
          <div className={styles.description}>
            <NavLink path="/cart">
              <FaShoppingCart />
              <strong className="sr-only">Cart</strong>
              <span className="snipcart-total-price">
                {" "}
                ${formatNumber(total)}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </Container>
  );
};

const NavLink = ({ path, children }) => {
  const router = useRouter();
  return (
    <Link href={path}>
      <a className={router.pathname === path ? styles.activeLink : ""}>
        {children}
      </a>
    </Link>
  );
};
export default Nav;
