import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, App as AntdApp } from 'antd'
import { router } from './router.tsx'

const root = document.getElementById('root')!
createRoot(root).render(
	<StyleProvider layer>
		<ConfigProvider>
			<AntdApp>
				<RouterProvider router={router} />
			</AntdApp>
		</ConfigProvider>
	</StyleProvider>
)
