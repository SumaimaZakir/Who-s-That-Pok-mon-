const express = require("express");
const fetch = require("node-fetch"); // To fetch data from external APIs
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Define a simple API route to get Pokémon data
app.get("/api/pokemon/:id", async (req, res) => {
  const pokemonId = req.params.id;

  try {
    // Fetch Pokémon data from the PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Send the Pokémon name and image URL
    res.json({
      name: data.name,
      image: data.sprites.other.dream_world.front_default,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch Pokémon data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
