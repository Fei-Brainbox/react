import type { Product } from '../types'

type ProductRowProps = {
    product: Product
}

type ProductCategoryTableProps = {
    category: string
    products: Product[]
}

type ResultTableProps = {
    products: Product[]
}

function ProductRow({product}: ProductRowProps) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryTable({category, products} : ProductCategoryTableProps) {
  return (
    <>
      <h3>{category}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.filter(product => product.category === category).map((product) => (
            <ProductRow key={product.name} product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}



export default function ResultTable({ products }: ResultTableProps) {
  if(!products || products.length === 0) {
    return <p>No products found</p>;
  }

  const categories = [...new Set(products.map(product => product.category))]

  return (
    <>
      {categories.map((category, index) => (
        <ProductCategoryTable key={index} category={category} products={products} />
      ))}
    </>
  );
  
}