import { useState } from "react";
import axios from "axios";
const utils = require('../utils/index.js');
const apiUrl = utils.default;

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      setMessage("Las contraseñas no coinciden.");
      setIsMessageModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name: formData.name,
        lastName: formData.lastName,
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        repassword: formData.repassword,
      });
      setMessage("Registro exitoso.");
    } catch (error) {
      console.error(error);
      setMessage("Error al registrar el usuario.");
    }
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    if (message === "Registro exitoso.") {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="w-full p-2 border rounded"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="userName"
              placeholder="Nombre de Usuario"
              className="w-full p-2 border rounded"
              value={formData.userName}
              onChange={handleChange}
            />
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
            <input
              type="password"
              name="repassword"
              placeholder="Repetir Contraseña"
              className="w-full p-2 border rounded"
              value={formData.repassword}
              onChange={handleChange}
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-fucsia transition duration-300"
              >
                Registrarse
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

export default RegisterModal;
