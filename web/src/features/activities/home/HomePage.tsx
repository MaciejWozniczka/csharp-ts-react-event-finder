import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ mt: { xs: 3, md: 5 } }}>
      <Typography variant="h3" component="h1" sx={{ mb: 0.75 }}>
        Strona Główna
      </Typography>
    </Container>
  );
}
