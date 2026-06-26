import type { ChapterDef } from "./types";
import Coldopen from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import Vision from "../chapters/02-vision/Vision";
import { narrations as visionNarrations } from "../chapters/02-vision/narrations";
import Origin from "../chapters/03-origin/Origin";
import { narrations as originNarrations } from "../chapters/03-origin/narrations";
import Paradox from "../chapters/04-paradox/Paradox";
import { narrations as paradoxNarrations } from "../chapters/04-paradox/narrations";
import Body from "../chapters/05-body/Body";
import { narrations as bodyNarrations } from "../chapters/05-body/narrations";
import Reality from "../chapters/06-reality/Reality";
import { narrations as realityNarrations } from "../chapters/06-reality/narrations";
import Future from "../chapters/07-future/Future";
import { narrations as futureNarrations } from "../chapters/07-future/narrations";

export const CHAPTERS: ChapterDef[] = [
  {
    id: "coldopen",
    title: "雨夜霓虹",
    narrations: coldopenNarrations,
    Component: Coldopen,
  },
  {
    id: "vision",
    title: "核心视觉",
    narrations: visionNarrations,
    Component: Vision,
  },
  {
    id: "origin",
    title: "起源定义",
    narrations: originNarrations,
    Component: Origin,
  },
  {
    id: "paradox",
    title: "核心悖论",
    narrations: paradoxNarrations,
    Component: Paradox,
  },
  {
    id: "body",
    title: "身体改造",
    narrations: bodyNarrations,
    Component: Body,
  },
  {
    id: "reality",
    title: "预言成真",
    narrations: realityNarrations,
    Component: Reality,
  },
  {
    id: "future",
    title: "演进分化",
    narrations: futureNarrations,
    Component: Future,
  },
];
