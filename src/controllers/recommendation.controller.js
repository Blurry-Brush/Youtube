import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { recommendationSystemResponse } from "../service/openApi.service.js";
import { fetchYouTubeVideos } from "../service/youtube.service.js";
import { log } from "console";

const getRecommendations = asyncHandler(async (req, res) => {
  const { category, feedback } = req.body;
  if (!category || !feedback) {
    throw new ApiError(400, "Enter all information");
  }
  //call to openai service
  const { topics } = await recommendationSystemResponse({ category, feedback });

  //call to youtube service
  const videoResults = await fetchYouTubeVideos(topics);

  res
    .status(200)
    .json(
      new ApiResponse(200, videoResults, "Recommendations fetched successfully")
    );
});

export { getRecommendations };
