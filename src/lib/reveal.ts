const loaded = (img: HTMLImageElement | null) =>
  !img || img.complete
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });

const reveal = (el: Element) => {
  const img = el instanceof HTMLImageElement ? el : el.querySelector("img");
  loaded(img).then(() => requestAnimationFrame(() => el.classList.add("is-revealed")));
};

const observe = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "100000px 0px -8% 0px" },
  );
  document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
};

export const startReveal = (firstImage: HTMLImageElement | null) => {
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 2500));
  Promise.race([Promise.all([loaded(firstImage), document.fonts.ready]), timeout]).then(() => setTimeout(observe, 150));
};
