
import { Button } from '@/components/ui/button'

export function HeroBanner() {
  return (
    <div className="relative hero-banner h-[400px] w-full">

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-xl mb-6">Discover the perfect property with our expert guidance</p>
          <Button size="lg">Start Your Search</Button>
        </div>
      </div>
    </div>
  )
}
