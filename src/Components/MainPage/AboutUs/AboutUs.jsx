import img1 from '../../../assets/img4.webp';
import img2 from '../../../assets/img5.webp';
import img3 from '../../../assets/img6.webp';
import './AboutUs.css';

export default function AboutUs() {
	return (
		<div className="about">
			<div className="about-container1">
				<div className="about-text1">
					<div className="about-title1">
						<h2>
						Un equipo formado por comensales para el {' '}
							<span>éxito de tus servicios</span>
						</h2>
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
					La creación de un menú digital, didáctico y autoadministrable, diseñado para simplificar la interacción entre comensales y meseros/as. Gracias a nuestra tecnología web y QR, tus clientes podrán explorar tu oferta de comidas y bebidas con facilidad, de manera intuitiva y envolvente, desde que entran a tu salón y se retiran del mismo, te acompañamos. Para los restaurantes, bares, cafés, buffet, comida rápida, etc., esto significa una gestión eficiente de los pedidos y una atención más ágil y precisa

					</p>
				</div>
			</div>
		</div>
	);
}

