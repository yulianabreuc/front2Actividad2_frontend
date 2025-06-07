import React from 'react';
import axios from 'axios';
const utils = require('../utils/index.js');
const apiUrl = utils.default;

const ProductModal = ({ onClose, refreshProducts, showInfoModal, product }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {
      name: formData.get('name'),
      descripcion: formData.get('description'),
      precio: formData.get('price'),
      stock: formData.get('stock'),
      categoria: formData.get('category'),
      imagen: formData.get('image'),
    };

    const request = product
      ? axios.put(`${apiUrl}/products/${product._id}`, productData) // Update product
      : axios.post(`${apiUrl}/products/`, productData); // Create new product

    request
      .then(() => {
        refreshProducts(); // Refresh the product list
        showInfoModal(true); // Show success modal
      })
      .catch(error => {
        console.error(error);
        showInfoModal(false); // Show error modal
      });
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-primary text-xl font-bold mb-4">
          {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Nombre</label>
            <input 
              type="text" 
              name="name"
              defaultValue={product?.name || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Descripción</label>
            <textarea 
              name="description"
              defaultValue={product?.descripcion || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Precio</label>
            <input 
              type="number" 
              name="price"
              defaultValue={product?.precio || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Categoría</label>
            <input 
              type="text" 
              name="category"
              defaultValue={product?.categoria || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Imagen (URL)</label>
            <input 
              type="url" 
              name="image"
              defaultValue={product?.imagen || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-marron font-semibold mb-2">Stock</label>
            <input 
              type="number" 
              name="stock"
              defaultValue={product?.stock || ''}
              className="w-full border border-gray-300 rounded-lg p-2"
              required 
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 px-4 py-2 rounded-lg text-marron font-bold mr-2"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-primary px-4 py-2 rounded-lg text-white font-bold"
            >
              {product ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
