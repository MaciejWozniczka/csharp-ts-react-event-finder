import { Box, type SxProps, type Theme } from "@mui/material";
import { NavLink } from "react-router";
import type { ReactNode } from "react";

export default function MenuItemLink({
  children,
  to,
  sx = [],
}: {
  children: ReactNode;
  to: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      component={NavLink}
      to={to}
      end
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          minHeight: 44,
          px: 1.5,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: 700,
          textDecoration: "none",
          color: "text.secondary",
          "&:hover": { bgcolor: "primary.light", color: "primary.main" },
          "&.active": { color: "primary.main", bgcolor: "primary.light" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
