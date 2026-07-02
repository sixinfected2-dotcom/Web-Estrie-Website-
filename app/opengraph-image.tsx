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
          background: "#FAF6F0",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#575046",
          }}
        >
          Agence web · Estrie
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#211C16",
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
            borderTop: "1px solid #E6DED2",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 36, color: "#211C16" }}>
            Web Estrie<span style={{ color: "#4E4639" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#575046" }}>
            webestrie.ca
          </div>
        </div>
      </div>
    ),
    size,
  );
}
