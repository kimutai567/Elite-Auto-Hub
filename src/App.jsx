import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const starterProducts = [
  {
    id: 1,
    name: "LED Projector Headlights",
    category: "Lighting",
    price: 280,
    stock: "In stock",
    color: "Black housing",
    fitment: "Toyota Corolla 2014-2018",
    description: "Sharper beam, cleaner look.",
    image:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Wide Angle Side Mirror",
    category: "Body",
    price: 95,
    stock: "In stock",
    color: "Gloss black",
    fitment: "Universal / left and right",
    description: "Convex glass / heated.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Alloy Gear Knob",
    category: "Interior",
    price: 48,
    stock: "Low stock",
    color: "Brushed silver",
    fitment: "Universal 5-speed",
    description: "CNC aluminum / 5-speed.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Sportline Front Fender",
    category: "Body",
    price: 210,
    stock: "Pre-order",
    color: "Primed white",
    fitment: "Honda Civic 2016-2020",
    description: "Bolt-on panel / primed.",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "USB-C Dash Charger",
    category: "Utility",
    price: 32,
    stock: "In stock",
    color: "Matte black",
    fitment: "Universal 12V socket",
    description: "Dual port / fast charge.",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Carbon Shift Boot",
    category: "Interior",
    price: 64,
    stock: "In stock",
    color: "Carbon black",
    fitment: "Universal manual transmission",
    description: "Hand-stitched / universal.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Sequential Tail Lights",
    category: "Lighting",
    price: 185,
    stock: "Low stock",
    color: "Smoked red",
    fitment: "BMW 3 Series E90 2006-2011",
    description: "Plug and play / smoked.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Universal Fender Flares",
    category: "Body",
    price: 125,
    stock: "In stock",
    color: "Matte black",
    fitment: "Universal / set of 4",
    description: "Matte black / set of 4.",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85",
  },
];

const money = (value) => `$${Number(value).toLocaleString()}`;
const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

function ProductCard({ product, onAdd }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images?.length ? product.images : [product.image];
  const mainImage = images[activeImage] || images[0];
  return (
    <article className="product-card">
      <div className="product-image">
        <button
          className="image-preview-button"
          type="button"
          onClick={() => setPreviewOpen(true)}
          title={`View ${product.name} image`}
        >
          <img src={images[0]} alt={product.name} loading="lazy" />
        </button>
        <span className="product-tag">{product.category}</span>
        <button
          className="quick-add"
          type="button"
          onClick={() => onAdd(product.id)}
          title={`Add ${product.name} to cart`}
        >
          +
        </button>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>EAH / {String(product.id).padStart(3, "0")}</span>
          <span>{product.stock}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="fitment-details">
          <span>
            <b>Color</b>
            {product.color || "Not specified"}
          </span>
          <span>
            <b>Fits</b>
            {product.fitment || "Fitment to be confirmed"}
          </span>
        </div>
        <div className="product-bottom">
          <span className="price">{money(product.price)}</span>
          <span
            className={`stock ${product.stock === "In stock" ? "" : "low"}`}
          >
            ● {product.stock}
          </span>
        </div>
        <button
          className="product-details-trigger"
          type="button"
          onClick={() => setPreviewOpen(true)}
        >
          View photos & note <span>↗</span>
        </button>
      </div>
      {previewOpen && createPortal(
        <div
          className="image-preview-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image preview`}
        >
          <button
            className="image-preview-backdrop"
            type="button"
            onClick={() => setPreviewOpen(false)}
            aria-label="Close image preview"
          />
          <div className="image-preview-panel">
            <button
              className="close-button"
              type="button"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close image preview"
            >
              ×
            </button>
            <img className="product-preview-main-image" src={mainImage} alt={`${product.name} image ${activeImage + 1}`} />
            {images.length > 1 && (
              <div className="image-preview-thumbnails">
                {images.map((image, index) => (
                  <button
                    type="button"
                    className={activeImage === index ? "active" : ""}
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
            <p>{product.name}</p>
            <small>
              {product.color || "Color not specified"} ·{" "}
              {product.fitment || "Fitment to be confirmed"}
            </small>
            {product.description && <p className="product-preview-note"><b>Notes</b>{product.description}</p>}
          </div>
        </div>,
        document.body,
      )}
    </article>
  );
}

function Drawer({ quote, products, onRemove, onClose, onPlaceOrder }) {
  const [customer, setCustomer] = useState({
    phone: "",
    country: "",
    email: "",
  });
  const items = quote
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);
  const total = items.reduce((sum, product) => sum + Number(product.price), 0);
  const submit = (event) => {
    event.preventDefault();
    onPlaceOrder({ customer, items, total });
  };
  return (
    <div className="quote-drawer open" aria-hidden="false">
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer-panel">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">
              <span /> YOUR REQUEST
            </p>
            <h2>My quote</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="quote-items">
          {items.length ? (
            items.map((product) => (
              <div className="quote-item" key={product.id}>
                <div>
                  <h4>{product.name}</h4>
                  <small>
                    {product.category} · {money(product.price)}
                  </small>
                </div>
                <button
                  className="remove-item"
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="empty-state">
              Your quote list is empty. Add parts from the catalog and we will
              prepare an import estimate for you.
            </p>
          )}
        </div>
        {items.length > 0 && (
          <form className="order-form" onSubmit={submit}>
            <h3>Delivery details</h3>
            <label>
              Phone number
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={(event) =>
                  setCustomer({ ...customer, phone: event.target.value })
                }
                placeholder="+1 555 000 0000"
              />
            </label>
            <label>
              Country
              <input
                required
                value={customer.country}
                onChange={(event) =>
                  setCustomer({ ...customer, country: event.target.value })
                }
                placeholder="United States"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                required
                value={customer.email}
                onChange={(event) =>
                  setCustomer({ ...customer, email: event.target.value })
                }
                placeholder="you@example.com"
              />
            </label>
            <div className="drawer-footer">
              <div className="quote-total">
                <span>Order total</span>
                <strong>{money(total)}</strong>
              </div>
              <button className="primary-button full-width" type="submit">
                Place order <span>↗</span>
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}

const toDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const orderStatuses = [
  "Order received",
  "Picked",
  "Dispatched to airport",
  "Shipping",
  "Arrived",
  "Ready for pick up",
  "Completed",
];

const orderBuckets = {
  received: {
    label: "Received",
    statuses: ["Order received", "Picked"],
  },
  dispatched: {
    label: "Dispatched",
    statuses: ["Dispatched to airport", "Shipping"],
  },
  completed: {
    label: "Completed",
    statuses: ["Arrived", "Ready for pick up", "Completed"],
  },
};

function OrdersPanel({ orders, onUpdate, onClose }) {
  const [activeBucket, setActiveBucket] = useState("received");
  const bucket = orderBuckets[activeBucket];
  const bucketOrders = orders.filter((order) =>
    bucket.statuses.includes(order.status),
  );
  return (
    <>
      <button
        className="orders-panel-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close orders"
      />
      <section className="orders-panel">
      <div className="drawer-header">
        <div>
          <p className="eyebrow">
            <span /> CUSTOMER ORDERS
          </p>
          <h2>Orders</h2>
        </div>
        <button className="close-button" type="button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="order-buckets" role="tablist" aria-label="Order follow-up sections">
        {Object.entries(orderBuckets).map(([key, item]) => (
          <button
            className={activeBucket === key ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={activeBucket === key}
            key={key}
            onClick={() => setActiveBucket(key)}
          >
            <span>{item.label}</span>
            <strong>
              {orders.filter((order) => item.statuses.includes(order.status)).length}
            </strong>
          </button>
        ))}
      </div>
      {bucketOrders.length ? (
        bucketOrders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-card-heading">
              <div>
                <h3>Order #{String(order.id).slice(-6)}</h3>
                <small>{new Date(order.createdAt).toLocaleString()}</small>
              </div>
              <strong>{money(order.total)}</strong>
            </div>
            <div className="order-customer">
              <span>☎ {order.customer.phone}</span>
              <span>◎ {order.customer.country}</span>
              <span>✉ {order.customer.email}</span>
            </div>
            <p className="order-parts">
              {order.items.map((item) => item.name).join(" · ")}
            </p>
            <label className="order-status">
              Shipping status
              <select
                value={order.status}
                onChange={(event) => onUpdate(order.id, event.target.value)}
              >
                {orderStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </article>
        ))
      ) : (
        <p className="empty-state">
          No {bucket.label.toLowerCase()} orders right now.
        </p>
      )}
      </section>
    </>
  );
}

function CustomerOrders({ orders, requests, onConvertRequest, onClose }) {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const matchingOrders = orders.filter(
    (order) =>
      order.customer.email.toLowerCase() === email.trim().toLowerCase(),
  );
  const matchingRequests = requests.filter(
    (request) => request.email.toLowerCase() === email.trim().toLowerCase(),
  );
  return (
    <div className="customer-orders-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <section className="customer-orders-panel">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">
              <span /> ORDER TRACKING
            </p>
            <h2>My orders</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <form
          className="order-lookup"
          onSubmit={(event) => {
            event.preventDefault();
            setSearched(true);
          }}
        >
          <label>
            Enter your order email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSearched(false);
              }}
              placeholder="you@example.com"
            />
          </label>
          <button className="primary-button" type="submit">
            See my orders <span>→</span>
          </button>
        </form>
        {searched &&
          (matchingOrders.length || matchingRequests.length ? (
            <>
              {matchingRequests.length > 0 && <div className="customer-request-results"><p className="eyebrow"><span /> CUSTOM PART REQUESTS</p>{matchingRequests.map((request) => <article className="customer-order-card" key={request.id}><div className="order-card-heading"><div><h3>{request.request}</h3><small>{new Date(request.createdAt).toLocaleDateString()}</small></div><strong>{request.status}</strong></div><p className="order-parts">Vehicle: {request.vehicle} · Color: {request.color || "No preference"}</p>{request.sourcingWindow && <p className="order-parts">Sourcing window: {request.sourcingWindow}</p>}<div className="request-result-details"><strong>{request.availability || "Pending"}</strong>{request.price && <span>Price: {money(request.price)}</span>}{request.availability === "Not available" && request.timeline && <span>Estimated sourcing: {request.timeline}</span>}</div><p className="request-response">{request.response || "Our parts desk is checking availability and fitment."}</p>{request.availability === "Available" && request.price && request.status !== "Converted to order" && <button className="primary-button full-width" type="button" onClick={() => onConvertRequest(request)}>Proceed with order <span>→</span></button>}</article>)}</div>}
              {matchingOrders.map((order) => (
                <article className="customer-order-card" key={order.id}>
                  <div className="order-card-heading">
                    <div>
                      <h3>Order #{String(order.id).slice(-6)}</h3>
                      <small>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <strong>{money(order.total)}</strong>
                  </div>
                  <div className="customer-status">
                    <span className="status-dot" />
                    {order.status}
                  </div>
                  <p className="order-parts">
                    {order.items.map((item) => item.name).join(" · ")}
                  </p>
                  <small>
                    {order.customer.country} · {order.customer.phone}
                  </small>
                </article>
              ))}
            </>
          ) : (
            <p className="empty-state">
              No orders or custom requests found for this email address.
            </p>
          ))}
      </section>
    </div>
  );
}

function CustomRequestModal({ onSubmit, onClose }) {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      vehicle: data.get("vehicle"),
      color: data.get("color"),
      sourcingWindow: data.get("sourcingWindow"),
      request: data.get("request"),
      status: "New",
      availability: "Pending",
      price: "",
      timeline: "",
      response: "",
    });
  };
  return (
    <div className="custom-request-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <section className="custom-request-panel">
        <div className="drawer-header">
          <div><p className="eyebrow"><span /> PARTS DESK</p><h2>Request a part</h2></div>
          <button className="close-button" type="button" onClick={onClose}>×</button>
        </div>
        <p className="request-intro">Tell us what you are looking for and our parts desk will check availability or advise you on the best match.</p>
        <form className="custom-request-form" onSubmit={submit}>
          <div className="form-row"><label>Your name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label></div>
          <div className="form-row"><label>Phone<input name="phone" type="tel" required placeholder="+1 555 000 0000" /></label><label>Vehicle<input name="vehicle" required placeholder="BMW M5 2018-2023" /></label></div>
          <label>Preferred color<input name="color" placeholder="Black, white, red, or no preference" /></label>
          <label>How long can we search for it?<input name="sourcingWindow" placeholder="e.g. 1 month" /></label>
          <label>What part do you need?<textarea name="request" required rows="5" placeholder="Describe the product, quantity, or fitment you need..." /></label>
          <button className="primary-button" type="submit">Send request <span>↗</span></button>
        </form>
      </section>
    </div>
  );
}

function RequestsPanel({ requests, onUpdate, onClose }) {
  return <>
    <button className="orders-panel-backdrop" type="button" onClick={onClose} aria-label="Close requests" />
    <section className="orders-panel requests-panel">
      <div className="drawer-header"><div><p className="eyebrow"><span /> PARTS DESK</p><h2>Custom requests</h2></div><button className="close-button" type="button" onClick={onClose}>×</button></div>
      {requests.length ? requests.map((item) => <article className="request-card" key={item.id}>
        <div className="order-card-heading"><div><h3>{item.request}</h3><small>{new Date(item.createdAt).toLocaleString()}</small></div><strong>{item.status}</strong></div>
        <div className="order-customer"><span>{item.name}</span><span>✉ {item.email}</span><span>☎ {item.phone}</span></div>
          <p className="order-parts">Vehicle: {item.vehicle} · Color: {item.color || "No preference"}</p>
          <div className="request-admin-fields"><label>Availability<select value={item.availability || "Pending"} onChange={(event) => onUpdate(item.id, { availability: event.target.value })}><option>Pending</option><option>Available</option><option>Not available</option></select></label><label>Price<input type="number" min="0" value={item.price || ""} onChange={(event) => onUpdate(item.id, { price: event.target.value })} placeholder="USD" /></label>{item.availability === "Not available" && <label>Estimated sourcing time<input value={item.timeline || ""} onChange={(event) => onUpdate(item.id, { timeline: event.target.value })} placeholder="e.g. 1 month" /></label>}</div>
          <label className="order-status">Advice or availability<textarea value={item.response || ""} rows="3" onChange={(event) => onUpdate(item.id, { response: event.target.value })} placeholder="Explain availability, alternatives, price, or fitment advice..." /></label>
          <label className="order-status">Request status<select value={item.status} onChange={(event) => onUpdate(item.id, { status: event.target.value })}><option>New</option><option>Checking availability</option><option>Advised</option><option>Completed</option><option>Converted to order</option></select></label>
      </article>) : <p className="empty-state">No custom part requests yet.</p>}
    </section>
  </>;
}

function AdminModal({ products, onAdd, onDelete, onClose, onEditDetails }) {
  const [message, setMessage] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const files = Array.from(data.getAll("imageFiles")).filter((file) => file.size);
    const uploadedImages = await Promise.all(files.map(toDataUrl));
    const imageUrl = data.get("imageUrl");
    const images = uploadedImages.length ? uploadedImages : imageUrl ? [imageUrl] : [];
    if (!images.length) {
      setMessage("Upload at least one image or provide an image URL.");
      return;
    }
    const image = images[0] || "";
    onAdd({
      id: Date.now(),
      name: data.get("name"),
      category: data.get("category"),
      price: Number(data.get("price")),
      stock: data.get("stock"),
      color: data.get("color"),
      fitment: data.get("fitment"),
      image,
      images,
      description: data.get("description"),
    });
    event.currentTarget.reset();
    setMessage("Item added to the catalog.");
  };
  return (
    <div className="admin-modal open" aria-hidden="false">
      <div className="modal-backdrop" onClick={onClose} />
      <section className="admin-panel">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">
              <span /> INVENTORY CONTROL
            </p>
            <h2>Admin dashboard</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="admin-layout">
          <div className="admin-stats">
            <div>
              <span>Listed parts</span>
              <strong>{products.length}</strong>
            </div>
            <div>
              <span>Categories</span>
              <strong>4</strong>
            </div>
            <div>
              <span>Last sync</span>
              <strong>Now</strong>
            </div>
          </div>
          <form className="add-product-form" onSubmit={submit}>
            <h3>Add a new item</h3>
            <div className="form-row">
              <label>
                Part name
                <input
                  name="name"
                  required
                  placeholder="e.g. LED Projector Headlights"
                />
              </label>
              <label>
                Category
                <select name="category" required>
                  <option>Lighting</option>
                  <option>Body</option>
                  <option>Interior</option>
                  <option>Utility</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Color
                <input
                  name="color"
                  required
                  placeholder="e.g. Gloss black"
                />
              </label>
              <label>
                Fits vehicle
                <input
                  name="fitment"
                  required
                  placeholder="e.g. BMW M5 2018-2023"
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Price (USD)
                <input
                  name="price"
                  type="number"
                  min="1"
                  required
                  placeholder="180"
                />
              </label>
              <label>
                Stock status
                <select name="stock">
                  <option>In stock</option>
                  <option>Low stock</option>
                  <option>Pre-order</option>
                </select>
              </label>
            </div>
            <label>
              Upload image
              <input name="imageFiles" type="file" accept="image/*" multiple />
            </label>
            <label>
              Or use image URL
              <input name="imageUrl" type="url" placeholder="Optional if uploading images" />
            </label>
            <label>
              Short description
              <textarea
                name="description"
                rows="3"
                required
                placeholder="A quick note about fitment or finish..."
              />
            </label>
            <button className="primary-button" type="submit">
              Add to catalog <span>+</span>
            </button>
            <p className="form-message">{message}</p>
          </form>
          <div className="admin-list">
            <div className="admin-list-heading">
              <h3>Catalog items</h3>
              <button className="text-link" type="button" onClick={onEditDetails}>
                Edit color and fitment <span>↗</span>
              </button>
            </div>
            {products.map((product) => (
              <div className="admin-row" key={product.id}>
                <div className="admin-row-info">
                  <img src={product.image} alt="" />
                  <div>
                    <h4>{product.name}</h4>
                    <small>
                      {product.category} · {money(product.price)} ·{" "}
                      {product.stock}
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="delete-product"
                  onClick={() => onDelete(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductDetailsEditor({ products, onUpdate, onClose }) {
  const [savedId, setSavedId] = useState(null);
  const save = async (event, product) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const files = Array.from(data.getAll("additionalImages")).filter((file) => file.size);
    const uploadedImages = await Promise.all(files.map(toDataUrl));
    const currentImages = product.images?.length ? product.images : product.image ? [product.image] : [];
    const images = [...currentImages, ...uploadedImages];
    onUpdate(product.id, {
      color: data.get("color"),
      fitment: data.get("fitment"),
      image: images[0] || product.image,
      images,
    });
    setSavedId(product.id);
  };
  return (
    <section className="product-details-editor">
      <div className="admin-list-heading">
        <div>
          <p className="eyebrow">
            <span /> FITMENT DETAILS
          </p>
          <h3>Color and vehicle fitment</h3>
        </div>
        <span>Edit catalog info</span>
        <button className="close-button" type="button" onClick={onClose} aria-label="Close fitment editor">
          ×
        </button>
      </div>
      {products.map((product) => (
        <form
          className="product-details-row"
          key={product.id}
          onSubmit={(event) => save(event, product)}
        >
          <img src={product.image} alt="" />
          <div>
            <strong>{product.name}</strong>
            <small>{product.category}</small>
          </div>
          <label>
            Color
            <input
              name="color"
              required
              defaultValue={product.color || ""}
              placeholder="Gloss black"
            />
          </label>
          <label>
            Fits vehicle
            <input
              name="fitment"
              required
              defaultValue={product.fitment || ""}
              placeholder="BMW M5 2018-2023"
            />
          </label>
          <label>
            Add product images
            <input name="additionalImages" type="file" accept="image/*" multiple />
          </label>
          <div className="catalog-image-thumbnails">
            {(product.images?.length ? product.images : product.image ? [product.image] : []).map((image, index) => (
              <img key={`${image}-${index}`} src={image} alt={`${product.name} ${index + 1}`} />
            ))}
          </div>
          <button className="primary-button" type="submit">
            Save
          </button>
          {savedId === product.id && (
            <small className="saved-message">Saved</small>
          )}
        </form>
      ))}
    </section>
  );
}

function AdminLogin({ onSuccess }) {
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    if (password === (import.meta.env.VITE_ADMIN_PASSWORD || "elite2025")) {
      sessionStorage.setItem("eliteAutoAdmin", "true");
      onSuccess();
    } else {
      setError("Incorrect password.");
    }
  };
  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <a className="brand" href="/">
          <span className="brand-mark">EA</span>
          <span>
            <strong>ELITE</strong>
            <small>AUTO HUB</small>
          </span>
        </a>
        <p className="eyebrow">
          <span /> PRIVATE ACCESS
        </p>
        <h1>
          Admin
          <br />
          <em>sign in.</em>
        </h1>
        <form onSubmit={submit}>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              autoFocus
              placeholder="Enter admin password"
            />
          </label>
          <button className="primary-button full-width" type="submit">
            Open dashboard <span>↗</span>
          </button>
          <p className="form-message">{error}</p>
        </form>
        <a className="text-link" href="/">
          Return to storefront <span>→</span>
        </a>
      </div>
    </main>
  );
}

function AdminDashboard({ products, orders, requests, onOpenInventory, onOpenOrders, onOpenRequests }) {
  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <p className="eyebrow">
          <span /> ELITE AUTO HUB / CONTROL CENTER
        </p>
        <h1>Admin dashboard</h1>
        <p>Choose a workspace to manage your catalog or customer orders.</p>
      </div>
      <div className="admin-dashboard-actions">
        <button type="button" onClick={onOpenInventory}>
          <span className="dashboard-action-number">01</span>
          <strong>Inventory</strong>
          <small>{products.length} listed parts</small>
          <span className="dashboard-action-arrow">↗</span>
        </button>
        <button type="button" onClick={onOpenOrders}>
          <span className="dashboard-action-number">02</span>
          <strong>Orders</strong>
          <small>{orders.length} customer orders</small>
          <span className="dashboard-action-arrow">↗</span>
        </button>
        <button type="button" onClick={onOpenRequests}>
          <span className="dashboard-action-number">03</span>
          <strong>Custom requests</strong>
          <small>{requests.length} parts desk requests</small>
          <span className="dashboard-action-arrow">↗</span>
        </button>
      </div>
      <a className="text-link" href="/">
        Return to storefront <span>→</span>
      </a>
    </main>
  );
}

export default function App() {
  const isAdminRoute = window.location.pathname === "/admin";
  const [products, setProducts] = useState(() =>
    readStorage("eliteAutoProducts", starterProducts),
  );
  const [quote, setQuote] = useState(() => readStorage("eliteAutoQuote", []));
  const [orders, setOrders] = useState(() =>
    readStorage("eliteAutoOrders", []),
  );
  const [requests, setRequests] = useState(() =>
    readStorage("eliteAutoRequests", []),
  );
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [customerOrdersOpen, setCustomerOrdersOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(() => !isAdminRoute);
  const [ordersOpen, setOrdersOpen] = useState(() => !isAdminRoute);
  const [requestsOpen, setRequestsOpen] = useState(false);
  const [customRequestOpen, setCustomRequestOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(
    () => sessionStorage.getItem("eliteAutoAdmin") === "true",
  );
  const [toast, setToast] = useState("");
  useEffect(
    () => localStorage.setItem("eliteAutoProducts", JSON.stringify(products)),
    [products],
  );
  useEffect(
    () => localStorage.setItem("eliteAutoQuote", JSON.stringify(quote)),
    [quote],
  );
  useEffect(
    () => localStorage.setItem("eliteAutoOrders", JSON.stringify(orders)),
    [orders],
  );
  useEffect(
    () => localStorage.setItem("eliteAutoRequests", JSON.stringify(requests)),
    [requests],
  );
  useEffect(() => {
    const syncOrders = (event) => {
      if (event.key === "eliteAutoOrders" && event.newValue) {
        try {
          setOrders(JSON.parse(event.newValue));
        } catch {
          /* Ignore incomplete storage data. */
        }
      }
    };
    window.addEventListener("storage", syncOrders);
    return () => window.removeEventListener("storage", syncOrders);
  }, []);
  useEffect(() => {
    const syncProducts = (event) => {
      if (event.key === "eliteAutoProducts" && event.newValue) {
        try {
          setProducts(JSON.parse(event.newValue));
        } catch {
          /* Ignore incomplete storage data. */
        }
      }
    };
    window.addEventListener("storage", syncProducts);
    return () => window.removeEventListener("storage", syncProducts);
  }, []);
  useEffect(() => {
    const syncRequests = (event) => {
      if (event.key === "eliteAutoRequests" && event.newValue) {
        try {
          setRequests(JSON.parse(event.newValue));
        } catch {
          /* Ignore incomplete storage data. */
        }
      }
    };
    window.addEventListener("storage", syncRequests);
    return () => window.removeEventListener("storage", syncRequests);
  }, []);
  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "All" || product.category === category) &&
          `${product.name} ${product.description} ${product.category}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [products, category, search],
  );
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };
  const addToQuote = (id) => {
    if (quote.includes(id)) return notify("That part is already in your cart");
    setQuote([...quote, id]);
    notify("Part added to your cart");
  };
  const addProduct = (product) => {
    setProducts((currentProducts) => [product, ...currentProducts]);
    notify("New item added");
  };
  const createRequest = (request) => {
    setRequests((currentRequests) => [request, ...currentRequests]);
    setCustomRequestOpen(false);
    notify("Request sent to the parts desk");
  };
  const convertRequestToOrder = (request) => {
    const customItem = {
      id: request.id,
      name: request.request,
      category: "Custom request",
      price: Number(request.price),
      stock: "Available",
      color: request.color,
      fitment: request.vehicle,
      description: request.response || "Custom part request",
      image: "",
    };
    setOrders((currentOrders) => [
      {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        customer: { phone: request.phone, country: "", email: request.email },
        items: [customItem],
        total: Number(request.price),
        status: "Order received",
      },
      ...currentOrders,
    ]);
    setRequests((currentRequests) =>
      currentRequests.map((item) =>
        item.id === request.id ? { ...item, status: "Converted to order" } : item,
      ),
    );
    notify("Custom request converted to an order");
  };
  const updateRequest = (id, details) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id ? { ...request, ...details } : request,
      ),
    );
  };
  const updateProductDetails = (id, details) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...details } : product,
      ),
    );
    notify("Product details updated");
  };
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setQuote(quote.filter((quoteId) => quoteId !== id));
    notify("Item removed from catalog");
  };
  const placeOrder = ({ customer, items, total }) => {
    setOrders([
      {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        customer,
        items,
        total,
        status: "Order received",
      },
      ...orders,
    ]);
    setQuote([]);
    setDrawer(false);
    notify("Order placed successfully");
  };
  const updateOrderStatus = (id, status) =>
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  if (isAdminRoute && !adminAuthenticated)
    return <AdminLogin onSuccess={() => setAdminAuthenticated(true)} />;
  const showAdmin = (admin || isAdminRoute) && inventoryOpen;
  const showAdminDashboard = isAdminRoute && !inventoryOpen && !ordersOpen && !requestsOpen;
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#catalog">
          <span className="brand-mark">EA</span>
          <span>
            <strong>ELITE</strong>
            <small>AUTO HUB</small>
          </span>
        </a>
        <nav className="main-nav">
          <a className="active" href="#catalog">
            Catalog
          </a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="top-actions">
          <button
            className="orders-button"
            type="button"
            onClick={() => setCustomerOrdersOpen(true)}
          >
            My orders
          </button>
          <button
            className="quote-button"
            type="button"
            onClick={() => setDrawer(true)}
          >
            My cart <span>{quote.length}</span>
          </button>
        </div>
      </header>
      <main>
        <section className="hero" id="catalog">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> DIRECT IMPORT / READY TO SHIP
            </p>
            <h1>
              Parts that
              <br />
              <em>fit the drive.</em>
            </h1>
            <p className="hero-intro">
              Quality vehicle accessories sourced globally and delivered to your
              workshop, storefront, or driveway.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#inventory">
                Browse inventory <span>↘</span>
              </a>
              <a className="text-link" href="#how-it-works">
                See how we source <span>→</span>
              </a>
            </div>
            <div className="hero-proof">
              <div>
                <strong>48 hr</strong>
                <span>dispatch window</span>
              </div>
              <div>
                <strong>12+</strong>
                <span>countries sourced</span>
              </div>
              <div>
                <strong>2.4k</strong>
                <span>parts delivered</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85"
                alt="Sports car front quarter view"
              />
              <div className="image-label top-label">01 / 04</div>
              <div className="image-label bottom-label">
                Performance / Utility / Detail
              </div>
            </div>
            <div className="hero-sticker">
              BUILD
              <br />
              <strong>BETTER</strong>
            </div>
          </div>
        </section>
        <section className="inventory-section" id="inventory">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span /> THE CURRENT DROP
              </p>
              <h2>Browse the inventory</h2>
            </div>
            <p className="section-note">
              Small batch imports. Better fitment. No mystery parts.
            </p>
          </div>
          <div className="catalog-toolbar">
            <div className="category-tabs">
              {["All", "Lighting", "Body", "Interior", "Utility"].map(
                (item) => (
                  <button
                    className={`category-tab ${category === item ? "active" : ""}`}
                    key={item}
                    onClick={() => setCategory(item)}
                    type="button"
                  >
                    {item === "All"
                      ? "All parts"
                      : item === "Body"
                        ? "Body & trim"
                        : item}
                  </button>
                ),
              )}
            </div>
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search parts..."
                aria-label="Search parts"
              />
            </label>
          </div>
          <div className="product-grid">
            {visibleProducts.length ? (
              visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToQuote}
                />
              ))
            ) : (
              <p className="empty-state">
                No parts match that search yet. Try another term or ask the
                parts desk.
              </p>
            )}
          </div>
        </section>
        <section className="source-section" id="how-it-works">
          <div className="source-photo">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1000&q=85"
              alt="Mechanic working on a vehicle"
            />
          </div>
          <div className="source-copy">
            <p className="eyebrow">
              <span /> FROM SOURCE TO STREET
            </p>
            <h2>
              Less hunting.
              <br />
              <em>More building.</em>
            </h2>
            <p>
              We work with trusted manufacturers and established yards across
              the world to bring useful parts into one focused catalog. Tell us
              what you need, and we will help match it.
            </p>
            <a className="text-link" href="#contact">
              Talk to the parts desk <span>→</span>
            </a>
          </div>
          <div className="source-number">02</div>
        </section>
        <section className="contact-strip" id="contact">
          <div>
            <p className="eyebrow">
              <span /> NEED A SPECIFIC PART?
            </p>
            <h2>Let's find it.</h2>
          </div>
          <button className="primary-button" type="button" onClick={() => setCustomRequestOpen(true)}>
            Request a specific part <span>↗</span>
          </button>
        </section>
      </main>
      <footer>
        <span>© 2025 Elite Auto Hub</span>
        <span>Imported parts, thoughtfully selected.</span>
        <span className="footer-code">EAH / 001</span>
      </footer>
      {showAdminDashboard && (
        <AdminDashboard
          products={products}
          orders={orders}
          requests={requests}
          onOpenInventory={() => setInventoryOpen(true)}
          onOpenOrders={() => setOrdersOpen(true)}
          onOpenRequests={() => setRequestsOpen(true)}
        />
      )}
      {customRequestOpen && (
        <CustomRequestModal
          onSubmit={createRequest}
          onClose={() => setCustomRequestOpen(false)}
        />
      )}
      {drawer && (
        <Drawer
          quote={quote}
          products={products}
          onRemove={(id) => setQuote(quote.filter((quoteId) => quoteId !== id))}
          onPlaceOrder={placeOrder}
          onClose={() => setDrawer(false)}
        />
      )}
      {customerOrdersOpen && (
        <CustomerOrders
          orders={orders}
          requests={requests}
          onConvertRequest={convertRequestToOrder}
          onClose={() => setCustomerOrdersOpen(false)}
        />
      )}
      {showAdmin && (
        <AdminModal
          products={products}
          onAdd={addProduct}
          onDelete={deleteProduct}
          onEditDetails={() => setDetailsOpen(true)}
          onClose={() => {
            setInventoryOpen(false);
          }}
        />
      )}
      {showAdmin && detailsOpen && (
        <ProductDetailsEditor
          products={products}
          onUpdate={updateProductDetails}
          onClose={() => setDetailsOpen(false)}
        />
      )}
      {(admin || isAdminRoute) && ordersOpen && (
        <OrdersPanel
          orders={orders}
          onUpdate={updateOrderStatus}
          onClose={() => setOrdersOpen(false)}
        />
      )}
      {(admin || isAdminRoute) && !ordersOpen && (
        <button
          className="orders-reopen"
          type="button"
          onClick={() => setOrdersOpen(true)}
        >
          View orders <span>{orders.length}</span>
        </button>
      )}
      {(admin || isAdminRoute) && !inventoryOpen && (
        <button
          className="inventory-reopen"
          type="button"
          onClick={() => setInventoryOpen(true)}
        >
          Open inventory
        </button>
      )}
      {(admin || isAdminRoute) && requestsOpen && (
        <RequestsPanel
          requests={requests}
          onUpdate={updateRequest}
          onClose={() => setRequestsOpen(false)}
        />
      )}
      {(admin || isAdminRoute) && !requestsOpen && (
        <button
          className="requests-reopen"
          type="button"
          onClick={() => setRequestsOpen(true)}
        >
          View requests <span>{requests.length}</span>
        </button>
      )}
      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </div>
  );
}
