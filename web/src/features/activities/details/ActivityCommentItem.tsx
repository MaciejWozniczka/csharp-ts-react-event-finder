import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { Link } from "react-router";
import { formatDate } from "../../../app/utils/formatDate";
import type { DemoComment } from "../../../lib/types/demoCommunity";

export default function ActivityCommentItem({
  comment,
  authorName,
  onDelete,
}: {
  comment: DemoComment;
  authorName: string;
  onDelete: (id: string) => void;
}) {
  return (
    <Box
      component="li"
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
        aria-label={`Profil: ${authorName}`}
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
          {authorName}
        </Typography>
        <Typography
          component="time"
          dateTime={comment.createdAt.toISOString()}
          variant="body2"
          color="text.secondary"
          sx={{ display: "block", mb: 1 }}
        >
          {formatDate(comment.createdAt)}
        </Typography>
        <Typography sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
          {comment.body}
        </Typography>
      </Box>
      <Tooltip title="Usuń komentarz">
        <IconButton
          aria-label="Usuń komentarz"
          onClick={() => onDelete(comment.id)}
          sx={{ width: 44, height: 44 }}
        >
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
