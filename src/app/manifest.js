export default function manifest() {
  return {
    name: "تحضير مسابقة المعلمين",
    short_name: "Morshid Eni",
    description: "تطبيق تحضير مسابقة المعلمين في الرياضيات",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg",
        purpose: "any maskable"
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg",
        purpose: "any maskable"
      }
    ]
  };
}