import logoprincipal from "../../assets/images/image.jpg";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-secondary px-8 xl:px-14 pt-20">
        <img src={logoprincipal} alt="Logo" className="w-44 xl:w-64 h-auto mb-5 rounded-full" />
        <h1 className="text-3xl xl:text-5xl text-white font-bold mb-5 text-center">Bienvenido a Dulce Detalles</h1>
        <p className="text-md xl:text-xl text-white font-italic w-full xl:w-8/12 text-center mb-8 justify-content-center">Somos una tienda especializada en arreglos festivos y regalos creativos, donde encontrarás originales combinaciones de globos, flores naturales y eternas para cumpleaños y celebraciones. También ofrecemos envolturas elegantes, bolsas de regalo, peluches suaves y una variedad de detalles pensados para endulzar cualquier ocasión. Con diseños únicos y atención personalizada, hacemos que cada momento sea aún más especial.</p>


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
