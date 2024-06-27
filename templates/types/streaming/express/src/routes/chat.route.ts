import express, { Router } from "express";
import { chatConfig } from "../controllers/chat-config.controller";
import { chatEmbed } from "../controllers/chat-embed.controller";
import { chatRequest } from "../controllers/chat-request.controller";
import { chat } from "../controllers/chat.controller";
import { initSettings } from "../controllers/engine/settings";

const llmRouter: Router = express.Router();

initSettings();
llmRouter.route("/").post(chat);
llmRouter.route("/request").post(chatRequest);
llmRouter.route("/config").get(chatConfig);
llmRouter.route("/embed").post(chatEmbed);

export default llmRouter;
