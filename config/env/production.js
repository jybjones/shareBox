module.exports = {
    // This is your MYSQL Database configuration
    port: 80,
    db: {
        name: "sharebox",
        password: "",
        username: "root",
        host:"localhost",
        port:3306
    },
    app: {
        name: "Sh@rebox -  Production"
    },
    facebook: {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.LOCAL_URL+"/auth/facebook/callback"
    },
    twitter: {
        clientID: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.LOCAL_URL+"/auth/twitter/callback"
    }
};
