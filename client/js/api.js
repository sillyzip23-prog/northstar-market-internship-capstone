import { demoProducts } from './data.js';

const localApi = '/api/products';
const externalApi = 'https://fakestoreapi.com/products';
const staticHost = location.hostname.endsWith('.github.io');
const catalogKey = 'northstar-products';

function readCatalog() {
  try {
    const value = JSON.parse(localStorage.getItem(catalogKey) || 'null');
    return Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

function saveCatalog(products) {
  try {
    localStorage.setItem(catalogKey, JSON.stringify(products));
  } catch {
    // The current page can still use the in-memory copy when storage is unavailable.
  }
}

export async function getProducts({ useExternal = false, signal } = {}) {
  if (staticHost) {
    const saved = readCatalog();
    if (saved) return { products: saved, source: 'saved browser catalog', fallback: false };
  }

  const usePublicApi = useExternal || staticHost;
  const endpoint = usePublicApi ? externalApi : localApi;
  try {
    const response = await fetch(endpoint, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    const payload = await response.json();
    if (!Array.isArray(payload)) throw new Error('Catalog response was not a list');
    if (staticHost) saveCatalog(payload);
    return { products: payload, source: usePublicApi ? 'Fake Store API' : 'local catalog', fallback: false };
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    const products = staticHost && readCatalog() || demoProducts;
    if (staticHost) saveCatalog(products);
    return { products, source: 'sample catalog', fallback: true, error };
  }
}

function staticCreate(product) {
  const products = readCatalog() || [...demoProducts];
  const created = { ...product, id: Math.max(100, ...products.map(item => Number(item.id) || 0)) + 1 };
  products.push(created);
  saveCatalog(products);
  return created;
}

export async function createProduct(product) {
  if (staticHost) return staticCreate(product);
  const response = await fetch(localApi, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
  if (!response.ok) throw new Error(`Create failed (${response.status})`);
  return response.json();
}

export async function updateProduct(id, changes) {
  if (staticHost) {
    const products = readCatalog() || [...demoProducts];
    const index = products.findIndex(item => String(item.id) === String(id));
    if (index < 0) throw new Error('Product not found.');
    products[index] = { ...products[index], ...changes, id: products[index].id };
    saveCatalog(products);
    return products[index];
  }
  const response = await fetch(`${localApi}/${encodeURIComponent(id)}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
  if (!response.ok) throw new Error(`Update failed (${response.status})`);
  return response.json();
}

export async function deleteProduct(id) {
  if (staticHost) {
    const products = readCatalog() || [...demoProducts];
    const remaining = products.filter(item => String(item.id) !== String(id));
    if (remaining.length === products.length) throw new Error('Product not found.');
    saveCatalog(remaining);
    return;
  }
  const response = await fetch(`${localApi}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Delete failed (${response.status})`);
}
