import { ArrowForward, NorthEast } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { categories } from "../../../app/utils/categories";
import ActivityImage from "../../../app/shared/components/ActivityImage";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          gap: { xs: 4, md: 7 },
          pt: { xs: 1, md: 3 },
          pb: { xs: 5, md: 8 },
        }}
      >
        <Box>
          <Typography variant="overline" color="secondary.main">
            Mniej scrollowania. Więcej spotkań.
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mt: 2,
              fontSize: { xs: "2.7rem", sm: "3.5rem", md: "4rem" },
              maxWidth: "12ch",
            }}
          >
            Znajdź swój sposób na dobry czas.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ my: 3, maxWidth: "43ch", fontSize: "1.1rem" }}
          >
            Kameralny koncert, spacer czy wspólne gotowanie? Odkryj wydarzenia,
            dla których warto wyjść z domu.
          </Typography>
          <Button
            component={Link}
            to="/activities"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
          >
            Odkryj wydarzenia
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Wybierz to, co lubisz. Zaplanuj coś dla siebie.
          </Typography>
        </Box>
        <Box sx={{ position: "relative", pb: 3, pl: { xs: 0, sm: 3 } }}>
          <Box
            sx={{
              height: { xs: 280, sm: 390, md: 460 },
              borderRadius: "100px 24px 24px 24px",
              overflow: "hidden",
            }}
          >
            <ActivityImage category="Towarzyskie" eager />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              p: { xs: 2, sm: 2.5 },
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 3,
              maxWidth: "85%",
            }}
          >
            <Typography variant="h5" component="p">
              Najlepsze plany? Wspólne.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Nowe miejsca, znajome pasje, ciekawi ludzie.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ borderTop: 1, borderColor: "divider", pt: 4 }}>
        <Typography variant="overline" color="text.secondary">
          Zacznij od tego, co lubisz
        </Typography>
        <Typography variant="h3" component="h2" sx={{ mt: 0.5, mb: 3 }}>
          Na co masz ochotę?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(6, 1fr)",
            },
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <Box
              key={category}
              component={Link}
              to={`/activities?category=${encodeURIComponent(category)}`}
              sx={{
                color: "text.primary",
                textDecoration: "none",
                minWidth: 0,
                "&:hover img": { transform: "scale(1.04)" },
              }}
            >
              <Box
                sx={{
                  height: 135,
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 1.5,
                }}
              >
                <ActivityImage
                  category={category}
                  sx={{ transition: "transform 200ms ease-out" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>{category}</Typography>
                <NorthEast sx={{ fontSize: 18, color: "text.secondary" }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
