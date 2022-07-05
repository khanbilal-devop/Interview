
import {NotificationManager} from 'react-notifications';

export const BASE_API = 'http://localhost:8080'
export const DEFAULT_MESSAGE = 'Oops!! something went wrong'

export const successNotification = (message,title) => NotificationManager.success(message, title,3000);

export const errorNotification = (message,title) =>  NotificationManager.error(message, title,3000);

export const userSearchParam = {
    isPageable: true,
    currentPage: 1,
    pageSize: 2,
    ascending: false,
    orderBy: 'id',
}
