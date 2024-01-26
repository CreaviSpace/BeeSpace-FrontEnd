import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

interface IIconProps {
  icon: string;
}

export default function Icons({ icon }: IIconProps) {
  if (icon.toLowerCase() === 'android') {
    return (
      <div className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-gray10">
        <FcGoogle size={25} />
      </div>
    );
  } else if (icon.toLowerCase() === 'ios') {
    return (
      <div className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-gray10">
        <FaApple size={25} />
      </div>
    );
  } else if (icon.toLowerCase() == 'web') {
    return (
      <div className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-gray10">
        <FaGlobe size={25} />
      </div>
    );
  }
}
