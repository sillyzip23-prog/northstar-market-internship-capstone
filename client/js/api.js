import { demoProducts } from './data.js';
const localApi = '/api/products';
const externalApi = 'https://fakestoreapi.com/products';
export async function getProducts({ useExternal = false, signal } = {}) {
  const endpoint = useExternal ? externalApi : localApi;
  try {
    const response = await fetch(endpoint, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const payload = await response.json();
    if (!Array.isArray(payload)) throw new Error('Catalog response was not a list');
    return { products: payload, source: useExternal ? 'Fake Store API' : 'local catalog', fallback: false };
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    return { products: demoProducts, source: 'sample catalog', fallback: true, error };
  }
}
export async function createProduct(product) {
  const response = await fetch(localApi, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
  if (!response.ok) throw new Error(`Create failed (${response.status})`);
  return response.json();
}
export async function updateProduct(id, changes) {
  const response = await fetch(`${localApi}/${encodeURIComponent(id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
  if (!response.ok) throw new Error(`Update failed (${response.status})`);
  return response.json();
}
export async function deleteProduct(id) {
  const response = await fetch(`${localApi}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Delete failed (${response.status})`);
}
