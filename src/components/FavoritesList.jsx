import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export default function FavoritesList({ 
  favorites, 
  onRemoveFromFavorites, 
  onClearFavorites 
}) {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>
      <Droppable droppableId="favoritesList">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className="min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-lg"
          >
            {favorites.map((property, index) => (
              <Draggable key={property.id} draggableId={property.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card key={property.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{property.type} - £{property.price.toLocaleString()}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="destructive" onClick={() => onRemoveFromFavorites(property.id)}>
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {favorites.length > 0 && (
        <Button onClick={onClearFavorites} className="mt-4">Clear All Favorites</Button>
      )}
    </div>
  )
}

