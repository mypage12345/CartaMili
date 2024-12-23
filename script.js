const cone = document.getElementById("cone");
const message = document.getElementById("message");
const dedication = document.getElementById("dedication");
const specialImage = document.getElementById("special-image");

let confettiEnabled = true;

// Función para generar confeti
function generateConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -20}vh`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random()}s`;
        document.body.appendChild(confetti);

        confetti.addEventListener("animationend", () => confetti.remove());
    }
}

// Función para generar estrellas dinámicas en forma de arco alrededor de la imagen especial
function generateStarsAroundImage() {
    const imageRect = specialImage.getBoundingClientRect();
    const centerX = imageRect.left + imageRect.width / 2;
    const centerY = imageRect.top + imageRect.height / 2;
    const radius = Math.max(imageRect.width, imageRect.height) * 1.2; // Radio inicial reducido para pantallas pequeñas
    const distanceIncrement = 30; // Incremento de distancia ajustado para móviles
    const minStars = 8;
    const maxStars = 15;
    const numStars = Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        const angle = (2 * Math.PI * i) / numStars; // Ángulo para distribuir estrellas uniformemente
        const startX = centerX + radius * Math.cos(angle);
        const startY = centerY + radius * Math.sin(angle);
        const endX = centerX + (radius + distanceIncrement) * Math.cos(angle);
        const endY = centerY + (radius + distanceIncrement) * Math.sin(angle);

        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        document.body.appendChild(star);

        // Animación de movimiento
        star.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: 800, // Duración reducida para móviles
            easing: "ease-out",
        });

        // Eliminar estrella después de la animación
        setTimeout(() => star.remove(), 800);
    }
}

// Evento para mostrar mensaje, dedicatoria y animaciones
cone.addEventListener("click", () => {
    if (confettiEnabled) {
        message.style.display = "block";
        dedication.style.display = "block";
        specialImage.style.display = "block";
        generateConfetti();
        confettiEnabled = false;
    } else {
        generateStars();
    }
});

// Evento para la imagen especial
specialImage.addEventListener("click", () => {
    generateStarsAroundImage();
});
