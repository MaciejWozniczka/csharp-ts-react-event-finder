import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteOutlined,
  ForumOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { Link } from "react-router";
import { useDemoCommunity } from "../../../lib/hooks/useDemoCommunity";
import { formatActivityDate } from "../../../app/utils/formatDate";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";

export default function ActivityDetailsChat({
  activityId,
}: {
  activityId: string;
}) {
  const { profile, comments, addComment, deleteComment } = useDemoCommunity();
  const [body, setBody] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const activityComments = comments.filter(
    (comment) => comment.activityId === activityId,
  );
  const submit = () => {
    if (!body.trim() || body.trim().length > 2000) return;
    if (!addComment(activityId, body)) {
      setError(true);
      setMessage("");
      return;
    }
    setBody("");
    setError(false);
    setMessage("Komentarz został dodany.");
  };

  return (
    <Box
      component="section"
      aria-labelledby="comments-heading"
      sx={{ borderTop: 1, borderColor: "divider", pt: 3 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <ForumOutlined color="primary" />
        <Typography component="h2" variant="h4" id="comments-heading">
          Porozmawiajmy o wydarzeniu
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Wersja demonstracyjna. Komentarze są widoczne tylko w tej przeglądarce.
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        sx={{ mb: 3 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Avatar
            src="/images/user.png"
            alt=""
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2">
            Piszesz jako{" "}
            <Link
              to="/profiles/maciej"
              style={{ color: "inherit", fontWeight: 700 }}
            >
              {profile.name}
            </Link>
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Twój komentarz"
          placeholder="Zadaj pytanie lub podziel się pomysłem…"
          multiline
          minRows={3}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setMessage("");
          }}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              (event.ctrlKey || event.metaKey) &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              submit();
            }
          }}
          helperText={`${body.length}/2000 znaków. Ctrl+Enter wysyła, Enter dodaje nową linię.`}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendOutlined />}
            disabled={!body.trim() || body.trim().length > 2000}
          >
            Dodaj komentarz
          </Button>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Nie udało się zapisać zmian w przeglądarce. Sprawdź dostęp do
          przechowywania danych i spróbuj ponownie.
        </Alert>
      )}
      <Typography
        role="status"
        variant="body2"
        color="primary.main"
        sx={{ mb: message ? 2 : 0 }}
      >
        {message}
      </Typography>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Komentarze ({activityComments.length})
      </Typography>
      {!activityComments.length ? (
        <Box sx={{ p: 3, bgcolor: "primary.light", borderRadius: 3 }}>
          <Typography sx={{ fontWeight: 700 }}>Zacznij rozmowę</Typography>
          <Typography variant="body2" color="text.secondary">
            Jeszcze nie ma komentarzy. Twój może być pierwszy.
          </Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
          {activityComments.map((comment) => (
            <Box
              component="li"
              key={comment.id}
              sx={{
                display: "flex",
                gap: 1.5,
                py: 2.5,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Avatar
                component={Link}
                to="/profiles/maciej"
                aria-label={`Profil: ${profile.name}`}
                src="/images/user.png"
                sx={{ width: 36, height: 36 }}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  component={Link}
                  to="/profiles/maciej"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    textDecoration: "none",
                    overflowWrap: "anywhere",
                  }}
                >
                  {profile.name}
                </Typography>
                <Typography
                  component="time"
                  dateTime={comment.createdAt}
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  {formatActivityDate(comment.createdAt)}
                </Typography>
                <Typography
                  sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
                >
                  {comment.body}
                </Typography>
              </Box>
              <Tooltip title="Usuń komentarz">
                <IconButton
                  aria-label="Usuń komentarz"
                  onClick={() => setDeleting(comment.id)}
                  sx={{ width: 44, height: 44 }}
                >
                  <DeleteOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
        </Box>
      )}
      <ConfirmDialog
        open={!!deleting}
        title="Usunąć komentarz?"
        message="Komentarz zostanie usunięty z tej przeglądarki. Tej zmiany nie można cofnąć."
        confirmText="Usuń komentarz"
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting && deleteComment(deleting)) {
            setError(false);
            setMessage("Komentarz został usunięty.");
          } else setError(true);
          setDeleting(null);
        }}
      />
    </Box>
  );
}
