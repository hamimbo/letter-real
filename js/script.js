const local_dev_cors_message = `<br><br><strong>Possible Fixes:</strong><br>This might be a problem with <i>CORS</i> policy...`;

const md = window.markdownit({ html: true });
let pages = [];
let currentPage = 0;

function loadMessage() {
    fetch("message.txt")
        .then(res => res.text())
        .then(data => {
            const content = md.render(data);
            const pageSplit = content.split('<hr>');
            pages = pageSplit;
            renderPage(0);
            if (pages.length > 1) {
                document.getElementById("next-btn").classList.remove("hidden");
            }
        })
        .catch(err => {
            document.getElementById("message").innerHTML = `Error: ${err}<br>${local_dev_cors_message}`;
        });
}

function renderPage(index) {
    const msg = document.getElementById("message");
    msg.innerHTML = pages[index];
    msg.classList.add("page-flip");
    setTimeout(() => msg.classList.remove("page-flip"), 600);
}

document.addEventListener("DOMContentLoaded", () => {
    const heart = document.getElementById("solid-heart");
    const container = document.getElementById("message-container");
    const nextBtn = document.getElementById("next-btn");
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("flap");

    let isOpen = false;

    loadMessage();

    // Handle envelope and message toggling
    heart.addEventListener("click", () => {
        if (!isOpen) {
            envelope.classList.add("envelope-open");
            flap.classList.add("flap-open");
            container.classList.remove("hidden", "fold-out");
            container.classList.add("fold-in", "flex");
        } else {
            envelope.classList.add("envelope-close");
            flap.classList.remove("flap-open");
            container.classList.remove("fold-in");
            container.classList.add("fold-out");
            setTimeout(() => {
                container.classList.add("hidden");
                container.classList.remove("flex");
                envelope.classList.remove("envelope-close");
            }, 1000);
        }
        isOpen = !isOpen;
    });

    nextBtn.addEventListener("click", () => {
        currentPage = (currentPage + 1) % pages.length;
        renderPage(currentPage);
    });
});
