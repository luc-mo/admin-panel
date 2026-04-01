import { createProvider } from './utils/create-provider'
import { App, type NotificationArgsProps } from 'antd'
import type { ArgsProps } from 'antd/es/notification'

export interface IToastContext {
	show: (type: NonNullable<NotificationArgsProps['type']>, message: string) => void
}

export const toastProvider = createProvider({
	providerName: 'ToastProvider',
	contextName: 'toast',
	useValue: (): IToastContext => {
		const { notification } = App.useApp()
		return {
			show: (type: NonNullable<NotificationArgsProps['type']>, message: string) => {
				notification[type]({ ..._toastConfig, description: message })
			},
		}
	},
})

const _toastConfig: ArgsProps = {
	placement: 'bottomRight',
	showProgress: true,
	styles: {
		title: { display: 'none' },
		description: { marginTop: 0, marginRight: 22 },
	},
}
