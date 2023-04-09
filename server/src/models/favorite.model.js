import { Schema, model } from "mongoose";

const FavoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId is required."],
      unique: false,
    },
    recipeId: {
        type: Schema.Types.String,
        required: [true, "RecipeId is required."],
        unique: false,
      },  
  },
  { timestamps: true }
);

const Favorite = model("Favorite", FavoriteSchema);

export default Favorite;
