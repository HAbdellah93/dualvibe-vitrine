/* =================================================================
   DUALVIBE — SCRIPT.JS
   Deux responsabilités seulement :
   1. Faire apparaître les blocs ".fade-in" au scroll (IntersectionObserver)
   2. Gérer le header sticky (fond transparent -> fond plein) + menu mobile
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------------
     1. APPARITION AU SCROLL
     Chaque élément portant la classe .fade-in reçoit .is-visible
     dès qu'il entre dans le viewport. On n'observe qu'une fois
     (unobserve) pour ne pas re-déclencher l'animation en boucle.
     ------------------------------------------------------------- */
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      // Se déclenche un peu avant que l'élément n'atteigne le bas du viewport
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15,
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));


  /* -------------------------------------------------------------
     2. HEADER STICKY — bascule de style au scroll
     Le header reste transparent tant qu'on est dans le hero,
     puis prend un fond plein dès qu'on le dépasse.
     ------------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const hero = document.getElementById("hero");

  if (header && hero) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Tant que le hero est visible à l'écran, le header reste transparent
          header.classList.toggle("is-scrolled", !entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px", // se déclenche juste après la hauteur du header
      }
    );

    headerObserver.observe(hero);
  }


  /* -------------------------------------------------------------
     3. MENU MOBILE — ouverture / fermeture du burger
     ------------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Ferme le menu automatiquement quand on clique sur un lien
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

});