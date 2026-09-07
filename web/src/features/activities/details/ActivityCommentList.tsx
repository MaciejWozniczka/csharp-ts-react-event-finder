import { Box, Typography } from "@mui/material";
import type { DemoComment } from "../../../lib/types/demoCommunity";
import ActivityCommentItem from "./ActivityCommentItem";

export default function ActivityCommentList({
  comments,
  authorName,
  onDelete,
}: {
  comments: DemoComment[];
  authorName: string;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
        Komentarze ({comments.length})
      </Typography>
      {!comments.length ? (
        <Box sx={{ p: 3, bgcolor: "primary.light", borderRadius: 3 }}>
          <Typography sx={{ fontWeight: 700 }}>Zacznij rozmowę</Typography>
          <Typography variant="body2" color="text.secondary">
            Jeszcze nie ma komentarzy. Twój może być pierwszy.
          </Typography>
        </Box>
      ) : (
        <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
          {comments.map((comment) => (
            <ActivityCommentItem
              key={comment.id}
              comment={comment}
              authorName={authorName}
              onDelete={onDelete}
            />
          ))}
        </Box>
      )}
    </>
  );
}
