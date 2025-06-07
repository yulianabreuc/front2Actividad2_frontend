import { useState } from "react";
import logoprincipal from "../../assets/images/image.jpg";
import Products from "../../components/Products.js";
import RegisterModal from "../../components/RegisterModal.js";
import LoginModal from "../../components/LoginModal.js";

const Home = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: "", lastName: "", isAdmin: false });
  const [message, setMessage] = useState("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // State to toggle favorites view

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData({ name: "", lastName: "", isAdmin: false });
    setMessage("Has cerrado sesión correctamente.");
    setIsMessageModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleCloseLoginModal = (token, user, message) => {
    setIsLoginModalOpen(false);
    if (token && user) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      const userPermissions = user.permission === "admin" || false;
      setUserData({ name: user.name, lastName: user.lastName, isAdmin: userPermissions });
      console.log("User data after login:", { name: user.name, lastName: user.lastName, isAdmin: userPermissions }); // Debugging
      setMessage("Sesión iniciada exitosamente.");
      setIsMessageModalOpen(true);
    } else {
      console.error("Error: Token o datos del usuario no proporcionados.");
      console.log("mensaje:", message);
      if (message) {
        setMessage(message);
        setIsMessageModalOpen(true);
      }
    }
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites); // Toggle the favorites view
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary px-8 xl:px-14 pt-20">
        <div className="absolute top-4 right-4 flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-white font-bold">{`${userData.name} ${userData.lastName}`}</span>
                {!userData.isAdmin && (
                  <button
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition duration-300"
                    onClick={handleFavoritesClick}
                  >
                    {showFavorites ? "ver Todos" : "Favoritos"}
                  </button>
                )}
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-fucsia transition duration-300"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-fucsia transition duration-300"
                  onClick={handleLoginClick}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="bg-fucsia text-white px-4 py-2 rounded-lg hover:bg-primary transition duration-300"
                  onClick={handleRegisterClick}
                >
                  Registrarse
                </button>
              </>
            )}
        </div>
        {isRegisterModalOpen && <RegisterModal onClose={handleCloseRegisterModal} />}
        {isLoginModalOpen && <LoginModal onClose={(token, user, message) => handleCloseLoginModal(token, user, message)} />}
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
        <img src={logoprincipal} alt="Logo" className="w-44 xl:w-64 h-auto mb-5 rounded-full" />
        <h1 className="text-3xl xl:text-5xl text-white font-bold mb-5 text-center">Bienvenido a Dulce Detalles</h1>
        <p className="text-md xl:text-xl text-white font-italic w-full xl:w-8/12 text-center mb-8 justify-content-center">Somos una tienda especializada en arreglos festivos y regalos creativos, donde encontrarás originales combinaciones de globos, flores naturales y eternas para cumpleaños y celebraciones. También ofrecemos envolturas elegantes, bolsas de regalo, peluches suaves y una variedad de detalles pensados para endulzar cualquier ocasión. Con diseños únicos y atención personalizada, hacemos que cada momento sea aún más especial.</p>


        
        {showFavorites ? (
          <Products isAdmin={false} isAuthenticated={isAuthenticated} showFavorites={true} />
        ) : (
          <Products isAdmin={userData.isAdmin} isAuthenticated={isAuthenticated} />
        )}


        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-3xl xl:text-5xl text-white font-bold mb-5">¿Qué ofrecemos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">Arreglos Festivos</h3>
                    <p className="text-gray-700">Globos, flores y más para tus celebraciones.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">Regalos Creativos</h3>
                    <p className="text-gray-700">Detalles únicos para cada ocasión especial.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">Atención Personalizada</h3>
                    <p className="text-gray-700">Nos aseguramos de que cada detalle sea perfecto.</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-10">
            <h2 className="text-3xl xl:text-5xl text-white font-bold mb-5 text-center">Nuestra paleta de colores</h2>
            <div className="flex flex-wrap justify-center w-full mt-5">
                <div className="w-12 h-12 rounded-full bg-primary mr-4 mb-2"></div>
                <div className="w-12 h-12 rounded-full bg-rosa mr-4 mb-2"></div>
                <div className="w-12 h-12 rounded-full bg-fucsia mr-4 mb-2"></div>
                <div className="w-12 h-12 rounded-full bg-marron mr-4 mb-2"></div>
            </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-10 mb-24">
            <h2 className="text-3xl xl:text-5xl text-white font-bold mb-5">Contáctanos</h2>
            <p className="text-md xl:text-xl text-white font-italic w-8/12 text-center mb-8">Estamos aquí para ayudarte a hacer de tu celebración un momento inolvidable. Contáctanos para más información sobre nuestros productos y servicios.</p>
            <button className="bg-fucsia text-white px-4 py-2 rounded-lg hover:bg-primary transition duration-300">¡Hablemos!</button>
        </div>
    </div>
  );
};

export default Home;
