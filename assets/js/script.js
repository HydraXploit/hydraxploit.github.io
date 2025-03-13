document.addEventListener("DOMContentLoaded", function () {
    const projects = [];

    const blogs = [
        {
            title: "Tech&Meet: Belgian Cyber Command (CyCom)",
            description: [
                "On November 12, 2024, I attended a Tech&Meet session at Howest University of Applied Sciences, where Lieutenant Colonel Gunther Godefridis from the Belgian Cyber Command (CyCom) gave an in-depth presentation about their role in national cybersecurity. The session covered CyCom’s mission, structure, and how they contribute to Belgium’s digital defense.",
                "Lieutenant Colonel Godefridis, with over 30 years of military experience, broke down CyCom’s responsibilities—covering cyber defense, intelligence gathering, and digital threat mitigation. While a lot of the operational details were classified, he emphasized their partnerships with key institutions like the Cyber Security Centre of Belgium and law enforcement agencies, reinforcing how crucial collaboration is in national cyber resilience.",
                "One part that really caught my attention was the strict process of obtaining a top-secret security clearance. It’s not just the individual getting checked—they dig into your background, your family, and probably even that one dodgy Facebook post from ten years ago. It makes sense given the sensitivity of their work, but still, it's intense.",
                "Then came the recruitment pitch—probably the strongest part of the presentation. CyCom made it very clear they’re actively looking for skilled professionals, whether as a civilian specialist, reservist, or full-time career soldier. And honestly, the way they presented it? It was convincing. I found myself thinking, 'What if I actually joined?' The mission, the responsibilities, the sheer impact of their work—it really made me reflect on what a career in military cybersecurity would be like.",
                "Overall, this Tech&Meet wasn’t just informative—it was genuinely engaging. Hearing directly from those operating at the national level in cybersecurity gave a whole new perspective on the field. It reinforced just how critical cybersecurity is in modern defense and left me with even more curiosity about military cyber operations. Definitely one of those events that sticks with you."
            ],
            images: [
                "./assets/images/CyCom_1.jpg",
                "./assets/images/CyCom_2.jpg"
            ]
        }
    ];

    function generateList(items, containerId, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        items.forEach(item => {
            const div = document.createElement("div");
            div.classList.add(type === "project" ? "project-item" : "blog-item");
            div.innerHTML = `<h3>${item.title}</h3><p>${item.description[0]}</p>`;
            div.addEventListener("click", () => openOverlay(item));
            container.appendChild(div);
        });
    }

    function openOverlay(item) {
        const overlay = document.getElementById("overlay");
        const overlayContent = document.querySelector(".overlay-content");

        document.getElementById("overlay-title").innerText = item.title;

        const textContainer = document.getElementById("overlay-text");
        textContainer.innerHTML = "";
        item.description.forEach(para => {
            const p = document.createElement("p");
            p.innerText = para;
            textContainer.appendChild(p);
        });

        const galleryContainer = document.getElementById("overlay-gallery");
        galleryContainer.innerHTML = "";
        item.images.forEach(imgSrc => {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = `${item.title} image`;
            img.classList.add("gallery-img");
            img.addEventListener("click", () => openImageFullScreen(imgSrc));
            galleryContainer.appendChild(img);
        });

        overlay.style.display = "flex";

        overlay.addEventListener("click", (event) => {
            if (!overlayContent.contains(event.target)) {
                closeOverlay();
            }
        });
    }

    function closeOverlay() {
        document.getElementById("overlay").style.display = "none";
    }

    function openImageFullScreen(src) {
        const overlayImage = document.createElement("div");
        overlayImage.classList.add("fullscreen-overlay");
        overlayImage.innerHTML = `<img src="${src}" class="fullscreen-img"><span class="close-img-btn" onclick="this.parentElement.remove()">&times;</span>`;

        document.body.appendChild(overlayImage);

        overlayImage.addEventListener("click", (event) => {
            if (event.target === overlayImage) {
                overlayImage.remove();
            }
        });
    }

    document.querySelector(".close-btn").addEventListener("click", closeOverlay);

    generateList(projects, "project-list", "project");
    generateList(blogs, "blog-list", "blog");
});
