export default function Footer() {
  return (
    <footer className="bg-marathi-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Soman's Tea</h3>
          <p className="text-gray-300">Premium Indian Tea Marketplace</p>
          <p className="text-gray-400 mt-4">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}