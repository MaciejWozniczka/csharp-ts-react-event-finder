import { Box, type SxProps, type Theme } from "@mui/material";
import { NavLink } from "react-router";

export default function MenuItemLink({
  children,
  to,
  sx = [],
}: {
  children: React.ReactNode;
  to: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      component={NavLink}
      to={to}
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          minHeight: 44,
          px: 2,
          borderRadius: 2,
          fontSize: "0.95rem",
          fontWeight: 600,
          textDecoration: "none",
          whiteSpace: "nowrap",
          color: "inherit",
          transition: "background-color 180ms ease-out",
          "&:hover": { backgroundColor: "rgba(240, 250, 243, 0.10)" },
          "&:focus-visible": { outline: "2px solid #f5c66b", outlineOffset: 3 },
          "&.active": {
            backgroundColor: "rgba(240, 250, 243, 0.16)",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
