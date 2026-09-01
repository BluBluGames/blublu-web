const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const galleryItems = Array.from(document.querySelectorAll("[data-lightbox-item]"));
const lightbox = document.querySelector("#lightbox");

if (lightbox && galleryItems.length > 0) {
  const image = lightbox.querySelector("[data-lightbox-image]");
  const title = lightbox.querySelector("[data-lightbox-title]");
  const category = lightbox.querySelector("[data-lightbox-category]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const prevButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let currentIndex = 0;

  const renderItem = (index) => {
    const item = galleryItems[index];

    if (!item || !image || !title || !category) {
      return;
    }

    const full = item.dataset.full || "";
    const thumb = item.dataset.thumb || "";

    // The lightbox is capped at 1000px wide, which the cached 1280w thumbnail already
    // covers on a 1x display. Offering both lets the browser skip the multi-megabyte
    // original unless the screen is dense enough to actually resolve it.
    if (thumb && full) {
      image.sizes = "min(96vw, 1000px)";
      image.srcset = thumb + " 1280w, " + full + " 2400w";
    } else {
      image.removeAttribute("srcset");
    }

    image.src = full || thumb;
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
