require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import cors from "cors";
import helmet from "helmet";
import logger from "./logger";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch(next);
  };
}

app.get(
  "/houses",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query as { name?: string };
    try {
      const response = await axios.get(
        "https://wizard-world-api.herokuapp.com/houses"
      );
      let houses: any[] = response.data;

      if (name) {
        houses = houses.filter((house) =>
          house.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      res.json(houses);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.message ||
          "Error fetching data from external API";
        logger.error(message);
        next(new Error(message));
      } else {
        next(error);
      }
    }
  })
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    error: true,
    message: errorMessage,
  });
});

export default app;