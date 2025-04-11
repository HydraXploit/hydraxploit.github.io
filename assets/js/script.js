document.addEventListener("DOMContentLoaded", () => {
    const $ = (id) => document.getElementById(id);
    const qs = (sel) => document.querySelector(sel);

    const content = $("content");
    const modal = $("modal-overlay");
    const modalTitle = $("modal-title");
    const modalBody = $("modal-body");
    const terminal = $("terminal");
    const terminalInput = $("terminal-input");
    const terminalOutput = $("terminal-output");

    const params = new URLSearchParams(window.location.search);
    let projects = [];
    let blogs = [];

    const pages = {};

    const commands = {
        help: () => logTerminal("Available commands:\nabout, projects, blog, open blog [n], open project [n], exit, whoami, clear"),
        about: () => navigate("about"),
        projects: () => navigate("projects"),
        blog: () => navigate("blog"),
        "open blog": (n) => !isNaN(n) && openModal("blog", n),
        "open project": (n) => !isNaN(n) && openModal("project", n),
        exit: () => toggleTerminal(),
        whoami: () => logTerminal("HydraXploit@Nidhogg:~$ Cybersecurity Enthusiast | Ethical Hacker"),
        clear: () => terminalOutput.innerHTML = ""
    };

    async function fetchData(file, store, type) {
        return fetch(`./data/${file}`)
            .then(res => res.json())
            .then(data => {
                store.push(...data);
                pages[type] = generateCards(data, type);
            })
            .catch(err => console.error(`Failed to fetch ${file}:`, err));
    }

    async function fetchContent() {
        await Promise.all([
            fetchData("projects.json", projects, "projects"),
            fetchData("blogs.json", blogs, "blog")
        ]);

        pages.about = `<h2>About HydraXploit</h2><p>Cybersecurity Enthusiast & Ethical Hacker. Passionate about understanding systems, exploring vulnerabilities, and staying deep in the digital shadows.</p>`;

        const projectIndexRaw = params.get("project") || params.get("projects");
        const blogIndexRaw = params.get("blog") || params.get("blogs");

        if (projectIndexRaw) {
            const index = parseInt(projectIndexRaw);
            if (!isNaN(index)) openModal("project", index);
        }

        if (blogIndexRaw) {
            const index = parseInt(blogIndexRaw);
            if (!isNaN(index)) openModal("blog", index);
        }
    }

    function navigate(section) {
        document.querySelectorAll(".nav-pane li").forEach(li => li.classList.remove("active"));
        qs(`.nav-pane li[data-section='${section}']`)?.classList.add("active");

        content.classList.add("fade-out");
        setTimeout(() => {
            if (section === "about") {
                typeAboutText(pages.about);
            } else {
                content.innerHTML = pages[section] || "<p>No content available.</p>";
            }
            content.classList.remove("fade-out");
            content.classList.add("fade-in");
        }, 300);
        setTimeout(() => content.classList.remove("fade-in"), 600);
    }
    window.navigate = navigate;

    function generateCards(items, type) {
        return `<div class="${type === 'projects' ? 'project-list' : 'blog-list'}">` +
            items.map((item, i) => `
                <div class="${type === 'projects' ? 'project-item' : 'blog-item'}" onclick="openModal('${type === 'projects' ? 'project' : 'blog'}', ${i})">
                    <h3>${item.title}</h3>
                    <p>${item.description[0]}</p>
                </div>`).join("") + "</div>";
    }

    window.openModal = function (type, index) {
        const array = type === "project" ? projects : blogs;
        const item = array[index];

        modal.classList.remove("fade-out", "hidden");
        modal.classList.add("fade-in");

        if (!item) {
            modalTitle.textContent = "Item Not Found";
            modalBody.innerHTML = `<p>This item doesn't exist. Maybe you typo'd the URL?</p>`;
            return;
        }

        modalTitle.textContent = item.title;
        let bodyHTML = item.description.map(p => `<p>${p}</p>`).join("");

        if (item.images?.length) {
            bodyHTML += `<div class="modal-gallery">` +
                item.images.map(src => `<img src="${src}" class="modal-img" alt="Image" />`).join("") +
                `</div>`;
        }

        const shareUrl = `${window.location.origin}${window.location.pathname}?${type}=${index}`;
        bodyHTML += `
            <div class="share-section">
                <button onclick="navigator.clipboard.writeText('${shareUrl}'); this.innerText='Copied!'">Share</button>
            </div>`;

        modalBody.innerHTML = bodyHTML;
        history.replaceState(null, "", shareUrl);
    };

    window.closeModal = () => {
        modal.classList.remove("fade-in");
        modal.classList.add("fade-out");
        setTimeout(() => modal.classList.add("hidden"), 250);
        history.replaceState(null, "", window.location.pathname);
    };

    modal.addEventListener("click", (e) => {
        if (e.target.id === "modal-overlay") closeModal();
    });

    window.toggleTerminal = () => {
        terminal.classList.toggle("hidden");
        if (!terminal.classList.contains("hidden")) terminalInput.focus();
    };

    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const input = terminalInput.value.trim();
            terminalInput.value = "";
            processCommand(input);
        } else if (e.key === "Tab") {
            e.preventDefault();
            const input = terminalInput.value.trim().toLowerCase();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) terminalInput.value = matches[0];
        }
    });

    terminal.addEventListener("click", () => terminalInput.focus());

    function logTerminal(text) {
        terminalOutput.innerHTML += text + "\n";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(input) {
        const lower = input.toLowerCase();
        logTerminal(`HydraXploit@Nidhogg:~$ ${input}`);

        if (commands[lower]) return commands[lower]();
        if (lower.startsWith("open blog")) return commands["open blog"](parseInt(lower.split(" ").pop()));
        if (lower.startsWith("open project")) return commands["open project"](parseInt(lower.split(" ").pop()));

        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(lower));
        if (matches.length === 1) logTerminal(`[Autocomplete] Suggest: ${matches[0]}`);
        else if (matches.length > 1) logTerminal(`[Multiple matches] ${matches.join(", ")}`);
        else logTerminal("Command not recognized.");
    }

    function typeAboutText(rawHtml) {
        const temp = document.createElement("div");
        temp.innerHTML = rawHtml;
        const h2 = temp.querySelector("h2")?.innerText || "";
        const p = temp.querySelector("p")?.innerText || "";
        content.innerHTML = `<h2>${h2}</h2><pre id="typewriter"></pre>`;
        const pre = $("typewriter");
        let i = 0;
        (function typeChar() {
            if (i < p.length) {
                pre.innerText += p.charAt(i);
                i++;
                setTimeout(typeChar, 15);
            }
        })();
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-img")) openFullscreenImage(e.target.src);
    });

    function openFullscreenImage(src) {
        const overlay = document.createElement("div");
        overlay.id = "fullscreen-img-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2000
        });

        const img = document.createElement("img");
        img.src = src;
        Object.assign(img.style, {
            maxWidth: "90%", maxHeight: "90%",
            borderRadius: "8px",
            boxShadow: "0 0 25px rgba(0,255,204,0.4)"
        });

        overlay.appendChild(img);
        overlay.addEventListener("click", () => overlay.remove());
        document.body.appendChild(overlay);
    }

    fetchContent();
    navigate("about");
});