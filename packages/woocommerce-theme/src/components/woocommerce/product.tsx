import React from "react";
import { connect, useConnect, styled } from "frontity";
import { ProductData } from "woocommerce/types";
import { Packages } from "../../../types";
import AddToCart from "./add-to-cart";

type ProductProps = {
  data: ProductData;
  when: boolean;
};

/**
 * Component that renders a product page.
 *
 * @param props - Object of type {@link ProductProps}.
 */
const Product: React.FC<ProductProps> = ({ data }) => {
  // Get the frontity state.
  const { state } = useConnect<Packages>();

  // Get the data of the product.
  const product = state.source.product[data.id];

  // Return nothing if the product is not ready yet.
  if (!data.isReady) return null;

  const [image] = product.images;

  return (
    <Container>
      <Gallery>
        <Image
          width="800"
          height="800"
          src={image.src}
          alt={image.alt}
          loading="lazy"
          srcSet={image.srcset}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </Gallery>
      <Summary>
        <Title dangerouslySetInnerHTML={{ __html: product.name }} />
        <Price dangerouslySetInnerHTML={{ __html: product.price_html }} />
        <ShortDescription
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
        <AddToCart showQuantity product={product} />
      </Summary>
      <Tabs>
        <TabTitle>Description</TabTitle>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </Tabs>
    </Container>
  );
};

export default connect(Product);

const Container = styled.div`
  width: 800px;
  margin-top: 90px;
  position: relative;
`;

const Gallery = styled.div`
  float: left;
  width: 48%;
  margin-bottom: 8rem;
`;

const Image = styled.img`
  height: auto;
  width: 100%;
`;

const Summary = styled.div`
  float: right;
  width: 48%;
  clear: none;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 300;
  margin: 0 0 2.5rem;
  color: rgba(12, 17, 43);
`;

const Price = styled.div`
  margin-bottom: 2rem;
`;

const ShortDescription = styled.div`
  margin-bottom: 1rem;
`;

const Tabs = styled.div`
  clear: both;
  margin: 4rem 0 2rem;
  font-size: 1.2rem;
`;

const TabTitle = styled.h2`
  font-size: 2rem;
`;
