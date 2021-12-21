// import React, { useRef, useEffect } from 'react'
//
// import { useSelector } from 'react-redux'
// import { ToastContainer, toast } from 'react-toastify';
//
// const notificationsSelector = (state) => state.notifications.temporary
//
// const NotificationsTemporary = () => {
//   const notificationAlertRef = useRef(null)
//   const notification = useSelector(notificationsSelector)
//
//   useEffect(() => {
//     if (Object.keys(notification).length) {
//       notify(notification)
//     }
//   }, [notification])
//
//   const notify = (val) => {
//     let type
//     switch (val.isSuccess) {
//       case true:
//         type = 'success'
//         break
//       case false:
//         type = 'danger'
//         break
//       default:
//         type = 'info'
//         break
//     }
//     const options = {
//       place: 'br',
//       message: (
//         <div>
//           <div>{val.message}</div>
//         </div>
//       ),
//       type,
//       icon: 'tim-icons icon-bell-55',
//       autoDismiss: false,
//     }
//     notificationAlertRef.current.notificationAlert(options)
//   }
//
//   return (
//     <div className="notification-container">
//       <NotificationAlert ref={notificationAlertRef} />
//     </div>
//   )
// }
//
// export default NotificationsTemporary
