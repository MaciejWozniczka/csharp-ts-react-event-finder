import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add,
  ExploreOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Link } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 76, sm: 88 },
            flexWrap: "wrap",
            gap: 2,
            py: 1.5,
          }}
        >
          <Box
            component={Link}
            to="/"
            aria-label="Event Finder, strona główna"
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              mr: "auto",
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            <ExploreOutlined sx={{ fontSize: 32 }} />
            <Typography
              component="span"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              event finder<span style={{ color: "#a75035" }}>.</span>
            </Typography>
          </Box>
          <Box
            component="nav"
            aria-label="Nawigacja główna"
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 2 },
              alignItems: "center",
              width: { xs: "100%", sm: "auto" },
              justifyContent: "space-between",
            }}
          >
            <MenuItemLink to="/activities">Odkrywaj</MenuItemLink>
            <Button
              component={Link}
              to="/activities/create"
              variant="contained"
              startIcon={<Add />}
              sx={{
                px: { xs: 1.5, sm: 2.5 },
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              Dodaj wydarzenie
            </Button>
            <Tooltip title="Mój profil">
              <IconButton
                component={Link}
                to="/profiles/maciej"
                aria-label="Mój profil"
                color="primary"
                sx={{ minWidth: 44, minHeight: 44 }}
              >
                <AccountCircleOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
