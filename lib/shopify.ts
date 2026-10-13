
const SHOPIFY_DOMAIN = process.env.EXPO_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_TOKEN;

// Get products from your friend's Shopify store
export async function getProducts() {

  // Ask Shopify for the first 10 products
  const query = `
    query {
      products(first: 10) {
        nodes {
          id
          title
          description
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  // Make sure our .env variables exist
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error("Missing Shopify credentials in .env");
  }

  // Send the request to Shopify
  const response = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2026-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query }),
    }
  );

  // Convert Shopify's response into JSON
  const result = await response.json();

  // Check for errors
  if (!response.ok || result.errors) {
    throw new Error(JSON.stringify(result.errors ?? result));
  }

  // Return the product list
  return result.data.products.nodes;
}
