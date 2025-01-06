import FavoritesList from '@/components/FavoritesList'
import PropertyList from '@/components/PropertyList'
import SearchForm from '@/components/SearchForm'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

export default function HomePage() {
  const [properties, setProperties] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState([])

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

  const handleSearch = (criteria) => {
    if (Object.values(criteria).every(value => value === '' || value === undefined)) {
      setSearchResults(properties) // Show all properties if no criteria are provided
      return
    }

    const results = properties.filter(property => {
      return (
        (!criteria.type || property.type.toLowerCase() === criteria.type.toLowerCase()) &&
        (!criteria.minPrice || property.price >= parseInt(criteria.minPrice)) &&
        (!criteria.maxPrice || property.price <= parseInt(criteria.maxPrice)) &&
        (!criteria.minBedrooms || property.bedrooms >= parseInt(criteria.minBedrooms)) &&
        (!criteria.maxBedrooms || property.bedrooms <= parseInt(criteria.maxBedrooms)) &&
        (!criteria.dateAdded || new Date(property.added.year, property.added.month - 1, property.added.day) >= new Date(criteria.dateAdded)) &&
        (!criteria.location || property.location.toLowerCase().includes(criteria.location.toLowerCase()))
      )
    })
    setSearchResults(results)
  }

  const addToFavorites = (property) => {
    if (!favorites.some(fav => fav.id === property.id)) {
      const newFavorites = [...favorites, property]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }

  const removeFromFavorites = (propertyId) => {
    const newFavorites = favorites.filter(fav => fav.id !== propertyId)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem('favorites')
  }

  const onDragEnd = (result) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === 'propertyList' && destination.droppableId === 'favoritesList') {
      const property = searchResults[source.index]
      addToFavorites(property)
    } else if (source.droppableId === 'favoritesList' && destination.droppableId === 'propertyList') {
      const property = favorites[source.index]
      removeFromFavorites(property.id)
    } else if (source.droppableId === 'favoritesList' && destination.droppableId === 'favoritesList') {
      // Reorder within favorites
      const newFavorites = Array.from(favorites)
      const [reorderedItem] = newFavorites.splice(source.index, 1)
      newFavorites.splice(destination.index, 0, reorderedItem)
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Estate Agent Web App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SearchForm onSearch={handleSearch} />
            <div className='mt-8'>
              <PropertyList properties={searchResults} onAddToFavorites={addToFavorites} />
            </div>
          </div>
          <div>
            <FavoritesList
              favorites={favorites}
              onRemoveFromFavorites={removeFromFavorites}
              onClearFavorites={clearFavorites}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

