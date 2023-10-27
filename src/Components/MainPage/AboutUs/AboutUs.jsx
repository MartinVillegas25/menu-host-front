import img1 from '../../../assets/img4.jpeg';
import img2 from '../../../assets/img5.jpeg';
import img3 from '../../../assets/img6.jpeg';
import './AboutUs.css';

export default function AboutUs() {
	return (
		<div className="about">
			<div className="about-container1">
				<div className="about-text1">
					<div className="about-title1">
						<h2>
							Un equipo apasionado para impulsar tu{' '}
							<span>éxito gastronómico</span>
						</h2>
					</div>
					<div className="about-imgs">
						<div></div>
						<div></div>
						<div></div>
					</div>
					<p>
						En SiMesero, nos enorgullecemos de ofrecerte la solución definitiva
						para llevar tu negocio de comida al siguiente nivel. Nuestra
						plataforma revolucionaria nace de una idea simple pero poderosa:
						mejorar la experiencia tanto para los comercios adheridos como para
						los comensales.
					</p>
				</div>

				<img src={img1} alt="" className="about-img1" />
			</div>
			<div className="about-container2">
				<div className="about-images2">
					<img src={img2} alt="" className="about-img2" />
					<img src={img3} alt="" className="about-img3" />
				</div>
				<div className="about-text2">
					<div className="about-title2">
						<h2>
							¿Qué nos hace<span> únicos?</span>
						</h2>
					</div>
					<p>
						La creación de un menu digital didáctico, diseñado para simplificar
						la interacción entre usuarios y camareros. Gracias a nuestra
						tecnologia avanzada, los clientes podran explorar tu oferta
						culinaria con facilidad, descubriendo platos y sabores de manera
						intuitiva y envolvente. Para los comercios, esto significa una
						gestión eficiente de los pedidos y una atención mas ágil y precisa
					</p>
				</div>
			</div>
		</div>
	);
}
