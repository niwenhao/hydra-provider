# HYDRAの提供者プログラム試験実装
## npm 実行スクリプト
1.  serve  
    プロバイダーサーバを起動する。
2.  inspect  
    DEBUG
3.  init  
    クライアント登録
4.  clean  
    クライアント削除
5.  hydra  
    HYDRAサーバを起動する。
##  エンドポイント
1.  /login  
    ログイン処理
    1.  GET  
        ログイン画面表示
    2.  POST  
        ログイン処理
2.  /consent  
    認可処理
    1.  GET  
        認可画面表示
    2.  POST  
        認可処理
3.  /oauth  
    Oauth関連処理
    1.  /callback(GET)  
        認可コード受取処理
    2.  /init(GET)  
        認証初期化処理。
    3.  /token/{access_token|refresh_token}(GET)  
        トークンintrospect(RFC7662)

