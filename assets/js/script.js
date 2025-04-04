document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            title: "Building My Own Cybersecurity Blog & Portfolio",
            description: [
                "A central place to share my cybersecurity journey, document experiences, and highlight personal projects was something I always wanted. So, I built my own website. A platform where I can write about the competitions I’ve participated in, the events I’ve attended, and the projects I’m working on.",
                "The design is centered around a dark, neon-infused theme—fitting for a cybersecurity-focused space and perfectly complementing my logo. Every element was selected to reflect the aesthetics of ethical hacking and digital security. The site includes a dedicated blog section for in-depth write-ups on competitions like the Cyber Security Challenge Belgium, Tech&Meet sessions, and other cybersecurity topics. Additionally, there's a project section where I can showcase my work and developments.",
                "For the technical side, I kept it simple yet functional. The site is built using plain HTML, CSS, and JavaScript — no unnecessary frameworks, just a lightweight, efficient setup. The UI features smooth dynamic overlays to display blog posts and projects without clutter, maintaining a clean user experience. Everything is fully responsive, ensuring it looks sharp and works seamlessly across both desktop and mobile devices.",
                "Having my own platform gives me the flexibility to shape it however I want and evolve it over time. Whether it's writing about cybersecurity, sharing insights, or presenting future projects, this website serves as the foundation for it all.",
            ],
            socials: [
                {
                    platform: "GitHub",
                    link: "https://www.github.com/HydraXploit/hydraxploit.github.io",
                    icon: "./assets/images/github.ico",
                    tooltip: "Webpage source code on GitHub"
                }
            ]
        }
    ];
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
        },
        {
            "title": "Cyber Security Challenge Belgium 2025: The Avalanche Experience",
            "description": [
                "On March 14-15, 2025, I participated in the Cyber Security Challenge Belgium (CSCBE) as part of Team Avalanche. This competition brings together students from all over the country to test their cybersecurity skills in a high-pressure, Capture The Flag (CTF)-style event. The goal? Solve as many challenges as possible within the given time and rank as high as possible on the leaderboard.",
                "The qualifier rounds threw a mix of categories at us, ranging from reverse engineering, networking, cryptography, web exploitation, forensic analysis, to even some trivia questions. Each challenge was a puzzle waiting to be cracked—some were straightforward, while others were downright brutal. There were moments where we were on a roll, solving back-to-back challenges, and others where we were stuck for hours. Classic CTF experience.",
                "Team Avalanche finished in 133rd place. Sure, we didn’t advance to the finals, but that didn’t take away from the experience. The thrill of working under pressure, the rush of finally solving a challenge after a struggle, and the sheer excitement of competing against some of the best student hackers in Belgium made it all worth it.",
                "Overall, CSCBE 2025 was a solid experience—frustrating at times, exhilarating at others, but absolutely worth it. It reinforced my love for cybersecurity, taught me a lot about problem-solving under pressure, and left me more motivated than ever to level up my skills for the next big challenge. Team Avalanche might not have made it to the finals this year, but next time? We’re coming back stronger."
            ],
            "images": [
                "./assets/images/CSCBE2025_Scoreboard.jpg"
            ]
        }
    ];

    function generateList(items, containerId, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = "";

        if (items.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.classList.add("empty-message");
            emptyMessage.innerText = type === "project" ? "No projects available yet." : "No blog posts available yet.";
            container.appendChild(emptyMessage);
            return;
        }

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

        const socialsContainer = document.getElementById("overlay-socials");
        socialsContainer.innerHTML = "";
        if (item.socials && item.socials.length > 0) {
            item.socials.forEach(social => {
                const a = document.createElement("a");
                a.href = social.link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.classList.add("social-icon-container");

                const img = document.createElement("img");
                img.src = social.icon;
                img.alt = `${social.platform} icon`;
                img.classList.add("social-icon");

                a.appendChild(img);

                if (social.tooltip) {
                    const tooltip = document.createElement("span");
                    tooltip.classList.add("tooltip");
                    tooltip.innerText = social.tooltip;

                    a.appendChild(tooltip);
                };

                socialsContainer.appendChild(a);
            });
        };

        const galleryContainer = document.getElementById("overlay-gallery");
        galleryContainer.innerHTML = "";
        if (item.images && item.images.length > 0) {
            item.images.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = `${item.title} image`;
                img.classList.add("gallery-img");
                img.addEventListener("click", () => openImageFullScreen(imgSrc));
                galleryContainer.appendChild(img);
            });
        };

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