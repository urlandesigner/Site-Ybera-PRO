"use client";

import { useEffect } from "react";

function scrollBehaviorForUser(): ScrollBehavior {
  if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
    return "smooth";
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: scrollBehaviorForUser(), block: "start" });
  return true;
}

/**
 * Garante scroll animado em âncoras (#id) no mesmo documento.
 * CSS `scroll-behavior` nem sempre dispara com o fluxo do App Router / runtime.
 */
export function SmoothAnchorScroll() {
  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target;
      if (!(target instanceof Node)) return;

      const anchor = (target as Element).closest?.("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      let hash = "";
      if (raw.startsWith("#")) {
        hash = raw.slice(1);
      } else {
        let url: URL;
        try {
          url = new URL(raw, window.location.href);
        } catch {
          return;
        }
        if (url.origin !== window.location.origin) return;
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          return;
        }
        hash = url.hash.startsWith("#") ? url.hash.slice(1) : "";
      }

      if (!hash) return;

      const id = decodeURIComponent(hash);
      if (!scrollToId(id)) return;

      e.preventDefault();
      const nextHash = `#${encodeURIComponent(id)}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  /** Carga inicial: sem fragmento na URL, evita scroll restaurado pelo browser / hidratação indo para o meio da página. */
  useEffect(() => {
    const raw = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    const id = raw ? decodeURIComponent(raw) : "";

    if (!id) {
      const prevRestore = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        innerRaf = requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          window.history.scrollRestoration = prevRestore;
        });
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        cancelAnimationFrame(innerRaf);
        window.history.scrollRestoration = prevRestore;
      };
    }

    const raf = requestAnimationFrame(() => {
      scrollToId(id);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
