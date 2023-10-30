# realEstateApi

* 不動産取引価格情報
  * 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html
  * 大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27
  * 2015年の上半期（20151 - 20152）の大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27
  * 2023年の上半期の大阪府吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205

## ページャー（lists）
- `PagerPages`：ページ送り式ページャー（`splice`メソッド使用）
- `PagerIncDec`：コンテンツデータの随時追加・削除式ページャー（`filter`メソッド使用）
- `usePager`：カスタムフックでページ数（ページャー）の処理を実装
- `Pagination`：ページャー番号項目クリックでのページ遷移ページャー
- `usePagination`：カスタムフックで、`PagerPages`と`PagerIncDec`それぞれの仕様に合わせたページャー番号項目クリックでのページ遷移処理を実装
- `InputPagerNum`：ページャー数入力でページ遷移

### 設定関連
- `providers/pager/GetFetchData.tsx`：ページャー用のオフセット数（`isOffset`）や表示開始ページ数（`isPagers`）の設定をしています。

#### 注意事項
※（調整不足で）`isOffset`：オフセット数が**5の倍数以外**では「`Pagination`：ページャー項目クリックでページ遷移」と「`InputPagerNum`：ページ数入力でのページ遷移」が意図した挙動になりません。

## フィルター（filter）

## 比較（compare）
- 比較機能の未実装