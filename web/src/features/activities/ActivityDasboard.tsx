import { Grid, List, ListItem, ListItemText } from "@mui/material";

type Props = {
  activities: Activity[];
};

export default function ActivityDasboard({ activities }: Props) {
  return (
    <Grid container>
      <Grid size={12}>
        <List>
          {activities.map((a) => (
            <ListItem key={a.id}>
              <ListItemText>{a.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
