# realEstateApi

- 不動産取引価格情報
・都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html
・大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27
・2015年の上半期（20151 - 20152）の大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27
・2023年の上半期の大阪府吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205

## ページャー（lists）
- ページャー機能の不具合
`Contents.tsx`内の「ページャー処理後-A（コンテンツデータを【差し替えて】いくver）」において、取得予定コンテンツデータ数がオフセット数以下の場合にコンテンツデータを取得できない。

## フィルター（compare）
- 比較機能の未実装