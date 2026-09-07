import { useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { ForumOutlined } from "@mui/icons-material";
import { useDemoCommunity } from "../../../lib/hooks/useDemoCommunity";
import ConfirmDialog from "../../../app/shared/components/ConfirmDialog";
import ActivityCommentForm from "../forms/ActivityCommentForm";
import ActivityCommentList from "./ActivityCommentList";

export default function ActivityDetailsChat({
  activityId,
}: {
  activityId: string;
}) {
  const { profile, comments, addComment, deleteComment } = useDemoCommunity();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const activityComments = comments.filter(
    (comment) => comment.activityId === activityId,
  );
  const submit = (body: string) => {
    if (!addComment(activityId, body)) {
      setError(true);
      setMessage("");
      return false;
    }
    setError(false);
    setMessage("Komentarz został dodany.");
    return true;
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
      <ActivityCommentForm
        key={activityId}
        authorName={profile.name}
        onSubmit={submit}
        onChange={() => setMessage("")}
      />
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
      <ActivityCommentList
        comments={activityComments}
        authorName={profile.name}
        onDelete={setDeleting}
      />
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
