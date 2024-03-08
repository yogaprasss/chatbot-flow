import { FC, ReactNode } from 'react';

interface PopupProps {
  isShow: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isShow, onClose, children }) => {
  if (!isShow) return <></>
  return (
    <div className='fixed w-screen h-screen top-0 left-0 z-20'>
      <button
        className='w-screen h-screen fixed top-0 left-0 z-20 bg-black opacity-30'
        onClick={onClose}
      />
      <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30'>
        {children}
      </div>
    </div>
  );
};

export default Popup;
