import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

/* Lists */
import { GetFetchDataContextFragment } from './providers/lists/GetFetchData.tsx'

/* Compare */
// import { GetFetchDataContextFragment } from './providers/compare/GetFetchData.tsx'
// import { CityNameFragment } from './providers/compare/CityName.tsx'
// import { FetchDataResetRenderContextFragment } from './providers/compare/FetchDataResetRender.tsx'
// import { GetFetchCityCodeFragment } from './providers/compare/GetFetchCityCode.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Lists */}
    <GetFetchDataContextFragment>
      <App />
    </GetFetchDataContextFragment>

    {/* Compare */}
    {/* <GetFetchDataContextFragment>
      <CityNameFragment>
        <FetchDataResetRenderContextFragment>
          <GetFetchCityCodeFragment>
            <App />
          </GetFetchCityCodeFragment>
        </FetchDataResetRenderContextFragment>
      </CityNameFragment>
    </GetFetchDataContextFragment> */}
  </React.StrictMode>,
)
