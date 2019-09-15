import * as Koa from "koa";
import * as combineRouters from "koa-combine-routers";
import * as serve from "koa-static";
import { UserRouter } from "./routers";

const path: any = require("path");
const bodyParser: any = require('koa-bodyparser');

// Set the port to listen on -- may want to make this more customizable
const PORT: number = 8000;

export default class Server
{
    public app: Koa

    public constructor()
    {
        // Create an ExpressJS application instance
        this.app = new Koa();

        // Configure the application
        this.Configure();

        // Add the routes
        this.Routes();
    }

    public Configure()
    {
        // Add static paths -- needs to be updated for the different frontend methods
        this.app.use(serve(path.join(__dirname, "../../../../dist")));
        this.app.use(bodyParser());

        // Add error handling
        this.app.on("error", console.error);

        // Listen on a port
        this.app.listen(PORT);
    }

    private Routes()
    {
        // Attach all the routers
        const combinedRouter = combineRouters(
            new UserRouter("This is the router to handle mocked user registration and login", "/users").router
        );
        
        // Use the router middleware -- combine all the routers
        this.app.use(combinedRouter());
    }
}