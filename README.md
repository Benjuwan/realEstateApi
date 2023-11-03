# realEstateApi
- 日本各地の不動産取引データを取得するサイトです。
- `SelectApp`：サイトのトップページ
- `SelectAppChange`：サイトのトップページからデータ取得後の表示仕様・機能を選ぶためのコンポーネント

* 不動産取引価格情報
  * 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html
  * 大阪府（27）の市区町村コード一覧：https://www.land.mlit.go.jp/webland/api/CitySearch?area=27
  * 2015年の上半期（20151 - 20152）の大阪府全域：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20151&to=20152&area=27
  * 2023年の上半期の大阪府吹田市：https://www.land.mlit.go.jp/webland/api/TradeListSearch?from=20231&to=20232&area=27&city=27205

## ページャー（pager）
- `PagerBaseComponent`：ページャー機能のトップページ
- `PagerPages`：ページ送り式ページャー（`splice`メソッド使用）
- `PagerIncDec`：コンテンツデータの随時追加・削除式ページャー（`filter`メソッド使用）
- `usePager`：カスタムフックでページ数（ページャー）の処理を実装
- `Pagination`：ページャー番号項目クリックでのページ遷移ページャー
- `usePagination`：カスタムフックで、`PagerPages`と`PagerIncDec`それぞれの仕様に合わせたページャー番号項目クリックでのページ遷移処理を実装
- `InputPagerNum`：ページャー数入力でページ遷移

### 設定関連
- `providers/pager/PagerGetFetchData.tsx`：ページャー用のオフセット数（`isOffset`）や表示開始ページ数（`isPagers`）の設定をしています。

#### 注意事項
※（調整不足で）`isOffset`：オフセット数が**5の倍数以外**では「`Pagination`：ページャー項目クリックでページ遷移」と「`InputPagerNum`：ページ数入力でのページ遷移」が意図した挙動になりません。

## フィルター（filter）
- `FilterComponent`：フィルター機能のトップページ
- `FetchDataContents`：取得したコンテンツデータを表示する
- `AverageNumber`：取得したコンテンツデータの取引価格の平均値を算出する
- `FilterActionBtns`：昇順・降順、地区検索、リセット機能を担うボタンUI
- `FilterContentsCatClick`：建物の用途によるフィルター機能を担うボタンUI
- `SelectPrefs`：都道府県のselect
- `SelectCities`：市区町村のselect
- `SelectTerm`：計測期間のselect
- `useFetchPrefData`：選択した都道府県コードを取得するためのカスタムフック
- `useSortMethod`：昇順・降順ソートを実現するためのカスタムフック
- `useFilterMethod`：建物の用途、地区検索、特定の文字列検索、リセット機能を実現するためのカスタムフック
- `useSetPrefCityData`：希望する都道府県名と市区町村名の反映及び、任意の都道府県・市区町村・計測期間を指定してコンテンツデータを取得するためのカスタムフック
- `useGetJsonDataXai`：`useSetPrefCityData`によって渡されたデータ（任意の都道府県・市区町村・計測期間）から希望するコンテンツデータを取得するためのカスタムフック

### 設定関連
- `providers/filter/GetFetchData.tsx`：ページャー用のオフセット数（`isOffset`）や表示開始ページ数（`isPagers`）の設定をしています。

## 比較（compare）
- 未実装