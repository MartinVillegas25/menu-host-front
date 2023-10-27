/* eslint-disable react/no-unescaped-entities */
import './Testimonials.css';
import img from '../../../assets/img8.jpg';

export default function Testimonials() {
	return (
		<div className="testimonials">
			<h3>¿Qué dicen nuestros clientes?</h3>
			<h2>Testimonios</h2>
			<div className="test-container">
				<div className="test-testimonial">
					<p>
						"Desde que implementamos SiMesero, hemos experimentado un cambio
						significativo en nuestro negocio. Estamos encantados con el soporte
						brindado por el equipo y la velocidad para resolver cualquier duda,
						asegurandose de que todo funcione sin problemas.¡Recomendamos
						ampliamente a todos los comercios que buscan mejorar su operación y
						proporcionar una experiencia gastronomica excepcional"
					</p>
					<h4>Hector Amaya</h4>
					<div className="test-circles">
						<div className="test-circle"></div>
						<div className="test-circle"></div>
						<div className="test-circle"></div>
						<div className="test-circle"></div>
					</div>
				</div>
				<div className="test-img-container">
					<img src={img} alt="" className="text-img" />
					<h3>Restaurante "El sabor único"</h3>
				</div>
			</div>
		</div>
	);
}
