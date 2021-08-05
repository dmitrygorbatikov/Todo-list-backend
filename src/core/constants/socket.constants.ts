export enum SocketEvents {
   newMessage = 'newMessage',
   sendMessage = 'sendMessage',
}

export type SocketEventsType = keyof typeof SocketEvents
