import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Class({ cls }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images.cloudflareapps.com/ij5s5higSzWcOB6vks5Q_background-1.jpeg"
        alt="Mountains"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cls.className}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a class card. You can see the class name above.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Join</Button>
      </CardActions>
    </Card>
  );
}
