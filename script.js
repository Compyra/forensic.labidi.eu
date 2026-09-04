/* forensic.labidi.eu - theme toggle, scroll reveal, copy buttons */
(function () {
    "use strict";

    var root = document.documentElement;

    /* Theme toggle (initial theme is applied inline in <head>) */
    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
        var syncPressed = function () {
            toggle.setAttribute("aria-pressed", root.dataset.theme === "light" ? "true" : "false");
        };
        syncPressed();
        toggle.addEventListener("click", function () {
            var next = root.dataset.theme === "light" ? "dark" : "light";
            root.dataset.theme = next;
            try { localStorage.setItem("theme", next); } catch (e) { }
            syncPressed();
        });
    }

    /* Reveal on scroll */
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealed = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
        root.classList.add("no-anim");
        revealed.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        revealed.forEach(function (el) { io.observe(el); });
    }

    /* Copy hash buttons */
    document.querySelectorAll(".copy-btn[data-copy]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var text = btn.getAttribute("data-copy");
            var done = function () {
                var prevLabel = btn.getAttribute("aria-label");
                btn.setAttribute("aria-label", "Copied");
                btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg>';
                setTimeout(function () {
                    btn.setAttribute("aria-label", prevLabel);
                    btn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-copy"></use></svg>';
                }, 1600);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, function () { });
            } else {
                var ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand("copy"); done(); } catch (e) { }
                document.body.removeChild(ta);
            }
        });
    });

    /* Footer year */
    var year = document.getElementById("year");
    if (year) { year.textContent = String(new Date().getFullYear()); }
})();
