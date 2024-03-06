import { Metadata } from "next"

export function constructMetadata({
  title = "Collab Board - Ultimate collaboration",
  description = "Collab Board is a real-time collaborative whiteboard for teams. Draw, write, and brainstorm together in real-time.",
  image = "/meta.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://collabboardx.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
