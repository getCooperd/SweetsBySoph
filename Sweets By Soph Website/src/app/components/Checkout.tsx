import { useState } from "react";
import { Link } from "react-router";
import { Minus, Plus } from "lucide-react";

type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  priceNote?: string;
};

const menuItems: MenuItem[] = [
  // Cake Pops
  { id: "cp1", category: "Cake Pops", name: "1 Dozen Classic Cake Pops", price: 24 },
  { id: "cp2", category: "Cake Pops", name: "1 Dozen Character/Custom Cake Pops", price: 30, priceNote: "starting at" },
  { id: "cp3", category: "Cake Pops", name: "Individual Cake Pops", price: 2, priceNote: "each" },
  // Chocolate-Covered Oreos
  { id: "co1", category: "Chocolate-Covered Oreos", name: "1 Dozen Classic Oreos", price: 20 },
  { id: "co2", category: "Chocolate-Covered Oreos", name: "1 Dozen Decorated Oreos", price: 26, priceNote: "starting at" },
  { id: "co3", category: "Chocolate-Covered Oreos", name: "2 Oreos", price: 2, priceNote: "each" },
  // Chocolate-Covered Pretzels
  { id: "pr1", category: "Chocolate-Covered Pretzels", name: "1 Dozen Pretzel Rods", price: 20 },
  { id: "pr2", category: "Chocolate-Covered Pretzels", name: "1 Dozen Decorated Pretzel Rods", price: 26, priceNote: "starting at" },
  { id: "pr3", category: "Chocolate-Covered Pretzels", name: "2 Pretzels", price: 2, priceNote: "each" },
  // Chocolate-Covered Strawberries
  { id: "st1", category: "Chocolate-Covered Strawberries", name: "1 Dozen Classic Strawberries", price: 28 },
  { id: "st2", category: "Chocolate-Covered Strawberries", name: "1 Dozen Specialty Strawberries", price: 34, priceNote: "starting at" },
  // Treat Boxes
  { id: "tb1", category: "Treat Boxes", name: "Small Treat Box", price: 18 },
  { id: "tb2", category: "Treat Boxes", name: "Medium Treat Box", price: 30 },
  { id: "tb3", category: "Treat Boxes", name: "Large Treat Box", price: 45, priceNote: "starting at" },
  // Rice Krispie Treats
  { id: "rk1", category: "Rice Krispie Treats", name: "1 Dozen Dipped & Decorated", price: 26, priceNote: "starting at" },
  { id: "rk2", category: "Rice Krispie Treats", name: "Individual Treats", price: 2, priceNote: "each" },
];

const categories = Array.from(new Set(menuItems.map((i) => i.category)));

type Quantities = Record<string, number>;

export function Checkout() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const selectedItems = menuItems.filter((i) => (quantities[i.id] ?? 0) > 0);
  const total = selectedItems.reduce((sum, i) => sum + i.price * (quantities[i.id] ?? 0), 0);
  const hasItems = selectedItems.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasItems) return;
    setOrderPlaced(true);
  };

  const handleReset = () => {
    setOrderPlaced(false);
    setQuantities({});
    setFormData({ name: "", email: "", phone: "" });
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-4xl mb-4 text-foreground">Order Received!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you, {formData.name}! We'll reach out to {formData.email} or {formData.phone} to confirm your pickup time and details.
          </p>
          <div className="bg-secondary rounded-xl p-6 text-left mb-8">
            <h3 className="text-lg mb-4 text-foreground">Your Order</h3>
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span className="text-foreground">{item.name} × {quantities[item.id]}</span>
                <span className="text-primary">${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-medium">
              <span>Estimated Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl mb-2 text-foreground text-center">Place Your Order</h2>
      <p className="text-center text-muted-foreground mb-10">
        Select the items and quantities you'd like, then fill in your details.
      </p>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Menu Selection */}
          <div>
            <h3 className="text-2xl mb-6 text-foreground">Select Items</h3>
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h4 className="text-sm font-medium uppercase tracking-wider text-primary mb-3 border-b border-border pb-2">
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {menuItems
                      .filter((i) => i.category === category)
                      .map((item) => {
                        const qty = quantities[item.id] ?? 0;
                        return (
                          <div key={item.id} className="flex items-center justify-between bg-card rounded-lg px-4 py-3 shadow-sm">
                            <div className="flex-1 min-w-0 mr-4">
                              <p className="text-sm text-card-foreground leading-tight">{item.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.priceNote && <span>{item.priceNote} </span>}
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, -1)}
                                disabled={qty === 0}
                                className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-30"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-sm">{qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, 1)}
                                className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary + Contact */}
          <div className="space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-2xl mb-6 text-foreground">Order Summary</h3>
              <div className="bg-secondary rounded-xl p-6 min-h-[120px]">
                {!hasItems ? (
                  <p className="text-muted-foreground text-sm">No items selected yet.</p>
                ) : (
                  <>
                    <div className="space-y-2 mb-4">
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-foreground">{item.name} × {quantities[item.id]}</span>
                          <span className="text-primary shrink-0 ml-2">${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between text-lg">
                      <span className="text-foreground">Estimated Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Final price may vary for custom/specialty items.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl mb-6 text-foreground">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-foreground">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Sophie Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="sophie@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-foreground">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Pickup Information</p>
                  <p>We'll reach out via email or phone to confirm your pickup time and location once your order is received.</p>
                </div>

                <button
                  type="submit"
                  disabled={!hasItems}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
                >
                  {hasItems ? `Place Order — $${total.toFixed(2)} est.` : "Select items to continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="text-center mt-8">
        <Link to="/shop" className="text-primary hover:opacity-80 transition-opacity text-sm">
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}
