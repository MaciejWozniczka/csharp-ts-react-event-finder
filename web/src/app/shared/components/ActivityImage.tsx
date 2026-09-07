import { Box, type SxProps, type Theme } from "@mui/material";
import { categoryImage } from "../../utils/categories";

export default function ActivityImage({
  category,
  sx,
  eager = false,
}: {
  category: string;
  sx?: SxProps<Theme>;
  eager?: boolean;
}) {
  return (
    <Box
      component="img"
      src={categoryImage(category)}
      alt={`Ilustracja kategorii: ${category}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(event) => {
        const img = event.currentTarget;
        if (!img.src.endsWith("/images/placeholder.png"))
          img.src = "/images/placeholder.png";
      }}
      sx={[
        { display: "block", width: "100%", height: "100%", objectFit: "cover" },
        ...(Array.isArray(sx) ? sx : [sx ?? {}]),
      ]}
    />
  );
}
