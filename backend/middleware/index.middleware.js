import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  // Rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  });
  app.use(limiter);
};
