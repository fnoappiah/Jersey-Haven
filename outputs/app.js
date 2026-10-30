const products = [];

const clubJerseyNames = [
  'Aston Villa Home', 'Barcelona Away', 'Barcelona Home', 'Barcelona Third',
  'Bayern Away', 'Borrusia Dortmund Home', 'Chelsea Away', 'Chelsea Home',
  'Chelsea Third', 'Everton Away', 'Inter Miami Away',
  'Inter Milan Away', 'Juventus Home', 'Juventus Special', 'Juventus Third',
  'Liverpool Home', 'Manchester City Away', 'Manchester City Home',
  'Manchester United Away', 'Manchester United Home', 'Manchester United Third',
  'Paris FC Home', 'Porto Away', 'Real Madrid Away', 'Real Madrid Home',
  'Tottenham Away',
];
products.push(...clubJerseyNames.map((name, index) => {
  const team = name.replace(/\s+(Home|Away|Third|Special)$/i, '');
  const number = String(index + 1).padStart(2, '0');
  return {
    id: `jh-${number}`, name, team, teamKey: team.toLocaleLowerCase().replace(/\s+/g, '-'),
    category: 'club', categoryLabel: 'CLUB',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: `./Images/Jerseys/Club/${encodeURIComponent(name)}.jpeg`,
    imagePosition: 'center 42%', number,
  };
}));

const nationalJerseys = [
  'Argentina Away', 'Belgium Home', 'Brazil Away', 'Brazil Home', 'England Away',
  'England Home', 'France Home', 'Germany Away', 'Portugal Away', 'USA Home',
];
products.push(...nationalJerseys.map((name, index) => {
  const team = name.replace(/\s+(Home|Away)$/i, '');
  const number = String(products.length + index + 1).padStart(2, '0');
  return {
    id: `jh-${number}`, name, team, teamKey: team.toLocaleLowerCase().replace(/\s+/g, '-'),
    category: 'national', categoryLabel: 'NATIONAL',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: `./Images/Jerseys/National/${encodeURIComponent(name)}.jpeg`,
    imagePosition: 'center 42%', number,
  };
}));

const retroJerseys = [
  { name: 'Arsenal Retro', imageName: 'Arsenal Retro' },
  { name: 'Barcelona Retro 1', imageName: 'Barcelona Retro' },
  { name: 'Barcelona Retro 2', imageName: 'Barcelona Retro (2)' },
  { name: 'Brazil Retro 1', imageName: 'Brazil Retro' },
  { name: 'Brazil Retro 2', imageName: 'Brazil Retro (2)' },
  { name: 'Brazil Retro 3', imageName: 'Brazil Retro (3)' },
  { name: 'Chelsea Retro', imageName: 'CHelsea Retro' },
  { name: 'England Retro', imageName: 'England Retro' },
  { name: 'France Retro', imageName: 'France Retro' },
  { name: 'Lazio Retro', imageName: 'Lazio Retro' },
  { name: 'Liverpool Retro', imageName: 'Liverpool Retro' },
  { name: 'Manchester Retro', imageName: 'Manchester Retro' },
  { name: 'Manchester United Retro 1', imageName: 'Manchester United Retro' },
  { name: 'Manchester United Retro 2', imageName: 'Manchester United Retro (2)' },
  { name: 'Portugal Retro', imageName: 'Portugal Retro' },
  { name: 'Real Betis Retro', imageName: 'Real Betis Retro' },
  { name: 'Real Madrid Retro 1', imageName: 'Real Madrid Retro' },
  { name: 'Real Madrid Retro 2', imageName: 'Real Madrid Retro (2)' },
  { name: 'Real Madrid Retro 3', imageName: 'Real Madrid Retro (3)' },
];
products.push(...retroJerseys.map(({ name, imageName }, index) => {
  const team = name.replace(/ Retro(?: \d+)?$/i, '');
  const number = String(products.length + index + 1).padStart(2, '0');
  return {
    id: `jh-${number}`, name, team, teamKey: team.toLocaleLowerCase().replace(/\s+/g, '-'),
    category: 'retro', categoryLabel: 'RETRO',
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: `./Images/Jerseys/Retro/${encodeURIComponent(imageName)}.jpeg`,
    imagePosition: 'center 42%', number,
  };
}));

const state = { category: 'all', search: '', cart: [], selectedProduct: null, previousFocus: null, orderReference: '', orderMessageOpened: false, orderMessageConfirmed: false };
const pricing = { fan: 150, player: 180, customName: 30 };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => `GH₵${value.toLocaleString('en-GH')}`;
const storeConfig = window.JERSEY_HAVEN_CONFIG || { momoMerchantName: '', momoMerchantNumber: '', momoNetwork: '', whatsappNumber: '' };
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const productGrid = $('#product-grid');
const emptyState = $('#empty-state');
const sizeDialog = $('#size-dialog');
const cartPanel = $('#cart-panel');
const checkoutDialog = $('#checkout-dialog');
const toast = $('#toast');
let toastTimer;

function filteredProducts() {
  const q = state.search.trim().toLocaleLowerCase();
  return products.filter(product =>
    (state.category === 'all' || product.category === state.category)
      && (!q || `${product.name} ${product.team} ${product.categoryLabel}`.toLocaleLowerCase().includes(q))
  );
}

function renderProducts() {
  const result = filteredProducts();
  $('#result-count').textContent = String(result.length).padStart(2, '0');
  const collectionNames = { all: 'ALL JERSEYS', national: 'NATIONAL TEAMS', club: 'CLUB TEAMS', retro: 'RETRO' };
  $('#collection-label').textContent = collectionNames[state.category] || 'ALL JERSEYS';
  productGrid.setAttribute('aria-busy', 'true');
  productGrid.innerHTML = result.map((product, index) => `
    <article class="product-card" style="animation-delay:${Math.min(index * 45, 270)}ms">
      <div class="product-image-wrap">
        <button class="product-image" type="button" aria-label="View ${product.name}, from ${money(pricing.fan)}" data-view="${product.id}"><img src="${product.image}" alt="" loading="lazy" decoding="async" style="object-position:${product.imagePosition}" /></button>
        <span class="product-badge ${product.category}">${product.categoryLabel}</span><span class="product-id">JH—${product.number}</span>
        <button class="quick-add" type="button" data-add="${product.id}" aria-label="Choose a version and size for ${product.name}">+</button>
      </div>
      <div class="product-info"><span class="product-team">${product.team}</span><h3 class="product-name">${product.name}</h3><p class="product-price">From ${money(pricing.fan)}</p><div class="product-sizes" aria-label="Available sizes">${product.sizes.map(size => `<span>${size}</span>`).join('')}</div></div>
    </article>`).join('');
  productGrid.setAttribute('aria-busy', 'false');
  emptyState.hidden = result.length > 0;
  productGrid.hidden = result.length === 0;
}

function setCategory(category) {
  state.category = category;
  $$('.collection-tab').forEach(tab => {
    const selected = tab.dataset.category === category;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-pressed', String(selected));
  });
  renderProducts();
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function openSizeDialog(product) {
  state.selectedProduct = product;
  $('#dialog-team').textContent = `JERSEY HAVEN / ${product.team.toUpperCase()}`;
  $('#dialog-product-name').textContent = `${product.categoryLabel} COLLECTION · ${product.name}`;
  $('#dialog-product-price').textContent = `Fan ${money(pricing.fan)} · Player ${money(pricing.player)}`;
  $('#dialog-image').style.backgroundImage = `url('${product.image}')`;
  $('#size-options-list').innerHTML = product.sizes.map((size, index) => `<label class="size-choice"><input type="radio" name="shirt-size" value="${size}" ${index === 0 ? 'checked' : ''} /><span>${size}</span></label>`).join('');
  $('[name="jersey-version"][value="fan"]', sizeDialog).checked = true;
  $('#custom-name-toggle').checked = false;
  $('#custom-name-input').value = '';
  updateVariantPrice();
  $('#size-error').textContent = '';
  sizeDialog.showModal();
}

function updateVariantPrice() {
  const version = $('[name="jersey-version"]:checked', sizeDialog).value;
  const customChoice = $('#custom-name-choice');
  const customToggle = $('#custom-name-toggle');
  const customField = $('#custom-name-field');
  if (version !== 'fan') {
    customToggle.checked = false;
    $('#custom-name-input').value = '';
  }
  customChoice.hidden = version !== 'fan';
  customField.hidden = version !== 'fan' || !customToggle.checked;
  const total = pricing[version] + (customToggle.checked ? pricing.customName : 0);
  $('#selected-variant-price').textContent = `${version === 'fan' ? 'Fan' : 'Player'} version${customToggle.checked ? ' with custom name' : ''} · ${money(total)}`;
}

function openCart() {
  state.previousFocus = document.activeElement;
  cartPanel.classList.add('is-open');
  cartPanel.setAttribute('aria-hidden', 'false');
  $('#close-cart').focus();
  renderCart();
}

function closeCart() {
  cartPanel.classList.remove('is-open');
  cartPanel.setAttribute('aria-hidden', 'true');
  if (state.previousFocus?.isConnected) state.previousFocus.focus();
}

function cartQuantity() { return state.cart.reduce((sum, item) => sum + item.quantity, 0); }

function renderCart() {
  const quantity = cartQuantity();
  $('#bag-count').textContent = quantity;
  $('#open-cart').setAttribute('aria-label', `Open shopping bag, ${quantity} ${quantity === 1 ? 'item' : 'items'}`);
  $('#cart-item-count').textContent = String(quantity).padStart(2, '0');
  const items = $('#cart-items');
  items.innerHTML = state.cart.map(item => `
    <article class="cart-line" data-cart-id="${item.id}" data-cart-size="${item.size}" data-cart-version="${item.version}" data-cart-custom-name="${escapeHtml(item.customName)}">
      <div class="cart-line-image" role="img" aria-label="Illustrative shirt image" style="background-image:url('${item.image}')"></div>
      <div><p>${item.version === 'fan' ? 'Fan' : 'Player'} version / Size ${item.size}${item.customName ? ` / Name: ${escapeHtml(item.customName)}` : ''}</p><h3>${item.name}</h3><div class="quantity-control"><button type="button" data-quantity="-1" aria-label="Remove one ${item.name}">−</button><span>${item.quantity}</span><button type="button" data-quantity="1" aria-label="Add one ${item.name}">+</button></div></div>
      <strong class="cart-line-price">${money(item.price * item.quantity)}</strong>
    </article>`).join('');
  $('#cart-empty').hidden = quantity > 0;
  $('#cart-foot').hidden = quantity === 0;
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $('#cart-subtotal').textContent = money(total);
  $('#checkout-total').textContent = money(total);
}

function addToBag(product, size, version, customName) {
  const price = pricing[version] + (customName ? pricing.customName : 0);
  const existing = state.cart.find(item => item.id === product.id && item.size === size && item.version === version && item.customName === customName);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...product, size, version, customName, price, quantity: 1 });
  renderCart();
  const count = $('#bag-count');
  count.classList.remove('bump');
  requestAnimationFrame(() => count.classList.add('bump'));
  notify(`${product.name}, ${version} version, size ${size}, added to your bag.`);
}

function clearSearch() {
  state.search = '';
  $('#search-input').value = '';
  setCategory('all');
}

$$('.collection-tab').forEach(tab => tab.addEventListener('click', () => setCategory(tab.dataset.category)));
$('#search-input').addEventListener('input', event => { state.search = event.target.value; renderProducts(); });
$('#empty-reset').addEventListener('click', clearSearch);

$$('[name="jersey-version"]').forEach(option => option.addEventListener('change', updateVariantPrice));
$('#custom-name-toggle').addEventListener('change', () => {
  if (!$('#custom-name-toggle').checked) $('#custom-name-input').value = '';
  updateVariantPrice();
});

productGrid.addEventListener('click', event => {
  const addButton = event.target.closest('[data-add]');
  if (addButton) {
    event.stopPropagation();
    const product = products.find(item => item.id === addButton.dataset.add);
    openSizeDialog(product);
    return;
  }
  const card = event.target.closest('[data-view]');
  if (card) openSizeDialog(products.find(item => item.id === card.dataset.view));
});
$('#confirm-add').addEventListener('click', () => {
  const size = $('input[name="shirt-size"]:checked', sizeDialog)?.value;
  if (!size) { $('#size-error').textContent = 'Choose a size to continue.'; return; }
  const version = $('[name="jersey-version"]:checked', sizeDialog).value;
  const customName = version === 'fan' && $('#custom-name-toggle').checked
    ? $('#custom-name-input').value.trim()
    : '';
  if (version === 'fan' && $('#custom-name-toggle').checked && !customName) {
    $('#size-error').textContent = 'Enter the custom name for your jersey.';
    $('#custom-name-input').focus();
    return;
  }
  addToBag(state.selectedProduct, size, version, customName);
  sizeDialog.close();
  $('#open-cart').focus();
});

$('#open-cart').addEventListener('click', openCart);
$('#close-cart').addEventListener('click', closeCart);
$('#panel-shade').addEventListener('click', closeCart);
$('#keep-browsing').addEventListener('click', () => { closeCart(); $('#catalog').scrollIntoView({ behavior: 'smooth' }); });
$('#cart-items').addEventListener('click', event => {
  const control = event.target.closest('[data-quantity]');
  if (!control) return;
  const row = control.closest('[data-cart-id]');
  const item = state.cart.find(candidate => candidate.id === row.dataset.cartId
    && candidate.size === row.dataset.cartSize
    && candidate.version === row.dataset.cartVersion
    && candidate.customName === row.dataset.cartCustomName);
  if (!item) return;
  item.quantity += Number(control.dataset.quantity);
  if (item.quantity <= 0) state.cart = state.cart.filter(candidate => candidate !== item);
  renderCart();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && cartPanel.classList.contains('is-open')) closeCart();
  if (event.key === 'Tab' && cartPanel.classList.contains('is-open')) {
    const focusable = $$('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])', cartPanel.querySelector('.cart-sheet'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); $('#search-input').focus(); }
});

$('#checkout-button').addEventListener('click', () => {
  state.previousFocus = $('#open-cart');
  closeCart();
  checkoutDialog.showModal();
});

function updatePaymentInstructions() {
  const codRadio = $('[name="payment"][value="cod"]');
  codRadio.disabled = false;
  $('#cod-availability').textContent = 'Tell us your area. The shop will confirm delivery coverage.';
  const isCod = $('[name="payment"]:checked').value === 'cod';
  $('#momo-instructions').hidden = isCod;
  $('button[type="submit"]', $('#checkout-form')).innerHTML = isCod
    ? 'Request cash on delivery <span aria-hidden="true">↗</span>'
    : 'Create order reference <span aria-hidden="true">↗</span>';
}

const merchantName = String(storeConfig.momoMerchantName || '').trim();
const merchantNumber = String(storeConfig.momoMerchantNumber || '').trim();
$('#momo-merchant-name').textContent = merchantName || 'Add shop merchant name in store-config.js';
$('#momo-merchant-number').textContent = merchantNumber
  ? `${storeConfig.momoNetwork ? `${storeConfig.momoNetwork} · ` : ''}${merchantNumber}`
  : 'Add shop MoMo number in store-config.js';
$('#checkout-form [name="area"]').addEventListener('input', updatePaymentInstructions);
$$('[name="payment"]').forEach(option => option.addEventListener('change', updatePaymentInstructions));

$('#checkout-form').addEventListener('submit', event => {
  event.preventDefault();
  createOrderRequest(event.currentTarget);
});

function createOrderReference() {
  const date = new Date().toISOString().slice(2, 10).replaceAll('-', '');
  const suffix = globalThis.crypto?.randomUUID?.().slice(0, 6).toUpperCase() || Math.random().toString(36).slice(2, 8).toUpperCase();
  return `JH-${date}-${suffix}`;
}

function orderMessage(order) {
  const lines = order.items.map(item => `• ${item.name} / ${item.version === 'fan' ? 'Fan' : 'Player'} version / ${item.size}${item.customName ? ` / Custom name: ${item.customName}` : ''} × ${item.quantity} — ${money(item.price * item.quantity)}`);
  return [
    'Jersey Haven order request',
    `Reference: ${order.reference}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Delivery area: ${order.area}`,
    `Payment: ${order.method === 'cod' ? 'Cash on delivery' : 'Manual Mobile Money'}`,
    `Order total: ${money(order.total)}`,
    ...lines,
  ].join('\n');
}

function createOrderRequest(form) {
  const data = new FormData(form);
  const error = $('#checkout-error');
  error.textContent = '';
  if (!state.cart.length) { error.textContent = 'Your bag is empty.'; return; }
  if (!data.get('name')?.trim() || !data.get('area')?.trim()) { error.textContent = 'Add your name and delivery area to continue.'; return; }
  const whatsappNumber = String(storeConfig.whatsappNumber || '').replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(whatsappNumber)) { error.textContent = 'The shop WhatsApp number is not set up, so your order cannot be sent. Contact the shop before placing this request.'; return; }
  const phone = String(data.get('phone') || '').replace(/[\s()-]/g, '');
  if (!/^(?:0\d{9}|\+233\d{9}|233\d{9})$/.test(phone)) { error.textContent = 'Enter a valid Ghana mobile number, such as 024 123 4567.'; $('[name="phone"]', form).focus(); return; }
  const method = data.get('payment');
  const area = String(data.get('area')).trim();
  state.orderReference = createOrderReference();
  state.orderMessageOpened = false;
  state.orderMessageConfirmed = false;
  const order = {
    reference: state.orderReference,
    name: String(data.get('name')).trim(),
    phone,
    area,
    method,
    total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    items: state.cart.map(item => ({ name: item.name, size: item.size, version: item.version, customName: item.customName, quantity: item.quantity, price: item.price })),
  };
  $('#order-reference').textContent = order.reference;
  $('#order-status-label').textContent = method === 'cod' ? 'CASH ON DELIVERY REQUEST' : 'ORDER REQUEST / PAYMENT NOT CONFIRMED';
  $('#success-copy').textContent = method === 'cod'
    ? 'No payment is due now. The shop will review your area and confirm whether it can deliver there.'
    : 'This is an order request only. Transfer the exact amount to the merchant details below and ask the shop to confirm payment before delivery.';
  $('#order-instructions').innerHTML = method === 'cod'
    ? `<p><strong>Requested delivery area:</strong> ${escapeHtml(order.area)}</p><p>The shop will confirm coverage and the order. Pay ${money(order.total)} to the delivery person when it arrives.</p>`
    : merchantNumber
      ? `<p>Transfer <strong>${money(order.total)}</strong> to <strong>${escapeHtml(merchantName || 'the shop MoMo merchant')}</strong> at <strong>${escapeHtml($('#momo-merchant-number').textContent)}</strong>. Enter <strong>${escapeHtml(order.reference)}</strong> as the payment reference if prompted.</p><p>Wait for the shop to verify the transfer and confirm your order.</p>`
      : '<p>The shop has not added its MoMo payment details yet. Contact the shop and quote this reference before sending money.</p>';
  const sendOrder = $('#send-order');
  sendOrder.hidden = false;
  sendOrder.dataset.message = orderMessage(order);
  $('#whatsapp-privacy-note').hidden = false;
  $('#order-send-status').textContent = 'Open WhatsApp, send the prefilled order message, then return here and confirm it was sent.';
  $('#confirm-order-sent').checked = false;
  $('#confirm-order-sent').disabled = true;
  $('#finish-order').disabled = true;
  $('#finish-order').innerHTML = 'Send the message to continue <span aria-hidden="true">↗</span>';
  checkoutDialog.close();
  $('#success-dialog').showModal();
}

$('#send-order').addEventListener('click', event => {
  const number = String(storeConfig.whatsappNumber || '').replace(/\D/g, '');
  if (!/^\d{10,15}$/.test(number)) return;
  const whatsappWindow = window.open(`https://wa.me/${number}?text=${encodeURIComponent(event.currentTarget.dataset.message)}`, '_blank');
  if (!whatsappWindow) {
    $('#order-send-status').textContent = 'WhatsApp could not be opened. Allow pop-ups for this page and try again.';
    return;
  }
  whatsappWindow.opener = null;
  state.orderMessageOpened = true;
  $('#confirm-order-sent').disabled = false;
  $('#order-send-status').textContent = 'WhatsApp is open. Tap Send in WhatsApp, return here, then tick the confirmation below.';
});

$('#confirm-order-sent').addEventListener('change', event => {
  state.orderMessageConfirmed = event.currentTarget.checked && state.orderMessageOpened;
  $('#finish-order').disabled = !state.orderMessageConfirmed;
  $('#finish-order').innerHTML = state.orderMessageConfirmed
    ? 'Finish order request <span aria-hidden="true">↗</span>'
    : 'Send the message to continue <span aria-hidden="true">↗</span>';
  $('#order-send-status').textContent = state.orderMessageConfirmed
    ? 'Thanks. The shop has your order request. It will verify payment or confirm cash on delivery and contact you about delivery.'
    : 'Open WhatsApp, send the prefilled order message, then return here and confirm it was sent.';
});

$('#success-dialog').addEventListener('cancel', event => {
  event.preventDefault();
  $('#order-send-status').textContent = state.orderMessageConfirmed
    ? 'Use “Finish order request” to close this step.'
    : 'Please send your order message in WhatsApp before leaving this step.';
});

window.addEventListener('beforeunload', event => {
  if ($('#success-dialog').open && !state.orderMessageConfirmed) {
    event.preventDefault();
    event.returnValue = '';
  }
});

$('#copy-reference').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(state.orderReference);
    notify('Order reference copied.');
  } catch {
    const field = document.createElement('textarea');
    field.value = state.orderReference;
    field.style.position = 'fixed'; field.style.opacity = '0';
    document.body.append(field); field.select(); document.execCommand('copy'); field.remove();
    notify('Order reference copied.');
  }
});

$('#finish-order').addEventListener('click', () => {
  if (!state.orderMessageOpened || !state.orderMessageConfirmed) return;
  state.orderMessageOpened = false;
  state.orderMessageConfirmed = false;
  $('#success-dialog').close();
  state.cart = [];
  renderCart();
  $('#checkout-form').reset();
  updatePaymentInstructions();
  $('#open-cart').focus();
});

updatePaymentInstructions();
renderProducts();
renderCart();
