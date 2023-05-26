// add that animation only start if content is fully visable!

const observer = new IntersectionObserver(entires => {
    entires.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));
