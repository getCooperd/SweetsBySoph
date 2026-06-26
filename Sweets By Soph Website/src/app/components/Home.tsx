import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl mb-6 text-foreground">
            Welcome to Sweets By Soph
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Indulge in handcrafted baked goods made with love and the finest ingredients. 
            From delicate macarons to decadent chocolate treats, every bite is a celebration.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-3xl">🧁</span>
            </div>
            <h3 className="mb-2 text-foreground">Fresh Daily</h3>
            <p className="text-muted-foreground">
              All our treats are baked fresh every morning with premium ingredients
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="mb-2 text-foreground">Made with Love</h3>
            <p className="text-muted-foreground">
              Every item is handcrafted with attention to detail and care
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-3xl">🎉</span>
            </div>
            <h3 className="mb-2 text-foreground">Perfect for Any Occasion</h3>
            <p className="text-muted-foreground">
              From birthdays to weddings, we make your celebrations sweeter
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-secondary to-accent rounded-2xl p-12">
          <h2 className="text-3xl mb-4 text-foreground">
            Ready to Satisfy Your Sweet Tooth?
          </h2>
          <p className="text-lg text-foreground/80 mb-6">
            Browse our collection of irresistible treats
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg transition-all hover:opacity-90"
          >
            Explore Our Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
