document.addEventListener("DOMContentLoaded", () => {
            const animateCount = (counter) => {
                const target = parseInt(counter.getAttribute("data-target"), 10);
                const duration = 2000;
                const startTime = performance.now();

                const update = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.round(progress * target);

                    counter.innerText = `+${value.toLocaleString("es-CL")}`;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = `+${target.toLocaleString("es-CL")}`;
                    };
                };
                requestAnimationFrame(update);
            };

            const counters = document.querySelectorAll(".counters");

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        if (!counter.dataset.animated) {
                            animateCount(counter);
                            counter.dataset.animated = "true";
                        };
                    };
                });
            }, {
                threshold: 0.3
            });

            counters.forEach(counter => observer.observe(counter));
});