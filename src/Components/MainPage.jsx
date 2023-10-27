import NavBar from './MainPage/NavBar/NavBar';
import FirstView from './MainPage/FirstView/FirstView';
import AboutUs from './MainPage/AboutUs/AboutUs';
import AppDetails from './MainPage/AppDetails/AppDetails';
import Testimonials from './MainPage/Testimonials/Testimonials';
import Subscription from './MainPage/Subscription/Subscription';
import Footer from './MainPage/Footer/Footer';

export default function MainPage() {
	return (
		<div className="App">
			<NavBar />
			<section>
				<FirstView />
			</section>
			<section id="nosotros">
				<AboutUs />
			</section>
			<section>
				<AppDetails />
			</section>
			<section id="testimonios">
				<Testimonials />
			</section>
			<section id="suscripcion">
				<Subscription />
			</section>
			<section>
				<Footer />
			</section>
		</div>
	);
}
