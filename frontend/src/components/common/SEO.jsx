import { useEffect } from "react";

/**
 * Sets document.title + the meta description tag for the current page.
 * Each original .html file had its own <title>/<meta name="description">;
 * since this is now a single-page app, we apply them per-route on mount.
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
