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
## CA API Gatewayと比べって、HYDRAの特徴
* OPEN SOURCE
* GUIがない。
* 認証、認可の業務ロジック部分をそっとにアウトソーシングする。
* 一部の仕様が先サポートする。(offline_access)
* セキュリティ関連情報、token類をハッシュ化して、DBに保存。トークン情報を取得できない。  
  しかし、トークンとクライアント情報がわかる場合、introspectionを通して、取得できる。
