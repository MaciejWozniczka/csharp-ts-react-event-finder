import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircleOutlined, Group } from "@mui/icons-material";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#064426",
        color: "#f1f7f2",
        borderBottom: "1px solid rgba(222, 240, 226, 0.16)",
        boxShadow: "0 4px 16px rgba(0, 49, 19, 0.10)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 72, sm: 80 },
            flexWrap: "wrap",
            gap: { xs: 1, sm: 2 },
            py: { xs: 1.5, sm: 1 },
          }}
        >
          <MenuItemLink
            to="/"
            sx={{
              px: 0.5,
              gap: 1.25,
              mr: "auto",
              "&.active": { backgroundColor: "transparent" },
            }}
          >
            <Group sx={{ fontSize: 30, color: "#f5c66b" }} />
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.45rem" },
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
            >
              Event Finder
            </Typography>
          </MenuItemLink>
          <Box
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              order: { xs: 3, md: 0 },
              width: { xs: "100%", md: "auto" },
              borderTop: {
                xs: "1px solid rgba(222, 240, 226, 0.16)",
                md: "none",
              },
              pt: { xs: 1, md: 0 },
            }}
          >
            <MenuItemLink to="/activities">Aktywności</MenuItemLink>
            <MenuItemLink to="/activities/create">
              Utwórz aktywność
            </MenuItemLink>
          </Box>
          <Button
            color="inherit"
            startIcon={<AccountCircleOutlined />}
            sx={{
              minHeight: 44,
              px: 1.5,
              ml: { md: 1 },
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "rgba(240, 250, 243, 0.10)" },
            }}
          >
            Użytkownik
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
