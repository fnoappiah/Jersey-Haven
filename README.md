# Jersey Haven

A static HTML, CSS, and JavaScript storefront. Checkout creates a local order reference and offers manual Mobile Money or cash on delivery. It does not process or automatically verify payments.

## Run locally

Serve the `outputs` folder with any static web server. Before using checkout, copy `outputs/store-config.example.js` to `outputs/store-config.js` and enter the shop's merchant and WhatsApp details. The real `store-config.js` is ignored by Git so shop-specific details are not included in this public repository.

- `momoMerchantName`: merchant name shown to customers.
- `momoMerchantNumber`: Mobile Money merchant number or code.
- `momoNetwork`: optional network label.
- `whatsappNumber`: WhatsApp number with country code and digits only.

Cash on delivery is available. Customers enter their area, and the shop confirms delivery coverage when responding. Catalog entries in `outputs/app.js` map to local jersey images in `outputs/Images/Jerseys/Club`, `National`, and `Retro`; repeated Retro names are numbered. Pricing is Fan GH₵150, Player GH₵180, and +GH₵30 to add a name to a Fan version. Sizes are M, L, XL, and XXL. Edit `outputs/app.js` to update the catalog, sizes, or prices.

## Checkout process

The page generates an order reference in the browser. For manual MoMo, the customer sends the displayed total to the configured merchant account, uses the order reference as the payment reference, then sends the order details to the shop on WhatsApp. The shop must verify the transfer in its own MoMo merchant account and confirm the order before delivery.

The order confirmation dialog remains open until the customer opens the prefilled WhatsApp message and confirms that they sent it. If WhatsApp is not configured, checkout will not create an order request. The browser cannot verify that the customer pressed Send; it relies on the customer's confirmation and warns before they leave while the message is pending.

For cash on delivery, the customer sends the order request and tells the shop their area. The shop confirms delivery coverage, and the customer pays the delivery person when the order arrives. This page does not store orders or automatically confirm payments.
