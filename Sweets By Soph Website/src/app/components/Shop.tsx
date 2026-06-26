import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import menuImage from "@/imports/SophMenu.jpg";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function Shop() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl mb-4 text-foreground">Our Menu</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our handcrafted treats below, then head to checkout to place your order.
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <ImageWithFallback
          src={menuImage}
          alt="Sweets By Soph menu showing cake pops, chocolate-covered oreos, pretzels, strawberries, treat boxes, and rice krispie treats with pricing"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="text-center mt-10">
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90 text-lg"
        >
          Place Your Order
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
