const { Console } = require("console");

module.exports = {
    redirect_to(req, res, next) {
        // console.log(req);
        console.log("IP", req.connection.remoteAddress)
        const search = { "source": req.url.substring(1) };
        const CollectionName = "masterRedirect";
        global.mongodb.collection(CollectionName).find(search).toArray((err, files) => {
            try {
                if (err) {
                    console.log(err);
                    res.status(500).json("INTERNAL_SERVER_ERROR");
                } else {
                    // console.log(files);
                    if (files && files.length === 1 && files[0].destination ) { 
                        const websitefinal = files[0].destination;
                        res.writeHead(301, { "Location": websitefinal });
                        return res.end();
                    }
                    else {
                        res.status(500).json("INTERNAL_SERVER_ERROR");
                    }
                }
            } catch (error) {
                console.log("redirect_to", error);
                res.status(500).json("INTERNAL_SERVER_ERROR");
            }
        })

    }
}