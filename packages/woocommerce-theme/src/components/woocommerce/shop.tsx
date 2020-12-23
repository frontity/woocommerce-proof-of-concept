import React from "react";
import { connect, useConnect, styled } from "frontity";
import { Packages } from "../../../types";
import Link from "../link";
import Pagination from "../list/pagination";
import AddToCart from "./add-to-cart";
import { ProductArchiveData } from "woocommerce-poc/types";

const Shop: React.FC<{ data: ProductArchiveData }> = ({ data }) => {
  const { state } = useConnect<Packages>();

  return (
    <Container>
      <ProductList>
        {/* Iterate over the products of the shop. */}
        {data.items.map(({ id }) => {
          const product = state.source.product[id];
          const [image] = product.images;
          // We have to do this because Frontity only does this automatically
          // for `link` properties.
          const link = new URL(product.permalink).pathname;

          return (
            <Product key={product.id}>
              <Link link={link}>
                {product.on_sale && <OnSale>Sale!</OnSale>}
                <Img
                  width="450"
                  height="450"
                  src={image.thumbnail}
                  alt={image.alt}
                  loading="lazy"
                  srcSet={image.srcset}
                  sizes="(max-width: 450px) 100vw, 450px"
                />
                <Title dangerouslySetInnerHTML={{ __html: product.name }} />
                <Price
                  dangerouslySetInnerHTML={{ __html: product.price_html }}
                />
              </Link>
              <AddToCart product={product} />
            </Product>
          );
        })}
      </ProductList>
      <Pagination />
    </Container>
  );
};

export default connect(Shop);

const Container = styled.section`
  width: 800px;
  margin: 0;
  padding: 48px 0 0;
  list-style: none;
`;

const ProductList = styled.ul`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  word-break: break-word;
  min-width: 12vw;
  margin: 0;
  padding: 0;
`;

const Product = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 8px 16px 8px;
  box-sizing: border-box;
  width: calc(100% / 4 - 16px);

  @media screen and (min-width: 401px) and (max-width: 800px) {
    width: calc(100% / 2 - 16px);
  }

  @media screen and (max-width: 400px) {
    width: calc(100% - 16px);
  }
`;

const OnSale = styled.span`
  position: absolute;
  top: -0.7rem;
  right: -0.7rem;
  background: #88a171;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.02em;
  z-index: 1;
  border-radius: 50%;
  text-align: center;
  padding: 0.4rem;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: "";
    float: left;
    padding-top: 100%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  max-width: 801px;
`;

const Title = styled.h2`
  color: rgba(12, 17, 43);
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.5rem 0 0.5rem;
`;

const Price = styled.div`
  margin-bottom: 1rem;
`;
