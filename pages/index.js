import { useContext } from "react";
import CartContext from "../lib/Cart";
import Link from "next/link";
import Layout from "../components/Layout/Layout";

import styles from "../styles/Home.module.css";
import products from "../products.json";

import { formatNumber } from "../lib/generic";

function Home({ products }) {
  const { cart, setCart, setTotal } = useContext(CartContext);

  return (
    <Layout title="Qiwi Store">
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <hr />
          <div className={styles.grid}>
            {products.map((product, index) => {
              return (
                <div key={product.id} className={styles.card}>
                  <Link href={`/products/${product.id.trim()}`}>
                    <a>
                      <div className={styles["product-img"]}>
                        <span
                          role="img"
                          aria-label={product.name}
                          data-icon="product-image"
                          data-index={index}
                        >
                          {product.emoji}
                        </span>
                      </div>
                    </a>
                  </Link>
                  <h3>{product.name}</h3>
                  <p>${formatNumber(product.price)}</p>
                  <p>
                    <button
                      className={styles["product-button"]}
                      onClick={() => {
                        setCart({ type: "add", product });
                        setTotal(cart);
                      }}
                    >
                      Add to Cart
                    </button>
                  </p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products,
    },
  };
}
export default Home;
