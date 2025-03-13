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
        },
        {
            title: "Tech&Meet: Hack The Holidays - Insights from Belgium's Top Ethical Hacker",
            description: [
                "On December 17, 2024, I attended a Tech&Meet session at Howest University of Applied Sciences, featuring Robbe Verwilghen, a distinguished alumnus and renowned ethical hacker. Robbe, who hails from Lebbeke, earned the prestigious title of 'Ethical Government Hacker of 2024,' securing a highly sought-after SANS training course and GIAC certification, valued at over €10,000. Alongside this achievement, he humorously embraced the title 'The Dupe King' for reporting the highest number of duplicate findings during the competition.",
                "Robbe shared his experiences participating in Belgium’s government hacking tournament, 'Hack The Government,' where ethical hackers were invited to test the security of government systems. Due to the classified nature of the findings, he couldn’t disclose specific vulnerabilities he uncovered, but he offered valuable insights into his approach. His key takeaway? 'Act dumb and click on everything'—a phrase that, in the world of ethical hacking, underscores the importance of thinking outside the box and exploring unexpected attack vectors.",
                "Beyond competition strategies, Robbe walked us through his journey in cybersecurity, from bug bounty hunting to becoming a QA engineer and penetration tester. His work with Intigriti, a leading European cybersecurity firm, provided fascinating insights into real-world security testing, payload crafting, and methodologies like SQL injection. He also shared useful resources and scripts for testing vulnerabilities, helping attendees gain a better understanding of how ethical hackers analyze and secure digital systems.",
                "Despite the limitations on discussing classified details, Robbe managed to deliver an engaging and insightful session. His energy and passion for cybersecurity were evident, making it clear why he’s one of Belgium’s top ethical hackers. The event reinforced the importance of ethical hacking in strengthening national security and highlighted the opportunities available in this field for those willing to dive deep into the world of cybersecurity.",
                "Overall, this Tech&Meet session was both inspiring and informative. Hearing firsthand from someone who has actively contributed to securing government infrastructure was an incredible experience. Robbe’s journey is proof that curiosity, persistence, and a hacker mindset can open doors to exciting and impactful careers in cybersecurity."
            ],
            images: [
                "./assets/images/HackTheHolidays_1.jpg"
            ]
        }
    ];

    function generateList(items, containerId, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        items.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add(type === "project" ? "project-item" : "blog-item");
            div.innerHTML = `<h3>${item.title}</h3><p>${item.description[0]}</p>`;
            div.addEventListener("click", () => openOverlay(item, index, type));
            container.appendChild(div);
        });
    }

    function openOverlay(item, index, type) {
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
        overlayImage.innerHTML = `
            <img src="${src}" class="fullscreen-img">
            <span class="close-img-btn" onclick="this.parentElement.remove()">&times;</span>
        `;

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