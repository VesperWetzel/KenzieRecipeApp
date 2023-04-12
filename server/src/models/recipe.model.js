import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
  recipeId: {
    type: Schema.Types.String,
    required: true,
    unique: false,
  },
  title: {
    type: Schema.Types.String,
    required: true
  },
  image: {
    type: Schema.Types.String,
    required: true
  }
}, {
  timestamps: true
});

const Recipe = model("Recipe", RecipeSchema);

export default Recipe;