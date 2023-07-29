import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  const [sighting, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sightings")
      .then((response) => {
        setSightings(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Reports of Sightings</h1>
      {sighting.map((sighting, id) => (
        <Card key={id} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Report number: {sighting.id}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {sighting.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sighting.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sighting.notes}
            </Typography>
            <Link to={`/sightings/${id}`} target="_blank" key={id}>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Link>
          </CardContent>
        </Card>
      ))}
      <Outlet />
    </div>
  );
};

export default App;
