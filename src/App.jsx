import { useEffect, useMemo, useState } from 'react';

const starterProducts = [
  { id: 1, name: 'LED Projector Headlights', category: 'Lighting', price: 280, stock: 'In stock', description: 'Sharper beam, cleaner look.', image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Wide Angle Side Mirror', category: 'Body', price: 95, stock: 'In stock', description: 'Convex glass / heated.', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Alloy Gear Knob', category: 'Interior', price: 48, stock: 'Low stock', description: 'CNC aluminum / 5-speed.', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Sportline Front Fender', category: 'Body', price: 210, stock: 'Pre-order', description: 'Bolt-on panel / primed.', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'USB-C Dash Charger', category: 'Utility', price: 32, stock: 'In stock', description: 'Dual port / fast charge.', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Carbon Shift Boot', category: 'Interior', price: 64, stock: 'In stock', description: 'Hand-stitched / universal.', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Sequential Tail Lights', category: 'Lighting', price: 185, stock: 'Low stock', description: 'Plug and play / smoked.', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Universal Fender Flares', category: 'Body', price: 125, stock: 'In stock', description: 'Matte black / set of 4.', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85' },
];

const money = (value) => `$${Number(value).toLocaleString()}`;
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
};

function ProductCard({ product, onAdd }) {
  return <article className="product-card">
    <div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-tag">{product.category}</span><button className="quick-add" type="button" onClick={() => onAdd(product.id)} title={`Add ${product.name} to cart`}>+</button></div>
    <div className="product-info"><div className="product-meta"><span>EAH / {String(product.id).padStart(3, '0')}</span><span>{product.stock}</span></div><h3>{product.name}</h3><div className="product-bottom"><span className="price">{money(product.price)}</span><span className={`stock ${product.stock === 'In stock' ? '' : 'low'}`}>● {product.stock}</span></div></div>
  </article>;
}

function Drawer({ quote, products, onRemove, onClose, onPlaceOrder }) {
  const [customer, setCustomer] = useState({ phone: '', country: '', email: '' });
  const items = quote.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const total = items.reduce((sum, product) => sum + Number(product.price), 0);
  const submit = (event) => {
    event.preventDefault();
    onPlaceOrder({ customer, items, total });
  };
  return <div className="quote-drawer open" aria-hidden="false"><div className="drawer-backdrop" onClick={onClose} /><aside className="drawer-panel"><div className="drawer-header"><div><p className="eyebrow"><span /> YOUR REQUEST</p><h2>My quote</h2></div><button className="close-button" type="button" onClick={onClose}>×</button></div><div className="quote-items">{items.length ? items.map((product) => <div className="quote-item" key={product.id}><div><h4>{product.name}</h4><small>{product.category} · {money(product.price)}</small></div><button className="remove-item" type="button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`}>×</button></div>) : <p className="empty-state">Your quote list is empty. Add parts from the catalog and we will prepare an import estimate for you.</p>}</div>{items.length > 0 && <form className="order-form" onSubmit={submit}><h3>Delivery details</h3><label>Phone number<input type="tel" required value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="+1 555 000 0000" /></label><label>Country<input required value={customer.country} onChange={(event) => setCustomer({ ...customer, country: event.target.value })} placeholder="United States" /></label><label>Email address<input type="email" required value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} placeholder="you@example.com" /></label><div className="drawer-footer"><div className="quote-total"><span>Order total</span><strong>{money(total)}</strong></div><button className="primary-button full-width" type="submit">Place order <span>↗</span></button></div></form>}</aside></div>;
}

const toDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const orderStatuses = ['Order received', 'Picked', 'Dispatched to airport', 'Shipping', 'Arrived', 'Ready for pick up'];

function OrdersPanel({ orders, onUpdate, onClose }) {
  return <section className="orders-panel"><div className="drawer-header"><div><p className="eyebrow"><span /> CUSTOMER ORDERS</p><h2>Orders</h2></div><button className="close-button" type="button" onClick={onClose}>×</button></div>{orders.length ? orders.map((order) => <article className="order-card" key={order.id}><div className="order-card-heading"><div><h3>Order #{String(order.id).slice(-6)}</h3><small>{new Date(order.createdAt).toLocaleString()}</small></div><strong>{money(order.total)}</strong></div><div className="order-customer"><span>☎ {order.customer.phone}</span><span>◎ {order.customer.country}</span><span>✉ {order.customer.email}</span></div><p className="order-parts">{order.items.map((item) => item.name).join(' · ')}</p><label className="order-status">Shipping status<select value={order.status} onChange={(event) => onUpdate(order.id, event.target.value)}>{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></label></article>) : <p className="empty-state">No orders have been placed yet. Customer orders will appear here with their delivery details.</p>}</section>;
}

function CustomerOrders({ orders, onClose }) {
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const matchingOrders = orders.filter((order) => order.customer.email.toLowerCase() === email.trim().toLowerCase());
  return <div className="customer-orders-modal"><div className="modal-backdrop" onClick={onClose} /><section className="customer-orders-panel"><div className="drawer-header"><div><p className="eyebrow"><span /> ORDER TRACKING</p><h2>My orders</h2></div><button className="close-button" type="button" onClick={onClose}>×</button></div><form className="order-lookup" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}><label>Enter your order email<input type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setSearched(false); }} placeholder="you@example.com" /></label><button className="primary-button" type="submit">See my orders <span>→</span></button></form>{searched && (matchingOrders.length ? matchingOrders.map((order) => <article className="customer-order-card" key={order.id}><div className="order-card-heading"><div><h3>Order #{String(order.id).slice(-6)}</h3><small>{new Date(order.createdAt).toLocaleDateString()}</small></div><strong>{money(order.total)}</strong></div><div className="customer-status"><span className="status-dot" />{order.status}</div><p className="order-parts">{order.items.map((item) => item.name).join(' · ')}</p><small>{order.customer.country} · {order.customer.phone}</small></article>) : <p className="empty-state">No orders found for this email address.</p>)}</section></div>;
}

function AdminModal({ products, onAdd, onDelete, onClose }) {
  const [message, setMessage] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get('imageFile');
    const image = file?.size ? await toDataUrl(file) : data.get('imageUrl');
    onAdd({ id: Date.now(), name: data.get('name'), category: data.get('category'), price: Number(data.get('price')), stock: data.get('stock'), image, description: data.get('description') });
    event.currentTarget.reset();
    setMessage('Item added to the catalog.');
  };
  return <div className="admin-modal open" aria-hidden="false"><div className="modal-backdrop" onClick={onClose} /><section className="admin-panel"><div className="drawer-header"><div><p className="eyebrow"><span /> INVENTORY CONTROL</p><h2>Admin dashboard</h2></div><button className="close-button" type="button" onClick={onClose}>×</button></div><div className="admin-layout"><div className="admin-stats"><div><span>Listed parts</span><strong>{products.length}</strong></div><div><span>Categories</span><strong>4</strong></div><div><span>Last sync</span><strong>Now</strong></div></div><form className="add-product-form" onSubmit={submit}><h3>Add a new item</h3><div className="form-row"><label>Part name<input name="name" required placeholder="e.g. LED Projector Headlights" /></label><label>Category<select name="category" required><option>Lighting</option><option>Body</option><option>Interior</option><option>Utility</option></select></label></div><div className="form-row"><label>Price (USD)<input name="price" type="number" min="1" required placeholder="180" /></label><label>Stock status<select name="stock"><option>In stock</option><option>Low stock</option><option>Pre-order</option></select></label></div><label>Upload image<input name="imageFile" type="file" accept="image/*" /></label><label>Or use image URL<input name="imageUrl" type="url" placeholder="https://..." /></label><label>Short description<textarea name="description" rows="3" required placeholder="A quick note about fitment or finish..." /></label><button className="primary-button" type="submit">Add to catalog <span>+</span></button><p className="form-message">{message}</p></form><div className="admin-list"><div className="admin-list-heading"><h3>Catalog items</h3><span>{products.length} items</span></div>{products.map((product) => <div className="admin-row" key={product.id}><div className="admin-row-info"><img src={product.image} alt="" /><div><h4>{product.name}</h4><small>{product.category} · {money(product.price)} · {product.stock}</small></div></div><button type="button" className="delete-product" onClick={() => onDelete(product.id)}>Remove</button></div>)}</div></div></section></div>;
}

function AdminLogin({ onSuccess }) {
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    if (password === (import.meta.env.VITE_ADMIN_PASSWORD || 'elite2025')) {
      sessionStorage.setItem('eliteAutoAdmin', 'true');
      onSuccess();
    } else {
      setError('Incorrect password.');
    }
  };
  return <main className="admin-login"><div className="admin-login-card"><a className="brand" href="/"><span className="brand-mark">EA</span><span><strong>ELITE</strong><small>AUTO HUB</small></span></a><p className="eyebrow"><span /> PRIVATE ACCESS</p><h1>Admin<br /><em>sign in.</em></h1><form onSubmit={submit}><label>Password<input name="password" type="password" required autoFocus placeholder="Enter admin password" /></label><button className="primary-button full-width" type="submit">Open dashboard <span>↗</span></button><p className="form-message">{error}</p></form><a className="text-link" href="/">Return to storefront <span>→</span></a></div></main>;
}

export default function App() {
  const [products, setProducts] = useState(() => readStorage('eliteAutoProducts', starterProducts));
  const [quote, setQuote] = useState(() => readStorage('eliteAutoQuote', []));
  const [orders, setOrders] = useState(() => readStorage('eliteAutoOrders', []));
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [customerOrdersOpen, setCustomerOrdersOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(true);
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => sessionStorage.getItem('eliteAutoAdmin') === 'true');
  const [toast, setToast] = useState('');
  useEffect(() => localStorage.setItem('eliteAutoProducts', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('eliteAutoQuote', JSON.stringify(quote)), [quote]);
  useEffect(() => localStorage.setItem('eliteAutoOrders', JSON.stringify(orders)), [orders]);
  useEffect(() => {
    const syncOrders = (event) => {
      if (event.key === 'eliteAutoOrders' && event.newValue) {
        try { setOrders(JSON.parse(event.newValue)); } catch { /* Ignore incomplete storage data. */ }
      }
    };
    window.addEventListener('storage', syncOrders);
    return () => window.removeEventListener('storage', syncOrders);
  }, []);
  const visibleProducts = useMemo(() => products.filter((product) => (category === 'All' || product.category === category) && `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [products, category, search]);
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2400); };
  const addToQuote = (id) => { if (quote.includes(id)) return notify('That part is already in your cart'); setQuote([...quote, id]); notify('Part added to your cart'); };
  const addProduct = (product) => { setProducts([product, ...products]); notify('New item added'); };
  const deleteProduct = (id) => { setProducts(products.filter((product) => product.id !== id)); setQuote(quote.filter((quoteId) => quoteId !== id)); notify('Item removed from catalog'); };
  const placeOrder = ({ customer, items, total }) => { setOrders([{ id: Date.now(), createdAt: new Date().toISOString(), customer, items, total, status: 'Order received' }, ...orders]); setQuote([]); setDrawer(false); notify('Order placed successfully'); };
  const updateOrderStatus = (id, status) => setOrders(orders.map((order) => order.id === id ? { ...order, status } : order));
  const isAdminRoute = window.location.pathname === '/admin';
  if (isAdminRoute && !adminAuthenticated) return <AdminLogin onSuccess={() => setAdminAuthenticated(true)} />;
  const showAdmin = admin || isAdminRoute;
  return <div className="site-shell"><header className="topbar"><a className="brand" href="#catalog"><span className="brand-mark">EA</span><span><strong>ELITE</strong><small>AUTO HUB</small></span></a><nav className="main-nav"><a className="active" href="#catalog">Catalog</a><a href="#how-it-works">How it works</a><a href="#contact">Contact</a></nav><div className="top-actions"><button className="orders-button" type="button" onClick={() => setCustomerOrdersOpen(true)}>My orders</button><button className="quote-button" type="button" onClick={() => setDrawer(true)}>My cart <span>{quote.length}</span></button></div></header>
    <main><section className="hero" id="catalog"><div className="hero-copy"><p className="eyebrow"><span /> DIRECT IMPORT / READY TO SHIP</p><h1>Parts that<br /><em>fit the drive.</em></h1><p className="hero-intro">Quality vehicle accessories sourced globally and delivered to your workshop, storefront, or driveway.</p><div className="hero-actions"><a className="primary-button" href="#inventory">Browse inventory <span>↘</span></a><a className="text-link" href="#how-it-works">See how we source <span>→</span></a></div><div className="hero-proof"><div><strong>48 hr</strong><span>dispatch window</span></div><div><strong>12+</strong><span>countries sourced</span></div><div><strong>2.4k</strong><span>parts delivered</span></div></div></div><div className="hero-visual"><div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" alt="Sports car front quarter view" /><div className="image-label top-label">01 / 04</div><div className="image-label bottom-label">Performance / Utility / Detail</div></div><div className="hero-sticker">BUILD<br /><strong>BETTER</strong></div></div></section>
      <section className="inventory-section" id="inventory"><div className="section-heading"><div><p className="eyebrow"><span /> THE CURRENT DROP</p><h2>Browse the inventory</h2></div><p className="section-note">Small batch imports. Better fitment. No mystery parts.</p></div><div className="catalog-toolbar"><div className="category-tabs">{['All', 'Lighting', 'Body', 'Interior', 'Utility'].map((item) => <button className={`category-tab ${category === item ? 'active' : ''}`} key={item} onClick={() => setCategory(item)} type="button">{item === 'All' ? 'All parts' : item === 'Body' ? 'Body & trim' : item}</button>)}</div><label className="search-box"><span>⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search parts..." aria-label="Search parts" /></label></div><div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToQuote} />) : <p className="empty-state">No parts match that search yet. Try another term or ask the parts desk.</p>}</div></section>
      <section className="source-section" id="how-it-works"><div className="source-photo"><img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1000&q=85" alt="Mechanic working on a vehicle" /></div><div className="source-copy"><p className="eyebrow"><span /> FROM SOURCE TO STREET</p><h2>Less hunting.<br /><em>More building.</em></h2><p>We work with trusted manufacturers and established yards across the world to bring useful parts into one focused catalog. Tell us what you need, and we will help match it.</p><a className="text-link" href="#contact">Talk to the parts desk <span>→</span></a></div><div className="source-number">02</div></section><section className="contact-strip" id="contact"><div><p className="eyebrow"><span /> NEED A SPECIFIC PART?</p><h2>Let's find it.</h2></div><a className="primary-button" href="mailto:parts@eliteautohub.com">Message the parts desk <span>↗</span></a></section></main><footer><span>© 2025 Elite Auto Hub</span><span>Imported parts, thoughtfully selected.</span><span className="footer-code">EAH / 001</span></footer>{drawer && <Drawer quote={quote} products={products} onRemove={(id) => setQuote(quote.filter((quoteId) => quoteId !== id))} onPlaceOrder={placeOrder} onClose={() => setDrawer(false)} />}{customerOrdersOpen && <CustomerOrders orders={orders} onClose={() => setCustomerOrdersOpen(false)} />}{showAdmin && <AdminModal products={products} onAdd={addProduct} onDelete={deleteProduct} onClose={() => { if (isAdminRoute) window.location.href = '/'; else setAdmin(false); }} />}{showAdmin && ordersOpen && <OrdersPanel orders={orders} onUpdate={updateOrderStatus} onClose={() => setOrdersOpen(false)} />}{showAdmin && !ordersOpen && <button className="orders-reopen" type="button" onClick={() => setOrdersOpen(true)}>View orders <span>{orders.length}</span></button>}<div className={`toast ${toast ? 'show' : ''}`}>{toast}</div></div>;
}
