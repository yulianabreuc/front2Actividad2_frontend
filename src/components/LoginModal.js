import { useState } from "react";
import axios from "axios";
const utils = require('../utils/index.js');
const apiUrl = utils.default;

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { token, user, message } = response.data;    
      onClose(token, user, message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al iniciar sesión.");
      setIsMessageModalOpen(true);
    }
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                onClick={() => onClose(null, null)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-fucsia transition duration-300"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <p className="text-center text-lg mb-4">{message}</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-fucsia transition duration-300 mx-auto block"
              onClick={handleCloseMessageModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
