import { FaApple } from '@react-icons/all-files/fa/FaApple';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

interface IIconProps {
  icon?: string;
}

export default function Icons({ icon }: IIconProps) {
  if (!icon) {
    return null;
  }

  return (
    <div className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-gray10">
      {icon.toLowerCase() === 'android' && <FcGoogle size={25} />}
      {icon.toLowerCase() === 'ios' && <FaApple size={25} />}
      {icon.toLowerCase() === 'web' && <FaGlobe size={25} />}
    </div>
  );
}
