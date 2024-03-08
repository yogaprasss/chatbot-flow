import Image from 'next/image';
import WhatsappIcon from '@/assets/whatsapp.svg';
import useTopBarHooks from './hooks';
import PlayIcon from '@/assets/play.svg';

import { FC } from 'react';

interface TopBarProps {
  onClickPlay: () => void;
}

const TopBar: FC<TopBarProps> = ({ onClickPlay }) => {
  const {
    data: { isShowLabelPlay },
    methods: {
      onMouseEnterPlayButton,
      onMouseLeavePlayButton
    }
  } = useTopBarHooks();

  return (
    <div className='flex w-screen h-12 bg-white fixed top-0 z-10 shadow-md'>
      <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-3'>
        <Image src={WhatsappIcon} alt='whatsapp' width={20} height={20} />
        <p className='font-bold'>Chatbot Flow Chart</p>
      </div>
      <div className='absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-3'>
        {/* TODO-yoga: adding export button */}
        {/* <button>Export</button> */}
        <div className='relative flex items-center'>
          {isShowLabelPlay && (
            <p className='absolute -top-3 left-1/2 -translate-x-1/2 text-[10px]'>
              Simulation
            </p>
          )}
          <button
            type='button'
            onClick={onClickPlay}
            onMouseEnter={onMouseEnterPlayButton}
            onMouseLeave={onMouseLeavePlayButton}
          >
            <Image src={PlayIcon} alt='play-button' width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
