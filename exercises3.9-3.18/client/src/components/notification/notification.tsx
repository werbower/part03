
import styles from './notification.module.css'

type NotificationType = 'success'|'failure'
export type NotificationBody = {type: NotificationType, message: string}

export default function Notification(props: NotificationBody) {


    return(<>
    <div className={ `${styles.notification} ${styles[props.type]}` }>
        {props.message}
    </div>

    </>)

}