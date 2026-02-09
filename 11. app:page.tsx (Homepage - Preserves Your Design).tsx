import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import { getFeaturedProducts, getContentBlocks } from '@/lib/data'

export default async function Home() {
  const [featuredProducts, contentBlocks] = await Promise.all([
    getFeaturedProducts(),
    getContentBlocks('home')
  ])

  return (
    <div className="relative">
      {/* PRESERVES YOUR EXACT HOMEPAGE DESIGN */}
      <div className="container mx-auto px-4">
        {/* Your existing hero section */}
        <section className="hero-section py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {contentBlocks.hero_title?.content_text || "Soman's Premium Tea"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {contentBlocks.hero_subtitle?.content_text || "Experience the finest Indian tea collection"}
          </p>
          <img 
            src={contentBlocks.hero_image?.image_url || '/images/hero-bg.jpg'} 
            alt="Hero" 
            className="w-full rounded-lg shadow-lg"
          />
        </section>

        {/* Your existing about section */}
        <section className="about-section py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {contentBlocks.about_title?.content_text || "Our Story"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                {contentBlocks.about_content?.content_text || "Soman's Tea brings you authentic Indian tea..."}
              </p>
            </div>
            <img 
              src={contentBlocks.about_image?.image_url || '/images/about.jpg'} 
              alt="About" 
              className="rounded-lg"
            />
          </div>
        </section>

        {/* Dynamic Products Section */}
        <FeaturedProducts products={featuredProducts} />
      </div>
    </div>
  )
}