"use client";

export default function HomePage() {
  if (typeof window !== "undefined")
    window.location.href =
      new URL(window.location.href).origin + "/deckbuilder/new";
}
