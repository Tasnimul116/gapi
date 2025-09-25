import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.router";

import { UploadDocumentRoutes } from "../modules/documents/documents.route";
import { NoticeRoutes } from "../modules/notice/notice.router";
import { NewsRoutes } from "../modules/news/news.router";
import { CareerRoutes } from "../modules/career/career.router";
import { PublicationRoutes } from "../modules/publications/publication.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },


  {
    path: "/documents",
    route: UploadDocumentRoutes,
  },
  {
    path: "/notice",
    route: NoticeRoutes,
  },
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/careers",
    route: CareerRoutes,
  },
  {
    path: "/publications",
    route: PublicationRoutes,
  },

 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
