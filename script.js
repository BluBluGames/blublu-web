const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const galleryItems = Array.from(document.querySelectorAll("[data-lightbox-item]"));
const lightbox = document.querySelector("#lightbox");

if (lightbox && galleryItems.length > 0) {
  const image = lightbox.querySelector("[data-lightbox-image]");
  const avifSource = lightbox.querySelector("[data-lightbox-avif]");
  const webpSource = lightbox.querySelector("[data-lightbox-webp]");
  const title = lightbox.querySelector("[data-lightbox-title]");
  const category = lightbox.querySelector("[data-lightbox-category]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let currentIndex = 0;

  // The dialog is capped at min(96vw, 1000px), so 2000px is everything a 2x
  // display can resolve and the 1280w file the grid already cached covers 1x.
  // The full-size masters are never served.
  const LIGHTBOX_SIZES = "min(96vw, 1000px)";
  const widths = [1280, 2000];
  const srcsetFor = (stem, ext) =>
    widths.map((w) => `${stem}-${w}.${ext} ${w}w`).join(", ");

  const renderItem = (index) => {
    const item = galleryItems[index];

    if (!item || !image || !title || !category) {
      return;
    }

    const stem = item.dataset.stem || "";

    if (stem) {
      // Sources first: the <img> re-runs source selection when these change,
      // and setting them after src would download the fallback needlessly.
      if (avifSource) {
        avifSource.sizes = LIGHTBOX_SIZES;
        avifSource.srcset = srcsetFor(stem, "avif");
      }
      if (webpSource) {
        webpSource.sizes = LIGHTBOX_SIZES;
        webpSource.srcset = srcsetFor(stem, "webp");
      }
      image.sizes = LIGHTBOX_SIZES;
      image.srcset = srcsetFor(stem, "webp");
      image.src = `${stem}-1280.webp`;
    }

    image.alt = item.querySelector("img")?.alt || "";
    title.textContent = item.dataset.caption || "";
    category.textContent = item.dataset.category || "";
    currentIndex = index;
  };

  const openLightbox = (index) => {
    renderItem(index);
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
    closeButton?.focus();
  };

  const closeLightbox = () => {
    if (lightbox.open) {
      lightbox.close();
    }
    document.body.classList.remove("lightbox-open");
  };

  const goNext = () => {
    renderItem((currentIndex + 1) % galleryItems.length);
  };

  const goPrev = () => {
    renderItem((currentIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  prevButton?.addEventListener("click", goPrev);
  nextButton?.addEventListener("click", goNext);
  closeButton?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeLightbox();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }

    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}
