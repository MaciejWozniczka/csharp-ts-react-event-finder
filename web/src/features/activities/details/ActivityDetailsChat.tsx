import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Avatar,
} from "@mui/material";
import { Link } from "react-router";

export default function ActivityDetailsChat() {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "primary.main",
          color: "white",
          padding: 2,
        }}
      >
        <Typography variant="h6">Dyskutuj na temat wydarzenia</Typography>
      </Box>
      <Card>
        <CardContent>
          <div>
            <form>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Wpisz swój komentarz (Enter by zatwierdzić, SHIFT + Enter by przejść do nowej linii)"
              />
            </form>
          </div>

          <Box>
            <Box sx={{ display: "flex", my: 2 }}>
              <Avatar
                src={"/images/user.png"}
                alt={"user image"}
                sx={{ mr: 2 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Typography
                    component={Link}
                    to={`/profiles/username`}
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    Maciej
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    2 godziny temu
                  </Typography>
                </Box>

                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  Komentarze
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
