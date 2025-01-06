import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from "react-router"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Our Real Estate Agency</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            Welcome to our premier real estate agency. We are dedicated to helping you find your dream home or make smart investment decisions in the property market. With years of experience and a deep understanding of the local real estate landscape, our team of expert agents is here to guide you through every step of your property journey.
          </p>
          <p className="text-lg mb-4">
            Whether you're buying, selling, or renting, we provide personalized service tailored to your unique needs. Our commitment to excellence and customer satisfaction has made us a trusted name in the real estate industry.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Get in touch with us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>123 Real Estate Street, Cityville, State 12345</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>info@realestate.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <Link href="https://www.realestate.com" className="hover:underline">
                www.realestate.com
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Residential property sales and purchases</li>
          <li>Commercial real estate transactions</li>
          <li>Property management</li>
          <li>Real estate investment consulting</li>
          <li>Market analysis and property valuation</li>
        </ul>
      </div>
    </div>
  )
}

