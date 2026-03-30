import { createProvider } from './utils/create-provider'
import { App, type NotificationArgsProps } from 'antd'
import type { ArgsProps } from 'antd/es/notification'

const _toastConfig: ArgsProps = {
	placement: 'bottomRight',
	showProgress: true,
	styles: {
		title: { display: 'none' },
		description: { marginTop: 0 },
	},
}

export const toastProvider = createProvider({
	providerName: 'ToastProvider',
	contextName: 'toast',
	useValue: () => {
		const { notification } = App.useApp()

		const show = (type: NonNullable<NotificationArgsProps['type']>, message: string) => {
			notification[type]({ ..._toastConfig, description: message })
		}

		return { show }
	},
})
