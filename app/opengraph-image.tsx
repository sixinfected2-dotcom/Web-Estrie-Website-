import { ImageResponse } from "next/og";

export const alt =
  "Web Estrie — Des sites web sur mesure pour les entreprises de l'Estrie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FBF5EE",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#5C5045",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              background: "#A6512E",
            }}
          />
          Agence web · Estrie
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: "-0.026em",
            color: "#241A12",
            maxWidth: 980,
          }}
        >
          On bâtit des sites que vos clients ont envie d&rsquo;utiliser.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E8DCCB",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 36, color: "#241A12" }}>
            Web Estrie<span style={{ color: "#A6512E" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5C5045" }}>
            webestrie.ca
          </div>
        </div>
      </div>
    ),
    size,
  );
}
