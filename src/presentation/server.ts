import express, { Router } from 'express'
import path from 'path'
import compression from 'compression'

interface Options {
    port: number
    routes: Router
    public_path?: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly public_path: string
    private readonly routes: Router

    constructor(private options: Options) {
        const { port, public_path } = options
        this.port = port
        this.public_path = public_path || 'public'
        this.routes = options.routes
    }

    public start() {

        //middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(compression())

        //public folder
        this.app.use(express.static(this.public_path))

        // Routes
        this.app.use(this.routes)

        // para SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, '..', '..', `${this.public_path}`, 'index.html')
            res.sendFile(indexPath)
            return;
        })

        this.app.listen(this.port, () => console.log('Server is running on port: ' + this.port))
    }
}