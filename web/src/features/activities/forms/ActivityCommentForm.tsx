import { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import { Link } from "react-router";

type Props = {
  authorName: string;
  onSubmit: (body: string) => boolean;
  onChange: () => void;
};

export default function ActivityCommentForm({
  authorName,
  onSubmit,
  onChange,
}: Props) {
  const [body, setBody] = useState("");
  const submit = () => {
    if (!body.trim() || body.trim().length > 2000) return;
    if (onSubmit(body)) setBody("");
  };
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      sx={{ mb: 3 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Avatar src="/images/user.png" alt="" sx={{ width: 32, height: 32 }} />
        <Typography variant="body2">
          Piszesz jako{" "}
          <Link
            to="/profiles/maciej"
            style={{ color: "inherit", fontWeight: 700 }}
          >
            {authorName}
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
          onChange();
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
  );
}
