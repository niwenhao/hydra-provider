module.exports = {
    client_name: "data.com",
    client_secret: "dceb28ad-1f16-40d6-a686-66086342ea64",
    client_secret_expires_at: 0,
    client_url: "https://www.data.com/index.html",
    contacts: [],
    grant_types: ["authorization_code", "refresh_token"],
    id: "data-com",
    owner: "data com co, ltd.",
    public: false,
    redirect_uris: ['http://localhost/provider/oauth/callback'],
    response_types: ['id_token','code'],
    scope: 'openid data:read offline_access'
}
