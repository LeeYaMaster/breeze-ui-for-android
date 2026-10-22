/**
 * 聊天消息列表
 */
export interface ListMessageItem {
  id: string | number;
  type?: 'text' | 'image' | 'voice' | 'location' | 'info';
  role?: 'self' | 'peer';
  text?: string;
  image?: string;
  time?: string;
  avatar?: string;
  infoClass?: string;
  icon?: string;
  linkText?: string;
  actionText?: string;
  actionClass?: string;
  hintIcon?: string;
  hintText?: string;
  anchorId?: string;
}

export interface ListMessageProps {
  items?: ListMessageItem[];
  peerAvatar?: string;
  selfAvatar?: string;
  customClass?: string;
}
