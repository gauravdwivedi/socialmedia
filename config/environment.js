


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
            service: 'gmail',
            host: 'smpt.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'codingwithgaurav@gmail.com',
                pass: 'Gd@24_02@1989'
            },
            tls: {
                rejectUnauthorized: false
            }
    },
    google_client_id: "164813607185-j9lnc289l42tvdh503vgc7f7ikghaugq.apps.googleusercontent.com",
    google_client_secret: "SW_uj2OgqcXSQFmwNsUAzblZ",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    

}



const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
            service: 'gmail',
            host: 'smpt.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.CODEIAL_GMAIL_USERNAME,
                pass: process.env.CODEIAL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);

