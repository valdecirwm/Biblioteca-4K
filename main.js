(function($) {
	"use strict";

	// ANIMAÇÃO HEADER
	window.addEventListener('scroll', function() {
		const header = document.querySelector('header');
		if (window.scrollY > 150) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
	
	// ACTIVE LINKS
	document.addEventListener("DOMContentLoaded", function() {
		const links = document.querySelectorAll('.nav-link');

		links.forEach(function(link) {
			link.addEventListener('click', function() {
				// Remove a classe 'active' de todos os links
				links.forEach(function(l) {
					l.classList.remove('active');
				});

				// Adiciona a classe 'active' ao link clicado
				this.classList.add('active');
			});
		});
	});

	// ANIMATION AOS JS
	document.addEventListener('DOMContentLoaded', () => {
		const observerOptions = {
			root: null, // viewport
			rootMargin: '0px',
			threshold: 0.1 // 10% do elemento visível para disparar
		};

		const observerCallback = (entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const element = entry.target;

					const delay = element.getAttribute('data-delay');
					if (delay) {
						element.style.transitionDelay = `${delay}ms`;
					}

					element.classList.add('animate');
					observer.unobserve(element); 
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);
		const elementsToAnimate = document.querySelectorAll('[data-anime]');
		elementsToAnimate.forEach(el => observer.observe(el));
		
	});
	
	// BUTTON UP SITE
	let backtotop = document.querySelector('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
			} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		window.addEventListener('scroll', toggleBacktotop)
	}
	
	// Lógica do Contador Dinâmico
	const targetValue = 4000;
	const counterElement = document.getElementById('main-counter');
	const triggerElement = document.getElementById('counter-trigger');
	let hasStarted = false;

	const animateCounter = () => {
		let current = 0;
		const duration = 2000;
		const frameRate = 60;
		const increment = targetValue / (duration / (1000 / frameRate));

		const timer = setInterval(() => {
			current += increment;
			if (current >= targetValue) {
				counterElement.innerText = targetValue.toLocaleString('pt-BR');
				clearInterval(timer);
			} else {
				counterElement.innerText = Math.floor(current).toLocaleString('pt-BR');
			}
		}, 1000 / frameRate);
	};

	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting && !hasStarted) {
			hasStarted = true;
			animateCounter();
		}
	}, { threshold: 0.3 });

	if (triggerElement) observer.observe(triggerElement);

})(jQuery);