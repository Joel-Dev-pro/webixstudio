document.addEventListener('DOMContentLoaded', function() {

    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculer la position de la cible en tenant compte de la hauteur du header fixe
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px de marge supplémentaire

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                // Fermer le menu mobile si ouvert après un clic
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burgerMenu.innerHTML = '<i class="fas fa-bars"></i>'; // Reset burger icon
                    burgerMenu.setAttribute('aria-label', 'Ouvrir le menu');
                }
            }
        });
    });

    // Animation on scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 80) { // Se déclenche un peu plus tôt
                element.classList.add('animated');
            }
            // Optionnel: retirer l'animation si l'élément n'est plus visible pour ré-animer
            // else {
            //     element.classList.remove('animated');
            // }
        });
    }

    // Initialize animations on load
    window.addEventListener('load', function() {
        animateOnScroll(); // Première vérification au chargement

        // Animate service cards with delay (uniquement au premier chargement)
        // Note: si tu veux que cela se reproduise à chaque fois qu'ils entrent dans la vue avec délai,
        // il faudra une logique plus complexe avec Intersection Observer.
        // Pour l'instant, c'est une animation initiale.
        const serviceCards = document.querySelectorAll('#services .service-card'); // Plus spécifique
        serviceCards.forEach((card, index) => {
            if (!card.classList.contains('animated')) { // N'anime que si pas déjà animé par animateOnScroll
                 // Le délai est déjà géré par le style inline, mais on s'assure que .animated est ajouté
                 // si la carte est déjà visible au chargement.
                 // Si tu veux un délai JS, fais :
                 // setTimeout(() => {
                 //    card.classList.add('animated'); // ou .animate comme tu avais avant
                 // }, index * 200);
            }
        });
    });

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Floating elements animation (si tu en as)
    // const floatingElements = document.querySelectorAll('.floating');
    // floatingElements.forEach((el, index) => {
    //     el.style.animationDelay = `${index * 0.2}s`;
    // });

    // Back to Top button
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            backToTopButton.style.display = window.scrollY > 200 ? "block" : "none";
        });
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Burger menu toggle
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                burgerMenu.innerHTML = '<i class="fas fa-times"></i>'; // Icône croix
                burgerMenu.setAttribute('aria-label', 'Fermer le menu');
            } else {
                burgerMenu.innerHTML = '<i class="fas fa-bars"></i>'; // Icône burger
                burgerMenu.setAttribute('aria-label', 'Ouvrir le menu');
            }
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        if (questionButton) {
            questionButton.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                    // Si tu veux que la réponse se ferme aussi avec transition
                    // currentlyActive.querySelector('.faq-answer').style.maxHeight = 0; 
                }
                item.classList.toggle('active');
                // const answer = item.querySelector('.faq-answer');
                // if (item.classList.contains('active')) {
                //     answer.style.maxHeight = answer.scrollHeight + "px";
                // } else {
                //     answer.style.maxHeight = 0;
                // }
            });
        }
    });
    
    // Form submission (placeholder)

document.getElementById("contactForm").addEventListener("submit", function (e) {
e.preventDefault(); // Empêche le rechargement de la page

// Récupère les données du formulaire
const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    projectType: document.getElementById("projectType").value,
    Number: document.getElementById('number').value,
    message: document.getElementById("message").value,
};

// Envoie l'email via EmailJS
emailjs.send("service_y1tlb3i", "template_6w6sbun", formData) // Remplacez par vos IDs
.then(() => {
alert("Message envoyé avec succès !");
document.getElementById("contactForm").reset(); // Réinitialise le formulaire
},
(error) => {
    alert("Erreur : " + error.text);
    }
    );
});
});