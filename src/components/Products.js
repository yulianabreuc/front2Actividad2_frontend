import React from 'react';
import axios from 'axios';
import ProductModal from './ProductModal'; 

const ProductsList = ({ isAdmin, isAuthenticated, showFavorites = false }) => {
  const utils = require('../utils/index.js');
  const [products, setProducts] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [infoModal, setInfoModal] = React.useState({ isVisible: false, isSuccess: false });
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState({ isVisible: false, productId: null });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 9;
  const apiUrl = utils.default;

  const refreshProducts = () => {
    axios.get(`${apiUrl}/products/`)
      .then(response => {
        if (response.data.status !== 'success') {
          setProducts(response.data.products);
        } else {
          console.error('Error fetching products:', response.data.message);
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  React.useEffect(() => {
    refreshProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const showInfoModal = (isSuccess) => {
    setInfoModal({ isVisible: true, isSuccess });
    setTimeout(() => setInfoModal({ isVisible: false, isSuccess: false }), 3000);
  };

  const handleOpenDeleteModal = (productId) => {
    setDeleteModal({ isVisible: true, productId });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isVisible: false, productId: null });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.productId) {
      axios.delete(`${apiUrl}/products/${deleteModal.productId}`)
        .then(() => {
          refreshProducts();
          showInfoModal(true);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          showInfoModal(false);
        });
    }
    handleCloseDeleteModal();
  };

  const handleFavoriteToggle = (product) => {
    const updatedFavorites = favorites.some(fav => fav._id === product._id)
      ? favorites.filter(fav => fav._id !== product._id)
      : [...favorites, product];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredProducts = products
    .filter(product => product.stock > 0)
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedProducts = showFavorites
    ? favorites
    : filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="mt-4 mb-32">
      {isAdmin && (
        <div className="mb-8">
          <button 
            onClick={() => handleOpenModal()} 
            className="bg-primary px-4 py-2 rounded-lg text-white font-bold hover:bg-primary-dark"
          >
            Crear nuevo producto
          </button>
        </div>
      )}
      <h2 className="text-primary text-2xl font-bold mb-6">
        {showFavorites ? "Favoritos:" : "Productos:"}
      </h2>
      {!showFavorites && (
        <input 
          type="text" 
          placeholder="Buscar por nombre, descripción o categoría..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full mb-6 p-2 border border-gray-300 rounded-lg"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
            <img 
              src={product.imagen} 
              alt={product.name} 
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-fucsia text-lg font-semibold">{product.name}</h3>
            <p className="text-marron text-sm mb-4">{product.descripcion}</p>
            <p className="text-marron">Categoria: {product.categoria}</p>
            <p className="text-marron">Stock: {product.stock}</p>
            <p className="text-primary font-bold">Precio: ${product.precio}</p>
            <div className="flex justify-between mt-4">
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => handleOpenModal(product)} 
                    className="bg-secondary px-4 py-2 rounded-lg text-white font-bold hover:bg-secondary-dark"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleOpenDeleteModal(product._id)} 
                    className="bg-fucsia px-4 py-2 rounded-lg text-white font-bold hover:bg-fucsia-dark"
                  >
                    Eliminar
                  </button>
                </>
              ) : (
                isAuthenticated && (
                  <button 
                    onClick={() => handleFavoriteToggle(product)} 
                    className={`px-4 py-2 rounded-lg font-bold ${
                      favorites.some(fav => fav._id === product._id) ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-marron'
                    }`}
                  >
                    {favorites.some(fav => fav._id === product._id) ? 'Favorito' : 'Agregar a Favoritos'}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      {!showFavorites && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg font-bold ${
                currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-marron'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <ProductModal 
          onClose={handleCloseModal} 
          refreshProducts={refreshProducts} 
          showInfoModal={showInfoModal} 
          product={editingProduct}
        />
      )}
      {deleteModal.isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-marron mb-4">¿Estás seguro de que deseas eliminar este producto?</h2>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleConfirmDelete} 
                className="bg-fucsia px-4 py-2 rounded-lg text-white font-bold hover:bg-fucsia-dark"
              >
                Sí
              </button>
              <button 
                onClick={handleCloseDeleteModal} 
                className="bg-gray-300 px-4 py-2 rounded-lg text-marron font-bold hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {infoModal.isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className={`text-xl font-bold ${infoModal.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {infoModal.isSuccess ? 'Operación realizada exitosamente!' : 'Error al realizar la operación.'}
            </h2>
            <button 
              onClick={() => setInfoModal({ isVisible: false, isSuccess: false })} 
              className="bg-primary px-4 py-2 mt-4 rounded-lg text-white font-bold"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;

