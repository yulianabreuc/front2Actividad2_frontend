import React from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const handleRemoveFavorite = (productId) => {
    const updatedFavorites = favorites.filter(fav => fav._id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="my-40">
      <h2 className="text-primary text-2xl font-bold mb-6">Mis Productos Favoritos:</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
              <img 
                src={product.imagen} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-fucsia text-lg font-semibold">{product.name}</h3>
              <p className="text-marron text-sm mb-4">{product.descripcion}</p>
              <p className="text-primary font-bold">Precio: ${product.precio}</p>
              <button 
                onClick={() => handleRemoveFavorite(product._id)} 
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600 mt-4"
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-marron text-lg">No tienes productos favoritos aún.</p>
      )}
    </div>
  );
};

export default Favorites;
