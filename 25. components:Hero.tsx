interface HeroProps {
  title: string
  subtitle: string
  imageUrl: string
}

export default function Hero({ title, subtitle, imageUrl }: HeroProps) {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img src={imageUrl} alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}