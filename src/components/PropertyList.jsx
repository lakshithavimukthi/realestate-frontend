import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {Link} from "react-router"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { HandIcon as DragHandle } from 'lucide-react'

export default function PropertyList({ properties, onAddToFavorites }) {
  return (
    <Droppable droppableId="propertyList">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <Draggable key={property.id} draggableId={property.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className="relative"
                >
                  <div
                    {...provided.dragHandleProps}
                    className="absolute top-2 right-2 cursor-move"
                  >
                    <DragHandle className="text-gray-400" />
                  </div>
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{property.type} - {property.bedrooms} Bedrooms</CardTitle>
                      <CardDescription>£{property.price.toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <img 
                        src={property.picture[0]} 
                        alt={property.type} 
                        width={300} 
                        height={200} 
                        className="w-full h-48 object-cover mb-2" 
                      />
                      <p className="text-sm">{property.description.substring(0, 100)}...</p>
                      <p className="text-sm mt-2">{property.location}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button asChild className="mr-2">
                        <Link to={`/property/${property.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" onClick={() => onAddToFavorites(property)}>Add to Favorites</Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

