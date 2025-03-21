'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'


export default function PropertyPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [favorites, setFavorites] = useState([])

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      const newFavorites = [...favorites, property]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }
//fetch the relevent property to show on the page
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch('/properties.json')
        const data = await res.json()
        // Check if data.properties exists and is an array
        if (Array.isArray(data.properties)) {
          const foundProperty = data.properties.find((p) => p.id === id)
          setProperty(foundProperty || null)
        } else {
          console.error('Expected an array of properties, but received:', data)
          setProperty(null)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
        setProperty(null)
      }
    }

    fetchProperty()
  }, [id]);

  // load the favourites in the local storage to state
  useEffect(() => {
    // Load properties from JSON file
    const loadProperties = async () => {
      const res = await fetch('/properties.json')
      const data = await res.json()
      setProperties(data.properties)
      setSearchResults(data.properties) // Show all properties initially
    }

    // Load favorites from local storage
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    }

    loadProperties()
    loadFavorites()
  }, [])

  if (!property) {
    return <div>Loading...</div>
  }

  const images = property.picture

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.type} - {property.bedrooms} Bedrooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <img
            src={images[currentImageIndex]}
            alt={`Property image ${currentImageIndex + 1}`}
            width={600}
            height={400}
            className="w-full rounded-md h-auto"
          />
          <div className="flex mt-2 flex-wrap gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={75}
                className="w-24 rounded h-16 object-cover cursor-pointer mr-2"
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold mb-2">£{property.price.toLocaleString()}</p>
          <p className="mb-2">{property.description}</p>
          <p className="mb-2">Location: {property.location}</p>
          <p className="mb-2">Date Added: {`${property.added.day}/${property.added.month}/${property.added.year}`}</p>
          <Button onClick={() => addToFavorites(property)}>Add to Favorites</Button>
        </div>
      </div>
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p>{property.description}</p>
        </TabsContent>
        <TabsContent value="floorplan">
          <div>
            <img src={property.floorplan[0]} alt="" />
          </div>
        </TabsContent>
        <TabsContent value="map">
          <div>
            <iframe src={property.map} width="800" className='w-full' height="600" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

