import './Menu.css';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { IoRestaurantSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsCashCoin } from 'react-icons/bs';
import { BsHouseDoorFill } from 'react-icons/bs';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import Call from './Call/Call';
import Chat from './Chat/Chat';
import Pay from './Pay/Pay';

import { useState } from 'react';

export default function Menu() {
	const [selectedSection, setSelectedSection] = useState('products');

	const handleSectionClick = (sectionId) => {
		setSelectedSection(sectionId);
	};

	return (
		<main className="menu-container">
			<header className="menu-header-container">
				<div className="menu-header">
					<div>
						<IoRestaurantSharp className="menu-dec-logo" />
					</div>
					<div className="menu-logo"></div>
					<div>
						<MdOutlineNotificationsNone className="menu-notification-logo" />
					</div>
				</div>
			</header>{' '}
			<main>
				<section
					id="products"
					className={selectedSection === 'products' ? '' : 'hidden-section'}
				>
					<Products />
				</section>
				<section
					id="cart"
					className={selectedSection === 'cart' ? '' : 'hidden-section'}
				>
					<Cart />
				</section>
				<section
					id="chat"
					className={selectedSection === 'chat' ? '' : 'hidden-section'}
				>
					<Chat />
				</section>
				<section
					id="call"
					className={selectedSection === 'call' ? '' : 'hidden-section'}
				>
					<Call />
				</section>
				<section
					id="pay"
					className={selectedSection === 'pay' ? '' : 'hidden-section'}
				>
					<Pay />
				</section>
			</main>
			<footer>
				<div className="footer-container">
					<a
						href="#products"
						onClick={() => handleSectionClick('products')}
						className={selectedSection === 'products' ? 'selected' : ''}
					>
						<BsHouseDoorFill className="footer-icon" />
					</a>
					<a
						href="#cart"
						onClick={() => handleSectionClick('cart')}
						className={selectedSection === 'cart' ? 'selected' : ''}
					>
						<FaShoppingCart className="footer-icon" />
					</a>
					<a
						href="#chat"
						onClick={() => handleSectionClick('chat')}
						className={selectedSection === 'chat' ? 'selected' : ''}
					>
						<BsFillChatDotsFill className="footer-icon" />
					</a>
					<a
						href="#profile"
						onClick={() => handleSectionClick('call')}
						className={selectedSection === 'call' ? 'selected' : ''}
					>
						<BsFillPersonFill className="footer-icon" />
					</a>
					<a
						href="#pay"
						onClick={() => handleSectionClick('pay')}
						className={selectedSection === 'pay' ? 'selected' : ''}
					>
						<BsCashCoin className="footer-icon" />
					</a>
				</div>
			</footer>
		</main>
	);
}
