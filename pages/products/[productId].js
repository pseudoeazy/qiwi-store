import Layout from "../../components/Layout/Layout";
import Container from "../../components/Container/Container";

import styles from "../../styles/Product.module.css";
import products from "../../products.json";

export default function Product({ product }) {
  return (
    <Layout>
      <Container>
        <section className={styles.product}>
          <div className={styles.image}>{product.emoji}</div>
          <table className={styles.info}>
            <tbody>
              <tr>
                <td className={styles.title}>Name</td>
                <td className={styles.info}>{product.name}</td>
              </tr>
              <tr>
                <td className={styles.title}>Calories</td>
                <td className={styles.info}>{product.calories}</td>
              </tr>
              <tr>
                <td className={styles.title}>Price</td>
                <td className={styles.info}>{product.price}.00</td>
              </tr>
              <tr>
                <td className={styles.title}>Category</td>
                <td className={styles.info}>{product.category}</td>
              </tr>
              <tr>
                <td className={styles.title}>Description</td>
                <td className={styles.info}>
                  {product.additional.map((info) => info.content)[0]}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { productId } = params;
  const product = products.find(({ id }) => id === productId);

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map(({ id }) => ({
    params: {
      productId: id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
