# realEstateApi

* 不動産取引価格情報
  * 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html
  * 大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27
  * 2015年の上半期（20151 - 20152）の大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27
  * 2023年の上半期の大阪府吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205

## ページャー（lists）
- `PagerPages`：ページ送り式ページャー（`splice`メソッド使用）
- `PagerIncDec`：コンテンツデータの随時追加・削除式ページャー（`filter`メソッド使用）
- `usePager`カスタムフックでページ数（ページャー）の処理を実装

## フィルター（filter）

## 比較（compare）
- 比較機能の未実装